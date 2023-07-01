import { t } from 'i18next'

export const utilRentalArray = [
  {
    id: 1,
    title: t('income:RENTAL_INCOME'),
    name: 'curRental',
    rightName: 'curProRental',
    type: 'currency',
  },

  {
    id: 2,
    title: t('income:ROYALTY_INCOME'),
    name: 'curRoyalty',
    rightName: 'curProRoyalty',
    type: 'currency',
  },

  {
    id: 3,
    title: t('income:GROSS_RECEIPTS_OTHER'),
    name: 'curOtherSources',
    rightName: 'curProOtherSources',
    type: 'currency',
  },
]
