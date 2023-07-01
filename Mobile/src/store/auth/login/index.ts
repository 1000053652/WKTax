import { createSlice } from '@reduxjs/toolkit'
import { GetTokenResponse } from '../../../../src/services/modules/auth/responseTypes'
import { FirmLocalConnectionsState } from '../firmConnection'

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
    authData: null,
    logout: '',
    loggedInFirmData: null,
    lastAppStateDt: null,
  } as AuthState,
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
    setLoggedInFirmData: (state, action) => {
      state.loggedInFirmData = action.payload
    },
    addTokenData: (state, action) => {
      state.authData = action.payload
    },
    replceTokenData: (state, action) => {
      state.authData.authToken = action.payload
    },
    logoutData: (state, action) => {
      state.logout = action.payload
    },
    setSessionData: (state, action) => {
      state.session = action.payload
    },
    setLastAppStateDt: (state, action) => {
      state.lastAppStateDt = action.payload
    },
  },
})

export const {
  setIsLogin,
  addTokenData,
  replceTokenData,
  logoutData,
  setLoggedInFirmData,
  setSessionData,
  setLastAppStateDt,
} = slice.actions

export default slice.reducer

export type AuthState = {
  isLogin: boolean
  authData: GetTokenResponse | null
  logout: string | null
  loggedInFirmData: FirmLocalConnectionsState | null
  session: boolean | false
  lastAppStateDt: string | null
}
