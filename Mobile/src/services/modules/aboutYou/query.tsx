import { QueryParamAboutYou } from '.'
import { store } from '../../../store/index'
import { apiServer } from '../../Constant'

const AuthorizationValue =
  'Bearer ' + store.getState()?.auth?.authData?.authorizationToken
const AuthToken = store.getState()?.auth?.authData?.authToken

export const GetAboutYouDataQuery = (queryParam: QueryParamAboutYou) => {
  const requestApi = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/urlsubmit2/${queryParam.pageCode}`,
    method: 'post',
    body: { data: queryParam.bodyParam, grids: null },
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: AuthorizationValue,
      AuthToken: AuthToken,
    },
  }
  return requestApi
}

export const getAboutYouBusinessData = () => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/BusinessEntity/Summary`,
    method: 'GET',
  }
  return queryData
}
