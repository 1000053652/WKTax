import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'businessAssets',
  initialState: {
    getAssetsGeneralData: '',
    getAssetsData: '',
  } as QuestionnaireStatus,
  reducers: {
    getAssetsGeneralTiles: (state, action) => {
      state.getAssetsGeneralData = action.payload
    },
    getAssetsTiles: (state, action) => {
      state.getAssetsData = action.payload
    },
  },
})

export const { getAssetsTiles, getAssetsGeneralTiles } = slice.actions

export default slice.reducer

export type QuestionnaireStatus = {
  getAssetsData: string | null
  getAssetsGeneralData: string | null
}
