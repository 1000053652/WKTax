import { createSlice } from '@reduxjs/toolkit'
import { PageCode } from '../../../src/services/constants/PageCode'
import { BusinessHomeData, BusinessHomeStatus } from './types'

const slice = createSlice({
  name: 'business',
  initialState: {
    businessHomeData: null,
    businessEntities: null,
    rentalEntities: null,
    farmEntities: null,
    businessItemDetails: null,
    rentItemDetails: null,
    farmItemDetails: null,
    businessYNo: '',
  } as BusinessHomeStatus,
  reducers: {
    getBusinessRoyalHomeData: (state, action) => {
      state.businessHomeData = {
        NavBusiness: action.payload.NavBusiness,
        NavBusinessComplete: action.payload.NavBusinessComplete,
        NavBusinessDescription: action.payload.NavBusinessDescription,
        code: PageCode.Business,
      } as BusinessHomeData
    },
    getBusinessEntities: (state, action) => {
      state.businessEntities = action.payload
    },
    getRentalEntities: (state, action) => {
      state.rentalEntities = action.payload
    },
    getFarmEntities: (state, action) => {
      state.farmEntities = action.payload
    },
    getSelectedBusinessItemDetails: (state, action) => {
      state.businessItemDetails = action.payload
    },
    getSelectedRentalItemDetails: (state, action) => {
      state.rentItemDetails = action.payload
    },
    getSelectedFarmItemDetails: (state, action) => {
      state.farmItemDetails = action.payload
    },
    getBusinessYNO: (state, action) => {
      state.businessYNo = action.payload
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
} = slice.actions
export default slice.reducer
