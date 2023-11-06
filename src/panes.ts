import { Except } from "type-fest"
import { AnyField } from "./fields"
import { TwoFactorOptionWithId } from "./two-factor-options"

export type WebviewFlowErrorCode =
  | UnexpectedWebviewFlowErrorCode
  | UserInputWebviewFlowErrorCode
  | LoginWebviewFlowErrorCode

export type UnexpectedWebviewFlowErrorCode = "ERROR"

export type UserInputWebviewFlowErrorCode =
  | "INVALID_MASTER_CODE"
  | "INVALID_PHONE_NUMBER"

export type LoginWebviewFlowErrorCode =
  | "BAD_CREDENTIALS"
  | "TWO_FACTOR_REQUIRED"
  | "TWO_FACTOR_BAD_CODE"

export type ProviderMetadata = {
  display_name: string
  image_url: string
  primary_color?: string
  secondary_color?: string
}

type Pane<
  Name extends string,
  PaneRenderProps extends Record<string, unknown>,
  PaneSubmitProps extends Record<string, unknown>
> = {
  name: Name
  render_props: PaneRenderProps & {
    error_msg?: string
    notice_msg?: string
    error_code?: WebviewFlowErrorCode
    scheduling_link?: string
  }
  submit_props: PaneSubmitProps
  /* Timestamp last time pane was changed in ISO8601 format */
  last_updated_at: string
}

export type LoadingPane = Pane<
  "loading",
  {
    message: string
  },
  {}
>

export type RedirectPane = Pane<
  "redirect_pane",
  {
    redirect_url: string
    pre_redirect_acknowledgement?: boolean
    context?: "smartthings_auth"
    redirect_target_disallows_embedding?: boolean
    provider?: ProviderMetadata
  },
  {
    callback_args?: Record<string, string>
    alternative_action?: string
  }
>

export type SearchAndSelectPane = Pane<
  "search_and_select_pane",
  {
    title: string
    description?: string
    options: Array<{
      label: string
      sublabel?: string
      value: string
      image_url?: string
    }>
    selection_mode?: "none" | "single" | "multiple"
    context?: "device" | "smartthings_auth"
    manufacturer_name?: string
    provider?: ProviderMetadata
  },
  { value: string | string[] }
>

export type BrandSelectPane = Pane<
  "brand_select_pane",
  {
    options: Array<{
      label: string
      sublabel?: string
      value: string
      image_url: string
    }>
  },
  {
    brand: string
  }
>

export type LoginPane = Pane<
  "login_pane",
  {
    accepted_user_identifiers: Array<"email" | "phone" | "username">
    /** @deprecated - use a more specific property than context for dynamic rendering logic */
    context?: "smartthings_pre_auth"
    credential?: "password" | "api_key"
    default_user_identifier?: string
    provider: ProviderMetadata
  },
  { user_identifier: string; password?: string; api_key?: string }
>

export type InitiateTwoFactorPane = Pane<
  "initiate_two_factor_pane",
  {
    options: TwoFactorOptionWithId[]
    provider: ProviderMetadata
  },
  {
    id: TwoFactorOptionWithId["id"]
  }
>

export type TwoFactorPane = Pane<
  "two_factor_pane",
  {
    code_length: number
    provider: ProviderMetadata
  },
  { code: string }
>

export type FieldsPane = Pane<
  "fields_pane",
  {
    fields: AnyField["props"][]
    context?: "brivo_auth"
    submit_label?: string
    header: {
      title: string
      provider?: ProviderMetadata
      description?: string
    }
  },
  Record<string, AnyField["input"]>
>

export interface SmartThingsLocation {
  id: string
  name: string
}

export type FinishedPane = Pane<
  "finished_pane",
  {
    custom_redirect_url?: string
    is_final?: boolean
    context?: {
      nuki_smart_hosting?: {
        connected_devices_count: number
        not_connected_devices_count: number
        nuki_smart_hosting_url: string
      }
      smartthings_auth?: {
        locations: SmartThingsLocation[]
        oauth_redirect?: string
      }
      igloodeveloper_auth?: {
        igloo_webhook_url: string
      }
    }
    shared_devices_from_other_accounts?: {
      name: string
      image_url: string
      display_name: string
    }[]
    total_device_count?: number
    was_account_reconnected?: boolean
  },
  {
    finalize?: boolean
  }
>

export type AnyPane =
  | LoadingPane
  | RedirectPane
  | SearchAndSelectPane
  | BrandSelectPane
  | LoginPane
  | InitiateTwoFactorPane
  | TwoFactorPane
  | FieldsPane
  | FinishedPane

export type AnyPaneWithoutSubmitProps = Except<AnyPane, "submit_props">
