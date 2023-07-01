import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'assetsEvent',
  initialState: {
    getAssetsData: '',
    getAssetsDelete: '',
  } as QuestionnaireStatus,
  reducers: {
    getAsstesTiles: (state, action) => {
      state.getAssetsData = action.payload
    },
    getAsstesDeleteTiles: (state, action) => {
      state.getAssetsDelete = action.payload
    },
  },
})

export const { getAsstesTiles, getAsstesDeleteTiles } = slice.actions

export default slice.reducer

export type QuestionnaireStatus = {
  getAssetsData: string | null
  getAssetsDelete: string | null
}
