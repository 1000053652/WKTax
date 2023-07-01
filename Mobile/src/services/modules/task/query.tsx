import { apiServer } from '../../Constant'
import {
  ReturnDownloadPackage,
  ValidateSignedReturnRequest,
} from './requestTypes'

export const GetClientUserQuery = {
  url: '/engagement/api/m/Task/requestdetails',
  method: 'GET',
}
export const GetDownloadAllFilesQuery = {
  url: '/engagement/api/m/Task/download',
  method: 'GET',
}
export const GetSigningUrlQuery = {
  url: '/engagement/api/m/Task/GetSigningUrl',
  method: 'POST',
  body: {
    redirectURL: apiServer.API_BASE_URL_CLIENT_WEBSITE + '/#/returns/wizard',
  },
}
export const GetUpdateOrganizerStatusQuery = (data: string) => {
  const request = {
    url: '/engagement/api/m/Task/request/organizer/status',
    method: 'POST',
    body: {
      RequestStatus: data,
    },
  }
  return request
}
export const GetDownloadLetterQuery = {
  url: '/engagement/api/m/Task/request/engagement/download',
  method: 'GET',
}
export const GetOrganizerPdfStatusQuery = {
  url: '/engagement/api/m/Task/organizerpdfstatus',
  method: 'GET',
}
export const GetOrganizerRequestGuidQuery = {
  url:
    apiServer.API_BASE_URL_QUESTIONNAIRE +
    '/organizer/api/Organizer/statusbyrequestguid',
  method: 'GET',
}
export const markReopenCommentRead = {
  url: '/engagement/api/m/task/request/markreopencommentread',
  method: 'PUT',
}
export const returnDetails = {
  url: '/engagement/api/m/return/details',
  method: 'GET',
}
export const taxReturnPackageGetsigningurl = {
  url: '/engagement/api/m/taxreturnpackage/getsigningurl',
  method: 'POST',
  body: {
    redirectURL: apiServer.API_BASE_URL_CLIENT_WEBSITE + '/#/returns/wizard',
  },
}
export const returnDownloadPackage = (requestData: ReturnDownloadPackage) => {
  let url = '/engagement/api/m/return/downloadPackage/'
  if (requestData.workflowGuid && requestData.fileGuid) {
    url = `${url}${requestData.workflowGuid}/${requestData.fileGuid}`
  }
  const request = {
    url: url,
    method: 'GET',
  }
  return request
}
export const validateSignedReturnQuery = (
  data: ValidateSignedReturnRequest
) => {
  const request = {
    url: `/engagement/api/m/return/validateSignedReturn/${data.taxReturnPackageWorkflowGuid}`,
    method: 'POST',
    body: {
      clientGuid: data.clientGuid,
      fileList: [
        {
          fileName: data.fileName,
          fileSize: data.fileSize,
          fileGuid: data.fileGuid,
        },
      ],
    },
  }
  return request
}
export const updateValidatedSignedReturn = (
  requestData: ValidateSignedReturnRequest
) => {
  const request = {
    url: `/engagement/api/m/return/updateValidatedSignedReturn/${requestData.taxReturnPackageWorkflowGuid}`,
    method: 'POST',
    body: {
      fileGuid: requestData.fileGuid,
      fileName: requestData.fileName,
      fileStatus: requestData.fileStatus,
    },
  }
  return request
}
