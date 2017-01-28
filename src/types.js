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
        SecuritySensor: 'SecuritySensor',
        MotionSensor: 'MotionSensor',
        Projector: 'Projector'
    },
    interfaceOfType = type => ({
        [Type.Switch]: Interface.SWITCH_BINARY,
        [Type.Receptacle]: Interface.SWITCH_BINARY,
        [Type.Dimmer]: Interface.SWITCH_MULTILEVEL,
        [Type.SecuritySensor]: Interface.SENSOR_BINARY,
        [Type.MotionSensor]: Interface.SENSOR_BINARY,
        [Type.Projector]: Interface.SWITCH_BINARY
    }[type])
