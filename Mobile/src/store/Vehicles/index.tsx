import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'vehiclesEvent',
  initialState: {
    getVehiclesData: '',
    getVehiclesDelete: '',
  } as QuestionnaireStatus,
  reducers: {
    getVehiclesTiles: (state, action) => {
      state.getVehiclesData = action.payload
    },
    getVehiclesDeleteTiles: (state, action) => {
      state.getVehiclesDelete = action.payload
    },
  },
})

export const { getVehiclesTiles, getVehiclesDeleteTiles } = slice.actions

export default slice.reducer

export type QuestionnaireStatus = {
  getVehiclesData: string | null
  getVehiclesDelete: string | null
}
