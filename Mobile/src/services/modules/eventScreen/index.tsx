import { getEventsQuery, getUpdateMultipleEventsQuery } from './query'
import { IndividualTileResponse } from './responseTypes'
import { api } from '../../api'

export const getEventsAPI = api.injectEndpoints({
  endpoints: builder => ({
    getEvents: builder.query<IndividualTileResponse, string>({
      query: data => getEventsQuery(data),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          //  dispatch(getEventsTiles(data))
        } catch (err) {
          console.error(err, 'error')
        }
      },
    }),
  }),

  overrideExisting: true,
})

export const { useLazyGetEventsQuery } = getEventsAPI

export const getUpdateMultipleEventsAPI = api.injectEndpoints({
  endpoints: builder => ({
    getUpdateMultipleEvents: builder.query<IndividualTileResponse, string>({
      query: data => getUpdateMultipleEventsQuery(data),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          //dispatch(getEventsTiles(data))
        } catch (err) {
          console.error(err, 'error')
        }
      },
    }),
  }),

  overrideExisting: true,
})

export const { useLazyGetUpdateMultipleEventsQuery } =
  getUpdateMultipleEventsAPI
