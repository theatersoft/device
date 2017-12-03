import {INIT} from './actions'

export default function reducer (state, action) {
    const {type} = action
    switch (type) {
    case INIT:
        const {devices, groups} = action
        return {
            ...state,
            devices,
            groups
        }
    }
    return state
}
