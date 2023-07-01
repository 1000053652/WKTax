import {
  getAssetsGeneralTiles,
  getAssetsTiles,
} from '../../../store/AssetsBusiness'
import { getGeneralAssetQuery, getAssetQuery } from './query'
import { IndividualTileResponse } from './responseTypes'
import { api } from '../../api'

export const getHomeGeneralAssetAPI = api.injectEndpoints({
  endpoints: builder => ({
    getHomeGeneralAsset: builder.query<IndividualTileResponse, string>({
      query: data => getGeneralAssetQuery(data),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(getAssetsGeneralTiles(data))
        } catch (err) {
          console.error(err, 'error')
        }
      },
    }),
  }),

  overrideExisting: true,
})

export const { useLazyGetHomeGeneralAssetQuery } = getHomeGeneralAssetAPI

export const getHomeAssetAPI = api.injectEndpoints({
  endpoints: builder => ({
    getHomeAsset: builder.query<IndividualTileResponse, string>({
      query: data => getAssetQuery(data),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(getAssetsTiles(data))
        } catch (err) {
          console.error(err, 'error')
        }
      },
    }),
  }),

  overrideExisting: true,
})

export const { useLazyGetHomeAssetQuery } = getHomeAssetAPI
