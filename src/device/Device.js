import bus, {EventEmitter} from '@theatersoft/bus'
import {log} from '../log'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'remote-redux-devtools'
import reducer from './reducer'
import {Time} from '../Time'
import {setTime, setState, api} from './actions'

const dedup = (getState, _state = {}) => f => (_next = getState()) => {
    if (_next !== _state) {
        _state = _next
        f(_next)
    }
}

export class Device {
    services = {}

    start ({name, config: {remotedev}}) {
        Object.assign(this, {name})
        return bus.registerObject(name, this)
            .then(obj => {
                const time = new Time()
                this.store = createStore(
                    reducer,
                    {
                        devices: {},
                        Time: time.getState()
                    },
                    (remotedev && composeWithDevTools({name, realtime: true, port: 6400, hostname: remotedev}) || (x => x))
                    (applyMiddleware(thunk.withExtraArgument({})))
                )
                time.start()
                time.on('minute', time => this.store.dispatch(setTime(time)))
                obj.signal('start')
                this.store.subscribe(dedup(this.store.getState)(state =>
                    obj.signal('state', state)))
            })
    }

    stop () {
        return bus.unregisterObject(this.name)
    }

    dispatch (action) {
        return this.store.dispatch(api(action))
    }

    getState () {
        return this.store.getState()
    }

    registerService (name) {
        log('registerService', name)
        bus.proxy(name).getState()
            .then(state => {
                this.store.dispatch(setState(name, state))
                // prevent dup registration since services may restart
                if (!this.services[name]) {
                    this.services[name] = true
                    bus.registerListener(`${name}.state`, state =>
                        this.store.dispatch(setState(name, state)))
                }
            })
    }
}
