export type ErrorMessage = {
  propertyName: string | null
  message: string
  state: string | null
  type: number
  additionalErrorInfo: string | null
}
export type CommonErrorResponse = {
  errorMessages: [ErrorMessage]
  supportCode: null
}
