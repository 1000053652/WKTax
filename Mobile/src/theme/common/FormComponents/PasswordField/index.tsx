import React, { Component } from 'react'
import { View } from 'react-native'
import commonValidators from 'src/utils/validators'
import { colors, constants } from '../../../../styles/global'
import ReduxFormInput from '../ReduxFormInput'
import ValidatedField from '../ValidatedField'
import ShowHidePassword from './ShowHidePassword'

const normalizePassword = val => val && val.trim()

export default class PasswordField extends Component {
  state = {
    hidePassword: true,
  }

  togglePasswordMask = () => {
    this.setState({ hidePassword: !this.state.hidePassword })
  }

  render() {
    const { hidePassword } = this.state
    return (
      <View>
        <ValidatedField
          component={ReduxFormInput}
          label="Password"
          maxLength={20}
          normalize={normalizePassword}
          secureTextEntry={hidePassword}
          validators={[commonValidators.password]}
          autoCapitalize="none"
          {...this.props}
        />
        <ShowHidePassword
          color={hidePassword ? colors.linkBlue : colors.brandGreen}
          position="absolute"
          top={constants.unit * 7}
          right={constants.unit * 4}
          togglePasswordMask={this.togglePasswordMask}
        />
      </View>
    )
  }
}
