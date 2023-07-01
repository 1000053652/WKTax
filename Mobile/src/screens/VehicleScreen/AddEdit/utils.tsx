import { t } from 'i18next'
import value from '*.png'
export const dateFormat = 'MM/DD/YYYY'

export const questionArray = [
  { title: t('vehicle:VEHICLE_Q1'), name: 'Do you have evidence' },
  { title: t('vehicle:VEHICLE_Q2'), name: 'Another vehicle available' },
  {
    title: t('vehicle:VEHICLE_Q3'),
    name: 'Employer-provided vehicle available',
  },
]

export const textfieldArray = [
  {
    id: 1,
    title: t('vehicle:VEHICLE_TEXT_FIELD_TITLE'),
    name: 'Total Miles',
    rightName: 'Total Miles - P',
    max: 8,
    type: 'number',
  },
  {
    id: 2,
    title: t('vehicle:VEHICLE_TEXT_FIELD_TITLE1'),
    name: 'Total Business Miles',
    rightName: 'Total Business Miles - P',
    max: 8,
    type: 'number',
  },
  {
    id: 3,
    title: t('vehicle:VEHICLE_TEXT_FIELD_TITLE2'),
    name: 'Total Commuting Miles',
    rightName: 'Total Commuting Miles - P',
    max: 8,
    type: 'number',
  },
  {
    id: 4,
    title: t('vehicle:VEHICLE_TEXT_FIELD_TITLE3'),
    name: 'Gasoline and oil',
    rightName: 'Gasoline and oil - P',
    max: 14,
    type: 'currency',
  },
  {
    id: 5,
    title: t('vehicle:VEHICLE_TEXT_FIELD_TITLE4'),
    name: 'Repairs',
    rightName: 'Repairs - P',
    max: 14,
    type: 'currency',
  },
  {
    id: 6,
    title: t('vehicle:VEHICLE_TEXT_FIELD_TITLE5'),
    name: 'Insurance',
    rightName: 'Insurance - P',
    max: 14,
    type: 'currency',
  },
  {
    id: 7,
    title: t('vehicle:VEHICLE_TEXT_FIELD_TITLE6'),
    name: 'Interest',
    rightName: 'Interest - P',
    max: 14,
    type: 'currency',
  },
  {
    id: 8,
    title: t('vehicle:VEHICLE_TEXT_FIELD_TITLE7'),
    name: 'Taxes',
    rightName: 'Taxes - P',
    max: 14,
    type: 'currency',
  },
  {
    id: 9,
    title: t('vehicle:VEHICLE_TEXT_FIELD_TITLE8'),
    name: 'Vehicle rentals or leases',
    rightName: 'Vehicle rentals or leases - P',
    max: 14,
    type: 'currency',
  },
]

export const removeChar = (value: string, regexp: any = /[$,]/gm) => {
  if (value && value?.length > 0) {
    return value.replace(/[$,]/g, '')
  }
  return ''
}

export const replaceZeroAfterDecimal = (value: string) => {
  if (value && value?.length > 0 ) {
    return  parseInt(value)>0? `${parseInt(value)}` : ''
  }
  return value
}
