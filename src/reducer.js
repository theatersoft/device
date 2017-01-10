import {INIT_DEVICES, SET_TIME} from './actions'

export default function reducer (state, action) {
    switch (action.type) {
    case INIT_DEVICES:
        return {...state, devices: action.devices}
    case SET_TIME:
        return {...state, Time: action.time}
    }
    return state
}