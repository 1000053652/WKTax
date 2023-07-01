import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import AddViewDepenedents from '../AddViewDepenedents'

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
      <AddViewDepenedents
        navigation={mockedProps.navigation}
        route={mockedProps.route}
      />
    </Provider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})