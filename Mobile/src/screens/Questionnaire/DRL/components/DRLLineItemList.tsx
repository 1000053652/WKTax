import React from 'react'
import { FlatList, View } from 'react-native'
import styles from '../styles'
import { DRLLineItemProps } from '../types'
import LineItemAttachmentList from './LineItemAttachmentList'
import { DRLListResponse } from '../../../../services/modules/questionnaire/responseTypes'
import DRLListItemNotCompleted from './DRLListItemNotCompleted'
import DRLListItemCompleted from './DRLListItemCompleted'
import UnCategorizedAttachment from './UnCategorizedAttachment'

const DRLLineItemList = (props: DRLLineItemProps) => {
  const openStatusMenu = (item: DRLListResponse) => {
    if (item.completed && item.fileCount > 0) {
      props.navigation.navigate('AddingAdditionalDocument', {
        lineItem: item,
      })
    } else {
      props.navigation.navigate('DRLQuickNotes', {
        lineItem: item,
      })
    }
  }
  const renderItem = (item: DRLListResponse) => {
    if (item.category == 'Uncategorized') {
      return (
        <UnCategorizedAttachment item={item} navigation={props.navigation} />
      )
    } else {
      return (
        <View>
          {item.completed ? (
            <DRLListItemCompleted
              item={item}
              onAttachmentCountClick={i => props.onAttachmentCountClick(i)}
              onClickStatusMenu={i => openStatusMenu(i)}
            />
          ) : (
            <DRLListItemNotCompleted
              item={item}
              onClickStatusMenu={i => openStatusMenu(i)}
            />
          )}
          {item.expanded && (
            <LineItemAttachmentList
              navigation={props.navigation}
              lineItem={item}
              attachments={item.attachments}
            />
          )}
        </View>
      )
    }
  }
  return (
    <FlatList
      style={styles.categoryList}
      data={props.lineItems}
      keyExtractor={item => `${item.questionId}`}
      renderItem={item => renderItem(item.item)}
    />
  )
}
export default DRLLineItemList
