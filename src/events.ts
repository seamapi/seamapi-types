interface CommonDeviceEvent<
  EventType extends string,
  Payload extends Record<string, unknown> | {} = {}
> {
  event_type: EventType
  payload: Payload & {
    workspace_id: string
    device_id: string
  }
}

// Devices
type DeviceConnectedEvent = CommonDeviceEvent<"device.connected">
type DeviceDisconnectEvent = CommonDeviceEvent<"device.disconnected">
type DeviceTamperEvent = CommonDeviceEvent<"device.tampered">
type DeviceLowBatteryEvent = CommonDeviceEvent<"device.low_battery">

// Access codes
type CreateAccessCodeEvent = CommonDeviceEvent<
  "access_code.created",
  {
    access_code_id: string
  }
>

// Noise thresholds
type NoiseDetectedEvent = CommonDeviceEvent<"noise_detection.detected_noise">

export type SeamEvent =
  | DeviceConnectedEvent
  | DeviceDisconnectEvent
  | DeviceTamperEvent
  | DeviceLowBatteryEvent
  | CreateAccessCodeEvent
  | NoiseDetectedEvent
