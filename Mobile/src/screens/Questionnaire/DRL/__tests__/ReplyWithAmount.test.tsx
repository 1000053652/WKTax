import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import ReplyWithAmount from '../ReplyWithAmount'

test('render correctly', () => {
  const mockStore = configureMockStore()
  const store = mockStore({
    theme: { theme: 'default', darkMode: null },
  })

  const mockedProps: any = {
    route: {
      params: {
        lineItem: {
          category: '',
          description: '',
          fileCount: 0,
          requestListId: 0,
          status: 0,
          completed: false,
          amount: 0,
          questionId: 0,
          isFromFirm: false,
          hasAnyFirmAttachments: false,
          expanded: false,
          attachments: [
            {
              fileName: '',
              fileId: 0,
              isFromFirm: false,
            },
          ],
        },
      },
    },
    navigation: jest.fn(),
  }

  const component = renderer.create(
    <Provider store={store}>
      <ReplyWithAmount
        navigation={mockedProps.navigation}
        route={mockedProps.route}
      />
    </Provider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})