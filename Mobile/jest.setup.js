import 'whatwg-fetch'
import mockNavigation from 'react-native-gesture-handler/jestSetup'
import '@testing-library/jest-native/extend-expect'
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock'
import commonmock from './__mocks__/common-mock'
jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist')
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  }
})

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translation hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}))

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

jest.mock('react-native-gesture-handler', () => mockNavigation)
jest.mock('react-native-share', () => ({
  default: jest.fn(),
}))
jest.mock('react-native-file-viewer', () => ({ open: jest.fn }))
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
)
//react-native-document-picker
jest.mock('react-native-document-picker', () =>
  require('react-native-document-picker/mock')
)
jest.mock('react-native-document-picker', () => ({ default: jest.fn() }))

jest.mock('react-native-device-info', () => mockRNDeviceInfo)

jest.mock('@gorhom/bottom-sheet', () => {
  const RN = require('react-native')
  const { forwardRef } = jest.requireActual('react')
  const mockView = () => RN.View
  return {
    __esModule: true,
    default: forwardRef(() => mockView),
    namedExport: {
      ...require('react-native-reanimated/mock'),
      ...jest.requireActual('@gorhom/bottom-sheet'),
    },
  }
})


jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(() => ({})),
    useFocusEffect: jest.fn(() => ({})),
    useIsFocused: jest.fn(() => ({})),
  }
})
jest.mock('react-native-elements', () => ({
  Header: jest.fn(),
}))
global.setImmediate =
  global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args))
