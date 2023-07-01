import { getIndividualTiles } from '../../../store/taxableEvent'

import { getHomeIndividualTilesQuery } from './query'

import { IndividualTileResponse } from './responseTypes'
import { api } from '../../api'

//******************************************************************** Get Home Individual Tiles API

export const getHomeIndividualTilesAPI = api.injectEndpoints({
  endpoints: builder => ({
    getHomeIndividualTilesData: builder.query<IndividualTileResponse, string>({
      query: data => getHomeIndividualTilesQuery(data),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(getIndividualTiles(data))
        } catch (err) {
          console.error(err, 'error')
        }
      },
    }),
  }),

  overrideExisting: true,
})

export const { useLazyGetHomeIndividualTilesDataQuery } =
  getHomeIndividualTilesAPI
