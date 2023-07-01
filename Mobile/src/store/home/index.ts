import { createSlice } from '@reduxjs/toolkit'
import { RequestListResponse } from '../../../src/services/modules/home/responseTypes'

const slice = createSlice({
  name: 'home',
  initialState: {
    clientUser: '',
    clientUserViewStatus: false,
    clientUserDashboard: '',
    clientUserRequestListData: null,
    clientUserFirmDetailsData: '',
    singleServiceListData: null,
  } as HomeState,
  reducers: {
    clientUserData: (state, action) => {
      state.clientUser = action.payload
    },
    clientUserViewStatusData: (state, action) => {
      state.clientUserViewStatus = action.payload
    },
    clientUserDashboardData: (state, action) => {
      state.clientUserDashboard = action.payload
    },
    clientUserRequesList: (state, action) => {
      state.clientUserRequestListData = action.payload
    },

    clientUserFirmDetails: (state, action) => {
      state.clientUserFirmDetailsData = action.payload
    },
    addSingleServiceList: (state, action) => {
      state.singleServiceListData = action.payload
    },
    updateReopenStatus: state => {
      if (state.singleServiceListData != null) {
        state.singleServiceListData = {
          ...state.singleServiceListData,
          reopenStatus: 0,
          reopenComment: null,
        }
      }
    },
  },
})

export const {
  clientUserData,
  clientUserViewStatusData,
  clientUserDashboardData,
  clientUserRequesList,
  clientUserFirmDetails,
  addSingleServiceList,
  updateReopenStatus,
} = slice.actions

export default slice.reducer

export type HomeState = {
  clientUser: string | null
  clientUserViewStatus: boolean
  clientUserDashboard: string | null
  clientUserRequestListData: RequestListResponse[] | null
  clientUserFirmDetailsData: string | null
  singleServiceListData: RequestListResponse | null
}
