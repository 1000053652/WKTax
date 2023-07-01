import { fillingDetailDataType } from '../utils'
import { t } from 'i18next'
export const pageCode = 6007
export const accountTypeDropdownData = [
  { value: '', label: '7', status: 't' },
  { value: t('fillingdetails:CHECKING'), label: '1', status: 'C' },
  { value: t('fillingdetails:TRADITIONAL-SAVING'), label: '2', status: 'T' },
  { value: t('fillingdetails:IRA-SAVING'), label: '3', status: 'I' },
  { value: t('fillingdetails:HSA-SAVING'), label: '4', status: 'H' },
  { value: t('fillingdetails:MSA-SAVING'), label: '5', status: 'M' },
  { value: t('fillingdetails:ED-SAVING'), label: '6', status: 'E' },
]
export const accountOwnerDropdownData = [
  { value: '', label: '1', status: '' },
  { value: t('fillingdetails:TAXPAYER'), label: '2', status: 'T' },
  { value: t('fillingdetails:SPOUSE'), label: '3', status: 'S' },
  { value: t('fillingdetails:JOINT'), label: '4', status: 'J' },
]

export const questionariesList = [
  {
    title: t('fillingdetails:BUSINESS-ACCOUNT'),
    status: 0,
    id: 1,
  },
  {
    title: t('fillingdetails:DEPOSIT-REFUNDS'),
    status: 0,
    id: 2,
  },
  {
    title: t('fillingdetails:TAX-RETURNS'),
    status: 0,
    id: 3,
  },
  {
    title: t('fillingdetails:PAY-ESTIMATED'),
    status: 0,
    id: 4,
  },
]

interface postDataType {
  cmbAccountType: string
  cmbTSJ: string //Account owner
  txtAccountNo_X: string //Account number
  txtName: string //Bank Name
  txtRoutingNo: string //Routing transit number
  ynoBussAcct: string //Is this a business account?
  ynoDirDeposit: string //Deposit refunds
  ynoPayEstimate: string //Pay amounts due with your tax returns
  ynoPayReturn: string //Pay estimated payments
  code: number
  entityid: string
  isDirty: boolean
}
export type autoDataType = {
  cmbAccountType: string
  cmbTSJ: string
  txtAccountNo_X: string
  txtName: string
  txtRoutingNo: string
  ynoBussAcct: string
  ynoDirDeposit: string
  ynoPayEstimate: string
  ynoPayReturn: string
}
export const autoFillInitialValue: autoDataType = {
  cmbAccountType: '',
  cmbTSJ: '',
  txtAccountNo_X: '',
  txtName: '',
  txtRoutingNo: '',
  ynoBussAcct: '',
  ynoDirDeposit: '',
  ynoPayEstimate: '',
  ynoPayReturn: '',
}
export const getAccountTypeDisplay = (value: string) => {
  const x = accountTypeDropdownData.filter(val => val?.label == value)
  return x[0]?.value
}
