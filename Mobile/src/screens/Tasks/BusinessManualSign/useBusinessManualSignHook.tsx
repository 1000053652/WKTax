import { useEffect } from 'react'
import {
  useLazyReturnDetailsAPIQuery,
  useLazyReturnDownloadPackageAPIQuery,
  useLazyUpdateSignedReturnFileAPIQuery,
  useLazyValidateSignedReturnFileAPIQuery,
} from '../../../services/modules/task'
import { useSelector } from 'react-redux'
import { UserProfileData } from '../../../services/modules/profile'
import { useFileDownloader, useFileUploader } from '../../../hooks'
import FileViewer from 'react-native-file-viewer'
import {
  TaxReturnPackageDetails,
  ValidateSignedReturnResponse,
} from '../../../../src/services/modules/task/responseTypes'
import { AttachmentFileData } from '../../../../src/types/commonTypes'
import { ValidateSignedReturnRequest } from '../../../../src/services/modules/task/requestTypes'
import UUIDGenerator from 'react-native-uuid-generator';

export default function () {
  const profileData: UserProfileData = useSelector(
    state => state?.profile?.profileData
  )
  const { downloadFile, status: downloadStatus } = useFileDownloader()
  const { uploadFile, status: uploadStatus } = useFileUploader()
  const [
    returnDetailsAPI,
    { data: returnData, isFetching: isFetchingReturnDetails },
  ] = useLazyReturnDetailsAPIQuery()
  const [
    returnDownloadPackageAPI,
    { isFetching: isFetchingReturnDownloadPackage },
  ] = useLazyReturnDownloadPackageAPIQuery()
  const [
    validateSignedReturnAPI,
    { isFetching: isFetchingValidateSignedReturn },
  ] = useLazyValidateSignedReturnFileAPIQuery()
  const [
    updateValidatedSignedReturnAPI,
    { isFetching: isFetchingUpdateValidateSigned },
  ] = useLazyUpdateSignedReturnFileAPIQuery()
  const isAnySignatureRequired =
    returnData?.taxReturnPackageDetails.some(i => i.isSignatureRequired) ??
    false
  const downloadReturnAPI = async (item: TaxReturnPackageDetails) => {
    try {
      const response = await returnDownloadPackageAPI({
        workflowGuid: item.taxReturnPackageWorkflowGuid,
        fileGuid: item.signedDocumentGuid ? item.signedDocumentGuid : item.unsignedDocumentGuid,
      }).unwrap()
      const res = await downloadFile({
        fromUrl: response.fileDownloadUrl,
        fileName: response.fileName,
      })
      setTimeout(() => {
        FileViewer.open(res)
      }, 100)
    } catch (error) {}
  }
  const updateFileStatusOnServer = async (
    fileRequestData: ValidateSignedReturnRequest
  ) => {
    try {
      await updateValidatedSignedReturnAPI(fileRequestData)
      returnDetailsAPI()
    } catch (error) {
      console.error('updateFileStatusOnServer', error)
    }
  }
  const uploadFileAfterValidation = async (
    localFileData: AttachmentFileData,
    validatedResponse: ValidateSignedReturnResponse,
    fileRequestData: ValidateSignedReturnRequest
  ) => {
    try {
      await uploadFile({
        localFileData: localFileData,
        toUrl: `${validatedResponse.url}&externalurl=true`,
      })
      updateFileStatusOnServer({ ...fileRequestData, fileStatus: 2 })
    } catch (error) {
      updateFileStatusOnServer({ ...fileRequestData, fileStatus: 3 })
    }
  }
  const validateAndUploadFile = async (
    item: TaxReturnPackageDetails,
    localFileData: AttachmentFileData
  ) => {
    try {
      const requestData: ValidateSignedReturnRequest = {
        clientGuid: item.clientGuid,
        fileName: localFileData.fileName ?? '',
        fileSize: localFileData.fileSize ?? 0,
        fileGuid: await UUIDGenerator.getRandomUUID(),
        taxReturnPackageWorkflowGuid: item.taxReturnPackageWorkflowGuid
      }
      const validateSignedReturnResponse = await validateSignedReturnAPI(
        requestData
      ).unwrap()
      uploadFileAfterValidation(
        localFileData,
        validateSignedReturnResponse[0],
        requestData
      )
    } catch (error) {
      console.error('validateAndUploadFile', error)
    }
  }
  useEffect(() => {
    returnDetailsAPI()
  }, [])
  return {
    profileData,
    isFetchingReturnDetails,
    isFetchingReturnDownloadPackage,
    isFetchingValidateSignedReturn,
    isFetchingUpdateValidateSigned,
    isAnySignatureRequired,
    returnData,
    downloadStatus,
    uploadStatus,
    downloadReturnAPI,
    validateAndUploadFile,
  }
}
