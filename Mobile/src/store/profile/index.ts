import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'profile',
  initialState: {
    countryData: '',
    profileData: '',
    logo: '',
    profileSave: 'ProfileNotSaved',
  } as ProfileState,
  reducers: {
    getCountryData: (state, action) => {
      state.countryData = action.payload
    },
    profileUserData: (state, action) => {
      state.profileData = action.payload
    },
    useLogo: (state, action) => {
      state.logo = action.payload
    },
    checkProfileSave: (state, action) => {
      state.profileSave = action.payload
    },
  },
})

export const { profileUserData, useLogo, getCountryData, checkProfileSave } =
  slice.actions

export default slice.reducer

export type ProfileState = {
  countryData: string | null
  profileData: string | null
  logo: string | null
  profileSave: string | null
}
