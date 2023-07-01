import RNFS, {
  DownloadBeginCallbackResult,
  DownloadProgressCallbackResult,
} from 'react-native-fs'
import { useState } from 'react'
export type DownloadFileRequest = {
  fromUrl: string
  fileName: string
}
export default function () {
  const [status, setStatus] = useState<{
    isDownloading: boolean
    downloadPercentage: number
  }>({ isDownloading: false, downloadPercentage: 0 })
  function downloadFile(data: DownloadFileRequest): Promise<string> {
    setStatus({ isDownloading: true, downloadPercentage: 0 })
    const p = new Promise<string>((resolve, reject) => {
      const localFile = `${RNFS.DocumentDirectoryPath}/${data.fileName}`
      RNFS.downloadFile({
        fromUrl: data.fromUrl,
        toFile: localFile,
        background: true,
        discretionary: true,
        cacheable: true,
        begin: (res: DownloadBeginCallbackResult) => {},
        progress: (res: DownloadProgressCallbackResult) => {
          const progressPercent = Math.round(
            (res.bytesWritten / res.contentLength) * 100
          )
          setStatus({
            isDownloading: true,
            downloadPercentage: progressPercent,
          })
        },
      })
        .promise.then(() => {
          setStatus({ isDownloading: false, downloadPercentage: 0 })
          resolve(localFile)
        })
        .catch(error => {
          setStatus({ isDownloading: false, downloadPercentage: 0 })
          reject(error)
        })
    })
    return p
  }
  return { downloadFile, status }
}
