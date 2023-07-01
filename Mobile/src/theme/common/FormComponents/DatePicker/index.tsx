import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { View } from 'react-native'
import RNDatePicker from 'react-native-datepicker'
import { FormLabel, FormValidationMessage, Icon } from 'react-native-elements'
import { glbStyles, colors } from 'src/styles/global'
import styles from './styles'

export const DATE_FORMAT = 'MMM D, YYYY'

class DatePicker extends Component {
  static propTypes = {
    accessibilityLabel: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    displayFormat: PropTypes.string,
    dataFormat: PropTypes.string,
    selectedDate: PropTypes.string,
    onDateChange: PropTypes.func.isRequired,
    meta: PropTypes.object.isRequired,
  }

  render() {
    const {
      label,
      placeholder = 'Select Date',
      displayFormat = DATE_FORMAT,
      dataFormat = 'YYYY-MM-DD',
      selectedDate = moment().format(dataFormat),
      onDateChange,
      meta: { touched, error } = {},
      accessibilityLabel,
      ...otherProps
    } = this.props

    const formattedDate = moment(selectedDate, dataFormat)
    const displayedDate = formattedDate.isValid()
      ? formattedDate.format(displayFormat)
      : selectedDate

    const iconProps = {
      color: colors.grayMedium,
      name: 'calendar-o',
      containerStyle: styles.calendarIcon,
      type: 'font-awesome',
    }

    const customStyles = {
      dateInput: styles.dateInput,
      dateText: styles.dateText,
      placeholderText: styles.placeholderText,
    }

    return (
      <View
        style={[glbStyles.marginBottom, styles.dateContainer]}
        accessibilityLabel={accessibilityLabel}
      >
        {label && <FormLabel labelStyle={{ marginLeft: 0 }}>{label}</FormLabel>}

        <RNDatePicker
          style={styles.datePicker}
          customStyles={customStyles}
          date={displayedDate}
          mode="date"
          placeholder={placeholder}
          format={DATE_FORMAT}
          showIcon
          iconComponent={<Icon {...iconProps} />}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={onDateChange}
          {...otherProps}
        />

        {touched && error && (
          <FormValidationMessage>{error}</FormValidationMessage>
        )}
      </View>
    )
  }
}

export default DatePicker
