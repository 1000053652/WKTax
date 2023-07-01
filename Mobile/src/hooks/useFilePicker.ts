import DocumentPicker from 'react-native-document-picker'
import * as ImagePicker from 'react-native-image-picker'
import { FilePickerTypes, AttachmentFileData } from '../types/commonTypes'
import { Platform } from 'react-native'
import useDocumentScanner from './useDocumentScanner'

const allowedImageTypes: string[] = [
  'image/jpeg',
  'image/jpeg',
  'image/x-png',
  'image/tif',
  'image/tiff',
  'image/bmp',
  'image/heic',
  'image/heif',
  'image/gif',
  'public.image',
]

const allowedFileTypes: string[] = [
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel.sheet.macroEnabled.12',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-word.document.macroEnabled.12',
  'application/vnd.oasis.opendocument.text',
  'application/vnd.oasis.opendocument.spreadsheet',
  'text/csv',
  'application/rtf',
  'text/plain',
  'application/zip',
  'com.adobe.pdf',
  'com.microsoft.excel.xls',
  'org.openxmlformats.spreadsheetml.sheet',
  'com.microsoft.word.doc',
  'org.openxmlformats.wordprocessingml.document',
  'public.comma-separated-values-text',
  'public.zip-archive',
  'public.plain-text',
]

export default () => {
  const pickFile = async (
    type: FilePickerTypes,
    onlyPhotos?: boolean
  ): Promise<AttachmentFileData[]> => {
    try {
      switch (type) {
        case FilePickerTypes.Camera:
          return await useDocumentScanner().scanDocument()
        case FilePickerTypes.PhotoLibrary:
          return await launchPhotoPicker()
        case FilePickerTypes.Upload:
          return await launchFilePicker(onlyPhotos)
      }
    } catch (error) {
      throw error
    }
  }

  const launchPhotoPicker = async (): Promise<AttachmentFileData[]> => {
    const libraryOptions: ImagePicker.ImageLibraryOptions = {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    }
    try {
      const response = await ImagePicker.launchImageLibrary(libraryOptions)
      if (response.assets && response.assets.length > 0) {
        return response.assets.map(i => {
          return {
            uri: i.uri,
            fileSize: i.fileSize,
            fileName: i.fileName,
          } as AttachmentFileData
        })
      }
    } catch (error) {
      console.error(
        '❌ ~ file: useFilePicker.ts: ~ launchPhotoPicker ~ error:',
        error
      )
    }
    throw new Error('No Images Selected')
  }

  const launchFilePicker = async (
    onlyPhotos?: boolean
  ): Promise<AttachmentFileData[]> => {
    try {
      const response = await DocumentPicker.pickSingle(
        onlyPhotos
          ? { type: allowedImageTypes }
          : { type: allowedFileTypes.concat(allowedImageTypes) }
      )
      const realURI = Platform.select({
        android: response.uri,
        ios: decodeURI(response.uri),
      })
      return [
        {
          uri: realURI,
          fileSize: response.size,
          fileName: response.name,
        },
      ]
    } catch (error) {
      console.error('❌ ~ file: useFilePicker.ts ~ error:', error)
      throw new Error('No Files Selected')
    }
  }

  return { pickFile }
}
