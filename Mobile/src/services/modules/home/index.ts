import {
  clientUserData,
  clientUserViewStatusData,
  clientUserDashboardData,
  clientUserRequesList,
  clientUserFirmDetails,
  addSingleServiceList,
} from '../../../store/home'
import {
  UserDataResponse,
  ClientViewStatusResponse,
  UserHomeResponse,
  RequestListResponse,
  FirmDetailsResponse,
  ClickServiceListResponse,
  userBillResponse,
} from './responseTypes'

import {
  GetClientUserHomeQuery,
  GetClientSetViewStatusQuery,
  GetClientUserQuery,
  GetClientRequestListQuery,
  GetFirmDetailsQuery,
  ClientUserClickServiceQuery,
  userClickBillQuery,
} from './query'

import { api } from '../../api'

//******************************************************************** Get Client Users

export const clientUserApi = api.injectEndpoints({
  endpoints: builder => ({
    clientUserDataApi: builder.query<UserDataResponse, void>({
      query: () => GetClientUserQuery,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(clientUserData(data))
        } catch (err) {}
      },
    }),
    clientViewStatusDataApi: builder.query<'', void>({
      query: () => GetClientSetViewStatusQuery,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(clientUserViewStatusData(data))
        } catch (err) {}
      },
    }),

    clientDashboardDataApi: builder.query<UserHomeResponse, void>({
      query: () => GetClientUserHomeQuery,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(clientUserDashboardData(data))
        } catch (err) {}
      },
    }),

    clientRequestListDataApi: builder.query<RequestListResponse[], void>({
      query: () => GetClientRequestListQuery,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data.length == 1) {
            dispatch(addSingleServiceList(data[0]))
          } else if (data.length == 0) {
            dispatch(addSingleServiceList([]))
          }
          dispatch(clientUserRequesList(data))
        } catch (err) {}
      },
    }),

    firmDetailsApi: builder.query<FirmDetailsResponse, void>({
      query: () => GetFirmDetailsQuery,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(clientUserFirmDetails(data))
        } catch (err) {}
      },
    }),

    clientUserClickServiceApi: builder.query<ClickServiceListResponse, unknown>({
      query: item => ClientUserClickServiceQuery(item),
    }),

    userClickBillAPI: builder.query<userBillResponse, void>({
      query: () => userClickBillQuery,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (err) {}
      },
    }),
  }),

  overrideExisting: false,
})

export const {
  useLazyClientUserDataApiQuery,
  useLazyClientRequestListDataApiQuery,
  useLazyFirmDetailsApiQuery,
  useLazyClientUserClickServiceApiQuery,
  useLazyUserClickBillAPIQuery,
} = clientUserApi
