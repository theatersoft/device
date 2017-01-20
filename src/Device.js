import {createDeviceStore} from './store'
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
                this.store = createDeviceStore()
                bus.signal(`/${this.name}.started`)
                this.store.subscribe(dedup(this.store.getState)(state =>
                    bus.signal(`/${this.name}.state`, state)))
            })
    }

    stop () {
        return bus.unregisterObject(this.name)
    }

    dispatch (action) {
        return this.store.dispatch(action)
    }

    getState () {
        return this.store.getState()
    }

    registerService (name) {
        log('registerService', name)
        bus.proxy(name).getState()
            .then(state => {
                this.store.dispatch(setState(name, state))
                bus.registerListener(`/${name}.state`, state => {
                    this.store.dispatch(setState(name, state))
                })
            })
    }
}
