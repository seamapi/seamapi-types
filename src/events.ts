export interface CommonDeviceEvent<
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
export type DeviceConnectedEvent = CommonDeviceEvent<"device.connected">
export type DeviceDisconnectEvent = CommonDeviceEvent<
  "device.disconnected",
  {
    error_code:
      | "account_disconnected"
      | "hub_disconnected"
      | "device_disconnected"
  }
>
export type DeviceTamperEvent = CommonDeviceEvent<"device.tampered">
export type DeviceLowBatteryEvent = CommonDeviceEvent<
  "device.low_battery",
  {
    battery_level: number
  }
>

// Access codes
export type CreateAccessCodeEvent = CommonDeviceEvent<
  "access_code.created",
  {
    access_code_id: string
  }
>

export type UpdateAccessCodeEvent = CommonDeviceEvent<
  "access_code.updated",
  {
    access_code_id: string
  }
>

// Noise thresholds
export type NoiseDetectedEvent =
  CommonDeviceEvent<"noise_detection.detected_noise">

// Locks
export type LockMethod = "keycode" | "manual" | "unknown"
export type LockLockedEvent = CommonDeviceEvent<
  "lock.locked",
  {
    access_code_id?: string
    method: LockMethod
  }
>
export type LockUnlockedEvent = CommonDeviceEvent<
  "lock.unlocked",
  {
    access_code_id?: string
    method: LockMethod
  }
>
export interface CommonConnectedAccountEvent<
  EventType extends string,
  Payload extends Record<string, unknown> | {} = {}
> {
  event_type: EventType
  payload: Payload & {
    workspace_id: string
    connected_account_id: string
  }
}

export type ConnectedAccountDisconnected = CommonConnectedAccountEvent<
  "connected_account.disconnected",
  {}
>

export type SeamEvent =
  | DeviceConnectedEvent
  | DeviceDisconnectEvent
  | DeviceTamperEvent
  | DeviceLowBatteryEvent
  | CreateAccessCodeEvent
  | NoiseDetectedEvent
  | ConnectedAccountDisconnected
  | LockLockedEvent
  | LockUnlockedEvent
