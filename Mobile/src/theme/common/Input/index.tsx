import React, { PropsWithChildren } from 'react'
import { Image, TextInput, Text, View, TouchableOpacity } from 'react-native'
import { Colors } from '../../constants'
import styles from './style'

interface InputProps {
  placeholder?: string
  label?: string
  icon?: undefined
  value?: string
  error?: string
  onChangeText: (text: string) => void
  labelStyles?: {}
  inputBoxStyles?: {}
  iconStyles?: {}
  iconClick: boolean
  showError: string
  testID: string
  container?: {}
  onPressIcon?: () => void
  isShowSoftInputOnFocus?: boolean
  maxLength?: number
  keyboardType?: string
  secureTextEntry?: string
  pointerEvents?: string
  minLength?: number
}

const InputComponent = ({
  placeholder,
  label,
  icon,
  value,
  error,
  onChangeText,
  inputBoxStyles,
  labelStyles,
  iconStyles,
  iconClick,
  showError,
  keyboardType,
  onPressIcon,
  secureTextEntry,
  testID,
  container,
  isShowSoftInputOnFocus,
  maxLength,
  pointerEvents,
  minLength,
}: PropsWithChildren<InputProps>) => {
  return (
    <View style={container != null ? container : styles.container}>
      {label && <Text style={[styles.label, labelStyles]}>{label}</Text>}
      <View
        style={[
          styles.testIconView,
          !showError
            ? styles.textInputContainer
            : styles.errorTextInputContainer,
        ]}
      >
        <TextInput
          testID={'input_' + testID}
          placeholder={placeholder}
          placeholderTextColor={Colors.textColor}
          value={value}
          style={[
            { width: icon == undefined ? '100%' : '90%' },
            inputBoxStyles,
          ]}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          showSoftInputOnFocus={isShowSoftInputOnFocus}
          maxLength={maxLength}
          pointerEvents={pointerEvents}
          minLength={minLength}
        />
        {icon && (
          <TouchableOpacity
            style={{ width: '100%' }}
            disabled={iconClick}
            onPress={onPressIcon}
          >
            <Image style={iconStyles} source={icon} resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>

      {error != '' ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

InputComponent.defaultProps = {
  keyboardType: 'default',
  isShowSoftInputOnFocus: true,
}
export default InputComponent
