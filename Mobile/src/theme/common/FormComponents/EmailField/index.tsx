import React, { Component } from 'react'
import commonValidators from 'src/utils/validators'
import ReduxFormInput from '../ReduxFormInput'
import ValidatedField from '../ValidatedField'

export default class EmailField extends Component {
  render() {
    return (
      <ValidatedField
        autoCapitalize="none"
        component={ReduxFormInput}
        keyboardType="email-address"
        label="Email Address"
        validators={[commonValidators.email]}
        {...this.props}
      />
    )
  }
}
