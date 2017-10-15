import {combineReducers} from 'redux'
import {SET_TIME, SET_STATE} from './actions'

const devices = (state = [], action) => {
    if (action.type === SET_STATE) {
        const {name, state: {devices, device}} = action
        if (devices)
            return {
                ...state,
                ...Object.entries(devices).reduce((o, [k, v]) =>
                    (o[`${name}.${k}`] = {...v, id: `${name}.${k}`}, o), {})
            }
        else
            return {
                ...state,
                [name]: {...device, id: name}
            }
    }
    return state
}

const Time = (state = {}, action) => {
    if (action.type === SET_TIME)
        return action.time
    return state
}

const reducer = combineReducers({
    devices,
    Time
})

import bus from '@theatersoft/bus'
import {ON, OFF, SET} from './actions'

export default function (state, action) {
    switch (action.type) {
    case ON:
    case OFF:
    case SET:
        const [, service, id] = /^(\w+)\.(\w+)$/.exec(action.id) || /^(\w+)$/.exec(action.id)
        bus.proxy(service).dispatch({...action, id})
        return state
    }
    return reducer(state, action)
}