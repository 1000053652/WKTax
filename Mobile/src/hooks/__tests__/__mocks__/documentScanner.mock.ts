import DocumentScanner, {
  ScanDocumentResponseStatus,
} from 'react-native-document-scanner-plugin'
import RNFS from 'react-native-fs'

type MockStatResult = {
  name: string | undefined
  path: string
  size: number
}

const mockScanDocument = jest.spyOn(DocumentScanner, 'scanDocument')
const mockStat = jest.spyOn(RNFS, 'stat')

export const resolveWithZeroImages = () => {
  mockScanDocument.mockResolvedValue({
    scannedImages: [],
    status: ScanDocumentResponseStatus.Success,
  })
}

export const rejectWithZeroImages = () => {
  mockScanDocument.mockRejectedValue({
    scannedImages: [],
    status: ScanDocumentResponseStatus.Cancel,
  })
}

export const resolveWithOneImage = (result: MockStatResult) => {
  mockStat.mockResolvedValue({
    name: result.name,
    path: result.path,
    size: result.size,
    mode: 0,
    ctime: 0,
    mtime: 0,
    originalFilepath: result.path,
    isFile: jest.fn(),
    isDirectory: jest.fn(),
  })

  mockScanDocument.mockResolvedValue({
    scannedImages: [result.path],
    status: ScanDocumentResponseStatus.Success,
  })
}

export const reset = () => {
  mockScanDocument.mockReset()
  mockStat.mockReset()
}
