import React, { useTransition } from 'react'
import { View } from 'react-native'
import ListItem from '../../../../src/theme/common/ListItem'
import styles from './styles'
import Text from '../../../theme/common/Text'
import { Control, FieldValues } from 'react-hook-form'
import { NumberField } from '../../../../src/theme/common/TextInput/InputFormComponents'
import { useTranslation } from 'react-i18next'

export interface ThreeColumnListItemProps {
  control: Control<FieldValues, any>
  item: any
}

const ThreeColumnListItem = (props: ThreeColumnListItemProps) => {
  const { t } = useTranslation()
  return (
    <ListItem
      layout="threeColumn"
      title=""
      description={''}
      leftSlot={
        <View style={styles.leftSlotViewStyle}>
          <Text
            stylesContainerText={styles.leftText}
            testID="question_answer_text_id"
            children={t(props.item.questionTitle)}
          />
        </View>
      }
      centerSlot={
        <View style={styles.centerSlotViewStyle}>
          <NumberField
            placeholder=""
            control={props.control}
            name={props.item.answer1Key}
            label=""
            fieldType={props.item.type}
            maxValue={props.item.maxValue}
          />
        </View>
      }
      rightSlot={
        <View style={styles.rightSlotViewStyle}>
          <NumberField
            placeholder=""
            control={props.control}
            name={props.item.answer2Key}
            label={''}
            fieldType={props.item.type}
            disabled={true}
            editable={false}
          />
        </View>
      }
    />
  )
}
export default ThreeColumnListItem
