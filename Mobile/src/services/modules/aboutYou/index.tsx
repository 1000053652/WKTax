import { AboutYouBusinessInfoHome } from '../../../../src/store/aboutyou/types'
import { api } from '../../api'
import { AboutYouRequestBody } from './AboutYouRequestBody'
import { getAboutYouBusinessData, GetAboutYouDataQuery } from './query'

export type AboutYouResponse = {
  payload: string
  data: string
}
export type QueryParamAboutYou = {
  pageCode: string | ''
  bodyParam: AboutYouRequestBody | '{}'
}

export const aboutYouApi = api.injectEndpoints({
  endpoints: builder => ({
    aboutYouDataApi: builder.query<AboutYouResponse, QueryParamAboutYou>({
      query: id => GetAboutYouDataQuery(id),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
        } catch (err) {
          console.error('AboutYouData:', err)
        }
      },
    }),
  }),

  overrideExisting: true,
})

export const { useLazyAboutYouDataApiQuery } = aboutYouApi

export const aboutYouBusinessDataApi = api.injectEndpoints({
  endpoints: builder => ({
    aboutYouBusinessDataApi: builder.query<AboutYouBusinessInfoHome, string>({
      query: () => getAboutYouBusinessData(),
    }),
  }),

  overrideExisting: true,
})

export const { useLazyAboutYouBusinessDataApiQuery } = aboutYouBusinessDataApi
