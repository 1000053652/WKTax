import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import ThreeColumnsHeader from '../ThreeColumnsHeader'

test('render correctly', () => {
  const mockStore = configureMockStore()
  const store = mockStore({
    theme: { theme: 'default', darkMode: null },
  })

  const component = renderer.create(
    <Provider store={store}>
      <ThreeColumnsHeader title1="" title2="" title3="" />
    </Provider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})
