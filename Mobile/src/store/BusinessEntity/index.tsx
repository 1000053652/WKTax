import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'businessEntity',
  initialState: {
    getBusinessEntityMultiple: '',
    getBusinessEntityEvent: '',
  } as QuestionnaireStatus,
  reducers: {
    getBusinessEntityEventTiles: (state, action) => {
      state.getBusinessEntityEvent = action.payload
    },
    getBusinessEntityMultipleTiles: (state, action) => {
      state.getBusinessEntityMultiple = action.payload
    },
  },
})

export const { getBusinessEntityEventTiles, getBusinessEntityMultipleTiles } =
  slice.actions

export default slice.reducer

export type QuestionnaireStatus = {
  getBusinessEntityMultiple: string | null
  getBusinessEntityEvent: string | null
}
