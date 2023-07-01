import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'electronicFunds',
  initialState: {
    getBankData: '',
    getBankDelete: '',
    getBankEdit: '',
    getBankDone: '',
  } as QuestionnaireStatus,
  reducers: {
    getBankTiles: (state, action) => {
      state.getBankData = action.payload
    },
    getBankDeleteTiles: (state, action) => {
      state.getBankDelete = action.payload
    },
    getBankEditTiles: (state, action) => {
      state.getBankEdit = action.payload
    },
    getBankDoneTiles: (state, action) => {
      state.getBankDone = action.payload
    },
  },
})

export const {
  getBankTiles,
  getBankDeleteTiles,
  getBankEditTiles,
  getBankDoneTiles,
} = slice.actions

export default slice.reducer

export type QuestionnaireStatus = {
  getBankData: string | null
  getBankDelete: string | null
  getBankEdit: string | null
  getBankDone: string | null
}
