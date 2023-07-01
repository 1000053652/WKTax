import { api } from '../../api'
import { getRetirementDetailsQuery } from './query'

export const getRetirementDetails = api.injectEndpoints({
  endpoints: builder => {
    return {
      // fetch Data
      getRetirementDetails: builder.query<any, string>({
        query: data => getRetirementDetailsQuery(data),
        async onQueryStarted(id, { queryFulfilled }) {},
      }),
    }
  },

  overrideExisting: true,
})

export const { useLazyGetRetirementDetailsQuery } = getRetirementDetails
