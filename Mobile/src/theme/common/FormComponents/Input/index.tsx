import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ActivityIndicator } from 'react-native'
import {
  Icon,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements'
import { colors, constants } from '../../../../styles/global'
import styles from './styles'

class Input extends Component {
  state = {}

  static defaultProps = {
    showLoadingIndicator: false,
    showValidIndicator: false,
  }

  static propTypes = {
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    label: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    showLoadingIndicator: PropTypes.bool,
    showValidIndicator: PropTypes.bool,
    value: PropTypes.any,
    editable: PropTypes.bool,
  }

  render() {
    const {
      containerStyle,
      error,
      label,
      onBlur,
      onChange,
      onFocus,
      showLoadingIndicator,
      showValidIndicator,
      value,
      editable,
      ...otherProps
    } = this.props

    const inputStyle = {
      // width has to be explicitly set here. See this issue https://github.com/react-native-training/react-native-elements/issues/461
      width: '100%',
      color: constants.inputColor,
      paddingTop: 0,
    }

    if (editable === false) {
      inputStyle.color = constants.inputDisabledColor
    }

    return (
      <View style={[styles.container, containerStyle]}>
        {label && <FormLabel>{label}</FormLabel>}
        <FormInput
          inputStyle={inputStyle}
          onBlur={onBlur}
          onChangeText={onChange}
          onFocus={onFocus}
          value={value}
          underlineColorAndroid={inputStyle.color}
          editable={editable}
          placeholderTextColor={colors.grayMedium}
          {...otherProps}
        />
        {showValidIndicator && (
          <Icon
            color={colors.brandGreen}
            name="check-circle"
            containerStyle={styles.check}
            type="font-awesome"
          />
        )}
        <ActivityIndicator
          animating={showLoadingIndicator}
          style={styles.spinner}
        />
        {error && (
          <FormValidationMessage labelStyle={{ marginTop: 0 }}>
            {error}
          </FormValidationMessage>
        )}
      </View>
    )
  }
}

export default Input
