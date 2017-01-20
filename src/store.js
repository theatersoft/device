import bus, {EventEmitter} from '@theatersoft/bus'
import {createStore} from 'redux'
import devToolsEnhancer from 'remote-redux-devtools'
import reducer from './reducer'
import {Time} from './Time'
import {setTime} from './actions'

export const createDeviceStore = () => {
    const
        time = new Time(),
        store = createStore(
            reducer,
            {
                devices: {},
                Time: time.getState()
            },
            devToolsEnhancer({name: 'Device', realtime: true, port: 6400})
        )
    time.start()
    time.on('minute', time => store.dispatch(setTime(time)))
    return store
}
