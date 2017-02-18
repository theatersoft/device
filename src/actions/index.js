export const
    SET_TIME = 'SET_TIME',
    SET_STATE = 'SET_STATE'

export const
    setTime = time => ({type: SET_TIME, time}),
    setState = (name, state) => ({type: SET_STATE, name, state})

export {ON, OFF, on, off} from './switchActions'
export {BRIGHT, DIM, bright, dim} from './dimmerActions'

