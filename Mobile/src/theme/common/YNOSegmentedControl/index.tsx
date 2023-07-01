import React from 'react'
import { View } from 'react-native'
import { SegmentedButtons } from 'react-native-paper'
import Text from '../Text/index'
import { Colors } from '../../constants'
import { styles } from './styles'
import { t } from 'i18next'

export type TitleDirection = 'top' | 'left'
export type YNOSegmentedControlProps = {
  value: string
  yesValue: string
  noValue: string
  title?: string
  titleDirection?: TitleDirection
  textAboveSegment?: string
  disabled?: boolean
  onValueChange: (value: string) => void
}
const YNOSegmentedControl = (props: YNOSegmentedControlProps) => {
  const yNoButtons = () => {
    return (
      <SegmentedButtons
        value={props.value}
        onValueChange={value => {
          props.onValueChange(props.value === value ? '' : value)
        }}
        theme={{ roundness: 0 }}
        buttons={[
          {
            disabled: props?.disabled && props.disabled === true,
            value: props.yesValue,
            label: t('common:YES'),
            style:
              props.value == props.yesValue
                ? styles.yesNoButtonEnable
                : styles.yesNoButtonDisable,
            checkedColor: Colors.testColorBlue,
            uncheckedColor: Colors.grayTint1,
          },
          {
            disabled: props?.disabled && props.disabled === true,
            value: props.noValue,
            label: t('common:NO'),
            style:
              props.value == props.noValue
                ? styles.yesNoButtonEnable
                : styles.yesNoButtonDisable,
            checkedColor: Colors.testColorBlue,
            uncheckedColor: Colors.grayTint1,
          },
        ]}
      />
    )
  }

  return (
    <View
      style={[
        styles.container,
        props.titleDirection == 'top'
          ? { flexDirection: 'column' }
          : { flexDirection: 'row' },
      ]}
    >
      {props.title && (
        <Text
          stylesContainerText={
            props.titleDirection == 'top'
              ? styles.titleAboveText
              : styles.titleLeftText
          }
          testID={''}
          children={props.title}
        />
      )}
      <View style={styles.segmentViewContainer}>
        {props.textAboveSegment && (
          <Text
            stylesContainerText={styles.aboveYNOText}
            testID={''}
            children={props.textAboveSegment}
          />
        )}
        {yNoButtons()}
      </View>
    </View>
  )
}
export default YNOSegmentedControl
