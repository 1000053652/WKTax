import { GetLogoQuery } from './query'
import { useLogo } from '../../../../src/store/profile'
import { api } from '../../api'

export type LogoResponse = {
  image: string
}

export const LogoApi = api.injectEndpoints({
  endpoints: builder => ({
    getLogo: builder.query<LogoResponse, void>({
      query: () => GetLogoQuery,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          if (data == null) {
            dispatch(useLogo(''))
          } else {
            dispatch(useLogo(data))
          }
        } catch (err) {
          if (err?.error?.data != '') {
            dispatch(useLogo(err?.error?.data))
          } else {
            dispatch(useLogo(''))
          }
        }
      },
    }),
  }),
})

export const { useLazyGetLogoQuery } = LogoApi
