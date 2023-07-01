import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import Text from '../../../../theme/common/Text'
import styles from '../styles'
import { imageConstant } from '../../../../theme/Images'
import { quickNotesDRLStatusData } from '../Utils'
import { DRLListResponse } from '../../../../../src/services/modules/questionnaire/responseTypes'
import { formatCurrency } from '../../../../../src/theme/common/TextInput/utils'

export interface DRLListItemCompletedProps {
  item: DRLListResponse
  onAttachmentCountClick: (item: DRLListResponse) => void
  onClickStatusMenu: (item: DRLListResponse) => void
}

const DRLListItemCompleted = (props: DRLListItemCompletedProps) => {
  function statusTitle(): string {
    if (props.item.status == 6) {
      return formatCurrency(`${props.item.amount}`)
    } else {
      return (
        quickNotesDRLStatusData.find(i => i.statusCode == props.item.status)
          ?.title ?? ''
      )
    }
  }
  return (
    <View style={styles.lineItemCompletedView}>
      <Image source={imageConstant.check} style={styles.upArrowIcon} />
      <View style={styles.lineItemCompletedCenterView}>
        <View style={styles.lineItemCompletedTitleStatusView}>
          <Text
            testID="completed_title"
            stylesContainerText={styles.lineItemCompletedTitle}
            children={props.item.description}
          />
          <Text
            testID="completed_status"
            stylesContainerText={styles.lineItemCompletedStatus}
            children={statusTitle()}
          />
        </View>
        {props.item.fileCount > 0 && (
          <TouchableOpacity
            style={styles.fileCountBox}
            onPress={() => props.onAttachmentCountClick(props.item)}
          >
            <Image source={imageConstant.attach} style={styles.attachIcon} />
            <Text
              testID="file_count"
              stylesContainerText={styles.fileCount}
              children={`${props.item.fileCount}`}
            />
            <Image
              source={imageConstant.chevronUpBlack}
              style={
                props.item.expanded
                  ? styles.attachUpIcon
                  : styles.attachUpIconRotate
              }
            />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity onPress={() => props.onClickStatusMenu(props.item)}>
        <Image
          source={imageConstant.threeDotsButton}
          style={styles.threeDotsIcon}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  )
}
export default DRLListItemCompleted
