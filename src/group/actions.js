import {Type, interfaceOfType, Interface} from '../types'
import {ON, OFF, on, off} from '../actions'
import {log} from './log'
import bus from '@theatersoft/bus'

const
    index = a => a.reduce((o, e) => (o[e.id] = e, o), {})

export const
    INIT = 'INIT',
    init = groups => ({
        type: INIT,
        devices: index(groups.map(({name, type = Type.Group}, i) => ({name, value: false, type, id: i}))),
        groups: groups.map(({devices}) => devices)
    })

export const
    api = action => (dispatch, getState) => {
        const
            {id, type} = action,
            state = getState(),
            {devices, groups} = state,
            device = devices[id],
            group = groups[id]
        if (!device) throw `no device for ${action}`
        if (interfaceOfType(device.type) === Interface.SWITCH_BINARY) {
            switch (type) {
            case ON:
            case OFF:
                group.forEach(dev => {
                    const [, service, id] = /^(\w+)(?:\.(.+))?$/.exec(dev)
                    log(`${device.name} ${dev} ${type}`)
                    bus.proxy(service).dispatch({type, id})
                })
                // TODO update value
            }
        }
    }