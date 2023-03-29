export interface CommonDeviceEvent<
  EventType extends string,
  Payload extends Record<string, unknown> | {} = {}
> {
  event_type: EventType
  payload: Payload & {
    workspace_id: string
    connected_account_id: string
    device_id: string
  }
  created_at: string
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
export type DeviceBatteryStatusChanged = CommonDeviceEvent<
  "device.battery_status_changed",
  {
    battery_status: string
    battery_level: number
  }
>
export type DeviceCodeLimitReachedEvent =
  CommonDeviceEvent<"device.code_limit_reached">

// Access codes
export interface CommonAccessCodeEvent<
  EventType extends string
> extends CommonDeviceEvent<
    EventType,
    {
      access_code_id: string
    }
  > {}

interface DetailedAccessCodeEvent<
  EventType extends string
> extends CommonDeviceEvent<
    EventType,
    {
      access_code_id: string
      code: string
    }
  > {}

export type CreateAccessCodeEvent = CommonAccessCodeEvent<"access_code.created">
export type ChangeAccessCodeEvent = CommonAccessCodeEvent<"access_code.changed">
export type SetOnDeviceAccessCodeEvent =
  DetailedAccessCodeEvent<"access_code.set_on_device">
export type RemovedFromDeviceAccessCodeEvent =
  CommonAccessCodeEvent<"access_code.removed_from_device">
export type DelayInSettingOnDeviceAccessCodeEvent =
  CommonAccessCodeEvent<"access_code.delay_in_setting_on_device">
export type FailedToSetOnDeviceAccessCodeEvent =
  CommonAccessCodeEvent<"access_code.failed_to_set_on_device">
export type DelayInRemovingFromDeviceAccessCodeEvent =
  CommonAccessCodeEvent<"access_code.delay_in_removing_from_device">
export type FailedToRemoveFromDeviceAccessCodeEvent =
  CommonAccessCodeEvent<"access_code.failed_to_remove_from_device">

export type ConvertedToManagedAccessCodeEvent =
  CommonAccessCodeEvent<"access_code.unmanaged.converted_to_managed">
export type FailedToConvertUnmanagedAccessCodeEvent =
  CommonAccessCodeEvent<"access_code.unmanaged.failed_to_convert_to_managed">
export type UnmanagedAccessCodeCreatedEvent =
  CommonAccessCodeEvent<"access_code.unmanaged.created">
export type UnmanagedAccessCodeRemovedEvent =
  CommonAccessCodeEvent<"access_code.unmanaged.removed">

// Noise thresholds
export type NoiseDetectedEvent =
  CommonDeviceEvent<"noise_detection.detected_noise">
export type NoiseThresholdTriggeredEvent = CommonDeviceEvent<
  "noise_sensors.noise_threshold_triggered",
  {
    noise_threshold_id: string
    noise_threshold_name: string
    noise_level_decibels: number

    noise_level_nrs?: number
    noiseaware_metadata?: Record<string, unknown>
    minut_metadata?: Record<string, unknown>
  }
>

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

// Connected accounts
export interface CommonConnectedAccountEvent<
  EventType extends string,
  Payload extends Record<string, unknown> | {} = {}
> {
  event_type: EventType
  payload: Payload & {
    workspace_id: string
    connected_account_id: string
  }
  created_at: string
}

export type ConnectedAccountConnected = CommonConnectedAccountEvent<
  "connected_account.connected",
  { connect_webview_id: string }
>

export type ConnectedAccountCreated = CommonConnectedAccountEvent<
  "connected_account.created",
  { connect_webview_id: string }
>

export type ConnectedAccountDisconnected =
  CommonConnectedAccountEvent<"connected_account.disconnected">

export type ConnectedAccountCompletedFirstSync =
  CommonConnectedAccountEvent<"connected_account.completed_first_sync">

export type SeamEvent =
  | DeviceConnectedEvent
  | DeviceDisconnectEvent
  | DeviceTamperEvent
  | DeviceLowBatteryEvent
  | DeviceBatteryStatusChanged
  | CreateAccessCodeEvent
  | ChangeAccessCodeEvent
  | SetOnDeviceAccessCodeEvent
  | RemovedFromDeviceAccessCodeEvent
  | FailedToRemoveFromDeviceAccessCodeEvent
  | DelayInRemovingFromDeviceAccessCodeEvent
  | FailedToSetOnDeviceAccessCodeEvent
  | DelayInSettingOnDeviceAccessCodeEvent
  | ConvertedToManagedAccessCodeEvent
  | FailedToConvertUnmanagedAccessCodeEvent
  | UnmanagedAccessCodeCreatedEvent
  | UnmanagedAccessCodeRemovedEvent
  | NoiseDetectedEvent
  | ConnectedAccountConnected
  | ConnectedAccountCreated
  | ConnectedAccountDisconnected
  | ConnectedAccountCompletedFirstSync
  | LockLockedEvent
  | LockUnlockedEvent
