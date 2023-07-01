import React from 'react'
import {
  TextInput,
  TextInputProps,
  Text,
  View,
  TextProps,
  Pressable,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native'
import { FieldError, Merge, FieldErrorsImpl } from 'react-hook-form'
import { Maybe } from '../../../../types'
import {
  Color,
  FontSize,
  FontFace,
  Spacing,
  BorderRadius,
  Thickness,
  Dimension,
  Colors,
  horizontalScale,
  FontFamily,
  moderateScale,
  FontWeight,
  verticalScale,
} from '../../../constants'

interface InputProps extends TextInputProps, TextProps {
  label?: string
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined
  iconPressed?: () => void
  hasClearIcon?: boolean
  onChange?: () => void
  disabled?: boolean
  defaultValue?: Maybe<string> | undefined
  styleTextBox?: {}
  isTextArea?: boolean
}

export const assignTextStyle = (
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined,
  disabled?: boolean
) => {
  if (error) {
    return styles.textInputError
  } else if (disabled) {
    return styles.textInputDisabled
  } else {
    return styles.textInputContainer
  }
}

const Input: React.FC<InputProps> = ({
  placeholder,
  label = '',
  value,
  error,
  hasClearIcon,
  iconPressed,
  onChange,
  editable,
  max,
  min,
  TextInputContainerStyle,
  TextInputStyle,
  labelStyle,
  icon,
  iconClick,
  onPressIcon,
  iconStyles,
  disabled,
  testID = 'test_id_input',
  defaultValue,
  isTextArea,
  height,
  keyboardType,
  ...props
}) => {
  const clearText = () => onChange('')

  return (
    <View
      style={[styles.container, TextInputContainerStyle]}
      testID={`${testID}`}
    >
      {label && (
        <Text style={[styles.label, labelStyle]} testID={`${testID}_label`}>
          {label}
        </Text>
      )}
      <View style={[assignTextStyle(error, disabled)]}>
        <TextInput
          multiline={isTextArea}
          numberOfLines={isTextArea ? 4 : 1}
          accessibilityLabel={`${label}_input`}
          placeholder={placeholder}
          style={[
            isTextArea ? styles.textInputArea : styles.textInput,
            TextInputStyle,
          ]}
          testID={`${testID}_textinput`}
          value={value}
          minLength={min}
          maxLength={max}
          editable={editable}
          defaultValue={defaultValue}
          keyboardType={keyboardType}
          ontextMenuHidden={false}
          {...props}
        />
        {icon && (
          <TouchableOpacity
            style={{ width: '20%' }}
            disabled={iconClick}
            onPress={onPressIcon}
          >
            <Image style={iconStyles} source={icon} resizeMode="contain" />
          </TouchableOpacity>
        )}
        {hasClearIcon && (
          <Pressable
            onPress={hasClearIcon ? () => clearText() : iconPressed}
            style={styles.iconContainer}
            testID={`${testID}_icon`}
          />
        )}
      </View>
      {error && <Text style={styles.error}>{String(error)}</Text>}
    </View>
  )
}

const textInputContainerStyle = {
  borderColor: Colors.grayTint1,
  borderRadius: 0,
  borderWidth: Thickness.small2,
  flexDirection: 'row',
  paddingHorizontal: 5,
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    display: 'flex',
    flexGrow: 1,
    marginHorizontal: horizontalScale(16),
  },
  label: {
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.textDullColor,
    marginBottom: verticalScale(4),
    fontSize: FontSize.tiny,
    fontWeight: FontWeight.normal,
    lineHeight: moderateScale(18),
  },
  textInputContainer: {
    ...textInputContainerStyle,
    textAlignVertical: 'top',
  },
  textInput: {
    flex: 1,
    height: verticalScale(44),
  },
  textInputArea: {
    flex: 1,
    height: verticalScale(155),
    textAlignVertical: 'top',
  },
  iconContainer: {
    padding: Spacing.small1,
  },
  error: {
    color: Color.error,
    fontSize: FontSize.tiny,
    paddingTop: Spacing.small2,
  },
  textInputError: {
    ...textInputContainerStyle,
    borderColor: Color.error,
    borderWidth: Thickness.small2,
    backgroundColor: Color.errorLight,
  },
  textInputDisabled: {
    ...textInputContainerStyle,
    backgroundColor: Color.grayExtraLight,
  },
})

export default Input
