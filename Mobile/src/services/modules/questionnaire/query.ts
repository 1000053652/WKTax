import { PageCode } from '../../constants/PageCode'
import { DetailPageRequest, IndividualTileRequest } from './requestType'
import {
  BusinessHomeQuestionnaire,
  DRLAttachDocRequest,
  DRLAttachmentDeleteRequest,
  DRLDownloadAttachmentRequest,
  DRLValidateDocRequest,
} from './requestTypes'
import { BusinessGeneralData, DRLListResponse } from './responseTypes'
import { apiServer } from '../../Constant'

export const getHomeIndividualTilesQuery = {
  url:
    apiServer.API_BASE_URL_QUESTIONNAIRE + '/organizer/api/nav/urlsubmit2/6008',
  method: 'post',
  body: { data: null, grids: null },
}

export const getDependentDisplayQuery = {
  url:
    apiServer.API_BASE_URL_QUESTIONNAIRE +
    `/organizer/api/nav/urlsubmit2/${PageCode.Dependents}`,
  method: 'post',
  body: { data: null, grids: null },
}

export const getDetailsDependentDisplayQuery = (getParam: string) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/detailpage?${getParam}`,
    method: 'GET',
  }
  return queryData
}

export const addDependentPageIntityQuery = (addPayload: string) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/addpageentity/${addPayload?.entityPageID}/${addPayload?.PageCode}/0`,
    method: 'POST',
    headers: { modelJson: '{data: null, grid:null}' },
  }
  return queryData
}

export const addDependentPageIntityDetailsQuery = (endPoint: string) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/detailpage${endPoint}`,
    method: 'GET',
    headers: { modelJson: '{data: null, grid:null}' },
  }
  return queryData
}

export const editDependentPageIntityQuery = (payload: string) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/editpageentity${payload.endPoint}`,
    method: 'POST',
    data: payload.data,
    headers: { modelJson: payload.headers },
  }
  return queryData
}

export const finishLaterDoneQuery = (payload: string) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/urlsubmit2/${PageCode.Dependents}`,
    method: 'POST',
    body: payload,
  }
  return queryData
}

export const deleteDependentquery = (payload: string) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/deletepageentity/${payload.endPoint}`,
    method: 'POST',
    body: payload.data,
    headers: { modelJson: payload.headers },
  }
  return queryData
}

export const getNavDetailsQuery = (request: DetailPageRequest<null>) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/detailpage?code=${request.pagecode}&entityId=${request.entityId}`,
    method: 'GET',
  }
  return queryData
}
export const addPageEntityQuery = (request: DetailPageRequest<unknown>) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/addpageentity/${request.entityPageID}/${request.pagecode}/${request.entityId}`,
    method: 'POST',
    headers: {
      modelJson: JSON.stringify(request.modelJson),
    },
  }
  return queryData
}
export const editPageEntityQuery = (request: DetailPageRequest<unknown>) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/editpageentity/${request.entityId}/${request.pagecode}/${request.entityId}`,
    method: 'POST',
    headers: {
      modelJson: JSON.stringify(request.modelJson),
    },
  }
  return queryData
}
export const getGridAPIQuery = (request: IndividualTileRequest) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/grid/${request.pageCode}/${request.gridCode}/${request.entityID}`,
    method: 'GET',
  }
  return queryData
}
export const addGridAPIQuery = (payload: string) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/nav/grid/${payload.endPoint}`,
    method: 'POST',
    body: payload.payload,
  }
  return queryData
}
export const isfirstloginQuery = () => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/taxpayer/isfirstlogin`,
    method: 'GET',
  }
  return queryData
}
export const getDRLCategoriesQuery = () => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/documentrequestlist/getDRLCategories/0`,
    method: 'GET',
  }
  return queryData
}
export const getDRLListQuery = () => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/documentrequestlist/getlist`,
    method: 'GET',
  }
  return queryData
}
export const getAttachmentListQuery = (requestListId: number) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/documentrequestlist/getattachmentlist/${requestListId}`,
    method: 'GET',
  }
  return queryData
}
export const updateDRLItemStatusQuery = (requestItem: DRLListResponse) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/documentrequestlist/updatestatus`,
    method: 'POST',
    body: requestItem,
  }
  return queryData
}
export const validateDocQuery = (request: DRLValidateDocRequest) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/documentrequestlist/validateDoc`,
    method: 'POST',
    body: request,
  }
  return queryData
}
export const attachDocQuery = (request: DRLAttachDocRequest) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/documentrequestlist/attachdoc`,
    method: 'POST',
    body: request,
  }
  return queryData
}
export const deletDRLAttachmentQuery = (
  request: DRLAttachmentDeleteRequest
) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/documentrequestlist/deleteattachment/${request.attachemtId}/${request.requestListId}`,
    method: 'DELETE',
  }
  return queryData
}
export const deletDRLUnCategorizedAttachmentQuery = (requestId: number) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/documentrequestlist/deleteuncategorized/${requestId}`,
    method: 'DELETE',
  }
  return queryData
}
export const getDRLAttachmentDownloadDetailsQuery = (
  request: DRLDownloadAttachmentRequest
) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/documents/filedownload/${request.requestGuid}/0?fileId=${request.fileId}`,
    method: 'GET',
  }
  return queryData
}
export const getDRLUnCategorizedAttachmentDownloadDetailsQuery = (
  request: DRLDownloadAttachmentRequest
) => {
  const queryData = {
    url:
      apiServer.API_BASE_URL_QUESTIONNAIRE +
      `/organizer/api/documents/filedownload/${request.requestGuid}/0?clientGuid=${request.clientGuid}&documentRequestId=${request.fileId}`,
    method: 'GET',
  }
  return queryData
}

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
