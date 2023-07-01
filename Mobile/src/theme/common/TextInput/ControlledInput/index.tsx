import React, { ReactElement } from 'react'
import {
  Controller,
  UseControllerProps,
  useController,
  Control,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form'
import { KeyboardTypeOptions } from 'react-native'
import { Color } from '../../../constants'
import Input from '../Input'
import { BaseProps, Maybe } from '../../../../types'
import { commonValidators } from '../constants'
import { t } from 'i18next'
import { required } from '../utils'

interface ControlledInputProps extends UseControllerProps, BaseProps {
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined
  editable?: boolean
  keyboardType?: KeyboardTypeOptions | undefined
  label?: string
  placeholder?: string
  secureTextEntry?: boolean | undefined
  icon?: ReactElement<any>
  required?: boolean
  iconPressed?: () => void
  validators?: Array<string>
  defaultValue?: Maybe<string> | undefined
  textInputRef?: string
  normalize?: (value: string) => void
  heightForMultilineTextField?: number
  testID?: string
  fieldType?: string
  control?: Control<FieldValues, any>
  disabled?: boolean
  labelStyles?: {}
  iconStyles?: {}
  styleTextBox?: {}
  onChangeText?: (value: string) => void
  min?: number
  max?: number
  isTextArea?: boolean
  error?: string | null
}

const ControlledInput = ({
  control,
  name,
  editable = true,
  label,
  required: requiredField,
  validators,
  defaultValue = '',
  textInputRef,
  normalize,
  heightForMultilineTextField,
  testID,
  fieldType,
  disabled,
  max,
  min,
  placeholder,
  styleTextBox,
  isTextArea,
  keyboardType,
  error,
  ...props
}: ControlledInputProps) => {
  const checkIsRequired = (value?: string) => {
    return required(value)
      ? undefined
      : error
      ? error
      : t('common:REQUIRED_FIELD')
  }
  const rules: RegisterOptions = {
    validate: {
      ...(requiredField && {
        required: value => checkIsRequired(value),
      }),
      ...validators,
    },
  }
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  const handleChangeText = (event: string) => {
    let value = event
    if (normalize) value = normalize(value)
    field.onChange(value)
  }
  return (
    <Controller
      rules={rules}
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Input
            isTextArea={isTextArea}
            type={fieldType}
            accessibilityLabel={`${name}_input`}
            testID={testID}
            editable={editable}
            error={error ? error : fieldState.error?.message}
            label={label}
            max={max}
            min={min}
            onBlur={field.onBlur}
            onChangeText={handleChangeText}
            placeholderTextColor={Color.grayMedium}
            ref={textInputRef}
            value={field.value as string}
            disabled={disabled}
            height={heightForMultilineTextField}
            placeholder={placeholder}
            defaultValue={defaultValue}
            TextInputContainerStyle={styleTextBox}
            keyboardType={keyboardType}
            {...props}
            {...field}
          />
        )
      }}
    />
  )
}

export default ControlledInput
