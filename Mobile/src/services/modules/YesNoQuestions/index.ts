import { api } from '../../api'
import { getYesNoQuestionsQuery } from './query'

export const getYesNoQuestionsDetails = api.injectEndpoints({
  endpoints: builder => {
    return {
      // fetch Data
      getYesNoQuestionsDetails: builder.query<any, string>({
        query: data => getYesNoQuestionsQuery(data),
        async onQueryStarted(id, { queryFulfilled }) {},
      }),
    }
  },
  overrideExisting: true,
})

export const { useLazyGetYesNoQuestionsDetailsQuery } = getYesNoQuestionsDetails
