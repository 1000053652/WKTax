import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import FirmConnections from '../FirmConnections'

test('render correctly', () => {
  const mockStore = configureMockStore()
  const store = mockStore({
    theme: { theme: 'default', darkMode: null },
  })

  const mockedProps: any = {
    route: {},
    navigation: {},
  }

  const component = renderer.create(
    <Provider store={store}>
      <FirmConnections {...mockedProps} />
    </Provider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})
