import store from './store'
import bus, {EventEmitter} from '@theatersoft/bus'
import {log} from './log'
import {setState} from './actions'

const dedup = (getState, _state = getState()) => f => (_next = getState()) => {
    if (_next !== _state) {
        _state = _next
        f(_next)
    }
}

export class Device {
    start ({name}) {
        Object.assign(this, {name})
        return bus.registerObject(name, this)
            .then(() => {
                store.subscribe(dedup(store.getState)(state =>
                    bus.signal(`/${this.name}.state`, state)))
            })
    }

    stop () {
        return bus.unregisterObject(this.name)
    }

    dispatch (action) {
        return store.dispatch(action)
    }

    getState () {
        return store.getState()
    }

    registerService (name) {
        log('registerService', name)
        bus.proxy(name).getState()
            .then(state => {
                store.dispatch(setState(name, state))
                bus.registerListener(`/${name}.state`, state => {
                    store.dispatch(setState(name, state))
                })
            })
    }
}
