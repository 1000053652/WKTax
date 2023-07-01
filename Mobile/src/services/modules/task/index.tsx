import {
  setSelectedRequestDetails,
  updateOrganizerStatusReducers,
  getLetterSigningUrlReducers,
  DownloadLetterReducers,
  GetOrganizerPdfStatusReducers,
  GetOrganizerRequestGuidReducers,
} from '../../../store/task'
import {
  GetClientUserQuery,
  GetDownloadAllFilesQuery,
  GetSigningUrlQuery,
  GetUpdateOrganizerStatusQuery,
  GetDownloadLetterQuery,
  GetOrganizerPdfStatusQuery,
  GetOrganizerRequestGuidQuery,
  markReopenCommentRead,
  returnDetails,
  taxReturnPackageGetsigningurl,
  returnDownloadPackage,
  validateSignedReturnQuery,
  updateValidatedSignedReturn,
} from './query'

import { api } from '../../api'
import {
  RequestDetailsResponse,
  ReturnDetailsAPIResponse,
  ReturnDownloadPackageResponse,
  StatusByRequestguidResponse,
  ValidateSignedReturnResponse,
} from './responseTypes'
import {
  ReturnDownloadPackage,
  ValidateSignedReturnRequest,
} from './requestTypes'

export type UserDataResponse = {
  initials: string
  fullName: string
  isLoggedIn: true
  firstName: string
  lastName: string
  clientUserStatus: number
  signerTypeIntId: number
}
export type TaskDownloadAllFileResponse = {
  url: string
  fileGuid: string
  hasError: boolean
  errorMessage: string
  errorCode: number
  fileName: string
  id: number
  errorMessages: []
}

export const GetRequestDetailsApi = api.injectEndpoints({
  endpoints: builder => ({
    getRequestDetailsApi: builder.query<RequestDetailsResponse, void>({
      query: () => GetClientUserQuery,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setSelectedRequestDetails(data))
        } catch (err) {}
      },
    }),
    taskdownloadApi: builder.query<TaskDownloadAllFileResponse, void>({
      query: () => GetDownloadAllFilesQuery,
    }),
    taskGetSigningUrl: builder.query<{ value: string }, void>({
      query: () => GetSigningUrlQuery,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(getLetterSigningUrlReducers(data))
        } catch (err) {}
      },
    }),
    taskUpdateOrganizerStatus: builder.query<UserDataResponse, string>({
      query: data => GetUpdateOrganizerStatusQuery(data),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(updateOrganizerStatusReducers(data))
        } catch (err) {}
      },
    }),
    taskDownloadLetterReducers: builder.query<UserDataResponse, void>({
      query: () => GetDownloadLetterQuery,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(DownloadLetterReducers(data))
        } catch (err) {}
      },
    }),
    taskGetOrganizerPdfStatus: builder.query<number, void>({
      query: () => GetOrganizerPdfStatusQuery,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(GetOrganizerPdfStatusReducers(data))
        } catch (err) {}
      },
    }),
    taskOrganizerRequestGuid: builder.query<StatusByRequestguidResponse, void>({
      query: () => GetOrganizerRequestGuidQuery,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(GetOrganizerRequestGuidReducers(data))
        } catch (err) {}
      },
    }),
    markReopenCommentReadAPI: builder.query<string, void>({
      query: () => markReopenCommentRead,
    }),
    returnDetailsAPI: builder.query<ReturnDetailsAPIResponse, void>({
      query: () => returnDetails,
    }),
    taxReturnPackageGetsigningurlAPI: builder.query<{ value: string }, void>({
      query: () => taxReturnPackageGetsigningurl,
    }),
    returnDownloadPackageAPI: builder.query<
      ReturnDownloadPackageResponse,
      ReturnDownloadPackage
    >({
      query: request => returnDownloadPackage(request),
    }),
    validateSignedReturnFileAPI: builder.query<
      [ValidateSignedReturnResponse],
      ValidateSignedReturnRequest
    >({
      query: data => validateSignedReturnQuery(data),
    }),
    updateSignedReturnFileAPI: builder.query<
      ValidateSignedReturnResponse,
      ValidateSignedReturnRequest
    >({
      query: request => updateValidatedSignedReturn(request),
    }),
  }),
  overrideExisting: false,
})

export const {
  useLazyGetRequestDetailsApiQuery,
  useLazyTaskdownloadApiQuery,
  useLazyTaskGetSigningUrlQuery,
  useLazyTaskUpdateOrganizerStatusQuery,
  useLazyTaskDownloadLetterReducersQuery,
  useLazyTaskGetOrganizerPdfStatusQuery,
  useLazyTaskOrganizerRequestGuidQuery,
  useLazyMarkReopenCommentReadAPIQuery,
  useLazyReturnDetailsAPIQuery,
  useLazyTaxReturnPackageGetsigningurlAPIQuery,
  useLazyReturnDownloadPackageAPIQuery,
  useLazyValidateSignedReturnFileAPIQuery,
  useLazyUpdateSignedReturnFileAPIQuery,
} = GetRequestDetailsApi
