import { useState } from 'react'
import axios from 'axios'
import * as mime from 'react-native-mime-types'

import { AttachmentFileData } from '../types/commonTypes'
export type UploadFileRequest = {
  toUrl: string
  localFileData: AttachmentFileData
}
export default function () {
  const [status, setStatus] = useState<{
    isUploading: boolean
    percentage: number
  }>({ isUploading: false, percentage: 0 })
  function uploadFile(data: UploadFileRequest): Promise<string> {
    setStatus({ isUploading: true, percentage: 0 })
    const p = new Promise<string>((resolve, reject) => {
      const getFile = {
        uri: `${data.localFileData.uri}`,
        name: `${data.localFileData.fileName}`,
        type: mime.contentType(`${data.localFileData.fileName}`),
      }
      const body = new FormData()
      body.append('file', getFile)
      axios
        .post(data.toUrl, body, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            setStatus({ isUploading: true, percentage: percentage })
          },
        })
        .then(response => {
          setStatus({ isUploading: false, percentage: 0 })
          resolve(response.data)
        })
        .catch(err => {
          setStatus({ isUploading: false, percentage: 0 })
          reject(err)
        })
    })
    return p
  }
  return { uploadFile, status }
}
