import { getAsstesTiles, getAsstesDeleteTiles } from '../../../store/Assets'
import { getVehiclesScreenQuery, getVehiclesDeleteQuery } from './query'
import { IndividualTileResponse } from './responseTypes'
import { api } from '../../api'

export const getHomeVehiclesAPI = api.injectEndpoints({
  endpoints: builder => ({
    getHomeVehicles: builder.query<IndividualTileResponse, string>({
      query: data => getVehiclesScreenQuery(data),
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

export const { useLazyGetHomeVehiclesQuery } = getHomeVehiclesAPI

export const getVehiclesDeleteAPI = api.injectEndpoints({
  endpoints: builder => ({
    getVehiclesDeleteTiles: builder.query<IndividualTileResponse, string>({
      query: data => getVehiclesDeleteQuery(data),
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

export const { useLazyGetVehiclesDeleteTilesQuery } = getVehiclesDeleteAPI
