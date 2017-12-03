import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'remote-redux-devtools'
import reducer from './reducer'
import {bus} from '@theatersoft/bus'
import {log} from '../log'
import {init, api} from './actions'

const select = getState => ({devices, groups} = getState()) => ({devices})

// selected objects require shallow comparison
const equal = (a, b, _a = Object.keys(a), _b = Object.keys(b)) => (
    _a.length === _b.length && !_a.find(k => !_b.includes(k) || a[k] !== b[k])
)

const dedup = (getState, _state = {}) => f => (_next = getState()) => {
    if (!equal(_next, _state)) {
        _state = _next
        f(_next)
    }
}

export class Group {
    start ({name = 'Group', config: {groups, remotedev}}) {
        Object.assign(this, {name})
        return bus.registerObject(name, this)
            .then(obj => {
                this.store = createStore(reducer, {devices: {}, groups: []},
                    (remotedev && composeWithDevTools({name: 'Group', realtime: true, port: 6400, hostname: remotedev}) || (x => x))
                    (applyMiddleware(thunk.withExtraArgument({}))))
                this.store.dispatch(init(groups))
                this.store.subscribe(dedup(select(this.store.getState))(state =>
                    obj.signal('state', state)))
                const register = () => bus.proxy('Device').registerService(this.name)
                bus.registerListener(`Device.start`, register)
                bus.on('reconnect', register)
                register()
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
}
