import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import GiftsScreen from '../index'

test('render correctly', () => {
  const mockStore = configureMockStore()
  const store = mockStore({
    theme: { theme: 'default', darkMode: null },
  })

  const mockedProps: any = {
    route: jest.fn(),
    navigation: jest.fn(),
  }

  const component = renderer.create(
    <Provider store={store}>
      <GiftsScreen
        navigation={mockedProps.navigation}
      />
    </Provider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})