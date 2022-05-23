export type Field<Type extends string, Props, Input> = {
  name: string
  type: Type
  props: {
    label: string
    is_required: boolean
  } & Props
  input: Input
}

export type TextField = Field<
  "text",
  {
    placeholder: string
    regex?: string
    type?: "text" | "password" | "email" | "number" | "tel" | "url"
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

export type AnyField = TextField | SelectionField
