import React, { Component } from 'react'
import transform from 'src/utils/transform'
import ReduxFormInput from '../ReduxFormInput'
import ValidatedField from '../ValidatedField'

export default class AddressField extends Component {
  render() {
    return (
      <ValidatedField
        component={ReduxFormInput}
        label="Address"
        normalize={transform.normalizeText}
        autoCapitalize="words"
        {...this.props}
      />
    )
  }
}
