import {
  useLazyAttachDocumentQuery,
  useLazyValidateDocumentQuery,
} from '../../../../../src/services/modules/questionnaire'
import { useFileUploader } from '../../../../../src/hooks'
import { AttachmentFileData } from '../../../../../src/types/commonTypes'
import { DRLListResponse } from '../../../../../src/services/modules/questionnaire/responseTypes'
import { useEffect, useState } from 'react'
export type DRLAttachmentUploadRequest = {
  requestListId?: number
  localFileData: AttachmentFileData
}
export default function () {
  const { uploadFile, status } = useFileUploader()
  const [validateAttachmentFile, { isFetching: isValidatingAttachment }] =
    useLazyValidateDocumentQuery()
  const [updateAttachmentFile, { isFetching: isUpdatingAttachment }] =
    useLazyAttachDocumentQuery()
  const [drlAttachmentUploadStatus, setDrlAttachmentUploadStatus] = useState<{
    isUploading: boolean
    percentage: number
  }>({ isUploading: false, percentage: 0 })

  useEffect(() => {
    setDrlAttachmentUploadStatus(status)
  }, [status])

  function uploadDRLFile(
    data: DRLAttachmentUploadRequest
  ): Promise<DRLListResponse> {
    setDrlAttachmentUploadStatus({ isUploading: true, percentage: 0 })
    const p = new Promise<DRLListResponse>((resolve, reject) => {
      validateAttachmentFile({
        FileLength: data.localFileData.fileSize,
        FileName: data.localFileData.fileName,
        ...(data?.requestListId == null
          ? { isUncategorized: true }
          : { RequestListId: data?.requestListId }),
      })
        .unwrap()
        .then(validateRes => {
          uploadFile({
            localFileData: data.localFileData,
            toUrl: validateRes.value.fileList[0].url,
          })
            .then(uploadRes => {
              updateAttachmentFile({
                FileName: data.localFileData.fileName,
                FileSize: data.localFileData.fileSize,
                FileGuid: validateRes.value.fileList[0].fileGuid,
                ...(data?.requestListId == null
                  ? { isUncategorized: true }
                  : { RequestListId: data?.requestListId }),
              })
                .unwrap()
                .then(response => {
                  resolve(response)
                })
                .catch(err => {
                  setDrlAttachmentUploadStatus({
                    isUploading: false,
                    percentage: 0,
                  })
                  console.error(err)
                  reject(err)
                })
            })
            .catch(err => {
              console.error(err)
              setDrlAttachmentUploadStatus({
                isUploading: false,
                percentage: 0,
              })
              reject(err)
            })
        })
        .catch(err => {
          console.error(err)
          setDrlAttachmentUploadStatus({ isUploading: false, percentage: 0 })
          reject(err)
        })
    })
    return p
  }
  return { uploadDRLFile, drlAttachmentUploadStatus }
}
