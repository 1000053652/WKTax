import React from 'react'
import { View } from 'react-native'
import ListItem from '../../../../src/theme/common/ListItem'
import styles from './styles'
import Text from '../../../theme/common/Text'

export interface ThreeColumnHeaderProps {
  title1: string | null | undefined
  title2: string | null | undefined
  title3: string | null | undefined
}

const ThreeColumnHeader = (props: ThreeColumnHeaderProps) => {
  return (
    <ListItem
      layout="threeColumn"
      title=""
      description={''}
      leftSlot={
        <View style={styles.leftSlotViewStyle}>
          {props.title1 && (
            <Text
              stylesContainerText={styles.textStyleOther}
              testID="three_column_title_1"
              children={props.title1}
            />
          )}
        </View>
      }
      centerSlot={
        <View style={styles.centerSlotViewStyle}>
          {props.title2 && (
            <Text
              stylesContainerText={styles.textStyleOther}
              testID="three_column_title_2"
              children={props.title2}
            />
          )}
        </View>
      }
      rightSlot={
        <View style={styles.rightSlotViewStyle}>
          {props.title3 && (
            <Text
              stylesContainerText={styles.textStyleOther}
              testID="three_column_title_3"
              children={props.title3}
            />
          )}
        </View>
      }
    />
  )
}
export default ThreeColumnHeader
