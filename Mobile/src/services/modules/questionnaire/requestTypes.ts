export type IndividualTileRequest = {
  pageCode: string
  gridCode: string
  entityID: string
}
export type DRLValidateDocRequest = {
  RequestListId?: number
  FileLength: number
  FileName: string
  isUncategorized?: boolean
}
export type DRLUploadDocRequest = {
  File: string
}
export type DRLAttachDocRequest = {
  requestListId: number
  FileName: string
  FileGuid: string
  FileSize: number
  isUncategorized?: boolean
}
export type DRLAttachmentDeleteRequest = {
  requestListId: number
  attachemtId: number
}
export type DRLDownloadAttachmentRequest = {
  clientGuid?: string
  requestGuid: string
  fileId: number
}

export type BusinessHomeQuestionnaire = {
  payLoad?: string
  endPoitns: string
}
