import { createSlice } from '@reduxjs/toolkit'
import {
  AboutYouAddressEntity,
  AboutYouBusinessEntity,
  AboutYouBusinessInfoHome,
  AboutYouPrimaryContactEntity,
  AboutYouState,
  AboutYouUpdateNodeEntity,
  AddressModel,
  QAndAModel,
  TaxPayerYouModel,
} from './types'

const slice = createSlice({
  name: 'aboutyou',
  initialState: {
    taxPayer: null,
    spouseTaxPayer: null,
    address: null,
    ynoCheck: null,
    qAndA: null,
    aboutYouBusinessInfoHome: null,
    aboutYouUpdateNodeEntity: null,
    aboutYouPrimaryContactEntity: null,
    aboutYouAddressEntity: null,
    aboutYouBusinessEntity: null,
  } as AboutYouState,
  reducers: {
    aboutYouData: (state, action) => {
      state.taxPayer = {
        id: '1',
        title: 'Taxpayer',
        txtTPWorkPH: action.payload.txtTPWorkPH,
        txtTPEveningPH: action.payload.txtTPEveningPH,
        txtTPCellPH: action.payload.txtTPCellPH,
        txtTPEmail: action.payload.txtTPEmail,
        txtTPDL: action.payload.txtTPDL,
        datTPIssue: action.payload.datTPIssue,
        datTPExpiration: action.payload.datTPExpiration,
        txtTPDTPref: action.payload.txtTPDTPref,
        txtTPEPPref: action.payload.txtTPEPPref,
        txtTPCellPref: action.payload.txtTPCellPref,
        txtTPFirstName: action.payload.txtTPFirstName,
        txtTPMiddleInitial: action.payload.txtTPMiddleInitial,
        txtTPLastName: action.payload.txtTPLastName,
        txtTPFullName:
          action.payload.txtTPFirstName +
          ' ' +
          action.payload.txtTPMiddleInitial +
          ' ' +
          action.payload.txtTPLastName,
        txtTPOccupation: action.payload.txtTPOccupation,
        cmbTPState: action.payload.cmbTPState,
        datTPDOB: action.payload.datTPDOB,
        datTPDeceased: action.payload.datTPDeceased,
        ynoTPClaimed: action.payload.ynoTPClaimed,
        ynoTPCitizen: action.payload.ynoTPCitizen,
        ynoTPMilitary: action.payload.ynoTPMilitary,
        ynoTPLegallyBlind: action.payload.ynoTPLegallyBlind,
        ssnTP_X: action.payload.ssnTP_X,
        ynoTPPECF: action.payload.ynoTPPECF,
      } as TaxPayerYouModel

      state.spouseTaxPayer = {
        id: '2',
        title: 'Spouse',
        txtTPWorkPH: action.payload.txtSPWorkPH,
        txtTPEveningPH: action.payload.txtSPEveningPH,
        txtTPCellPH: action.payload.txtSPCellPH,
        txtTPEmail: action.payload.txtSPEmail,
        txtTPDL: action.payload.txtSPDL,
        datTPIssue: action.payload.datSPIssue,
        datTPExpiration: action.payload.datSPExpiration,
        txtTPDTPref: action.payload.txtSPDTPref,
        txtTPEPPref: action.payload.txtSPEPPref,
        txtTPCellPref: action.payload.txtSPCellPref,
        txtTPFirstName: action.payload.txtSPFirstName,
        txtTPMiddleInitial: action.payload.txtSPMiddleInitial,
        txtTPLastName: action.payload.txtSPLastName,
        txtTPFullName:
          action.payload.txtSPFirstName +
          ' ' +
          action.payload.txtSPMiddleInitial +
          ' ' +
          action.payload.txtSPLastName,
        txtTPOccupation: action.payload.txtSPOccupation,
        datTPDOB: action.payload.datSPDOB,
        datTPDeceased: action.payload.datSPDeceased,
        cmbTPState: action.payload.cmbSPState,
        ynoTPClaimed: action.payload.ynoSPClaimed,
        ynoTPCitizen: action.payload.ynoSPCitizen,
        ynoTPMilitary: action.payload.ynoSPMilitary,
        ynoTPLegallyBlind: action.payload.ynoSPLegallyBlind,
        ynoTPPECF: action.payload.ynoSPPECF,
        ssnTP_X: action.payload.ssnSP_X,
      } as TaxPayerYouModel

      state.address = {
        id: '3',
        title: 'Address',
        txtApt: action.payload.txtApt,
        txtCity: action.payload.txtCity,
        txtForeignCountry: action.payload.txtForeignCountry,
        txtForeignCounty: action.payload.txtForeignCounty,
        txtState: action.payload.txtState,
        txtStreet: action.payload.txtStreet,
        txtZIP: action.payload.txtZIP,
        txtForeignPostalCode: action.payload.txtForeignPostalCode,
      } as AddressModel

      const qAndA1 = {
        id: 0,
        title: 'qAndn',
        questions: 'aboutYou:YANDN:q1',
        taxYOrN:
          action.payload.ynoTPClaimed == undefined
            ? ''
            : action.payload.ynoTPClaimed,
        spYOrN:
          action.payload.ynoSPClaimed == undefined
            ? ''
            : action.payload.ynoSPClaimed,
      } as QAndAModel

      const qAndA2 = {
        id: 1,
        title: 'qAndn',
        questions: 'aboutYou:YANDN:q2',
        taxYOrN:
          action.payload.ynoTPLegallyBlind == undefined
            ? ''
            : action.payload.ynoTPLegallyBlind,
        spYOrN:
          action.payload.ynoSPLegallyBlind == undefined
            ? ''
            : action.payload.ynoSPLegallyBlind,
      } as QAndAModel

      const qAndA3 = {
        id: 2,
        title: 'qAndn',
        questions: 'aboutYou:YANDN:q3',
        taxYOrN:
          action.payload.ynoTPPECF == undefined ? '' : action.payload.ynoTPPECF,
        spYOrN:
          action.payload.ynoSPPECF == undefined ? '' : action.payload.ynoSPPECF,
      } as QAndAModel

      const qAndA4 = {
        id: 3,
        title: 'qAndn',
        questions: 'aboutYou:YANDN:q4',
        taxYOrN:
          action.payload.ynoTPCitizen == undefined
            ? ''
            : action.payload.ynoTPCitizen,
        spYOrN:
          action.payload.ynoSPCitizen == undefined
            ? ''
            : action.payload.ynoSPCitizen,
      } as QAndAModel

      const qAndA5 = {
        id: 4,
        title: 'qAndn',
        questions: 'aboutYou:YANDN:q5',
        taxYOrN:
          action.payload.ynoTPMilitary == undefined
            ? ''
            : action.payload.ynoTPMilitary,
        spYOrN:
          action.payload.ynoSPMilitary == undefined
            ? ''
            : action.payload.ynoSPMilitary,
      } as QAndAModel
      state.qAndA = [qAndA1, qAndA2, qAndA3, qAndA4, qAndA5]
    },
    aboutYouDataBusiness: (state, action) => {
      state.aboutYouBusinessInfoHome = {
        businessId: action.payload.businessId,
        name: action.payload.name,
        nameContinued: action.payload.nameContinued,
        ein: action.payload.ein,
        primaryActivity: action.payload.primaryActivity,
        yearEnd: action.payload.yearEnd,
        incorporationDate: action.payload.incorporationDate,
        incorporationState: action.payload.incorporationState,
        street: action.payload.street,
        city: action.payload.city,
        state: action.payload.state,
        zipCode: action.payload.zipCode,
        foreignCountry: action.payload.foreignCountry,
        foreignProvince: action.payload.foreignProvince,
        foreignPostalCode: action.payload.foreignPostalCode,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        title: action.payload.title,
        email: action.payload.email,
        phone: action.payload.phone,
        mobile: action.payload.mobile,
        phonePreferred: action.payload.phonePreferred,
        mobilePreferred: action.payload.mobilePreferred,
        notes: action.payload.notes,
        entityId: action.payload.entityId,
      } as AboutYouBusinessInfoHome

      state.aboutYouBusinessEntity = {
        businessId: action.payload.businessId,
        name: action.payload.name,
        nameContinued: action.payload.nameContinued,
        ein: action.payload.ein,
        primaryActivity: action.payload.primaryActivity,
        yearEnd: action.payload.yearEnd,
        incorporationDate: action.payload.incorporationDate,
        incorporationState: action.payload.incorporationState,
      } as AboutYouBusinessEntity

      state.aboutYouAddressEntity = {
        businessId: action.payload.businessId,
        street: action.payload.street,
        city: action.payload.city,
        state: action.payload.state,
        zipCode: action.payload.zipCode,
        foreignCountry: action.payload.foreignCountry,
        foreignProvince: action.payload.foreignProvince,
        foreignPostalCode: action.payload.foreignPostalCode,
      } as AboutYouAddressEntity

      state.aboutYouPrimaryContactEntity = {
        businessId: action.payload.businessId,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        title: action.payload.title,
        email: action.payload.email,
        phone: action.payload.phone,
        mobile: action.payload.mobile,
        phonePreferred: action.payload.phonePreferred,
        mobilePreferred: action.payload.mobilePreferred,
      } as AboutYouPrimaryContactEntity

      state.aboutYouUpdateNodeEntity = {
        notes: action.payload.notes,
        entityId: action.payload.entityId,
      } as AboutYouUpdateNodeEntity
    },
    toggleSwitchAbout: (
      state,
      { payload: { index, item } }: ToggleSwitchPayload
    ) => {
      if (state.qAndA != null) {
        state.qAndA[index] = item
      }
    },
  },
})

export type ToggleSwitchPayload = {
  payload: ToggleYNUpdatePayload
}

export type ToggleYNUpdatePayload = {
  index: number
  item: QAndAModel
}

export const { aboutYouData, toggleSwitchAbout, aboutYouDataBusiness } =
  slice.actions

export default slice.reducer
