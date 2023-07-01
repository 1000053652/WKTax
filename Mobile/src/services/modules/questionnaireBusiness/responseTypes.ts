export type DeletQuestionnaireType = {
  endPoint: string
  data: {}
  headers: string
}
export type IndividualTileResponse = {
  requestid: string
  payloadtype: string
  payload: object
}
export type BusinessGeneralResponse = {
  requestid: string
  payloadtype: string
  payload: string
  error: string | null
}
export type BusinessGeneralData = {
  txtBusinessName: string
  cmbStatus: string
  txtProfession: string
  cmbTSJ: string
  idnEmployer: string
  txtAddress: string
  txtCity: string
  cmbState: string
  txtZIP: string
  datDispose: string
  yno1099: string
  curHealthIns: string
  chkAttachDoc: string
  txtMoreInfo: string
  txtFrgnPostalInfo: string
  isDirty: string
  code: string
  entityid: string
}
export type FarmGeneralData = {
  txtCrop: string
  cmbTSJ: string
  idnEmpNumber: string
  cmbStatus: string
  datDispose: string
  yno1099: string
  curHealthIns: string
  txtNotes: string
  chkAttach: string
  isDirty: string
  code: string
  entityid: string
}
export type RentalRoyaltyData = {
  txtPropAddr: string
  datSold: string
  txtPropCity: string
  txtPropState: string
  txtPropZip: string
  txtFrgnInfo: string
  cmbStatus: string
  cmbTSJ: string
  txtPropType: string
  yno1099: string
  pctBusiness: string
  pctProBusiness: string
  txtNotes: string
  chkAttach: string
  numDaysOwned: string
  numProDaysOwned: string
  numRentFMV: string
  numProRentFMV: string
  numPropPersonal: string
  numProPropPersonal: string
  curMortInt: string
  curProMortInt: string
  curRETaxes: string
  curProRETaxes: string
  isDirty: string
  code: string
  entityid: string
}
export type DRLCategoriesResponse = {
  category: string
  order: number

  subTitle: string
  expanded: boolean
  lineItems: [DRLListResponse]
}
export type DRLListResponse = {
  category: string
  description: string
  fileCount: number
  requestListId: number
  status: number
  completed: boolean
  amount: number
  questionId: number
  isFromFirm: boolean
  hasAnyFirmAttachments: boolean

  expanded: boolean
  attachments: [DRLAttachmentsResponse]
}
export type DRLAttachmentsResponse = {
  fileName: string
  fileId: number
  isFromFirm: boolean
}
export type DRLValidateDocResponse = {
  value: {
    fileList: [DRLValidateDocFileList]
    fileGuid: string
  }
}
export type DRLValidateDocFileList = {
  url: string
  uploadId: null
  fileGuid: string
  hasError: false
  errorMessage: null
  errorCode: null
  fileName: string
  fileSize: number
}
export type DRLAttachmentDownloadDetailsResponse = {
  requestGuid: string
  fileGuid: string
  fileName: string
  fileUrl: string
  fileStatus: number
  moduleGuid: string
}

export type getQuestionnaireBusinessTileStatusResponse = {
  id: number
  tenantId: number
  returnId: string
  tileId: number
  complete: boolean
  enabled: boolean
}

export type GiftData = {
  txtName: string
  txtAddress: string
  txtRelationship: string
  txtGiftPurpose: string
  curValue: string
  txtNotes: string
  datDateGift: string
  chkIndividual: string
  chkTrust: string
}

export type ForgivenData = {
  txtName: string
  txtAddress: string
  txtRelationship: string
  txtGiftPurpose: string
  curValue: string
  txtNotes: string
  datDateGift: string
  chkIndividual: string
  chkTrust: string
  chkEntity: string
}
