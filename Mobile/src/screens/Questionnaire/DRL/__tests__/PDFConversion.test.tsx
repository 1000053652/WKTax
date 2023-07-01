import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import PDFConversion from '../PDFConversion'

test('render correctly', () => {
  const mockStore = configureMockStore()
  const store = mockStore({
    theme: { theme: 'default', darkMode: null },
  })

  const mockedProps: any = {
    route: {
      params: {
        selectedImages: [{
          uri: '',
          fileSize: 0,
          fileName: '',
        }],
        fileName: '',
        onSave: jest.fn(),
        onCancel: jest.fn(),
      }
    },
    navigation: jest.fn(),
  }

  const component = renderer.create(
    <Provider store={store}>
      <PDFConversion
        navigation={mockedProps.navigation}
        route={mockedProps.route}
      />
    </Provider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})