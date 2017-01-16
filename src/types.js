export const DeviceInterface = {
    SWITCH_BINARY: 'SwitchBinary',
    SWITCH_MULTILEVEL: 'SwitchMultilevel',
    SENSOR_BINARY: 'SensorBinary',
    SENSOR_MULTILEVEL: 'SensorMultilevel'
}

export const DeviceType = {
    Switch: 'Switch',
    Dimmer: 'Dimmer',
    DoorWindowSensor: 'DoorWindowSensor',
    PIRSensor: 'PIRSensor',
    Receptacle: 'Receptacle'
}

export const DeviceTypeMap = {
    Switch: DeviceInterface.SWITCH_BINARY,
    Dimmer: DeviceInterface.SENSOR_MULTILEVEL,
    DoorWindowSensor: DeviceInterface.SENSOR_BINARY,
    PIRSensor: DeviceInterface.SENSOR_BINARY,
    Receptacle: DeviceInterface.SWITCH_BINARY
}
