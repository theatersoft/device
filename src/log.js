import * as base from '@theatersoft/bus'

const format = (...args) => (['DEVICE', ...args])

export const log = (...args) => base.log(...format(...args))
export const error = (...args) => base.error(...format(...args))