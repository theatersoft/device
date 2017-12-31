import {combineReducers} from 'redux'
import {SET_TIME, SET_STATE} from './actions'
import {log} from '../log'

const devices = (state = [], action) => {
    //log('DEVICE REDUCER', action)
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

export default combineReducers({
    devices,
    Time
})
