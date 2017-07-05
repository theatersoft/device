export const
    ON = 'ON',
    OFF = 'OFF',
    on = id => ({type: ON, id}),
    off = id => ({type: OFF, id}),
    toggle = (value, id) => ({type: value ? OFF : ON, id})
