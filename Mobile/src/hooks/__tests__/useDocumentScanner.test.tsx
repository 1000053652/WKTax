import { renderHook } from '@testing-library/react-hooks'
import useDocumentScanner from '../useDocumentScanner'
import { waitFor } from '@testing-library/react-native'
import * as mockDocumentScanner from './__mocks__/documentScanner.mock'

describe('Test UseDocumentScanner', () => {
  beforeEach(() => {
    mockDocumentScanner.reset()
  })

  afterAll(() => {
    mockDocumentScanner.reset()
  })

  it('return throw when Document scanner returns 0 images', async () => {
    mockDocumentScanner.resolveWithZeroImages()
    const { result } = renderHook(() => useDocumentScanner())
    await expect(result.current.scanDocument()).rejects.toThrow()
  })

  it('return throw when Document scanner returns error', async () => {
    mockDocumentScanner.rejectWithZeroImages()
    const { result } = renderHook(() => useDocumentScanner())
    await expect(result.current.scanDocument()).rejects.toThrow()
  })

  it('return valid array when Document scanner returns image', async () => {
    mockDocumentScanner.resolveWithOneImage({
      name: 'mockImage.jpg',
      path: 'test-path/mockImage.jpg',
      size: 10,
    })
    const { result } = renderHook(() => useDocumentScanner())
    const response = await result.current.scanDocument()
    await waitFor(() => {
      expect(response).toMatchObject([
        {
          uri: 'test-path/mockImage.jpg',
          fileSize: 10,
          fileName: 'mockImage.jpg',
        },
      ])
    })
  })
})
