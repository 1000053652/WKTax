import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'taxableEvent',
  initialState: {
    getIndividualData: '',
    displayDependent: '',
    getinvestmentsData: '',
  } as QuestionnaireStatus,
  reducers: {
    getIndividualTiles: (state, action) => {
      state.getIndividualData = action.payload
    },
    getDisplayDependent: (state, action) => {
      state.displayDependent = action.payload
    },
    getinvestmentsReducers: (state, action) => {
      state.getinvestmentsData = action.payload
    },
  },
})

export const {
  getIndividualTiles,
  getDisplayDependent,
  getinvestmentsReducers,
} = slice.actions

export default slice.reducer

export type QuestionnaireStatus = {
  getIndividualData: string | null
  displayDependent: string | null
  getinvestmentsData: string | null
}
