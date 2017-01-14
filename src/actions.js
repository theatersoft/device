export const
    SET_TIME = 'SET_TIME',
    SET_STATE = 'SET_STATE'

export const
    setTime = time => ({type: SET_TIME, time}),
    setState = (name, state) => ({type: SET_STATE, name, state})

// switch
export const
    ON = 'ON',
    OFF = 'OFF'
export const
    on = id => ({type: ON, id}),
    off = id => ({type: OFF, id})
