import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import GiftSummaryUI from '../GiftSummaryUI'

test('render correctly', () => {
  const mockStore = configureMockStore()
  const store = mockStore({
    theme: { theme: 'default', darkMode: null },
  })

  const component = renderer.create(
    <Provider store={store}>
      <GiftSummaryUI
        giftData={[]}
        forGivenData={[]}
        isRefresh={false}
        disableAll={false}
        isSitchEnabledGift={false}
        isSitchEnabledForgiven={false}
        isFetching={false}
        dtToggleSwitch={jest.fn()}
        dtToggleSwitchForgiven={jest.fn()}
        YesNoCallback={jest.fn()}
        onPressAddGift={jest.fn()}
        onPressAddForgiven={jest.fn()}
        navigateToScreen={jest.fn()}
        navigateToScreenForgiven={jest.fn()}
        deleteGift={jest.fn()}
        submitGiftDetails={jest.fn()}
      />
    </Provider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})