import { api } from '../../api'
import {
  ValidateFirmCodeQuery,
  GetTokenQuery,
  FirmNameQuery,
  RefreshTokenQuery,
} from './query'
import { logoutAPIQuery } from './query'
import {
  addTokenData,
  setIsLogin,
  logoutData,
  setSessionData,
} from '../../../store/auth/login'
import {
  FirmNameResponse,
  GetTokenResponse,
  ValidateFirm,
} from './responseTypes'
import { GetTokenRequest } from './requestTypes'

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    getValidateFirmDataApi: builder.query<ValidateFirm, string>({
      query: id => ValidateFirmCodeQuery(id),
    }),

    getFirmNameApi: builder.query<FirmNameResponse, string>({
      query: id => FirmNameQuery(id),
    }),
    getTokenApi: builder.query<GetTokenResponse, GetTokenRequest>({
      query: request => GetTokenQuery(request),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(addTokenData(data))
          dispatch(setIsLogin(true))
          dispatch(setSessionData(true))
        } catch (err) {}
      },
    }),
    getRefereshTokenApi: builder.query<GetTokenResponse, GetTokenRequest>({
      query: (request: GetTokenRequest) => RefreshTokenQuery(request),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(addTokenData(data))
          dispatch(setIsLogin(true))
          dispatch(setSessionData(true))
        } catch (err) {}
      },
    }),
    logoutAPI: builder.query<string, string>({
      query: () => logoutAPIQuery,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          dispatch(logoutData(data))
        } catch (err) {}
      },
    }),
  }),

  overrideExisting: false,
})

export const {
  useLazyGetValidateFirmDataApiQuery,
  useLazyGetFirmNameApiQuery,
  useLazyGetTokenApiQuery,
  useLazyGetRefereshTokenApiQuery,
  useLazyLogoutAPIQuery,
} = authApi
