'use strict'
const
    {bus} = require('@theatersoft/bus'),
    options = {
        module: '@theatersoft/device',
        export: 'Device',
        name: 'Device',
        config: {
            devices: [
            ]
        }
    },
    service = new (require(options.module)[options.export])()

bus.start().then(() =>
    service.start(options))

process.on('SIGINT', () =>
    service.stop().then(() => process.exit()))
