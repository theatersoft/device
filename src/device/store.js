import bus, {EventEmitter} from '@theatersoft/bus'
import {createStore} from 'redux'
import devToolsEnhancer from 'remote-redux-devtools'
import reducer from './reducer'
import {Time} from '../Time'
import {setTime} from './actions'

export const createDeviceStore = ({remotedev}) => {
    const
        time = new Time(),
        store = createStore(
            reducer,
            {
                devices: {},
                Time: time.getState()
            },
            remotedev && devToolsEnhancer({name: 'Device', realtime: true, port: 6400, hostname: remotedev})
        )
    time.start()
    time.on('minute', time => store.dispatch(setTime(time)))
    return store
}
