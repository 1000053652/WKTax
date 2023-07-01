import { HomeOfficeRequest } from '../../../../src/store/questionnaire/homeOffice/types'
import { apiServer } from '../../Constant'

export const getHomeOfficeQuery = (data: HomeOfficeRequest) => {
  const request = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/grid/${data.pageCode}/${data.gridCode}/${data.entityID}`,
    method: 'GET',
  }
  return request
}

export const getHomeOfficeAddEditQuery = (payload: string) => {
  const request = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/grid/${payload?.data?.gridCode}`,
    method: 'POST',
    body: payload,
  }
  return request
}
