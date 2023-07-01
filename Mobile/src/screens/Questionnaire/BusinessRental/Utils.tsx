import { t } from 'i18next'
import { BusinessEntities } from '../../../../src/store/business/types'

export enum BusinessRentalFarmType {
  Business,
  Rental,
  Farm,
  Federal,
  State,
  City,
  BFederal,
  BState,
  BCity,
}
export interface BusinessListingProps {
  type: BusinessRentalFarmType
  listingData: Array<BusinessEntities>
  deleteRow: (id: string) => void
  onClickRow: (id: string) => void
  onAddClick: (type: BusinessRentalFarmType) => void
  isForBusiness?: boolean | false
}

export const infoTypeBusinessListingKeyValue: Array<{
  id: string
  title: string
}> = [
  { id: '0', title: t('businessRental:General') },
  { id: '1', title: t('businessRental:income_b') },
  { id: '2', title: t('businessRental:Expenses') },
  { id: '3', title: t('businessRental:Assets') },
  { id: '4', title: t('businessRental:Vehicles') },
  { id: '5', title: t('businessRental:Home_Office') },
  { id: '6', title: t('businessRental:Statutory_Empl_Expenses') },
]

export const infoTypeRentalFarmListingKeyValue: Array<{
  id: string
  title: string
}> = [
  { id: '0', title: t('businessRental:General') },
  { id: '1', title: t('businessRental:income') },
  { id: '2', title: t('businessRental:Expenses') },
  { id: '3', title: t('businessRental:Assets') },
  { id: '4', title: t('businessRental:Vehicles') },
  { id: '5', title: t('businessRental:Home_Office') },
]
