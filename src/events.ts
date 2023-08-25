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
  occurred_at: string
}

type DeviceDisconnectEventPayload = {
  error_code:
    | "account_disconnected"
    | "hub_disconnected"
    | "device_disconnected"
}

// Devices
export type DeviceConnectedEvent = CommonDeviceEvent<"device.connected">

export type DeviceConvertedToUnmanagedEvent =
  CommonDeviceEvent<"device.converted_to_unmanaged">
export type UnmanagedDeviceConvertedToManagedEvent =
  CommonDeviceEvent<"device.unmanaged.converted_to_managed">

export type UnmanagedDeviceConnectedEvent =
  CommonDeviceEvent<"device.unmanaged.connected">
export type DeviceDisconnectEvent = CommonDeviceEvent<
  "device.disconnected",
  DeviceDisconnectEventPayload
>
export type UnmanagedDeviceDisconnectEvent = CommonDeviceEvent<
  "device.unmanaged.disconnected",
  DeviceDisconnectEventPayload
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
export type DeviceRemovedEvent = CommonDeviceEvent<"device.removed">

// Access codes
export interface CommonAccessCodeEvent<
  EventType extends string,
  Payload extends Record<string, unknown> | {} = {}
> extends CommonDeviceEvent<
    EventType,
    Payload & {
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
export type ScheduledOnDeviceAccessCodeEvent =
  DetailedAccessCodeEvent<"access_code.scheduled_on_device">
export type SetOnDeviceAccessCodeEvent =
  DetailedAccessCodeEvent<"access_code.set_on_device">
export type RemovedFromDeviceAccessCodeEvent =
  CommonAccessCodeEvent<"access_code.removed_from_device">
export type DelayInSettingOnDeviceAccessCodeEvent =
  CommonAccessCodeEvent<"access_code.delay_in_setting_on_device">
export type FailedToSetOnDeviceAccessCodeEvent =
  CommonAccessCodeEvent<"access_code.failed_to_set_on_device">
export type DeletedAccessCodeEvent =
  CommonAccessCodeEvent<"access_code.deleted">
export type DelayInRemovingFromDeviceAccessCodeEvent =
  CommonAccessCodeEvent<"access_code.delay_in_removing_from_device">
export type FailedToRemoveFromDeviceAccessCodeEvent =
  CommonAccessCodeEvent<"access_code.failed_to_remove_from_device">

export type BackupAccessCodePulledEvent = CommonAccessCodeEvent<
  "access_code.backup_access_code_pulled",
  {
    backup_access_code_id: string
  }
>

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
  "noise_sensor.noise_threshold_triggered",
  {
    noiseaware_metadata?: Record<string, unknown>
    minut_metadata?: Record<string, unknown>
  }
>

// Locks
export type LockMethod = "keycode" | "manual" | "unknown" | "seamapi"
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
  occurred_at: string
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

export type ConnectedAccountDeleted =
  CommonConnectedAccountEvent<"connected_account.deleted">

export type SeamEvent =
  | DeviceConnectedEvent
  | UnmanagedDeviceConnectedEvent
  | DeviceDisconnectEvent
  | UnmanagedDeviceDisconnectEvent
  | DeviceConvertedToUnmanagedEvent
  | UnmanagedDeviceConvertedToManagedEvent
  | DeviceTamperEvent
  | DeviceLowBatteryEvent
  | DeviceBatteryStatusChanged
  | DeviceRemovedEvent
  | CreateAccessCodeEvent
  | ChangeAccessCodeEvent
  | ScheduledOnDeviceAccessCodeEvent
  | SetOnDeviceAccessCodeEvent
  | RemovedFromDeviceAccessCodeEvent
  | DeletedAccessCodeEvent
  | FailedToRemoveFromDeviceAccessCodeEvent
  | DelayInRemovingFromDeviceAccessCodeEvent
  | FailedToSetOnDeviceAccessCodeEvent
  | DelayInSettingOnDeviceAccessCodeEvent
  | BackupAccessCodePulledEvent
  | ConvertedToManagedAccessCodeEvent
  | FailedToConvertUnmanagedAccessCodeEvent
  | UnmanagedAccessCodeCreatedEvent
  | UnmanagedAccessCodeRemovedEvent
  | NoiseDetectedEvent
  | NoiseThresholdTriggeredEvent
  | ConnectedAccountConnected
  | ConnectedAccountCreated
  | ConnectedAccountDisconnected
  | ConnectedAccountCompletedFirstSync
  | ConnectedAccountDeleted
  | LockLockedEvent
  | LockUnlockedEvent
