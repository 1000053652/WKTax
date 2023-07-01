export type RequestDetailsResponse = {
  engagementDueDate: string
  engagementSignedDate: string
  organizerDueDate: string
  activeModuleTypes: number
  engWorkflowStatus: number
  engLetterStatus: number
  isLoggedInUserSigner: boolean
  hasLoggedInUserSigned: boolean
  isLoggedInUserSignerForTaxReturn: boolean
  requestStatus: number
  engagementModuleEnabled: boolean
  organizerModuleEnabled: boolean
  isClosedByFirm: boolean
  reopenRequestedDate: string
  reopenRequestStatus: number
  requestCompletedMessage: string
  requestCompletedDate: string
  organizerWorkflowStatus: number
  organizerPdfStatus: number
  totalSignatureRequired: number
  totalSigned: number
  taxReturnPackageCreatedDate: string
  isReturnExist: boolean
  hasLoggedInUserSignedTaxReturn: boolean
}
export type StatusByRequestguidResponse = {
  tenantId: number
  requestGuid: string
  returnId: string
  documentRequestListStatus: DocumentRequestListStatus
  questionnaireStatus: QuestionnaireStatus
}
export type DocumentRequestListStatus = {
  requestGuid: string
  timeFilter: string | null
  returnId: number | null
  notCompletedCount: number
  completedCount: number
  anyNewUploads: boolean
  newDocumentCount: number
}
export type QuestionnaireStatus = {
  requestGuid: string
  returnId: string
  notCompletedCount: number
  completedCount: number
}
export type ReturnDetailsAPIResponse = {
  initials: string
  fullName: string
  isLoggedIn: boolean
  firstName: string
  lastName: string
  signerTypeIntId: number
  requestStatus: number
  isAnyIndividualPackageCompleted: boolean
  taxReturnPackageDetails: TaxReturnPackageDetails[]
}
export type TaxReturnPackageDetails = {
  fileGuid: string
  unsignedDocumentGuid: string
  signedDocumentGuid: string
  signedFileName: string
  unsignedFileName: string
  dueDate: string
  signedDate: string
  isSignatureRequired: boolean
  clientGuid: string
  requestGuid: string
  taxReturnPackageWorkflowGuid: string
  individualTaxReturnPackageDetailViewModel: IndividualTaxReturnPackageDetailViewModel
}
export type IndividualTaxReturnPackageDetailViewModel = {
  packageStatus: number
  taxpayerStatus: number
  taxPayerSignatoryModifiedDate: string
  taxPayerFirstName: string
  taxPayerLastName: string
  spouseFirstName: string
  spouseLastName: string
  spouseSignatoryModifiedDate: string
  spouseStatus: number
}
export type ReturnDownloadPackageResponse = {
  fileDownloadUrl: string
  isSuccessful: boolean
  errorCode: string
  errorDescription: string
  fileName: string
}
export type ValidateSignedReturnResponse = {
  fileGuid: string
  fileName: boolean
  url: string
  hasError: boolean
  errorMessage: string
  errorCode: number
}
