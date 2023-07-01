import React, { PropsWithChildren } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { TextField } from '../../../../src/theme/common/TextInput/InputFormComponents'
import { Control } from 'react-hook-form'
import Text from '../../../../src/theme/common/Text'
import styles from '../styles'
import { Maybe } from '../../../../src/types'
interface TextProps {
  placeholder?: string
  disable?: boolean
  onPress?: () => void
  control: Control
  label: string
  name: string
  btntext?: string
  error?: string
  defaultValue?: Maybe<string> | undefined
}

const TextWithBtn = ({
  placeholder,
  onPress,
  disable,
  label,
  name,
  control,
  btntext,
  error,
  defaultValue,
}: PropsWithChildren<TextProps>) => {
  const onButtonPress = () => onPress && onPress()
  return (
    <View style={[styles.vehicleDecContainer]}>
      <View style={styles.vehicleDec}>
        <TextField
          placeholder={placeholder}
          control={control}
          name={name}
          label={label}
          required
          max={76}
          error={error}
          defaultValue={defaultValue}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={onButtonPress}>
        <Text
          stylesContainerText={styles.saveButtonText}
          children={btntext}
          testID="save_btn"
          disable={disable}
        />
      </TouchableOpacity>
    </View>
  )
}

TextWithBtn.defaultProps = {
  disable: true,
}
export default TextWithBtn
