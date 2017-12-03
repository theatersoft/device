import {Type} from '../types'
import {log} from './log'

const
    index = a => a.reduce((o, e) => (o[e.id] = e, o), {})

export const
    INIT = 'INIT',
    init = groups => ({
        type: INIT,
        devices: index(groups.map(({name, type = Type.Group}, i) => ({name, value: false, type, id: i}))),
        groups: groups.map(({devices}) => devices)
    })

import {switchActions} from '@theatersoft/device'
export const {ON, OFF, on, off} = switchActions

export const
    api = action => (dispatch, getState, {codec}) => {
        const
            {id, type} = action,
            device = getState().devices[id]
        if (!device) return error(`no device for ${action}`)
        if (interfaceOfType(device.type) === Interface.SWITCH_BINARY) {
            switch (type) {
            case ON:
            case OFF:
                const virtual = getState().devices[`${id}.0`]
                dispatch({...action, ...virtual && {time: Date.now()}})
                codec.send(type, id)
            }
        }
    }