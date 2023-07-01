import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'

class ShowHidePassword extends Component {
  static propTypes = {
    togglePasswordMask: PropTypes.func.isRequired,
    color: PropTypes.string,
    top: PropTypes.number,
    right: PropTypes.number,
    position: PropTypes.string,
  }

  render() {
    return (
      <Icon
        name="eye"
        type="simple-line-icon"
        color={this.props.color}
        onPress={this.props.togglePasswordMask}
        size={22}
        containerStyle={{
          position: this.props.position,
          top: this.props.top,
          right: this.props.right,
        }}
      />
    )
  }
}

export default ShowHidePassword
