export const
    SET_TIME = 'SET_TIME',
    SET_STATE = 'SET_STATE'

export const
    setTime = time => ({type: SET_TIME, time}),
    setState = (name, state) => ({type: SET_STATE, name, state})

export * from '../actions'

import bus from '@theatersoft/bus'
import {ON, OFF, SET} from '../actions'

export const
    api = action => (dispatch, getState, {}) => {
        switch (action.type) {
        case ON:
        case OFF:
        case SET:
            const [, service, id] = /^(\w+)(?:\.(.+))?$/.exec(action.id)
            return bus.proxy(service).dispatch({...action, id})
        }
    }
