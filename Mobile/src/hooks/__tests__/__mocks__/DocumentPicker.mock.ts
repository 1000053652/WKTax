import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker'

export const resolveWithValidValue = (res: DocumentPickerResponse) => {
  DocumentPicker.pickSingle = jest.fn().mockResolvedValue({
    uri: res.uri,
    name: res.name,
    fileCopyUri: res.fileCopyUri,
    type: res.type,
    size: res.size,
  })
}

export const rejectWithError = () => {
  DocumentPicker.pickSingle = jest.fn().mockRejectedValue({})
}

export const reset = () => {
  jest.clearAllMocks()
}
