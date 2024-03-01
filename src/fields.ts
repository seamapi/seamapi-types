export type Field<Type extends string, Props, Input> = {
  props: {
    label: string
    is_required: boolean
    name: string
    type: Type
    is_disabled?: boolean
    is_read_only?: boolean
    help_link?: string
    help_text?: string
  } & Props
  input: Input
}

export type TextField = Field<
  "text",
  {
    placeholder: string
    regex?: string
    default_value?: string
    text_type?: "text" | "password" | "email" | "number" | "tel" | "url"
  },
  string
>

export type TextAreaField = Field<
  "textarea",
  {
    placeholder: string
    regex?: string
    default_value?: string
  },
  string
>

declare type RadioControlTextField = Field<
  "radio-control-text",
  {
    options: [TextField["props"], TextField["props"]]
  },
  string
>

export type SelectionField = Field<
  "selection",
  {
    options: Array<{
      label: string
      value: string
    }>
  },
  string
>

export type AnyField =
  | TextField
  | SelectionField
  | TextAreaField
  | RadioControlTextField
