import React from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import Text from '../../../../theme/common/Text'
import styles from '../styles'
import { AttachmentsProps } from '../types'
import { imageConstant } from '../../../../theme/Images'
import { DRLAttachmentsResponse } from '../../../../services/modules/questionnaire/responseTypes'

const LineItemAttachmentList = (props: AttachmentsProps) => {
  const onClickAttachmentMenu = (item: DRLAttachmentsResponse) => {
    props.navigation.navigate('AttachmentsMenu', {
      lineItem: props.lineItem,
      attachment: item,
    })
  }
  return (
    <FlatList
      data={props.attachments}
      keyExtractor={item => `${item.fileId}`}
      renderItem={({ item }) => (
        <View style={styles.attachmentItem}>
          <Text
            stylesContainerText={styles.attachItemTitle}
            children={item.fileName}
          />
          <TouchableOpacity onPress={() => onClickAttachmentMenu(item)}>
            <Image
              source={imageConstant.threeDotsButton}
              style={styles.threeDotsIcon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
      )}
    />
  )
}
export default LineItemAttachmentList
