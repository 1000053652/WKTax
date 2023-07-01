import { apiServer } from '../../Constant'

export const getGeneralAssetQuery = (data: string) => {
  const request = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/BusinessEntity/Asset/General`,
    method: data?.method,
  }
  const requestEdit = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/BusinessEntity/Asset/General`,
    method: data?.method,
    body: data,
  }
  const requestValue = data?.isDeleted !== false ? requestEdit : request
  return requestValue
}
export const getAssetQuery = (data: string) => {
  const request = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/BusinessEntity/${data?.type}/${data?.id}`,
    method: data?.method,
  }

  const requestEdit = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/BusinessEntity/Asset`,
    method: data?.method,
    body: data,
  }

  const requestValue = data?.isDeleted !== false ? requestEdit : request
  return requestValue
}
