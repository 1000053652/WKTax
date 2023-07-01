import { apiServer } from '../../Constant'

export const getBankScreenQuery = (data: string) => {
  const request = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/BusinessEntity/Bank`,
    method: 'GET',
  }
  return request
}

export const getEditBankScreenQuery = (data: string) => {
  const request = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/BusinessEntity/Bank`,
    method: data?.method,
    body: data,
  }
  return request
}

export const getBankDeleteScreenQuery = (data: string) => {
  const request = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/BusinessEntity/Bank/${data?.id}`,
    method: 'DELETE',
  }
  return request
}

export const getBankIsDoneQuery = (data: string) => {
  const request = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/BusinessEntity/TileStatus`,
    method: 'PUT',
    body: data,
  }
  return request
}
