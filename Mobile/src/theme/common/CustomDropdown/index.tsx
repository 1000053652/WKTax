import React from 'react'
import { View } from 'react-native'
import { t } from 'i18next'
import { FieldProps } from '../TextInput/types'
import { required } from '../TextInput/utils'
import {
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form'
import { styles } from './styles'
import Text from '../Text/index'
import { Dropdown } from 'react-native-element-dropdown'

export interface CustomDropdownProps extends FieldProps {
  containerStyle?: {}
  boxStyles?: {}
  placeholderStyle?: {}
  dropdownTextStyles?: {}
  dropdownItemStyles?: {}
  iconStyle?: {}
  maxHeight?: number
  search?: boolean
  dropdownValue?: string
  dropdownKey?: string
  defaultValue?: any
  required?: boolean
  validators?: Array<string>
  dropdownValueChange?: (value: any) => void
}
export const CustomDropdown = (props: CustomDropdownProps) => {
  const checkIsRequired = (value?: string) => {
    return required(value)
      ? undefined
      : props.error
      ? props.error
      : t('common:REQUIRED_FIELD')
  }
  const rules: RegisterOptions = {
    validate: {
      ...(props.required && {
        required: value => checkIsRequired(value),
      }),
      ...props?.validators,
    },
  }
  const renderDropdownView = (
    field: ControllerRenderProps<FieldValues, string>,
    fieldState: ControllerFieldState
  ) => {
    return (
      <View style={[styles.container, props.containerStyle]}>
        {props.label && (
          <Text
            testID={props.label}
            stylesContainerText={[styles.label, props.labelStyle]}
          >
            {props.label}
          </Text>
        )}
        <Dropdown
          dropdownPosition={
            props.dropdownPosition ? props.dropdownPosition : 'bottom'
          }
          style={[
            fieldState.error?.message
              ? styles.dropdownViewErrorStyle
              : props.boxStyles
              ? props.boxStyles
              : styles.dropdownViewStyle,
          ]}
          placeholderStyle={
            props.placeholderStyle
              ? props.placeholderStyle
              : styles.placeholderStyle
          }
          selectedTextStyle={
            props.dropdownTextStyles
              ? props.dropdownTextStyles
              : styles.selectedTextStyle
          }
          itemContainerStyle={
            props.dropdownItemStyles
              ? props.dropdownItemStyles
              : styles.itemContainerStyle
          }
          iconStyle={props.iconStyle ? props.iconStyle : styles.iconStyle}
          data={props.data}
          maxHeight={props.maxHeight ? props.maxHeight : 300}
          search={props.search}
          labelField={props.dropdownValue ? props.dropdownValue : 'value'}
          valueField={props.dropdownKey ? props.dropdownKey : 'label'}
          disable={props.disabled}
          value={field.value}
          placeholder={props.placeholder}
          onChange={item => {
            field.onChange(item[props.dropdownKey ?? 'label'])
            if (props.dropdownValueChange) {
              props.dropdownValueChange(item[props.dropdownKey ?? 'label'])
            }
          }}
        />
        {(props.error || fieldState.error?.message) && (
          <Text
            stylesContainerText={styles.error}
            testID={`${props.testID ? props.testID : props.name}_error`}
          >
            {String(props.error ? props.error : fieldState.error?.message)}
          </Text>
        )}
      </View>
    )
  }
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={rules}
      heightForMultilineTextField={props.heightForMultilineTextField}
      testID={props.testID ? props.testID : props.name}
      render={({ field, fieldState }) => renderDropdownView(field, fieldState)}
    />
  )
}
