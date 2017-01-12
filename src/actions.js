export const
    SET_TIME = 'SET_TIME',
    SET_STATE = 'SET_STATE'

export const
    setTime = time => ({type: SET_TIME, time}),
    setState = (name, state) => ({type: SET_STATE, name, state})





