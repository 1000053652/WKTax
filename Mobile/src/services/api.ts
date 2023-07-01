import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  BaseQueryApi,
} from '@reduxjs/toolkit/query/react'
import { setIsLogin, setSessionData } from '../store/auth/login'
import { apiServer } from './Constant'
import { Alert } from 'react-native'
import { t } from 'i18next'

let canShowSessionExpiryAlert = false
const apisWithoutTokens: [string] = [
  'getValidateFirmDataApi',
  'getFirmNameApi',
  'getTokenApi',
]
const baseQuery = fetchBaseQuery({
  baseUrl: apiServer.API_BASE_ENGAGEMENT_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    if (!apisWithoutTokens.includes(endpoint)) {
      headers.set('Content-Type', 'application/json; charset=UTF-8')
      headers.set(
        'Authorization',
        'Bearer ' + getState()?.auth?.authData?.authorizationToken
      )
      headers.set('AuthToken', getState()?.auth?.authData?.authToken)
    }
  },
})
const showInactivityPopUp = (api: BaseQueryApi) => {
  if (canShowSessionExpiryAlert) {
    Alert.alert('', t('common:SESSION_EXPIRE'), [
      {
        text: t('common:OK'),
        onPress: () => {
          canShowSessionExpiryAlert = false
          api.dispatch(setIsLogin(false))
          api.dispatch(setSessionData(false))
        },
        style: 'default',
      },
    ])
  }
}
const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)
  if (result?.error?.status === 401) {
    api.dispatch(setIsLogin(false))
    api.dispatch(setSessionData(false))
  }
  return result
}

export const api = createApi({
  reducerPath: 'requestAPI',
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  keepUnusedDataFor: 0.000001,
})
