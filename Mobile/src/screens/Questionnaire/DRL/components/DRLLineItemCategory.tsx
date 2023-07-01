import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Text from '../../../../theme/common/Text'
import styles from '../styles'
import { DRLListItemProps } from '../types'
import DRLLineItemList from './DRLLineItemList'
import { Image } from 'react-native'
import { imageConstant } from '../../../../theme/Images'

const DRLLineItemCategory = (props: DRLListItemProps) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => props.onHeaderPress(props.item)}
        style={[
          styles.categoryHeader,
          props.item.isCompleted ? styles.categoryHeaderCompleted : {},
        ]}
      >
        <View style={{ flexDirection: 'row' }}>
          {props.item.isCompleted && (
            <Image
              source={imageConstant.check}
              style={[styles.upArrowIcon, { marginRight: 16 }]}
            />
          )}
          <View>
            <Text
              stylesContainerText={[
                styles.categoryTitle,
                props.item.isCompleted ? styles.categoryTitleCompleted : {},
              ]}
              children={props.item.category}
            />
            <Text
              stylesContainerText={[
                styles.categoryTitle,
                props.item.isCompleted ? styles.subTitleCompleted : {},
              ]}
              children={`${props.item.subTitle}`}
            />
          </View>
        </View>
        <Image
          source={imageConstant.chevronUpWhite}
          style={[
            props.item.expanded ? styles.upArrowIcon : styles.upArrowRotateIcon,
            props.item.isCompleted ? styles.upArrowRotateIconCompleted : {},
          ]}
        />
      </TouchableOpacity>
      {props.item.expanded && (
        <DRLLineItemList
          navigation={props.navigation}
          lineItems={props.item.lineItems}
          onAttachmentCountClick={selectedLineItem =>
            props.onPressAttachment(props.item, selectedLineItem)
          }
        />
      )}
    </View>
  )
}
export default DRLLineItemCategory
