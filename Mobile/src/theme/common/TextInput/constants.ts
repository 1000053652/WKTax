import { required, zipCodeLength } from './utils'

export const commonValidators = {
  required: (val: string) =>
    required(val) ? undefined : 'This field is required.',
  zipCodeLength: (min: number) => (val: string) =>
    zipCodeLength(min, val)
      ? undefined
      : `Minimum of ${min} characters required.`,
  password: (val: string) =>
    required(val) && val.length >= 6 && val.length <= 20
      ? undefined
      : 'Please enter a password between 6-20 characters.',
  checkIsNullEmptyUndefined: (val: string) =>
    !val || val === 'null' || val === undefined || val === null,
}
export const validationRules = {
  required: (errorMessage: string) => ({
    required: {
      value: true,
      message: errorMessage || 'Required for registration.',
    },
  }),
}
