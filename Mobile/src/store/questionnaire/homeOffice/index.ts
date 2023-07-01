import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'homeOffice',
  initialState: {
    businessHomeOffice: '',
    rentalHomeOffice: '',
    farmHomeOffice: '',
    rentalHOExp: '',
    farmHOExp: '',
    businessHOExp: '',
  } as HomeOfficesData,
  reducers: {
    getBusinessHomeOffice: (state, action) => {
      state.businessHomeOffice = action.payload
    },
    getRentalHomeOffice: (state, action) => {
      state.rentalHomeOffice = action.payload
    },
    getfarmHomeOffice: (state, action) => {
      state.farmHomeOffice = action.payload
    },
    getBusinessHOExp: (state, action) => {
      state.businessHOExp = action.payload
    },
    getRentalHOExp: (state, action) => {
      state.rentalHOExp = action.payload
    },
    getFarmHOExp: (state, action) => {
      state.farmHOExp = action.payload
    },
  },
})

export const {
  getBusinessHomeOffice,
  getRentalHomeOffice,
  getfarmHomeOffice,
  getBusinessHOExp,
  getRentalHOExp,
  getFarmHOExp,
} = slice.actions

export default slice.reducer

export type HomeOfficesData = {
  businessHomeOffice: string | null
  rentalHomeOffice: string | null
  farmHomeOffice: string | null
  businessHOExp: string | null
  rentalHOExp: string | null
  farmHOExp: string | null
}
