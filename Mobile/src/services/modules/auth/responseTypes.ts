export type ValidateFirm = {
  loginUrl: string
  authToken: string
  authorizationToken: string
  refreshTime: number
  success: boolean
  errorMsg: boolean
}

export type FirmNameResponse = {
  firmName: string
}
export type GetTokenResponse = {
  idToken: string
  authorizationToken: string
  authToken: string
  refreshTime: number
  isAuthorized: boolean
  isInternalAccount: boolean
  co_RelationGuid: string
}
export type CommonErrorMessage = {
  propertyName: null
  message: string
  state: null
  type: number
  additionalErrorInfo: null
}
export type CommonErrorResponse = {
  errorMessages: [CommonErrorMessage]
  supportCode: null
}
