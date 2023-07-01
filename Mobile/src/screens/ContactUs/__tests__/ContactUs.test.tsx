import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import ContactUs from '../ContactUs'

test('render correctly', () => {
  const mockStore = configureMockStore()
  const store = mockStore({
    theme: { theme: 'default', darkMode: null },
  })

  const component = renderer.create(
    <Provider store={store}>
      <ContactUs />
    </Provider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})
