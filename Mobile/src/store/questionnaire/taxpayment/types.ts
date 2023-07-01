import { BusinessEntityHelper } from '../../business/types'

export type TaxPaymentHomeStatus = {
  payload: string | ''
  taxPaymentHomeData: BusinessHomeData | null
  federalEntities: Array<PageListItems> | null
  stateEntities: Array<PageListItems> | null
  cityEntities: Array<PageListItems> | null
  federalItemDetails: BusinessItemDetails | null
  stateItemDetails: BusinessItemDetails | null
  cityItemDetails: BusinessItemDetails | null
  taxPaymentNo: string | ''
}

export type TaxPaymentBusinessItemsList =
  Array<TaxPaymentBusinessItemDetails> | null

export type TaxPaymentBusinessItemDetails = {
  paymentId: string | null
  groupName: string | null
  makePayments: string | null
  stateCode: string | null
  stateName: string | null
  districtName: string | null
  paymentAmount: string | '0'
  paymentDate: string | null
  paymentType: string | null
  overpayment: string | null
  extension: string | null
}
export type BusinessItemDetails = {
  payload: string | '{}'
}
export type DefaultServerData = {
  data: ServerData | null
}
export type ServerData = {
  datFedPaymentDate: string | ''
  curPaymentAmount: string | ''
  chkOverPayment: string | ''
  chkPayExt: string | ''
  txtState: string | ''
  datStatePaymentDate: string | ''
  curStatePaymentAmount: string | ''
  chkStateOverPayment: string | ''
  chkStatePayExt: string | ''
  datCityPaymentDate: string | ''
  curCityPaymentAmount: string | ''
  chkCityOverPayment: string | ''
  chkCityPayExt: string | ''
}
export type BusinessHomeData = {
  NavTaxpayment: string | null
  NavTaxpaymentComplete: string | null
  NavTaxpaymentDescription: string | null
  code: string | null
}

export type TaxPayerBusinessHomeData = {
  tileId: string | null
  complete: boolean | false
  enabled: boolean | false
}
export type BusinessEntities = {
  entityID: string | ''
  description: string | ''
  fieldValue: string | ''
  processedFieldValue: string | ''
  isProforma: boolean | false
}

export type TaxPaymentEntityHelper = {
  entityPageID: string | ''
  pageCode: string | ''
  hasEntity: boolean | false
  entityID: string | ''
}

export type PageListItems = {
  Entities: Array<BusinessEntities> | null
  EntityHelper: BusinessEntityHelper | null
}
