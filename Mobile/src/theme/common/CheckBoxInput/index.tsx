import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { glbStyles, colors } from '../../../styles/global'
import styles from './styles'

class CheckBoxInput extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
  }

  render() {
    const {
      input: { checked, onChange },
      ...otherProps
    } = this.props

    return (
      <View style={styles.container}>
        <CheckBox
          onPress={() => {
            return onChange(!checked)
          }}
          checked={checked}
          textStyle={glbStyles.label}
          checkedIcon="check-square"
          checkedColor={colors.linkBlue}
          containerStyle={styles.innerContainer}
          {...otherProps}
        />
      </View>
    )
  }
}

export default CheckBoxInput
