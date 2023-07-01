import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'questionnaire',
  initialState: {
    getIndividualData: '',
    displayDependent: '',
    detailedDisplayDependent: '',
    isfirstlogin: false,
    refreshDRLCategory: '',
    tileStatus: '',
  } as QuestionnaireStatus,
  reducers: {
    getIndividualTiles: (state, action) => {
      state.getIndividualData = action.payload
    },
    getDisplayDependent: (state, action) => {
      state.displayDependent = action.payload
    },
    getDetailedDependent: (state, action) => {
      state.detailedDisplayDependent = action.payload
    },
    getIsfirstloginData: (state, action) => {
      state.isfirstlogin = action.payload
    },
    refreshDRLCategory: (state, action) => {
      state.refreshDRLCategory = action.payload
    },

    getTileStatus: (state, action) => {
      state.tileStatus = action.payload
    },
  },
})

export const {
  getIndividualTiles,
  getDisplayDependent,
  getDetailedDependent,
  getIsfirstloginData,
  refreshDRLCategory,
  getTileStatus,
} = slice.actions

export default slice.reducer

export type QuestionnaireStatus = {
  getIndividualData: string | null
  displayDependent: string | null
  detailedDisplayDependent: string | null
  isfirstlogin: boolean | false
  refreshDRLCategory: string | null
  tileStatus: string | null
}
