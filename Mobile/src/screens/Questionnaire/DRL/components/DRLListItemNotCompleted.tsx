import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import Text from '../../../../theme/common/Text'
import styles from '../styles'
import { imageConstant } from '../../../../theme/Images'

const DRLListItemNotCompleted = ({ item, onClickStatusMenu }) => {
  return (
    <View style={styles.lineItemNotCompletedView}>
      <Text
        stylesContainerText={styles.lineItemNotCompletedTitle}
        children={item.description}
      />
      <TouchableOpacity onPress={() => onClickStatusMenu(item)}>
        <Image
          source={imageConstant.threeDotsButton}
          style={styles.threeDotsIcon}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  )
}
export default DRLListItemNotCompleted
