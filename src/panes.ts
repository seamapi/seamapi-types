import { Except } from "type-fest"
import { TwoFactorOptionWithId } from "./two-factor-options"

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
  render_props: PaneRenderProps & { error_msg?: string }
  submit_props: PaneSubmitProps
}

export type SearchAndSelectPane = Pane<
  "search_and_select_pane",
  {
    title: string
    options: Array<{
      label: string
      value: string
      image_url?: string
    }>
  },
  { value: string }
>

export type LoginPane = Pane<
  "login_pane",
  {
    accepted_user_identifiers: Array<"email" | "phone">
    provider: ProviderMetadata
  },
  { user_identifier: string; password: string }
>

export type InitiateTwoFactorPane = Pane<
  "initiate_two_factor_pane",
  {
    options: TwoFactorOptionWithId[]
  },
  {
    id: TwoFactorOptionWithId["id"]
  }
>

export type TwoFactorPane = Pane<
  "two_factor_pane",
  { code_length: number },
  { code: string }
>

export type FinishedPane = Pane<"finished_pane", {}, {}>

export type AnyPane =
  | SearchAndSelectPane
  | LoginPane
  | InitiateTwoFactorPane
  | TwoFactorPane
  | FinishedPane

export type AnyPaneWithoutSubmitProps = Except<AnyPane, "submit_props">
