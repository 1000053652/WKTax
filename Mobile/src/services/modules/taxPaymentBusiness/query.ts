import {
  TaxPayerBusinessHomeData,
  TaxPaymentBusinessItemDetails,
} from '../../../../src/store/questionnaire/taxpayment/types'
import { apiServer } from '../../Constant'

export const getBusinessHomeDataQuery = () => {
  const requestApi = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/BusinessEntity/TaxPayments/General`,
    method: 'GET',
  }
  return requestApi
}

export const updateBusinessHomeQuery = (
  queryParam: TaxPaymentBusinessItemDetails
) => {
  const requestApi = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/BusinessEntity/TaxPayments/General`,
    method: 'PUT',
    body: queryParam,
  }
  return requestApi
}
export const getTaxPaymentBusinessitemListQuery = () => {
  const requestApi = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/BusinessEntity/TaxPayments`,
    method: 'GET',
  }
  return requestApi
}

export const postTaxPaymentBusinessItemQuery = (
  queryParam: TaxPaymentBusinessItemDetails
) => {
  const requestApi = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/BusinessEntity/TaxPayments`,
    method: 'POST',
    body: queryParam,
  }
  return requestApi
}

export const putTaxPaymentBusinessItemQuery = (
  queryParam: TaxPaymentBusinessItemDetails
) => {
  const requestApi = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/BusinessEntity/TaxPayments`,
    method: 'PUT',
    body: queryParam,
  }
  return requestApi
}

export const submitTaxPaymentBusinessHome = (
  queryParam: TaxPayerBusinessHomeData
) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      '/organizer/api/BusinessEntity/TileStatus',
    method: 'PUT',
    body: queryParam,
  }
  return queryData
}
export const deleteBusinessList = (paymentId: string) => {
  const requestApi = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/BusinessEntity/TaxPayments/${paymentId}`,
    method: 'DELETE',
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
