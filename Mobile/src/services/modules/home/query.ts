import { apiServer } from '../../Constant'

export const GetClientUserQuery = {
  url: '/engagement/api/m/home/users',
  method: 'get',
}

export const GetClientSetViewStatusQuery = {
  url: '/engagement/api/m/home/taskviewed',
  method: 'post',
}

export const GetClientUserHomeQuery = {
  url: '/engagement/api/m/home',
  method: 'get',
}

export const GetClientRequestListQuery = {
  url: '/engagement/api/m/request/list',
  method: 'get',
}

export const GetFirmDetailsQuery = {
  url: '/engagement/api/m/FirmDetails/',
  method: 'get',
}

export const ClientUserClickServiceQuery = (item: unknown) => {
  const data = {
    url: `/engagement/api/m/request/select`,
    method: 'post',
    body: item,
  }
  return data
}

export const userClickBillQuery = {
  url: `/engagement/api/m/Request/bill`,
  method: 'post',
}

export const GetLogoQuery = {
  url:
    apiServer.API_BASE_URL_QUESTIONNAIRE + '/library/api/branding/website-logo',
  method: 'get',
}
