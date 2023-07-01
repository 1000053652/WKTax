import { BusinessHomeQuestionnaire } from './requestTypes'
import { apiServer } from '../../Constant'

export const getQuestionnaireBusinessTileStatusQuery = () => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      '/organizer/api/BusinessEntity/TileStatus',
    method: 'GET',
  }
  return queryData
}

export const getBusinessHomeDataQuery = (
  payload: BusinessHomeQuestionnaire
) => {
  const requestApi = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/urlsubmit2/${payload?.endPoitns}`,
    method: 'post',
    body: { data: payload?.data, grids: null },
  }
  return requestApi
}

export const updateQuestionnaireBussinessQuery = (
  payload: BusinessHomeQuestionnaire
) => {
  const requestApi = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/BusinessEntity/${payload?.endPoints}`,
    method: 'PUT',
    body: payload?.data,
  }
  return requestApi
}
