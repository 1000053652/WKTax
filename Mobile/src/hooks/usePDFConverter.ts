import { Platform } from 'react-native'
import RNImageToPdf from 'react-native-image-to-pdf'
import { stat } from 'react-native-fs'
import { AttachmentFileData } from '../types/commonTypes'

export default function () {
  function convertPDF(
    images: AttachmentFileData[],
    fileName: string
  ): Promise<AttachmentFileData> {
    const p = new Promise<AttachmentFileData>((resolve, reject) => {
      const allImagesPathArray = images.map(i => i.uri?.replace('file://', ''))
      const fileNameValue =
        Platform.OS === 'ios' ? `${fileName}` : `${fileName}.pdf`
      const options = {
        imagePaths: allImagesPathArray,
        name: fileNameValue,
        maxSize: {
          width: 1179,
          height: 2556,
        },
        quality: 0.7, // optional compression paramter
      }
      RNImageToPdf.createPDFbyImages(options)
        .then(pdfData => {
          stat(pdfData.filePath)
            .then(statResult => {
              const fileData: AttachmentFileData = {
                uri:
                  Platform.OS == 'ios'
                    ? pdfData.filePath
                    : `file:///${statResult.originalFilepath}`,
                fileName: `${fileName}.pdf`,
                fileSize: statResult.size,
              }
              resolve(fileData)
            })
            .catch(err => {
              reject(err)
            })
        })
        .catch(err => {
          reject(err)
        })
    })
    return p
  }

  return { convertPDF }
}
