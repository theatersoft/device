export const
    INIT_DEVICES = 'INIT_DEVICES',
    SET_TIME = 'SET_TIME',
    SET_STATE = 'SET_STATE'

export const
    initDevices = devices => ({type: INIT_DEVICES, devices}),
    setTime = time => ({type: SET_TIME, time}),
    setState = (name, state) => ({type: SET_STATE, name, state})





