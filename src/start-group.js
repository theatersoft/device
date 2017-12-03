'use strict'
process.on('unhandledRejection', e => console.log(e))
require('@theatersoft/bus').setTime(true)
require('@theatersoft/bus').bus.start()
    .then(bus =>
        bus.proxy('Config').get()
            .then(config => {
                const
                    options = {
                        "enabled": true,
                        "module": "@theatersoft/device",
                        "export": "Group",
                        "name": "Group",
                        "config": {
                            "remotedev": "office.local"
                        }
                    },
                    service = new (require(options.module)[options.export])()
                Object.assign(options.config, config.configs[options.name])
                service.start(options)
                process.on('SIGINT', () =>
                    service.stop().then(() => process.exit()))
            }))
