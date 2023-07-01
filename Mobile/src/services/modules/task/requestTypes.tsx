export type ReturnDownloadPackage = {
  workflowGuid?: string
  fileGuid?: string
}
export type ValidateSignedReturnRequest = {
  clientGuid: string
  fileName: string
  fileSize: number
  fileGuid: string
  taxReturnPackageWorkflowGuid: string
  fileStatus?: number
}
