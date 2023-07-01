export type UserDataResponse = {
  initials: string
  fullName: string
  isLoggedIn: true
  firstName: string
  lastName: string
  clientUserStatus: number
  signerTypeIntId: number
}

export type ClientViewStatusResponse = {
  response: boolean
}

export type UserHomeResponse = {
  hasViewedTasks: boolean
  isReturnExist: boolean
  requestStatus: number
}

export type RequestListResponse = {
  tenantId: number
  clientGuid: string
  userGuid: string
  clientDisplayName: string
  taxYear: number
  requestGuid: string
  clientServiceTypeIntId: number
  clientType: number
  serviceType: number
  isDefaultRequest: boolean
  isSelectedRequest: boolean
  userStatus: number
  reopenComment: string | null
  reopenStatus: number
  activeModuleTypes: number
  clientCollabToken: string | null
  isBilled: boolean
  canDisplayReopenMessage: boolean
  isReturnExist: boolean
  requestProgress: string
  clientServiceTypeWithYearStr: string
}
export type FirmDetailsResponse = {
  name: string
  address: {}
  phone: {}
  webPageUrl: string
  email: string
}

export type ClickServiceListResponse = {
  clientCollaborationTokenString: string
}

export type userBillResponse = {
  statusCode: string
  errorMessages: []
  hasError: boolean
}
