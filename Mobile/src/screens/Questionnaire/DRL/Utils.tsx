import { t } from 'i18next'
import { imageConstant } from '../../../theme/Images'
import { FilePickerTypes } from '../../../types/commonTypes'
export interface FilePickerTypesData {
  id: number
  icon: any
  title: string
  type: FilePickerTypes
}
export const addNewDocumentListData: [FilePickerTypesData] = [
  {
    id: 0,
    icon: imageConstant.camera,
    title: t('common:SCAN_DOCUMENT'),
    type: FilePickerTypes.Camera,
  },
  {
    id: 1,
    icon: imageConstant.photoGallary,
    title: t('common:CAMERA_ROLL'),
    type: FilePickerTypes.PhotoLibrary,
  },
  {
    id: 2,
    icon: imageConstant.upload,
    title: t('common:UPLOAD'),
    type: FilePickerTypes.Upload,
  },
]
export enum DRLLineItemStatus {
  AttachedAbove,
  PreviouslySent,
  NoneThisYear,
  NoLongerApplicable,
  FirmHasOnFile,
  ReplyWithAmount,
}
export type QuickNotesDRLStatusDataType = {
  statusCode: number
  title: string
  type: DRLLineItemStatus
}
export const quickNotesDRLStatusData: [QuickNotesDRLStatusDataType] = [
  {
    statusCode: 2,
    title: t('questionnaire:PREVIOUSLY_SENT'),
    type: DRLLineItemStatus.PreviouslySent,
  },
  {
    statusCode: 3,
    title: t('questionnaire:NONE_THIS_YEAR'),
    type: DRLLineItemStatus.NoneThisYear,
  },
  {
    statusCode: 4,
    title: t('questionnaire:NO_LONER_APPLICABLE'),
    type: DRLLineItemStatus.NoLongerApplicable,
  },
  {
    statusCode: 5,
    title: t('questionnaire:FIRM_HAS_ON_FILE'),
    type: DRLLineItemStatus.FirmHasOnFile,
  },
  {
    statusCode: 6,
    title: t('questionnaire:REPLY_WITH_AMOUNT'),
    type: DRLLineItemStatus.ReplyWithAmount,
  },
  {
    statusCode: 1,
    title: t('questionnaire:ATTACH_ABOVE_BELOW'),
    type: DRLLineItemStatus.AttachedAbove,
  },
]
export type AttachmentMenuData = {
  id: number
  title: string
}
export const attachmentStatusData: [AttachmentMenuData] = [
  {
    id: 0,
    title: t('common:DOWNLOAD'),
  },
  {
    id: 1,
    title: t('common:DELETE'),
  },
]
export type AddAdditionalMenuData = {
  id: number
  title: string
}
export const addAdditionalDocumentData: [AddAdditionalMenuData] = [
  {
    id: 0,
    title: t('questionnaire:ADD_ADDITIONAL_FILE'),
  },
]
export function getCommaSeparatedTwoDecimalsNumber(number: string) {
  const fixedNumber = Number.parseFloat(number).toFixed(2)
  return String(fixedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
