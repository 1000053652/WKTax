export type AboutYouState = {
  taxPayer: TaxPayerYouModel | null
  spouseTaxPayer: TaxPayerYouModel | null
  address: AddressModel | null
  qAndA: Array<QAndAModel> | null
  ynoCheck: isAboutYouComplited | null
  aboutYouBusinessInfoHome: AboutYouBusinessInfoHome | null
  aboutYouUpdateNodeEntity: AboutYouUpdateNodeEntity | null
  aboutYouPrimaryContactEntity: AboutYouPrimaryContactEntity | null
  aboutYouAddressEntity: AboutYouAddressEntity | null
  aboutYouBusinessEntity: AboutYouBusinessEntity | null
}

export type TaxPayerYouModel = {
  id: string | 0
  title: string | ''
  txtTPWorkPH: string | ''
  txtTPEveningPH: string | ''
  txtTPCellPH: string | ''
  txtTPEmail: string | ''
  txtTPDL: string | ''
  datTPIssue: string | ''
  datTPExpiration: string | ''
  txtTPDTPref: string | ''
  txtTPEPPref: string | ''
  txtTPCellPref: string | ''
  txtTPFirstName: string | ''
  txtTPMiddleInitial: string | ''
  txtTPLastName: string | ''
  txtTPFullName: string | ''
  txtTPOccupation: string | ''
  cmbTPState: string | ''
  datTPDOB: string | ''
  datTPDeceased: string | ''
  ynoTPClaimed: string | ''
  ynoTPCitizen: string | ''
  ynoTPMilitary: string | ''
  ynoTPLegallyBlind: string | ''
  ssnTP_X: string | ''
  ynoTPPECF: string | ''
}

export type SpouseTaxPayerModel = {
  id: string | '0'
  title: string | ''
  txtSPWorkPH: string | ''
  txtSPEveningPH: string | ''
  txtSPCellPH: string | ''
  txtSPEmail: string | ''
  txtSPDL: string | ''
  datSPIssue: string | ''
  datSPExpiration: string | ''
  txtSPDTPref: string | ''
  txtSPEPPref: string | ''
  txtSPCellPref: string | ''
  txtSPFirstName: string | ''
  txtSPMiddleInitial: string | ''
  txtSPLastName: string | ''
  txtSPFullName: string | ''
  txtSPOccupation: string | ''
  datSPDOB: string | ''
  datSPDeceased: string | ''
  cmbSPState: string | ''
  ynoSPClaimed: string | ''
  ynoSPCitizen: string | ''
  ynoSPMilitary: string | ''
  ynoSPLegallyBlind: string | ''
  ynoSPPECF: string | ''
  ssnSP_X: string | ''
}

export type AddressModel = {
  id: string | '0'
  title: string | ''
  txtApt: string | ''
  txtCity: string | ''
  txtForeignCountry: string | ''
  txtForeignCounty: string | ''
  txtState: string | ''
  txtStreet: string | ''
  txtZIP: string | ''
  txtForeignPostalCode: string | ''
}

export type QAndAModel = {
  id: number
  title: string | ''
  questions: string | ''
  taxYOrN: string | ''
  spYOrN: string | ''
}

export type isAboutYouComplited = {
  id: string | '0'
  title: 'AboutYou Done'
  status: string | '0'
}
export type AboutYouBusinessEntity = {
  businessId: string | null
  name: string | null
  nameContinued: string | null
  ein: string | null
  primaryActivity: string | null
  yearEnd: string | null
  incorporationDate: string | null
  incorporationState: string | null
}

export type AboutYouAddressEntity = {
  street: string | null
  city: string | null
  state: string | null
  zipCode: string | null
  foreignCountry: string | null
  foreignProvince: string | null
  foreignPostalCode: string | null
}

export type AboutYouPrimaryContactEntity = {
  firstName: string | null
  lastName: string | null
  title: string | null
  email: string | null
  phone: string | null
  mobile: string | null
  phonePreferred: string | null
  mobilePreferred: string | null
}
export type AboutYouUpdateNodeEntity = {
  notes: string | null
  entityId: string | null
}

export type AboutYouBusinessInfoHome = {
  businessId: string | null
  name: string | null
  nameContinued: string | null
  ein: string | null
  primaryActivity: string | null
  yearEnd: string | null
  incorporationDate: string | null
  incorporationState: string | null
  street: string | null
  city: string | null
  state: string | null
  zipCode: string | null
  foreignCountry: string | null
  foreignProvince: string | null
  foreignPostalCode: string | null
  firstName: string | null
  lastName: string | null
  title: string | null
  email: string | null
  phone: string | null
  mobile: string | null
  phonePreferred: string | null
  mobilePreferred: string | null
  notes: string | null
  entityId: string | null
}
