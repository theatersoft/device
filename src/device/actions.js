export const
    SET_TIME = 'SET_TIME',
    SET_STATE = 'SET_STATE'

export const
    setTime = time => ({type: SET_TIME, time}),
    setState = (name, state) => ({type: SET_STATE, name, state})

export * from '../actions'

import bus from '@theatersoft/bus'
import {switchActions, dimmerActions, buttonActions} from '../actions'

const deviceActions = Object.values({...switchActions, ...dimmerActions, ...buttonActions})

export const
    api = action => () => {
        if (deviceActions.includes(action.type)) {
            const [, service, id] = /^(\w+)(?:\.(.+))?$/.exec(action.id)
            return bus.proxy(service).dispatch({...action, id})
        }
    }
