import React from 'react'
import { View, SafeAreaView, Text } from 'react-native'
import Button from '../Button'
import styles from './styles'
import { glbStyles } from '../../../../src/styles/global'
const ContactModalScreen = ({
  onPress,
  onPressText,
  title,
  description,
  buttonText,
  cancelTextStyle,
  descTextStyle,
}) => {
  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <View style={styles.mainView}>
        <Text style={styles.titleStyle}>{title}</Text>
        <View style={styles.horizontalLine} />

        <Text style={[styles.descStyle, descTextStyle]} onPress={onPressText}>
          {description}
        </Text>
        <View style={styles.horizontalLine} />

        <Button
          title={buttonText}
          onPress={onPress}
          stylesContainer={styles.buttonCancelContactStyle}
          stylesContainerText={[
            styles.buttonCancelContactText,
            cancelTextStyle,
          ]}
        />
      </View>
    </SafeAreaView>
  )
}
export default ContactModalScreen
