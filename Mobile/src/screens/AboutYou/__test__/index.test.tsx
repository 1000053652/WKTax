import React from 'react'
import { NavigationContext } from '@react-navigation/native'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import AboutYou from '../index'

test('render correctly', () => {
  const navContext = {
      isFocused: () => true,
      // addListener returns an unscubscribe function.
      addListener: jest.fn(() => jest.fn()),
    }
  const mockStore = configureMockStore()
  const store = mockStore({
    theme: { theme: 'default', darkMode: null },
    aboutyou:{
        "address": {
            "id": "3",
            "title": "Address",
            "txtApt": "",
            "txtCity": "",
            "txtForeignCountry": "",
            "txtForeignCounty": "",
            "txtForeignPostalCode": "",
            "txtState": "",
            "txtStreet": "",
            "txtZIP": ""
        },
        "qAndA": [{
            "id": 0,
            "questions": "aboutYou:YANDN:q1",
            "spYOrN": "",
            "taxYOrN": "",
            "title": "qAndn"
        }, {
            "id": 1,
            "questions": "aboutYou:YANDN:q2",
            "spYOrN": "",
            "taxYOrN": "",
            "title": "qAndn"
        }, {
            "id": 2,
            "questions": "aboutYou:YANDN:q3",
            "spYOrN": "",
            "taxYOrN": "",
            "title": "qAndn"
        }, {
            "id": 3,
            "questions": "aboutYou:YANDN:q4",
            "spYOrN": "",
            "taxYOrN": "",
            "title": "qAndn"
        }, {
            "id": 4,
            "questions": "aboutYou:YANDN:q5",
            "spYOrN": "",
            "taxYOrN": "",
            "title": "qAndn"
        }],
        "spouseTaxPayer": {
            "cmbTPState": "",
            "datTPDOB": "",
            "datTPDeceased": "",
            "datTPExpiration": "",
            "datTPIssue": "",
            "id": "2",
            "ssnTP_X": "",
            "title": "Spouse",
            "txtTPCellPH": "",
            "txtTPCellPref": "",
            "txtTPDL": "",
            "txtTPDTPref": "",
            "txtTPEPPref": "",
            "txtTPEmail": "",
            "txtTPEveningPH": "",
            "txtTPFirstName": "",
            "txtTPFullName": "  ",
            "txtTPLastName": "",
            "txtTPMiddleInitial": "",
            "txtTPOccupation": "",
            "txtTPWorkPH": "",
            "ynoTPCitizen": "",
            "ynoTPClaimed": "",
            "ynoTPLegallyBlind": "",
            "ynoTPMilitary": "",
            "ynoTPPECF": ""
        },
        "taxPayer": {
            "cmbTPState": "",
            "datTPDOB": "",
            "datTPDeceased": "",
            "datTPExpiration": "",
            "datTPIssue": "",
            "id": "1",
            "ssnTP_X": "",
            "title": "Taxpayer",
            "txtTPCellPH": "",
            "txtTPCellPref": "",
            "txtTPDL": "",
            "txtTPDTPref": "",
            "txtTPEPPref": "",
            "txtTPEmail": "",
            "txtTPEveningPH": "",
            "txtTPFirstName": "",
            "txtTPFullName": "  ",
            "txtTPLastName": "",
            "txtTPMiddleInitial": "",
            "txtTPOccupation": "",
            "txtTPWorkPH": "",
            "ynoTPCitizen": "",
            "ynoTPClaimed": "",
            "ynoTPLegallyBlind": "",
            "ynoTPMilitary": "",
            "ynoTPPECF": ""
        },
        "ynoCheck": null
    }
  })

  const mockedProps: any = {
    route: {},
    navigation: {},
  }

  const component = renderer.create(
    <Provider store={store}>
      <NavigationContext.Provider value={navContext}>
        <AboutYou {...mockedProps} />
      </NavigationContext.Provider>
    </Provider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})
