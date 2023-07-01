import { t } from 'i18next'
export const pageCode = 6006
export const dropdownData = [
  { value: '', label: '0', status: 't' },
  { value: t('fillingdetails:UNMARRIED'), label: '1', status: 'U' },
  { value: t('fillingdetails:LEGALLY-MARRIED'), label: '2', status: 'L' },
  { value: t('fillingdetails:DOMESTIC-PARTNERSHIP'), label: '3', status: 'D' },
  { value: t('fillingdetails:CIVIL-UNION'), label: '4', status: 'C' },
  { value: t('fillingdetails:RELATIONSHIP'), label: '5', status: 'O' },
]

export type listType = {
  entityID: number
  description: string
  fieldValue: string
  processedFieldValue: string
  isProforma: boolean
}

export type fillingDetailDataType = {
  cmbAccountType: string
  cmbTSJ: string
  txtAccountNo_X: string
  txtName: string
  txtRoutingNo: number
  ynoBussAcct: boolean
  ynoDirDeposit: boolean
  ynoPayEstimate: boolean
  ynoPayReturn: boolean
}

export type filling = {
  cmbMarriedStatus: string
  numSPPin: string
  numTPPin: string
  ynoCheck: string
  ynoIDTheft: string
}

export const convertStringToNumber = (text: string) => {
  if (isNaN(Number(text))) {
    return 0
  }
  return Number(text)
}

export const marriedStatusMapping = (status: string) => {
  switch (status) {
    case 'U':
      return dropdownData[1].value
    case 'L':
      return dropdownData[2].value
    case 'D':
      return dropdownData[3].value
    case 'C':
      return dropdownData[4].value
    case 'O':
      return dropdownData[5].value
    default:
      return dropdownData[0].value
  }
}
