import {INIT_DEVICES} from './actions'

export default function reducer (state, action) {
    switch (action.type) {
    case INIT_DEVICES:
        return {...state, devices: action.devices}
    }
    return state
}