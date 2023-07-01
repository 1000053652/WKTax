import {
  getBankTiles,
  getBankDeleteTiles,
  getBankEditTiles,
  getBankDoneTiles,
} from '../../../store/ElectronicFunds'
import {
  getBankScreenQuery,
  getBankDeleteScreenQuery,
  getEditBankScreenQuery,
  getBankIsDoneQuery,
} from './query'
import { IndividualTileResponse } from './responseTypes'
import { api } from '../../api'

export const getHomeBankAPI = api.injectEndpoints({
  endpoints: builder => ({
    getHomeBank: builder.query<IndividualTileResponse, string>({
      query: data => getBankScreenQuery(data),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(getBankTiles(data))
        } catch (err) {
          console.error(err, 'error')
        }
      },
    }),
  }),

  overrideExisting: true,
})

export const { useLazyGetHomeBankQuery } = getHomeBankAPI

export const getHomeEditBankAPI = api.injectEndpoints({
  endpoints: builder => ({
    getHomeEditBank: builder.query<IndividualTileResponse, string>({
      query: data => getEditBankScreenQuery(data),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(getBankEditTiles(data))
        } catch (err) {
          console.error(err, 'error')
        }
      },
    }),
  }),

  overrideExisting: true,
})

export const { useLazyGetHomeEditBankQuery } = getHomeEditBankAPI

export const getHomeBankDeleteAPI = api.injectEndpoints({
  endpoints: builder => ({
    getHomeBankDelete: builder.query<IndividualTileResponse, string>({
      query: data => getBankDeleteScreenQuery(data),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(getBankDeleteTiles(data))
        } catch (err) {
          console.error(err, 'error')
        }
      },
    }),
  }),

  overrideExisting: true,
})

export const { useLazyGetHomeBankDeleteQuery } = getHomeBankDeleteAPI

export const getHomeBankDoneAPI = api.injectEndpoints({
  endpoints: builder => ({
    getHomeBankDone: builder.query<IndividualTileResponse, string>({
      query: data => getBankIsDoneQuery(data),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(getBankDoneTiles(data))
        } catch (err) {
          console.error(err, 'error')
        }
      },
    }),
  }),

  overrideExisting: true,
})

export const { useLazyGetHomeBankDoneQuery } = getHomeBankDoneAPI
