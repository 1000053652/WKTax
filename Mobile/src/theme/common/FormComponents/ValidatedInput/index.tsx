import React, { Component } from 'react'
import PropTypes from 'prop-types'
import commonValidators from 'src/utils/validators'
import Input from '../Input'

export default class ValidatedInput extends Component {
  state = {
    error: false,
  }

  static defaultProps = {
    format: input => input,
    parse: input => input,
    validators: [],
  }

  static propTypes = {
    error: PropTypes.oneOf([PropTypes.bool, PropTypes.string]),
    format: PropTypes.func,
    parse: PropTypes.func,
    required: PropTypes.bool,
    validators: PropTypes.array,
  }

  componentDidMount() {
    const validators = [...this.props.validators]
    this.props.required && validators.unshift(commonValidators.required)
    this.setState({ validators })
  }

  // Validate whenever state.value is changed.
  componentWillUpdate(nextProps, nextState) {
    if (this.state.value !== nextState.value) {
      this.validate()
    }
  }

  validate = () => {
    const hasError = this.state.validators.some(validator => {
      const error = validator(this.state.value)
      if (error) {
        this.setState({ error })
        return true
      }
    })

    if (!hasError) {
      this.setState({ error: false })
    }

    return hasError
  }

  updateInput = input => {
    this.setState({ value: this.props.parse(input) })
  }

  render() {
    const { format, ...otherProps } = this.props
    const { error, value } = this.state
    return (
      <Input
        onBlur={this.validate}
        onChange={this.updateInput}
        value={format(value)}
        error={error}
        {...otherProps}
      />
    )
  }
}
