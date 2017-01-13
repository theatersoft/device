import {combineReducers} from 'redux'
import {SET_TIME, SET_STATE} from './actions'

const devices = (state = [], action) => {
    if (action.type === SET_STATE) {
        const {name, state: {devices, device}} = action
        if (devices)
            return [
                ...(state.filter(({id}) => !id.startsWith(`${name}.`))),
                ...(devices.map(d => ({...d, id: `${name}.${d.id}`})))
            ]
        else
            return [
                ...(state.filter(({id}) => id !== name)),
                {...device, id: name}
            ]
    }
    return state
}

const values = (state = {}, action) => {
    if (action.type === SET_STATE) {
        const {name, state: {values, value}} = action
        if (values)
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
        else
            return {
                ...Object.entries(state).reduce((o, [k, v]) => {
                    if (!k.startsWith(`${name}.`)) o[k] = v
                    return o
                }, {}),
                [name]: value
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