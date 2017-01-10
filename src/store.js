import bus, {EventEmitter} from '@theatersoft/bus'
import {combineReducers, createStore} from 'redux'
import devToolsEnhancer from 'remote-redux-devtools'
import reducer from './reducer'
import {Time} from './Time'
import {setTime} from './actions'

const time = new Time()

const store = createStore(
    reducer,
    {
        devices: [],
        Time: time.getState()
    },
    devToolsEnhancer({name: 'Device', realtime: true, port: 6400})
)
export default store

time.start()
time.on('minute', time => store.dispatch(setTime(time)))