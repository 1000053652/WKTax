import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import ThreeColumnListItem from '../ThreeColumnListItem'
import { withReactHookForm } from '../../../../../__mocks__/helper'

test('render correctly', () => {
  const mockStore = configureMockStore()
  const store = mockStore({
    theme: { theme: 'default', darkMode: null },
  })

  const FormComponent = withReactHookForm(ThreeColumnListItem,{item:{
    questionTitle: '',
    answer1Key: '',
    answer2Key: '',
    type: '',
    maxValue: '',
  }})

  const component = renderer.create(
    <Provider store={store}>
      <FormComponent 
      />
    </Provider>
  )
  expect(component.toJSON()).toMatchSnapshot()
})
