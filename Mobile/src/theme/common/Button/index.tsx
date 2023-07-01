import React, { PropsWithChildren } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './styles'

interface ButtonProps {
  title?: string
  onPress?: () => void
  disable?: boolean
  stylesContainer: {}
  stylesContainerText?: {}
  testID: string
}

const Button = ({
  title,
  onPress,
  disable,
  stylesContainer,
  stylesContainerText,
  testID,
}: PropsWithChildren<ButtonProps>) => {
  const onButtonPress = () => onPress && onPress()
  return (
    <TouchableOpacity
      testID={testID}
      disabled={disable}
      onPress={onButtonPress}
      style={[styles.container, stylesContainer]}
    >
      <Text style={[styles.text, stylesContainerText]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button
