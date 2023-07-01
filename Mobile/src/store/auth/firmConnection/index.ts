import { createSlice } from '@reduxjs/toolkit'
import {
  FirmNameResponse,
  ValidateFirm,
} from '../../../../src/services/modules/auth/responseTypes'

const slice = createSlice({
  name: 'firmConnection',
  initialState: {
    connections: null,
    validateFirm: null,
    refreshToken: '',
    revokeToken: '',
    isLoading: false,
    error: '',
  } as FirmState,
  reducers: {
    addFirmConnection: (state, action) => {
      if (state.connections === null) {
        state.connections = [action.payload]
      } else {
        state.connections.push(action.payload)
      }
    },
    addValidateFirmData: (state, action) => {
      state.validateFirm = action.payload
    },
    getRefreshData: (state, action) => {
      state.refreshToken = action.payload
    },
    getRevokeData: (state, action) => {
      state.revokeToken = action.payload
    },
    removeFirmConnection: (state, action) => {
      if (state.connections != null && state.connections?.length > 0) {
        const copyImageData = state.connections.filter(
          i => i.id != action.payload
        )
        state.connections = copyImageData
      }
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    logoutStore: (state, action) => {},
  },
})

export const {
  addValidateFirmData,
  getRefreshData,
  getRevokeData,
  addFirmConnection,
  removeFirmConnection,
  setError,
  logoutStore,
} = slice.actions

export default slice.reducer

export type FirmLocalConnectionsState = {
  id: string
  data: FirmNameResponse
}

export type FirmState = {
  connections: FirmLocalConnectionsState[] | null
  validateFirm: ValidateFirm | null
  getToken: string | null
  refreshToken: string | null
  revokeToken: string | null
  isLoading: boolean
  error: string | null
}
