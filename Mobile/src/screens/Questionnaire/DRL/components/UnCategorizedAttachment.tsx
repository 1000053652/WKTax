import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import Text from '../../../../theme/common/Text'
import styles from '../styles'
import { imageConstant } from '../../../../theme/Images'
import { DRLListResponse } from '../../../../services/modules/questionnaire/responseTypes'

const UnCategorizedAttachment = ({ item, navigation }) => {
  const onClickAttachmentMenu = (item: DRLListResponse) => {
    navigation.navigate('AttachmentsMenu', { lineItem: item })
  }
  return (
    <View style={styles.lineItemNotCompletedView}>
      <Text
        stylesContainerText={styles.unCategorizedTitle}
        children={item.description}
      />
      <TouchableOpacity onPress={() => onClickAttachmentMenu(item)}>
        <Image
          source={imageConstant.threeDotsButton}
          style={styles.threeDotsIcon}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  )
}
export default UnCategorizedAttachment
