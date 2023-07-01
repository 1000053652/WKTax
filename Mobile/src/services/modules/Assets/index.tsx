import { getAsstesTiles, getAsstesDeleteTiles } from '../../../store/Assets'
import { getAssetsScreenQuery, getAssetsDeleteQuery } from './query'
import { IndividualTileResponse } from './responseTypes'
import { api } from '../../api'

export const getHomeIndividualTilesAPI = api.injectEndpoints({
  endpoints: builder => ({
    getHomeIndividualAssets: builder.query<IndividualTileResponse, string>({
      query: data => getAssetsScreenQuery(data),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(getAsstesTiles(data))
        } catch (err) {
          console.error(err, 'error')
        }
      },
    }),
  }),

  overrideExisting: true,
})

export const { useLazyGetHomeIndividualAssetsQuery } = getHomeIndividualTilesAPI

export const getAssetsDeleteAPI = api.injectEndpoints({
  endpoints: builder => ({
    getAsstesDeleteTiles: builder.query<IndividualTileResponse, string>({
      query: data => getAssetsDeleteQuery(data),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(getAsstesDeleteTiles(data))
        } catch (err) {
          console.error(err, 'error')
        }
      },
    }),
  }),
  overrideExisting: true,
})

export const { useLazyGetAsstesDeleteTilesQuery } = getAssetsDeleteAPI
