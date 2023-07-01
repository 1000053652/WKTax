import { t } from 'i18next'

export const dropdownData = [
  { value: '', label: '0', status: '0' },
  { value: t('homeOffice:no_longer_applicable'), label: '1', status: '1' },
  { value: t('homeOffice:none_his_year'), label: '2', status: '2' },
  { value: t('homeOffice:Actively_using'), label: '3', status: '3' },
]

export type autoDataType = {
  txtDescription: string
  txtStatus: string
  txtSquarefootage: string
  txtTotalSquarefootage: string
  txtTotalHours: string
  ynoDayCare: string
  ynoImprovment: string
}
export const autoFillInitialValue: autoDataType = {
  txtDescription: '',
  txtStatus: '',
  txtSquarefootage: '',
  txtTotalSquarefootage: '',
  txtTotalHours: '',
  ynoDayCare: '',
  ynoImprovment: '',
}
