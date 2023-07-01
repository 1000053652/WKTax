import { createSlice } from '@reduxjs/toolkit'
import {
  RequestDetailsResponse,
  ReturnDetailsAPIResponse,
} from '../../../src/services/modules/task/responseTypes'

const slice = createSlice({
  name: 'TaskScreen',
  initialState: {
    selectedRequestDetails: null,
    downloadAllFiles: '',
    getLetterSigningUrl: '',
    updateOrganizerStatus: '',
    getTaxOrganizerStatus: '',
    reopenRequest: '',
    DownloadLetter: '',
    GetOrganizerPdfStatus: '',
    organizerRequestGuid: '',
    returnDetails: null,
  } as TaskState,
  reducers: {
    setSelectedRequestDetails: (state, action) => {
      state.selectedRequestDetails = action.payload
    },
    getLetterSigningUrlReducers: (state, action) => {
      state.getLetterSigningUrl = action.payload
    },
    updateOrganizerStatusReducers: (state, action) => {
      state.updateOrganizerStatus = action.payload
    },
    DownloadLetterReducers: (state, action) => {
      state.DownloadLetter = action.payload
    },
    GetOrganizerPdfStatusReducers: (state, action) => {
      state.GetOrganizerPdfStatus = action.payload
    },
    GetOrganizerRequestGuidReducers: (state, action) => {
      state.organizerRequestGuid = action.payload
    },
    returnDetailsReducer: (state, action) => {
      state.returnDetails = action.payload
    },
  },
})

export const {
  setSelectedRequestDetails,
  updateOrganizerStatusReducers,
  getLetterSigningUrlReducers,
  DownloadLetterReducers,
  GetOrganizerPdfStatusReducers,
  GetOrganizerRequestGuidReducers,
  returnDetailsReducer,
} = slice.actions

export default slice.reducer

export type TaskState = {
  selectedRequestDetails: RequestDetailsResponse | null
  downloadAllFiles: string | null
  getLetterSigningUrl: string | null
  updateOrganizerStatus: string | null
  getTaxOrganizerStatus: string | null
  reopenRequest: string | null
  DownloadLetter: string | null
  GetOrganizerPdfStatus: string | null
  organizerRequestGuid: string | null
  returnDetails: ReturnDetailsAPIResponse | null
}
