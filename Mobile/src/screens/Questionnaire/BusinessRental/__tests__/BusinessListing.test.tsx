import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import BusinessListing from '../BusinessListing'
import { BusinessRentalFarmType } from '../Utils'

test('render correctly', () => {
  const mockStore = configureMockStore()
  const store = mockStore({
    theme: { theme: 'default', darkMode: null },
  })

  const listingData = [
    {
      entityID: '',
      description: '',
      fieldValue: '',
      processedFieldValue: '',
      isProforma: false,
    },
  ]

  const component = renderer.create(
    <Provider store={store}>
      <BusinessListing
        type={BusinessRentalFarmType.Business}
        listingData={listingData}
        deleteRow={jest.fn()}
        onClickRow={jest.fn()}
        onAddClick={jest.fn()}
        isForBusiness={false}
      />
    </Provider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})
