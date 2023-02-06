import type { ValidationsDic } from '~/composables/dicValidator'
import { isEmail, isMaxLength, isMinLength } from '~/composables/dicValidator/rules'

export interface TestForm {
  name: string
  email: string
  password: string
}

export const validationsDic: ValidationsDic<TestForm> = {
  name: [
    (value: string) => isMinLength(value, 1),
    (value: string) => isMaxLength(value, 20),
  ],
  email: [
    (value: string) => isEmail(value),
    (value: string) => isMinLength(value, 5),
    (value: string) => isMaxLength(value, 15),
  ],
  password: [
    (value: string) => isMinLength(value, 5),
    (value: string) => isMaxLength(value, 10),
  ],
}
