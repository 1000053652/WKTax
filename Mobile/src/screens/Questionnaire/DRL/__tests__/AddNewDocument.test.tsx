import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import AddNewDocument from '../AddNewDocument'

test('render correctly', () => {
  const mockStore = configureMockStore()
  const store = mockStore({
    theme: { theme: 'default', darkMode: null },
  })

  const mockedProps: any = {
    route: {
      params: {
        onlyPhotos: false,
        isSupplimental: false,
        selectedFiles: jest.fn(),
      }
    },
    navigation: jest.fn(),
  }

  const component = renderer.create(
    <Provider store={store}>
      <AddNewDocument
        navigation={mockedProps.navigation}
        route={mockedProps.route}
      />
    </Provider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})