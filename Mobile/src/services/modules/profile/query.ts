import { apiServer } from '../../Constant'

export const GetCountryCodeQuery = {
  url: apiServer.API_BASE_URL_PROFILE + '/api/phonenumber/getallcountrycode',
  method: 'get',
}

export const GetProfileQuery = {
  url: apiServer.API_BASE_URL_PROFILE + '/api/identities?api-version=1.0',
  method: 'get',
}

export const PutProfileQuery = (payload: {}) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_PROFILE +
      `/api/identities/${payload.indentity}?api-version=1.0`,
    method: 'put',
    body: payload.payloadData,
  }
  return queryData
}

export const ChangePasswordQuery = (payload: {}) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_PROFILE +
      `/api/identities/${payload.indentity}/changepassword?api-version=1.0`,
    method: 'put',
    body: payload.payloadData,
  }

  return queryData
}
