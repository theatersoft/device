export const
    Interface = {
        BUTTON: 'Button',
        SENSOR_BINARY: 'SensorBinary',
        SENSOR_MULTILEVEL: 'SensorMultilevel',
        SWITCH_BINARY: 'SwitchBinary',
        SWITCH_MULTILEVEL: 'SwitchMultilevel'
    },
    Type = {
        BinarySensor: 'BinarySensor',
        Button: 'Button',
        Chime: 'Chime',
        Dimmer: 'Dimmer',
        DuskSensor: 'DuskSensor',
        Group: 'Group',
        Hvac: 'Hvac',
        LightSwitch: 'LightSwitch',
        Lock: 'Lock',
        MotionSensor: 'MotionSensor',
        OpenSensor: 'OpenSensor',
        PowerSwitch: 'PowerSwitch',
        Projector: 'Projector',
        Receptacle: 'Receptacle',
        Siren: 'Siren',
        Switch: 'Switch',
        ToggleButton: 'ToggleButton'
    },
    interfaceOfType = type => ({
        [Type.Button]: Interface.BUTTON,
        [Type.Chime]: Interface.SWITCH_BINARY,
        [Type.Dimmer]: Interface.SWITCH_MULTILEVEL,
        [Type.DuskSensor]: Interface.SENSOR_BINARY,
        [Type.Group]: Interface.SWITCH_BINARY,
        [Type.LightSwitch]: Interface.SWITCH_BINARY,
        [Type.Lock]: Interface.SWITCH_BINARY,
        [Type.MotionSensor]: Interface.SENSOR_BINARY,
        [Type.OpenSensor]: Interface.SENSOR_BINARY,
        [Type.PowerSwitch]: Interface.SWITCH_BINARY,
        [Type.Projector]: Interface.SWITCH_BINARY,
        [Type.Receptacle]: Interface.SWITCH_BINARY,
        [Type.Siren]: Interface.SWITCH_BINARY,
        [Type.Switch]: Interface.SWITCH_BINARY,
        [Type.ToggleButton]: Interface.BUTTON
    }[type])
