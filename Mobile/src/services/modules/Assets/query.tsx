import { apiServer } from '../../Constant'

export const getAssetsScreenQuery = (data: string) => {
  const request = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/grid/${data.pageCode}/${data.gridCode}/${data.entityID}`,
    method: 'GET',
  }
  return request
}

export const getAssetsDeleteQuery = (payload: string) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/grid/${payload?.data?.gridCode}`,
    method: 'POST',
    body: payload,
  }
  return queryData
}
