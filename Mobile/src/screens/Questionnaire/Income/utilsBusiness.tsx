import { t } from 'i18next'
import { store } from '../../../store'
const singleServiceListData = store.getState()?.home?.singleServiceListData

export const utilBusinessArray = [
  {
    id: 1,
    title: t('income:GROSS_RECEIPTS'),
    name: 'curSales',
    rightName: 'curProSales',
    type: 'currency',
  },
]

export const utilBusinessArrayLess = [
  {
    id: 1,
    title: t('income:LESS_RETURN_AND_ALLOWANCES'),
    name: 'curReturns',
    rightName: 'curProReturns',
    type: 'currency',
  },
]

export const utilBusinessArrayBegAll = [
  {
    id: 1,
    title: t('income:BEGINNING_INVENTORY'),
    name: 'curBegInv',
    rightName: 'curProBegInv',
    type: 'currency',
  },

  {
    id: 2,
    title: t('income:PURCHASES_LESS'),
    name: 'curPurchases',
    rightName: 'curProPurchases',
    type: 'currency',
  },

  {
    id: 3,
    title: t('income:COST_OF_LABOR'),
    name: 'curLabor',
    rightName: 'curProLabor',
    type: 'currency',
  },

  {
    id: 4,
    title: t('income:MATERIALS_OR_SUPLIES'),
    name: 'curMaterials',
    rightName: 'curProMaterials',
    type: 'currency',
  },

  {
    id: 5,
    title: t('income:ENDING_INVENTORY'),
    name: 'curEndInv',
    rightName: 'curProEndInv',
    type: 'currency',
  },
]

export const incomeHeading = [
  {
    id: 1,
    title: t('income:INCOME'),
    name: 'titlecenter',
    rightName: 'titleright',
    centerHeading: singleServiceListData?.taxYear,
    rightHeading: t('income:PRIOR_YEAR'),
  },
]

export const costOfGoldHeading = [
  {
    id: 1,
    title: t('income:COST_OF_GOODS_SOLD'),
    name: 'titlecenter',
    rightName: 'titleright',
    centerHeading: singleServiceListData?.taxYear,
    rightHeading: t('income:PRIOR_YEAR'),
  },
]

export const expensesdHeading = [
  {
    id: 1,
    title: t('expenses:EXPENSES'),
    name: 'titlecenter',
    rightName: 'titleright',
    centerHeading: singleServiceListData?.taxYear,
    rightHeading: t('income:PRIOR_YEAR'),
  },
]
