export const
    Interface = {
        SWITCH_BINARY: 'SwitchBinary',
        SWITCH_MULTILEVEL: 'SwitchMultilevel',
        SENSOR_BINARY: 'SensorBinary',
        SENSOR_MULTILEVEL: 'SensorMultilevel'
    },
    Type = {
        BinarySensor: 'BinarySensor',
        Button: 'Button',
        Chime: 'Chime',
        Dimmer: 'Dimmer',
        DuskSensor: 'DuskSensor',
        Hvac: 'Hvac',
        LightSwitch: 'LightSwitch',
        MotionSensor: 'MotionSensor',
        OpenSensor: 'OpenSensor',
        PowerSwitch: 'PowerSwitch',
        Projector: 'Projector',
        Receptacle: 'Receptacle',
        Siren: 'Siren',
        Switch: 'Switch'
    },
    interfaceOfType = type => ({
        [Type.Button]: Interface.SENSOR_BINARY,
        [Type.Chime]: Interface.SWITCH_BINARY,
        [Type.Dimmer]: Interface.SWITCH_MULTILEVEL,
        [Type.DuskSensor]: Interface.SENSOR_BINARY,
        [Type.LightSwitch]: Interface.SWITCH_BINARY,
        [Type.MotionSensor]: Interface.SENSOR_BINARY,
        [Type.OpenSensor]: Interface.SENSOR_BINARY,
        [Type.PowerSwitch]: Interface.SWITCH_BINARY,
        [Type.Projector]: Interface.SWITCH_BINARY,
        [Type.Receptacle]: Interface.SWITCH_BINARY,
        [Type.Siren]: Interface.SWITCH_BINARY,
        [Type.Switch]: Interface.SWITCH_BINARY
    }[type])
