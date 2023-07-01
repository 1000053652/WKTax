import {
  BusinessEntityHelper,
  BusinessHomeData,
} from '../../../../src/store/questionnaire/taxpayment/types'
import { apiServer } from '../../Constant'

export const getBusinessHomeDataQuery = (pageCode: string) => {
  const requestApi = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/urlsubmit2/${pageCode}`,
    method: 'post',
    body: { data: null, grids: null },
  }
  return requestApi
}

export const updateBusinessHomeDataQuery = (queryParam: BusinessHomeData) => {
  const requestApi = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/urlsubmit2/${queryParam.code}`,
    method: 'post',
    body: { data: queryParam, grids: null },
  }
  return requestApi
}

export const deleteBusinessList = (
  pageCode: string,
  queryParam: BusinessEntityHelper
) => {
  const requestApi = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/deletepageentity/0/${pageCode}/0/${queryParam.entityID}/${queryParam.entityPageID}`,
    method: 'post',
    body: {},
    headers: {
      modelJson: '{"data":{"txtBusinessName":""},"grids":null}',
    },
  }
  return requestApi
}

export const itemDetailsQuery = (pageCode: string, entityID: string) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/detailpage?code=${pageCode}&entityId=${entityID}`,
    method: 'GET',
  }
  return queryData
}
