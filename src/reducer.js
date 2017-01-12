import {combineReducers} from 'redux'
import {SET_TIME, SET_STATE} from './actions'

const devices = (state = [], action) => {
    if (action.type === SET_STATE) {
        const {name, state: {devices}} = action
        return [
            ...(state.filter(d => !d.id.startsWith(`${name}.`))),
            ...(devices.map(d => ({...d, id: `${name}.${d.id}`})))
        ]
    }
    return state
}

const values = (state = {}, action) => {
    if (action.type === SET_STATE) {
        const {name, state: {values}} = action
        return {
            ...Object.entries(state).reduce((o, [k, v]) => {
                if (!k.startsWith(`${name}.`)) o[k] = v
                return o
            }, {}),
            ...Object.entries(values).reduce((o, [k, v]) => {
                o[`${name}.${k}`] = v
                return o
            }, {})
        }
    }
    return state
}

const Time = (state = {}, action) => {
    if (action.type === SET_TIME)
        return action.time
    return state
}

const globals = (state, action) => {
    switch (action.type) {
    case SET_STATE:
        const {devices, values, ...other} = action.state
        return {
            ...state,
            [action.name]: other
        }
    }
    return state
}

const slices = combineReducers({
    devices,
    values,
    Time
})

export default function (state, action) {
    //return globals(slices(state, action), action)
    return slices(state, action)
}