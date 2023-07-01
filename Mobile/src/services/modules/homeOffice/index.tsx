import { HomeOfficeRequest } from '../../../../src/store/questionnaire/homeOffice/types'
import { HomeOfficeAddEditrequest, HomeOfficeResponse } from './responseTypes'
import { getHomeOfficeAddEditQuery, getHomeOfficeQuery } from './query'
import { IndividualTileResponse } from '../questionnaire/responseTypes'
import { getAssetsDeleteQuery } from '../Assets/query'
import { api } from '../../api'

export const getHomeOfficeAPI = api.injectEndpoints({
  endpoints: builder => ({
    getHomeOfficeData: builder.query<HomeOfficeResponse, HomeOfficeRequest>({
      query: data => getHomeOfficeQuery(data),
    }),
  }),

  overrideExisting: true,
})

export const { useLazyGetHomeOfficeDataQuery } = getHomeOfficeAPI

export const getHomeOfficeDeleteAPI = api.injectEndpoints({
  endpoints: builder => ({
    getHomeOfficeDeleteTiles: builder.query<IndividualTileResponse, string>({
      query: data => getAssetsDeleteQuery(data),
    }),
  }),
  overrideExisting: true,
})

export const { useLazyGetHomeOfficeDeleteTilesQuery } = getHomeOfficeDeleteAPI

export const getHomeOfficeAddEditAPI = api.injectEndpoints({
  endpoints: builder => ({
    getHomeOfficeAddEdit: builder.query<IndividualTileResponse, string>({
      query: data => getHomeOfficeAddEditQuery(data),
    }),
  }),
  overrideExisting: true,
})

export const { useLazyGetHomeOfficeAddEditQuery } = getHomeOfficeAddEditAPI
