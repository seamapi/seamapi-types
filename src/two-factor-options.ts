interface BaseTwoFactorOption<Method extends string> {
  method: Method
  code_length: number
}

type TwoFactorSMSOption = BaseTwoFactorOption<"sms"> & {
  phone_number: string
}

type TwoFactorOTPOption = BaseTwoFactorOption<"otp">

type TwoFactorEmailOption = BaseTwoFactorOption<"email"> & {
  email_address: string
}

export type TwoFactorOption =
  | TwoFactorSMSOption
  | TwoFactorOTPOption
  | TwoFactorEmailOption

export type TwoFactorOptionWithId = TwoFactorOption & {
  id: string
}
