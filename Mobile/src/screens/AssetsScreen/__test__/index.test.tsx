import React from 'react'
import { NavigationContext } from '@react-navigation/native'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import AsstesScreen from '../index'

test('render correctly', () => {
  const navContext = {
      isFocused: () => true,
      // addListener returns an unscubscribe function.
      addListener: jest.fn(() => jest.fn()),
    }
  const mockStore = configureMockStore()
  const store = mockStore({
    theme: { theme: 'default', darkMode: null },
    assetsEvent: {
        "getAssetsData": {
            "error": null,
            "payload": "{\"navResultType\":2,\"navHelper\":{\"tabCode\":null,\"subTabCode\":null,\"tabDescription\":null,\"pageCode\":null,\"entityID\":\"171.13531\",\"pageDescription\":null,\"isBelowRepeater\":false,\"isListPage\":false,\"pageListItems\":null},\"pageName\":null,\"miDataModel\":{\"data\":null,\"grids\":[{\"tableName\":\"[Form 420]\",\"groupName\":\"Depreciation\",\"fieldNames\":\"[X If Not New], [Description], [Cost or Other Basis], [Date In Service], [Date Sold], [Selling Price]\",\"topHeaders\":null,\"headers\":null,\"dropdownItems\":null,\"controls\":null,\"columnWidths\":null,\"maxLengths\":null,\"addButtonText\":null,\"gridNo\":0,\"showAttach\":false,\"attachTarget\":null,\"data\":[{\"X If Not New\":\"\",\"Description\":\"Lkfndv\",\"Cost or Other Basis\":\"52532.0000\",\"Date In Service\":\"06/04/2023\",\"Date Sold\":\"06/04/2023\",\"Selling Price\":\"52352.0000\",\"id\":\"5790\"},{\"X If Not New\":\"\",\"Description\":\"Vivek\",\"Cost or Other Basis\":\"0.0000\",\"Date In Service\":\"06/17/2023\",\"Date Sold\":\"06/17/2023\",\"Selling Price\":\"0.0000\",\"id\":\"6193\"},{\"X If Not New\":\"\",\"Description\":\"Wefwer\",\"Cost or Other Basis\":\"0.0000\",\"Date In Service\":\"\",\"Date Sold\":\"\",\"Selling Price\":\"0.0000\",\"id\":\"6288\"},{\"X If Not New\":\"\",\"Description\":\"Wewe\",\"Cost or Other Basis\":\"0.0000\",\"Date In Service\":\"\",\"Date Sold\":\"\",\"Selling Price\":\"0.0000\",\"id\":\"6291\"},{\"X If Not New\":\"\",\"Description\":\"Kri\",\"Cost or Other Basis\":\"0.0000\",\"Date In Service\":\"\",\"Date Sold\":\"\",\"Selling Price\":\"0.0000\",\"id\":\"6292\"},{\"X If Not New\":\"\",\"Description\":\"Qidtqiuwu\",\"Cost or Other Basis\":\"0.0000\",\"Date In Service\":\"\",\"Date Sold\":\"\",\"Selling Price\":\"0.0000\",\"id\":\"6294\"},{\"X If Not New\":\"\",\"Description\":\"Kcakscj\",\"Cost or Other Basis\":\"0.0000\",\"Date In Service\":\"\",\"Date Sold\":\"\",\"Selling Price\":\"0.0000\",\"id\":\"6295\"},{\"X If Not New\":\"\",\"Description\":\"\",\"Cost or Other Basis\":\"\",\"Date In Service\":\"\",\"Date Sold\":\"\",\"Selling Price\":\"\",\"id\":\"new\"}]}]},\"selectedEntityId\":null,\"action\":null,\"controller\":null}",
            "payloadtype": "NavResult",
            "requestid": ""
        },
        "getAssetsDelete": ""
    }
  })

  const mockedProps: any = {
    route: {},
    navigation: {},
  }

  const component = renderer.create(
    <Provider store={store}>
      <NavigationContext.Provider value={navContext}>
        <AsstesScreen {...mockedProps} />
      </NavigationContext.Provider>
    </Provider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})
