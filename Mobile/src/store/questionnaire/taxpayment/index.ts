import { createSlice } from '@reduxjs/toolkit'
import { PageCode } from '../../../../src/services/constants/PageCode'
import { BusinessHomeData, TaxPaymentHomeStatus } from './types'

const slice = createSlice({
  name: 'taxpayment',
  initialState: {
    taxPaymentHomeData: null,
    federalEntities: null,
    stateEntities: null,
    cityEntities: null,
    federalItemDetails: null,
    stateItemDetails: null,
    cityItemDetails: null,
    taxPaymentNo: '',
  } as TaxPaymentHomeStatus,
  reducers: {
    getBusinessRoyalHomeData: (state, action) => {
      state.taxPaymentHomeData = {
        NavTaxpayment: action.payload.NavTaxpayment,
        NavTaxpaymentComplete: action.payload.NavTaxpaymentComplete,
        NavTaxpaymentDescription: action.payload.NavTaxpaymentDescription,
        code: PageCode.TaxPayments,
      } as BusinessHomeData
    },
    getBusinessEntities: (state, action) => {
      state.federalEntities = action.payload
    },
    getRentalEntities: (state, action) => {
      state.stateEntities = action.payload
    },
    getFarmEntities: (state, action) => {
      state.cityEntities = action.payload
    },
    getSelectedBusinessItemDetails: (state, action) => {
      state.federalItemDetails = action.payload
    },
    getSelectedRentalItemDetails: (state, action) => {
      state.stateItemDetails = action.payload
    },
    getSelectedFarmItemDetails: (state, action) => {
      state.cityItemDetails = action.payload
    },
    getBusinessYNO: (state, action) => {
      state.taxPaymentNo = action.payload
    },
    getTaxPaymentBusinessHomeData: (state, action) => {
      state.taxPaymentHomeData = action.payload
    },
  },
})
export const {
  getBusinessRoyalHomeData,
  getBusinessEntities,
  getRentalEntities,
  getFarmEntities,
  getSelectedBusinessItemDetails,
  getSelectedRentalItemDetails,
  getSelectedFarmItemDetails,
  getBusinessYNO,
  getTaxPaymentBusinessHomeData,
} = slice.actions
export default slice.reducer
