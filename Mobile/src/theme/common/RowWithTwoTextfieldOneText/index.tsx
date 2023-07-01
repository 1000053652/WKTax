import { StyleSheet, View } from 'react-native'
import ListItem from '../ListItem'
import Text from '../Text'
import { NumberField } from '../TextInput/InputFormComponents'
import React from 'react'
import { Colors } from '../../constants'

export type renderTheeColumViewProps = {
  control: any
  index: number
  disablePriorYearTextField?: boolean
  callback?: (data: {}) => void
  data: [{}]
  isHeader: boolean
  centerHeading?: string
  rightHeading?: string
}
export const RenderTheeColumView = (props: renderTheeColumViewProps) => {
  return (
    <View>
      {props?.isHeader ? (
        <ListItem
          layout="twoColumn"
          title=""
          leftSlotWidth={'30%'}
          rightSlotWidth={'70%'}
          description={''}
          leftSlot={
            <View>
              <Text
                testID="question_answer_text_id"
                children={props?.data[props.index - 1].title}
                stylesContainerText={styles.headingLeft}
              />
            </View>
          }
          rightSlot={
            <View style={styles.rightSlotViewStyle}>
              <Text
                stylesContainerText={styles.headingCenter}
                testID="question_answer_text_id"
                children={props?.data[props.index - 1]?.centerHeading}
              />

              <Text
                stylesContainerText={styles.headingRight}
                testID="question_answer_text_id"
                children={props?.data[props.index - 1]?.rightHeading}
              />
            </View>
          }
        />
      ) : (
        <ListItem
          layout="twoColumn"
          title=""
          leftSlotWidth={'30%'}
          rightSlotWidth={'70%'}
          description={''}
          leftSlot={
            <View>
              <Text
                testID="question_answer_text_id"
                children={props?.data[props.index - 1].title}
              />
            </View>
          }
          rightSlot={
            <View style={styles.rightSlotViewStyle}>
              <NumberField
                styleTextBox={styles.leftTextField}
                placeholder=""
                control={props.control}
                name={props?.data[props.index - 1].name}
                fieldType={props?.data[props.index - 1].type ?? 'number'}
                max={props?.data[props.index - 1].max}
                label=""
              />
              <NumberField
                disabled={props.disablePriorYearTextField}
                styleTextBox={styles.rightTextField}
                placeholder=""
                control={props.control}
                name={props?.data[props.index - 1].rightName}
                label=""
                fieldType={'currency'}
                editable={false}
              />
            </View>
          }
        />
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  rightSlotViewStyle: {
    flexDirection: 'row',
  },
  leftTextField: {
    marginRight: 0,
    borderRightWidth: 0,
  },
  rightTextField: {
    marginLeft: 0.0,
    borderLeftWidth: 0,
    marginRight: '10%',
  },
  headingLeft: {
    fontSize: 13,
    color: Colors.blueShadeColor,
    fontWeight: '500',
  },

  headingCenter: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    flex: 1,
    alignSelf: 'stretch',
    display: 'flex',
    flexGrow: 1,
    marginLeft: 16,
    with: '50%',
    fontSize: 13,
    color: Colors.blueShadeColor,
    fontWeight: '500',
  },
  headingRight: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 5,
    with: '50%',
    alignSelf: 'stretch',
    display: 'flex',
    flexGrow: 1,
    marginLeft: 29,
    marginRight: '17%',
    fontSize: 13,
    color: Colors.blueShadeColor,
    fontWeight: '500',
  },
})
