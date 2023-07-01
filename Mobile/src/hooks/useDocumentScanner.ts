import DocumentScanner, {
  ResponseType,
} from 'react-native-document-scanner-plugin'
import { AttachmentFileData } from '../types/commonTypes'
import RNFS from 'react-native-fs'

export default () => {
  const scanDocument = async (): Promise<AttachmentFileData[]> => {
    try {
      const response = await DocumentScanner.scanDocument({
        croppedImageQuality: 100,
        letUserAdjustCrop: true,
        responseType: ResponseType.ImageFilePath,
      })

      if (response.scannedImages && response.scannedImages.length > 0) {
        const unresolvedStats = response.scannedImages.map(item =>
          RNFS.stat(item)
        )
        const resolvedStats = await Promise.all(unresolvedStats)
        return response.scannedImages.map(item => {
          const statItem = resolvedStats.find(stat => stat.path === item)
          return {
            uri: item,
            fileSize: statItem?.size,
            fileName: statItem?.name,
          } as AttachmentFileData
        })
      }
    } catch (e) {
      console.error(
        '🚀 ~ file: useDocumentScanner.ts:32 ~ scanDocument ~ e:',
        e
      )
    }
    throw new Error('No Images scanned')
  }

  return { scanDocument }
}
