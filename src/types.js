export const
    Interface = {
        SWITCH_BINARY: 'SwitchBinary',
        SWITCH_MULTILEVEL: 'SwitchMultilevel',
        SENSOR_BINARY: 'SensorBinary',
        SENSOR_MULTILEVEL: 'SensorMultilevel'
    },
    Type = {
        Switch: 'Switch',
        LightSwitch: 'LightSwitch',
        PowerSwitch: 'PowerSwitch',
        Dimmer: 'Dimmer',
        Receptacle: 'Receptacle',
        BinarySensor: 'BinarySensor',
        OpenSensor: 'OpenSensor',
        MotionSensor: 'MotionSensor',
        DuskSensor: 'DuskSensor',
        Projector: 'Projector',
        Siren: 'Siren',
        Hvac: 'Hvac'
    },
    interfaceOfType = type => ({
        [Type.Switch]: Interface.SWITCH_BINARY,
        [Type.LightSwitch]: Interface.SWITCH_BINARY,
        [Type.PowerSwitch]: Interface.SWITCH_BINARY,
        [Type.Receptacle]: Interface.SWITCH_BINARY,
        [Type.Dimmer]: Interface.SWITCH_MULTILEVEL,
        [Type.OpenSensor]: Interface.SENSOR_BINARY,
        [Type.MotionSensor]: Interface.SENSOR_BINARY,
        [Type.DuskSensor]: Interface.SENSOR_BINARY,
        [Type.Projector]: Interface.SWITCH_BINARY,
        [Type.Siren]: Interface.SWITCH_BINARY
    }[type])
