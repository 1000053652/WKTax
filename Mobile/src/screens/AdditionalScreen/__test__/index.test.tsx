import React from 'react'
import { NavigationContext } from '@react-navigation/native'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import AdditionalInformation from '../index'

test('render correctly', () => {
  const navContext = {
      isFocused: () => true,
      // addListener returns an unscubscribe function.
      addListener: jest.fn(() => jest.fn()),
    }
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
      <NavigationContext.Provider value={navContext}>
        <AdditionalInformation {...mockedProps} />
      </NavigationContext.Provider>
    </Provider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})
