import { t } from 'i18next'
export const pageCode = 6007
export const accountTypeDropdownData = [
  { value: ' ', label: '0', status: 'B' },
  { value: t('electronicFunds:CHECKING'), label: '1', status: 'C' },
  { value: t('electronicFunds:SAVINGS'), label: '2', status: 'T' },
]

export const questionariesList = [
  {
    title: t('electronicFunds:FOREIGN'),
    status: 0,
    id: 1,
  },
  {
    title: t('electronicFunds:REFUNDS'),
    status: 0,
    id: 2,
  },
  {
    title: t('electronicFunds:TAX_RETURNS'),
    status: 0,
    id: 3,
  },
  {
    title: t('electronicFunds:TAX_PAYMENTS'),
    status: 0,
    id: 4,
  },
]

export type autoDataType = {
  accountNumber: string
  accountType: string
  amountDue: string
  bankId: string
  entityId: string
  foreignAccount: string
  funds: string
  name: string
  payments: string
  routingNumber: string
}
export const autoFillInitialValue: autoDataType = {
  accountNumber: '',
  accountType: '',
  amountDue: '',
  bankId: '',
  entityId: '',
  foreignAccount: '',
  funds: '',
  name: '',
  payments: '',
  routingNumber: '',
}
