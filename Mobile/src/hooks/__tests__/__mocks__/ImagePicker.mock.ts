import * as ImagePicker from 'react-native-image-picker'

const mockImagePicker = jest.spyOn(ImagePicker, 'launchImageLibrary')

export const resolveWithZeroImages = () => {
  mockImagePicker.mockResolvedValue({
    assets: [],
  })
}

export const rejectWithZeroImages = () => {
  mockImagePicker.mockRejectedValue({
    errorCode: 'permission',
    assets: [],
  })
}

export const resolveWithOneImage = (result: ImagePicker.Asset) => {
  mockImagePicker.mockResolvedValue({
    assets: [
      {
        uri: result.uri,
        fileSize: result.fileSize,
        fileName: result.fileName,
      },
    ],
  })
}

export const reset = () => {
  mockImagePicker.mockReset()
}
