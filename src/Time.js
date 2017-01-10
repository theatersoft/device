import bus, {EventEmitter} from '@theatersoft/bus'

export class Time extends EventEmitter {
    start ({name} = {}) {
        const tick = () => {
            const now = new Date(), next = new Date(now)
            next.setMinutes(now.getMinutes() + 1, 0, 0)
            setTimeout(() => {
                this.emit('minute', next.toLocaleString())
                tick()
            }, next - now)
        }
        tick()
        if (name)
            return bus.registerObject(this.name, this)
                .then(() => {
                    this.name = name
                    this.on('minute', state =>
                        bus.signal(`/${this.name}.state`, state))
                })
    }

    stop () {
        if (this.name)
            return bus.unregisterObject(this.name)
    }

    getState () {
        return new Date().toLocaleString()
    }
}
