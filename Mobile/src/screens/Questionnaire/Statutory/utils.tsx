import { t } from 'i18next'
import { store } from '../../../store'
const singleServiceListData = store.getState()?.home?.singleServiceListData

export const textfieldArray = [
  {
    id: 1,
    title: t('income:AMOUNTS_RECEIVED_FOR_OTHER_EXPENSES'),
    name: 'curExpenses',
    rightName: 'curProExpenses',
    type: 'currency',
  },
  {
    id: 2,
    title: t('income:AMOUNT_RECEIVED_FOR_MEAL'),
    name: 'curMeals',
    rightName: 'curProMeals',
    type: 'currency',
  },
]


export const statutoryHeading = [
  {
    id: 1,
    title: t('income:REIMBURSED_EXPENSES'),
    name: 'titlecenter',
    rightName: 'titleright',
    centerHeading: singleServiceListData?.taxYear,
    rightHeading:t('income:PRIOR_YEAR')
  },
]