export type BusinessHomeStatus = {
  payload: string | ''
  businessHomeData: BusinessHomeData | null
  businessEntities: Array<PageListItems> | null
  rentalEntities: Array<PageListItems> | null
  farmEntities: Array<PageListItems> | null
  businessItemDetails: BusinessItemDetails | null
  rentItemDetails: BusinessItemDetails | null
  farmItemDetails: BusinessItemDetails | null
  businessYNo: string | ''
}
export type BusinessItemDetails = {
  payload: string | null
}
export type BusinessHomeData = {
  NavBusiness: string | null
  NavBusinessComplete: string | null
  NavBusinessDescription: string | null
  code: string | null
}

export type BusinessEntities = {
  entityID: string | ''
  description: string | ''
  fieldValue: string | ''
  processedFieldValue: string | ''
  isProforma: boolean | false
}

export type BusinessEntityHelper = {
  entityPageID: string | ''
  pageCode: string | ''
  hasEntity: boolean | false
  entityID: string | ''
}

export type PageListItems = {
  Entities: Array<BusinessEntities> | null
  EntityHelper: BusinessEntityHelper | null
}
