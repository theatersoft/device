import {INIT} from './actions'
import {ON, OFF} from '../actions'
import {log} from '../log'

export default function reducer (state, action) {
    //log('GROUP REDUCER', action)
    const {type} = action
    switch (type) {
    case INIT:
        const {devices, groups} = action
        return {
            ...state,
            devices,
            groups
        }
    case ON:
    case OFF:
    {
        const
            {id} = action,
            device = state.devices[id],
            value = type === ON
        if (device)
            return {
                ...state,
                devices: {
                    ...state.devices,
                    [id]: {...device, value}
                }
            }
    }
    }
    return state
}
