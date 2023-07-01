import { renderHook } from '@testing-library/react-hooks'
import * as mockDocumentScanner from './__mocks__/documentScanner.mock'
import * as mockImagePicker from './__mocks__/ImagePicker.mock'
import * as mockDocumentPicker from './__mocks__/DocumentPicker.mock'

import { waitFor } from '@testing-library/react-native'
import useFilePicker from '../useFilePicker'
import { FilePickerTypes } from '../../types/commonTypes'

describe('Test useFilePicker for Camera Type', () => {
  beforeEach(() => {
    mockDocumentScanner.reset()
  })

  afterAll(() => {
    mockDocumentScanner.reset()
  })

  it('return throw when Camera Type succeeds with zero images', async () => {
    const { result } = renderHook(() => useFilePicker())
    mockDocumentScanner.resolveWithZeroImages()
    await expect(
      result.current.pickFile(FilePickerTypes.Camera)
    ).rejects.toThrow()
  })

  it('return valid array when Camera Type succeeds with multiple images', async () => {
    const { result } = renderHook(() => useFilePicker())
    mockDocumentScanner.resolveWithOneImage({
      name: 'test.jpg',
      path: 'mock/test.jpg',
      size: 20,
    })
    const response = await result.current.pickFile(FilePickerTypes.Camera)
    await waitFor(() => {
      expect(response).toMatchObject([
        {
          fileName: 'test.jpg',
          uri: 'mock/test.jpg',
          fileSize: 20,
        },
      ])
    })
  })

  it('return empty array when Camera Type fails', async () => {
    const { result } = renderHook(() => useFilePicker())
    mockDocumentScanner.rejectWithZeroImages()
    await expect(
      result.current.pickFile(FilePickerTypes.Camera)
    ).rejects.toThrow()
  })
})

describe('Test useFilePicker for Photo Library Type', () => {
  beforeEach(() => {
    mockImagePicker.reset()
  })

  afterAll(() => {
    mockImagePicker.reset()
  })

  it('return throw when Photo Type succeeds with zero images', async () => {
    const { result } = renderHook(() => useFilePicker())
    mockImagePicker.resolveWithZeroImages()
    await expect(
      result.current.pickFile(FilePickerTypes.PhotoLibrary)
    ).rejects.toThrow()
  })

  it('return throw when Photo Type fails', async () => {
    const { result } = renderHook(() => useFilePicker())
    mockImagePicker.rejectWithZeroImages()
    await expect(
      result.current.pickFile(FilePickerTypes.PhotoLibrary)
    ).rejects.toThrow()
  })

  it('return valid array when Photo Type succeeds with multiple images', async () => {
    const { result } = renderHook(() => useFilePicker())
    mockImagePicker.resolveWithOneImage({
      uri: 'mock/test.jpg',
      fileName: 'test.jpg',
      fileSize: 2,
    })
    const response = await result.current.pickFile(FilePickerTypes.PhotoLibrary)
    await waitFor(() => {
      expect(response).toMatchObject([
        {
          uri: 'mock/test.jpg',
          fileName: 'test.jpg',
          fileSize: 2,
        },
      ])
    })
  })
})

describe('Test useFilePicker for Upload Type', () => {
  beforeEach(() => {
    mockDocumentPicker.reset()
  })

  afterAll(() => {
    mockDocumentPicker.reset()
  })

  it('return valid array when Upload Type succeeds', async () => {
    const { result } = renderHook(() => useFilePicker())
    mockDocumentPicker.resolveWithValidValue({
      uri: 'test/mockfolder/test.jpg',
      name: 'test.jpg',
      fileCopyUri: 'test/mockfolder/test.jpg',
      type: null,
      size: 20,
    })
    const response = await result.current.pickFile(FilePickerTypes.Upload)
    await waitFor(() => {
      expect(response).toMatchObject([
        {
          uri: 'test/mockfolder/test.jpg',
          fileName: 'test.jpg',
          fileSize: 20,
        },
      ])
    })
  })

  it('return throw when Upload Type fails', async () => {
    const { result } = renderHook(() => useFilePicker())
    mockDocumentPicker.rejectWithError()
    await expect(
      result.current.pickFile(FilePickerTypes.Upload)
    ).rejects.toThrow()
  })
})
