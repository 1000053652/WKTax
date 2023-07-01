import { apiServer } from '../../Constant'
export const registerPushNotificationQuery = (items: {}) => {
  const data = {
    url:
      apiServer.API_BASE_ENGAGEMENT_URL +
      '/engagement/api/Notification/Register/Device',
    method: 'post',
    body: items.data,
  }
  return data
}
