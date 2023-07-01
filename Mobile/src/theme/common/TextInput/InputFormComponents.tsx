import React from 'react'
import ControlledInput from '../TextInput/ControlledInput'
import {
  normalizeText,
  formatPhone,
  filterNumbers,
  usPhoneNumberValidator,
  formateAmount,
  checkMaxLenghtForNumberField,
  required,
} from './utils'
import { commonValidators } from './constants'
import { FieldProps } from './types'
import { styles } from './styles'
import { Controller, ControllerFieldState, ControllerRenderProps, FieldValues, RegisterOptions } from 'react-hook-form'
import { View } from 'react-native'
import Text from '../Text/index'
import { Dropdown } from 'react-native-element-dropdown'
import { t } from 'i18next'

//Date Picker
export const DatePicker = ({
  control,
  open,
  onConfirm,
  onCancel,
  name,
  label,
  required,
  testID,
  defaultValue,
}: FieldProps) => (
  <Controller
    control={control}
    name={name}
    validators={
      required ? [commonValidators.required] : [commonValidators.required]
    }
    testID={testID ? testID : name}
    render={({ field }) => (
      <View style={styles.container} testID={`${testID}`}>
        {label && (
          <Text style={styles.label} testID={`${testID}_label`}>
            {label}
          </Text>
        )}
        <DatePicker
          modal
          mode="date"
          open={open}
          date={new Date()}
          defaultValue={defaultValue}
          onConfirm={date => onConfirm(date)}
          onCancel={() => onCancel()}
        />
      </View>
    )}
  />
)

//Dropdown....
// @ts-ignore
// @ts-ignore
// use email validation in dev code. Refer https://stackoverflow.com/a/63000900
export const EmailField = ({
  control,
  name,
  label,
  testID,
  required,
  editable,
  disabled,
  defaultValue,
}: FieldProps) => (
  <ControlledInput
    autoCapitalize="none"
    keyboardType="email-address"
    validators={
      required ? [commonValidators.required] : [commonValidators.required]
    }
    label={label}
    control={control}
    name={name}
    testID={testID ? testID : name}
    editable={editable}
    disabled={disabled}
    defaultValue={defaultValue}
  />
)

export const TextField = (props: FieldProps) => (
  <ControlledInput
    autoCapitalize="words"
    normalize={normalizeText}
    validators={props.required ? [commonValidators.required] : []}
    control={props.control}
    placeholder={props.placeholder}
    name={props.name}
    label={props.label}
    error={props.error}
    heightForMultilineTextField={props.heightForMultilineTextField}
    testID={props.testID ? props.testID : props.name}
    defaultValue={props.defaultValue}
    disabled={props.disabled}
    editable={props.editable}
    styleTextBox={props.styleTextBox}
    isTextArea={props.isTextArea}
    min={props.min}
    max={props.max}
    keyboardType={props?.keyboardType}
  />
)

// Use minLength validation of 10 in dev code. Refer https://react-hook-form.com/get-started/#Applyvalidation
export const PhoneNumberField = ({
  control,
  name,
  label,
  testID,
  defaultValue,
  placeholder,
}: FieldProps) => (
  <ControlledInput
    keyboardType="phone-pad"
    label={label}
    normalize={formatPhone}
    validators={[commonValidators.required, usPhoneNumberValidator]}
    control={control}
    name={name}
    testID={testID ? testID : name}
    defaultValue={defaultValue}
    placeholder={placeholder}
  />
)

export const NumberField = ({
  control,
  name,
  label,
  testID,
  required,
  max,
  min,
  error,
  defaultValue,
  disabled,
  editable,
  styleTextBox,
  fieldType,
  maxValue,
  pattern,
}: FieldProps) => (
  <ControlledInput
    pointerEvents={'box-only'}
    keyboardType="number-pad"
    label={label}
    min={min}
    max={checkMaxLenghtForNumberField(fieldType, max)}
    validators={required ? [commonValidators.required] : []}
    control={control}
    name={name}
    error={error}
    styleTextBox={styleTextBox}
    testID={testID ? testID : name}
    defaultValue={defaultValue}
    disabled={disabled}
    editable={editable}
    fieldType={fieldType}
    normalize={value =>
      formateAmount(value, fieldType ? fieldType : 'number', maxValue, pattern)
    }
  />
)

// Use minLength validation of 5 in dev code. Refer https://react-hook-form.com/get-started/#Applyvalidation
export const ZipCodeField = ({
  control,
  name,
  label,
  required,
  testID,
  defaultValue,
  keyboardType,
  max,
  min,
  error,
}: FieldProps) => (
  <ControlledInput
    fieldType="number"
    label={label}
    normalize={filterNumbers}
    validators={required ? [commonValidators.zipCodeLength(5)] : []}
    control={control}
    name={name}
    testID={testID ? testID : name}
    defaultValue={defaultValue}
    keyboardType={keyboardType ? keyboardType : 'number-pad'}
    max={max}
    min={min}
    error={error}
  />
)
