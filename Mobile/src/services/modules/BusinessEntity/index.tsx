import {
  getBusinessEntityEventTiles,
  getBusinessEntityMultipleTiles,
} from '../../../store/BusinessEntity'
import {
  getBusinessEntityMultipleQuery,
  getBusinessEntityEventQuery,
  getSubmitCustomQuestions,
} from './query'
import { IndividualTileResponse } from './responseTypes'
import { AddQuestionData } from '../../../../src/screens/AdditionalScreen'
import { api } from '../../api'

export const getBusinessEntityMultipleAPI = api.injectEndpoints({
  endpoints: builder => ({
    getBusinessEntityMultiple: builder.query<AddQuestionData[], void>({
      query: () => getBusinessEntityMultipleQuery(),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(getBusinessEntityMultipleTiles(data))
        } catch (err) {
          console.error(err, 'error')
        }
      },
    }),
  }),

  overrideExisting: true,
})

export const { useLazyGetBusinessEntityMultipleQuery } =
  getBusinessEntityMultipleAPI

export const getBusinessEntityEventAPI = api.injectEndpoints({
  endpoints: builder => ({
    getBusinessEntityEvent: builder.query<IndividualTileResponse, unknown>({
      query: data => getBusinessEntityEventQuery(data),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(getBusinessEntityEventTiles(data))
        } catch (err) {
          console.error(err, 'error')
        }
      },
    }),
  }),

  overrideExisting: true,
})

export const { useLazyGetBusinessEntityEventQuery } = getBusinessEntityEventAPI

export const getSubmitCustomQuestionsAPI = api.injectEndpoints({
  endpoints: builder => ({
    getSubmitCustomQuestionsEvent: builder.query<
      IndividualTileResponse,
      unknown
    >({
      query: data => getSubmitCustomQuestions(data),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(getBusinessEntityEventTiles(data))
        } catch (err) {
          console.error(err, 'error')
        }
      },
    }),
  }),

  overrideExisting: true,
})

export const { useLazyGetSubmitCustomQuestionsEventQuery } =
  getSubmitCustomQuestionsAPI
