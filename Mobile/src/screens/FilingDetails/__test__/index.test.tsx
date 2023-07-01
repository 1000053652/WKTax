import React from 'react'
import { NavigationContext } from '@react-navigation/native'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import FilingDetails from '../index'

test('render correctly', () => {
    const navContext = {
        isFocused: () => true,
        // addListener returns an unscubscribe function.
        addListener: jest.fn(() => jest.fn()),
      }
  const mockStore = configureMockStore()
  const store = mockStore({
    theme: { theme: 'default', darkMode: null },
    home: {
      "clientUser": [{
        "clientUserStatus": 2,
        "firstName": "Questions",
        "fullName": "Questions Proforma",
        "initials": "QP",
        "isLoggedIn": true,
        "lastName": "Proforma",
        "signerTypeIntId": 1
      }],
      "clientUserDashboard": "",
      "clientUserFirmDetailsData": {
        "address": {
          "city": "Wichita",
          "line1": "9111 E Douglas",
          "line2": "",
          "line3": "",
          "postalCode": "67207",
          "state": "Kansas"
        },
        "name": "Kim, Tanuja, Hema",
        "phone": {
          "extension": "",
          "maskedPhoneNumber": "(316) -20-9-6711",
          "phoneNumber": "316-209-6711"
        },
        "webPageUrl": "https://www.google.com"
      },
      "clientUserRequestListData": [{
        "activeModuleTypes": 0,
        "canDisplayReopenMessage": true,
        "clientCollabToken": null,
        "clientDisplayName": "Q-MiscMax",
        "clientGuid": "afac59a6-b540-4b0e-a41a-041f096d91e0",
        "clientServiceTypeIntId": 1,
        "clientServiceTypeWithYearStr": "2022 Individual Tax Return",
        "clientType": 1,
        "isBilled": true,
        "isDefaultRequest": false,
        "isReturnExist": false,
        "isSelectedRequest": false,
        "reopenComment": null,
        "reopenStatus": 0,
        "requestGuid": "77139e81-34b7-4776-8a83-7a2e9e9279e9",
        "requestProgress": "You have some open tasks to complete",
        "serviceType": 1,
        "taxYear": 2022,
        "tenantId": 798432,
        "userGuid": "36aab909-3d4b-4e19-a394-f7ef7688bd30",
        "userStatus": 0
      }, {
        "activeModuleTypes": 0,
        "canDisplayReopenMessage": true,
        "clientCollabToken": null,
        "clientDisplayName": "EF_Joint1",
        "clientGuid": "2aa5b462-bc0b-4681-97cf-44c557fd01f8",
        "clientServiceTypeIntId": 1,
        "clientServiceTypeWithYearStr": "2022 Individual Tax Return",
        "clientType": 1,
        "isBilled": true,
        "isDefaultRequest": false,
        "isReturnExist": false,
        "isSelectedRequest": false,
        "reopenComment": null,
        "reopenStatus": 0,
        "requestGuid": "08124923-96ef-4acb-bc45-b6e5d30ef739",
        "requestProgress": "No open tasks at this time",
        "serviceType": 1,
        "taxYear": 2022,
        "tenantId": 798432,
        "userGuid": "36aab909-3d4b-4e19-a394-f7ef7688bd30",
        "userStatus": 0
      }, {
        "activeModuleTypes": 0,
        "canDisplayReopenMessage": true,
        "clientCollabToken": null,
        "clientDisplayName": "Drew-SchC",
        "clientGuid": "b618adf7-f879-46bf-b809-51afa00c97bc",
        "clientServiceTypeIntId": 1,
        "clientServiceTypeWithYearStr": "2022 Individual Tax Return",
        "clientType": 1,
        "isBilled": true,
        "isDefaultRequest": true,
        "isReturnExist": false,
        "isSelectedRequest": false,
        "reopenComment": null,
        "reopenStatus": 0,
        "requestGuid": "861c0233-f6b3-4303-afa9-18319a5df419",
        "requestProgress": "No open tasks at this time",
        "serviceType": 1,
        "taxYear": 2022,
        "tenantId": 798432,
        "userGuid": "36aab909-3d4b-4e19-a394-f7ef7688bd30",
        "userStatus": 0
      }, {
        "activeModuleTypes": 0,
        "canDisplayReopenMessage": true,
        "clientCollabToken": null,
        "clientDisplayName": "2KQ-Ded2",
        "clientGuid": "736263e8-27e7-496e-8350-5234eb2bb7c2",
        "clientServiceTypeIntId": 1,
        "clientServiceTypeWithYearStr": "2022 Individual Tax Return",
        "clientType": 1,
        "isBilled": true,
        "isDefaultRequest": false,
        "isReturnExist": false,
        "isSelectedRequest": false,
        "reopenComment": null,
        "reopenStatus": 0,
        "requestGuid": "a5f83aff-edf6-4ca2-ae83-a354311f57d2",
        "requestProgress": "No open tasks at this time",
        "serviceType": 1,
        "taxYear": 2022,
        "tenantId": 798432,
        "userGuid": "36aab909-3d4b-4e19-a394-f7ef7688bd30",
        "userStatus": 0
      }, {
        "activeModuleTypes": 0,
        "canDisplayReopenMessage": true,
        "clientCollabToken": null,
        "clientDisplayName": "1stnov8, 1stnov8",
        "clientGuid": "1a8ab980-0d2e-4669-9933-57c0310a7738",
        "clientServiceTypeIntId": 1,
        "clientServiceTypeWithYearStr": "2022 Individual Tax Return",
        "clientType": 1,
        "isBilled": true,
        "isDefaultRequest": false,
        "isReturnExist": false,
        "isSelectedRequest": false,
        "reopenComment": null,
        "reopenStatus": 0,
        "requestGuid": "7ecd00a7-128c-4332-a21e-509bdc14ceb2",
        "requestProgress": "You have some open tasks to complete",
        "serviceType": 1,
        "taxYear": 2022,
        "tenantId": 798432,
        "userGuid": "36aab909-3d4b-4e19-a394-f7ef7688bd30",
        "userStatus": 0
      }, {
        "activeModuleTypes": 7,
        "canDisplayReopenMessage": true,
        "clientCollabToken": null,
        "clientDisplayName": "41-20S1M",
        "clientGuid": "7d57bd4e-9d3d-45f0-861f-85aea4b99925",
        "clientServiceTypeIntId": 2,
        "clientServiceTypeWithYearStr": "2022 Corporation Tax Return",
        "clientType": 2,
        "isBilled": true,
        "isDefaultRequest": false,
        "isReturnExist": false,
        "isSelectedRequest": false,
        "reopenComment": null,
        "reopenStatus": 0,
        "requestGuid": "c485aa67-a76a-45d1-8460-b9da816e9947",
        "requestProgress": "You have some open tasks to complete",
        "serviceType": 1,
        "taxYear": 2022,
        "tenantId": 798432,
        "userGuid": "36aab909-3d4b-4e19-a394-f7ef7688bd30",
        "userStatus": 0
      }, {
        "activeModuleTypes": 0,
        "canDisplayReopenMessage": true,
        "clientCollabToken": null,
        "clientDisplayName": "21stoct8, 21stoct8",
        "clientGuid": "13d3788d-9376-40d8-adc6-e53b0fd01695",
        "clientServiceTypeIntId": 1,
        "clientServiceTypeWithYearStr": "2022 Individual Tax Return",
        "clientType": 1,
        "isBilled": true,
        "isDefaultRequest": false,
        "isReturnExist": false,
        "isSelectedRequest": false,
        "reopenComment": null,
        "reopenStatus": 0,
        "requestGuid": "09506966-8418-4ca2-9146-9d86f0e4e7d8",
        "requestProgress": "You have some open tasks to complete",
        "serviceType": 1,
        "taxYear": 2022,
        "tenantId": 798432,
        "userGuid": "36aab909-3d4b-4e19-a394-f7ef7688bd30",
        "userStatus": 0
      }, {
        "activeModuleTypes": 0,
        "canDisplayReopenMessage": true,
        "clientCollabToken": null,
        "clientDisplayName": "Eric345P",
        "clientGuid": "a13be588-fad2-4435-ae23-f78c9225ac3b",
        "clientServiceTypeIntId": 1,
        "clientServiceTypeWithYearStr": "2022 Individual Tax Return",
        "clientType": 1,
        "isBilled": true,
        "isDefaultRequest": false,
        "isReturnExist": false,
        "isSelectedRequest": true,
        "reopenComment": null,
        "reopenStatus": 0,
        "requestGuid": "ca28bc7e-d8f1-41ea-99c4-7c73e3b48612",
        "requestProgress": "You have some open tasks to complete",
        "serviceType": 1,
        "taxYear": 2022,
        "tenantId": 798432,
        "userGuid": "36aab909-3d4b-4e19-a394-f7ef7688bd30",
        "userStatus": 0
      }, {
        "activeModuleTypes": 7,
        "canDisplayReopenMessage": true,
        "clientCollabToken": null,
        "clientDisplayName": "SPONSOR1",
        "clientGuid": "1ca4981b-5233-4123-b25f-fe24c690f6a8",
        "clientServiceTypeIntId": 3,
        "clientServiceTypeWithYearStr": "2022 Employee Plan Tax Return",
        "clientType": 3,
        "isBilled": true,
        "isDefaultRequest": false,
        "isReturnExist": false,
        "isSelectedRequest": false,
        "reopenComment": null,
        "reopenStatus": 0,
        "requestGuid": "81bf2070-cfc2-42cb-917e-6b20ff90cfe4",
        "requestProgress": "You have some open tasks to complete",
        "serviceType": 1,
        "taxYear": 2022,
        "tenantId": 798432,
        "userGuid": "36aab909-3d4b-4e19-a394-f7ef7688bd30",
        "userStatus": 0
      }],
      "clientUserViewStatus": false,
      "singleServiceListData": {
        "activeModuleTypes": 0,
        "canDisplayReopenMessage": true,
        "clientCollabToken": null,
        "clientDisplayName": "Eric345P",
        "clientGuid": "a13be588-fad2-4435-ae23-f78c9225ac3b",
        "clientServiceTypeIntId": 1,
        "clientServiceTypeWithYearStr": "2022 Individual Tax Return",
        "clientType": 1,
        "isBilled": true,
        "isDefaultRequest": false,
        "isReturnExist": false,
        "isSelectedRequest": true,
        "reopenComment": null,
        "reopenStatus": 0,
        "requestGuid": "ca28bc7e-d8f1-41ea-99c4-7c73e3b48612",
        "requestProgress": "You have some open tasks to complete",
        "serviceType": 1,
        "taxYear": 2022,
        "tenantId": 798432,
        "userGuid": "36aab909-3d4b-4e19-a394-f7ef7688bd30",
        "userStatus": 0
      }
    }
  })

  const mockedProps: any = {
    route: jest.fn(),
    navigation: jest.fn(),
  }

  const component = renderer.create(
    <Provider store={store}>
        <NavigationContext.Provider value={navContext}>
        <FilingDetails
            navigation={mockedProps.navigation}
            route={mockedProps.route}
        />
      </NavigationContext.Provider>
    </Provider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})
