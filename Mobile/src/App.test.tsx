import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import App from './App'

test('render correctly', () => {
  const mockStore = configureMockStore()
  const store = mockStore({
    theme: { theme: 'default', darkMode: null },
  })

  const mockedProps = {
    route: {},
    navigation: {},
  }

  const component = renderer.create(
    <Provider store={store}>
      <App initialURL={''} />
    </Provider>
  )

  expect(component.toJSON()).toMatchSnapshot()
})
