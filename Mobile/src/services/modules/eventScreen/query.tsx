import { apiServer } from '../../Constant'

export const getEventsQuery = (data: string) => {
  const request = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/BusinessEntity/GetEvents`,
    method: 'GET',
  }
  return request
}
export const getUpdateMultipleEventsQuery = (data: string) => {
  const request = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/BusinessEntity/UpdateMultipleEvents`,
    method: 'PUT',
    body: data,
  }
  return request
}
