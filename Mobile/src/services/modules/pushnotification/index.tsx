import { api } from '../../api'
import { registerPushNotificationQuery } from './query'

export const registerPushNotification = api.injectEndpoints({
  endpoints: builder => {
    return {
      // fetch Data
      registerPushNotification: builder.query<any, string>({
        query: data => registerPushNotificationQuery(data),
        extraOptions: { maxRetries: 3 },
        async onQueryStarted(id, { queryFulfilled }) {},
      }),
    }
  },

  overrideExisting: true,
})

export const { useLazyRegisterPushNotificationQuery } = registerPushNotification
