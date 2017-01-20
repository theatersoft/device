export const
    Interface = {
        SWITCH_BINARY: 'SwitchBinary',
        SWITCH_MULTILEVEL: 'SwitchMultilevel',
        SENSOR_BINARY: 'SensorBinary',
        SENSOR_MULTILEVEL: 'SensorMultilevel'
    },
    Type = {
        Switch: 'Switch',
        Dimmer: 'Dimmer',
        Receptacle: 'Receptacle',
        BinarySensor: 'BinarySensor',
        DoorWindowSensor: 'DoorWindowSensor',
        MotionSensor: 'MotionSensor'
    },
    toInterface = type => ({
        [Type.Switch]: Interface.SWITCH_BINARY,
        [Type.Receptacle]: Interface.SWITCH_BINARY,
        [Type.Dimmer]: Interface.SENSOR_MULTILEVEL,
        [Type.DoorWindowSensor]: Interface.SENSOR_BINARY,
        [Type.MotionSensor]: Interface.SENSOR_BINARY
    }[type])
