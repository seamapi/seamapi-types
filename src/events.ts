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
type DeviceDisconnectEvent = CommonDeviceEvent<"devices.disconnected">
type DeviceTamperEvent = CommonDeviceEvent<"devices.tampered">
type DeviceLowBatteryEvent = CommonDeviceEvent<"devices.triggered_low_battery">

// Access codes
type CreateAccessCodeEvent = CommonDeviceEvent<
  "access_codes.created",
  {
    access_code_id: string
  }
>

// Noise thresholds
type NoiseDetectedEvent = CommonDeviceEvent<"noise_thresholds.detected_noise">

export type SeamEvent =
  | DeviceConnectedEvent
  | DeviceDisconnectEvent
  | DeviceTamperEvent
  | DeviceLowBatteryEvent
  | CreateAccessCodeEvent
  | NoiseDetectedEvent
