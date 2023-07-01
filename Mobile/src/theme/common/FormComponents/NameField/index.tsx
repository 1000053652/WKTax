import React, { Component } from 'react'
import transform from 'src/utils/transform'
import ValidatedField from '../ValidatedField'
import ReduxFormInput from '../ReduxFormInput'

export default class NameField extends Component {
  render() {
    return (
      <ValidatedField
        component={ReduxFormInput}
        normalize={transform.normalizeText}
        autoCapitalize="words"
        {...this.props}
      />
    )
  }
}
