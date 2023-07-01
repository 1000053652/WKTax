import React, { useState } from 'react'
import Text from '../Text'
import {
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native'
import styles from './styles'
import moment from 'moment'
import DatePicker from 'react-native-date-picker'
import CalendarIcon from '../../../Assets/Calendar.png'
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form'
import { imageConstant } from '../../Images'
import { t } from 'i18next'
import { required } from '../TextInput/utils'

export const dateFormatPlaceFolder = 'mm/dd/yyyy'
export interface CommonDatePickerProps {
  control: Control<FieldValues, any>
  name: string
  title: string
  minimumDate?: Date | undefined
  maximumDate?: Date | undefined
  placeholderText?: string | null
  dateFormat?: string | null
  testId: string
  icon?: ImageSourcePropType
  containerStyle?: {}
  titleStyle?: {}
  boxViewStyle?: {}
  placeHolderStyle?: {}
  iconStyle?: {}
  onConfirm?: (date: Date) => void
  onClear?: (name: string) => void
  closedIcon?: ImageSourcePropType
  error?: string | null
  validators?: Array<string>
  required?: boolean
}

const CommonDatePicker = (props: CommonDatePickerProps) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const [showClearButton, setShowClearButton] = useState(false)
  const onClearTap = (onChange: (...event: any[]) => void) => {
    setShowClearButton(false)
    onChange('')
    if (props.onClear !== undefined) {
      props.onClear(dateFormatPlaceFolder)
    }
  }
  const setDateValue = (value: string) => {
    const isInValidValue = value == null || value == '' || value == undefined
    setShowClearButton(!isInValidValue)
    return isInValidValue
      ? props.placeholderText ?? props.dateFormat ?? dateFormatPlaceFolder
      : value
  }
  const convertValueToDate = (value: any) => {
    return value == null || value == '' || value == undefined
      ? new Date()
      : moment(value, props.dateFormat ?? dateFormatPlaceFolder).toDate()
  }
  const convertDateToString = (date: Date) => {
    return moment(date, props.dateFormat ?? dateFormatPlaceFolder)
      .format(props.dateFormat ?? dateFormatPlaceFolder)
      .toString()
  }
  const onConfirm = (date: Date, onChange: (...event: any[]) => void) => {
    onChange(convertDateToString(date))
    setDatePickerVisible(false)
    setShowClearButton(true)
    if (props.onConfirm !== undefined) {
      props.onConfirm(date)
    }
  }
  const onCancelDatePicker = () => {
    setDatePickerVisible(false)
  }
  const checkIsRequired = (value?: string) => {
    return required(value)
      ? undefined
      : props.error
      ? props.error
      : t('common:DATE_REQUIRED')
  }
  const rules: RegisterOptions = {
    validate: {
      ...(props.required && {
        required: checkIsRequired,
      }),
      ...props?.validators,
    },
  }
  return (
    <Controller
      control={props.control}
      rules={rules}
      name={props.name}
      label={props.title}
      testID={props.testId}
      render={({ field: { onChange, value }, fieldState }) => (
        <View style={[styles.datePickerContainer, props.containerStyle]}>
          <Text
            children={props.title}
            testID={props.testId}
            stylesContainerText={[styles.datePickerTitle, props.titleStyle]}
          />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={[
                fieldState.error?.message
                  ? styles.datePickerErrorBoxView
                  : styles.datePickerBoxView,
                props.boxViewStyle,
              ]}
              onPress={() => setDatePickerVisible(true)}
            >
              <Text
                children={setDateValue(value)}
                testID={props.testId}
                stylesContainerText={[
                  styles.datePickerPlaceHolderText,
                  props.placeHolderStyle,
                ]}
              />
              <Image
                source={props.icon ?? CalendarIcon}
                style={[styles.datePickerIcon, props.iconStyle]}
              />
            </TouchableOpacity>
            {showClearButton && (
              <TouchableOpacity
                onPress={() => onClearTap(onChange)}
                style={styles.clearContainer}
              >
                <Image
                  source={props.closedIcon ?? imageConstant.crossIcon}
                  style={[styles.clearImage]}
                />
              </TouchableOpacity>
            )}
          </View>
          <DatePicker
            title={props.title}
            modal
            mode="date"
            open={isDatePickerVisible}
            date={convertValueToDate(value)}
            maximumDate={props.maximumDate}
            minimumDate={props.minimumDate}
            onConfirm={date => onConfirm(date, onChange)}
            onCancel={() => onCancelDatePicker()}
          />
          {(props.error || fieldState.error?.message) && (
            <Text stylesContainerText={styles.error} testID={props.testId}>
              {String(props.error ? props.error : fieldState.error?.message)}
            </Text>
          )}
        </View>
      )}
    />
  )
}
export default CommonDatePicker
