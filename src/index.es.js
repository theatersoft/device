export {Interface, Type, interfaceOfType} from './types'

import {ON, OFF, on, off} from './actions/switchActions'
export const switchActions = {ON, OFF, on, off}

import {BRIGHT, DIM, bright, dim} from './actions/dimmerActions'
export const dimmerActions = {...switchActions, BRIGHT, DIM, bright, dim}
