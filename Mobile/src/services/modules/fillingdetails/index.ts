import { api } from '../../api'
import {
  getFillingDetailsDeleteQuery,
  getFillingDetailsDoneQuery,
  getFillingDetailsEditQuery,
  getFillingDetailsPageQuery,
  getFillingDetailsQuery,
  getFillingDetailsSaveQuery,
} from './query'

export const getfillingDetails = api.injectEndpoints({
  endpoints: builder => {
    return {
      // fetch Data
      getFillingDetails: builder.query<any, string>({
        query: data => getFillingDetailsQuery(data),
        async onQueryStarted(id, { queryFulfilled }) {},
      }),

      // Finish Later/Done
      getFillingDetailsDone: builder.query<any, string>({
        query: data => getFillingDetailsDoneQuery(data),
        async onQueryStarted(id, { queryFulfilled }) {},
      }),
      // Delete
      getFillingDetailsDelete: builder.query<any, string>({
        query: data => getFillingDetailsDeleteQuery(data),
        async onQueryStarted(id, { queryFulfilled }) {},
      }),
      //Edit
      getFillingDetailsEdit: builder.query<any, string>({
        query: data => getFillingDetailsEditQuery(data),
        async onQueryStarted(id, { queryFulfilled }) {},
      }),
      // Save
      getFillingDetailsSave: builder.query<any, string>({
        query: data => getFillingDetailsSaveQuery(data),
        async onQueryStarted(id, { queryFulfilled }) {},
      }),

      //get details page
      getFillingDetailsPage: builder.query<any, string>({
        query: data => getFillingDetailsPageQuery(data),
        async onQueryStarted(id, { queryFulfilled }) {},
      }),
    }
  },

  overrideExisting: true,
})

export const {
  useLazyGetFillingDetailsQuery,
  useLazyGetFillingDetailsDeleteQuery,
  useLazyGetFillingDetailsDoneQuery,
  useLazyGetFillingDetailsEditQuery,
  useLazyGetFillingDetailsSaveQuery,
  useLazyGetFillingDetailsPageQuery,
} = getfillingDetails
