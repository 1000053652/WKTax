import React from 'react'
import { StyleSheet, View } from 'react-native'
import RadioForm from 'react-native-simple-radio-button'
import { constants, Text } from '../../../designSystem'
import { RadioButtonDirection, RadioButtonFieldProp } from './types'
const { Spacing, TextAlignment, Dimension, FontSize, Color } = constants

const RadioButtonField = (radio: RadioButtonFieldProp) => (
  <View
    style={styles.checkboxContainer}
    testID={`test_id_checkBox_${radio.testID || ''}`}
  >
    <View style={styles.label}>
      <Text
        size={FontSize.buttonDefault}
        textAlign={TextAlignment.left}
        testID={`test_id_checkBox_label${radio.testID || ''}`}
      >
        {radio.title}
      </Text>
    </View>
    <RadioForm
      radio_props={radio.radioGroup}
      initial={0}
      testID={radio.testID || ''}
      borderWidth={1}
      buttonColor={radio.radioGroupColor || Color.blue}
      labelStyle={styles.labelStyle}
      buttonOuterColor={radio.radioGroupColor || Color.blue}
      formHorizontal={radio.radioButtonDirection === RadioButtonDirection.Row}
      selectedButtonColor={radio.radioGroupColor || Color.blue}
      onPress={(value: number | number, label: string) => {
        radio.callBack(radio.title, label)
      }}
    />
  </View>
)

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'column',
    marginBottom: Dimension.xxSmall3,
  },
  label: {
    margin: Dimension.xxxxSmall1,
    alignSelf: 'flex-start',
  },
  labelStyle: {
    marginRight: Spacing.small1,
  },
})

export default RadioButtonField
