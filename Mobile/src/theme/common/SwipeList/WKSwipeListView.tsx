import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image,
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { SwipeListProps, dataDefaultValue } from './types'
import { imageConstant } from '../../Images'
import { Colors } from '../../constants'
import Text from '../Text/index'
import { t } from 'i18next'
const WKSwipeListView = (props: SwipeListProps) => {
  const listData = [{ data: props.listData, title: '1' }]
  const renderItem = (data: {}) => {
    return (
      <TouchableHighlight
        onPress={() => {
          if (props.rowClick) {
            props.rowClick(data)
          }
        }}
        style={[styles.rowFront, { height: props.rowHeight ?? 50 }]}
        underlayColor={Colors.white}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text
            testID={data?.item?.name ?? ''}
            stylesContainerText={[styles.leftText]}
          >
            {data?.item?.name ?? ''}
          </Text>
          <Image
            style={[styles.arrowImage]}
            source={imageConstant.rightArrow}
          />
        </View>
      </TouchableHighlight>
    )
  }

  const renderHiddenItem = (data: {}) => {
    return !data?.item?.isProforma ? (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => {
            if (props.deleteRow) {
              props.deleteRow(data)
            }
          }}
        >
          <Text
            testID={props.deleteText ?? 'DELETE'}
            stylesContainerText={styles.backTextWhite}
          >
            {props.deleteText ?? t('common:DELETE')}
          </Text>
        </TouchableOpacity>
      </View>
    ) : null
  }

  return (
    <View
      style={styles.container}
    >
      <SwipeListView
        useSectionList
        recalculateHiddenLayout={true}
        sections={listData ?? dataDefaultValue}
        renderItem={props.renderItem ? props.renderItem : renderItem}
        renderHiddenItem={
          props.renderHiddenItem ? props.renderHiddenItem : renderHiddenItem
        }
        leftOpenValue={props.leftOpenValue ?? 0}
        refreshing={props.refreshPage}
        rightOpenValue={props.rightOpenValue ?? -75}
        previewRowKey={props.previewRowKey ?? '0'}
        previewOpenValue={props.previewOpenValue ?? 40}
        previewOpenDelay={props.previewOpenDelay ?? 3000}
        keyExtractor={props?.keyExtractor}
      />
    </View>
  )
}

export default WKSwipeListView
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  backTextWhite: {
    color: Colors.white,
  },
  rowFront: {
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
  },
  rowBack: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: Colors.white,
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: Colors.deleteRow,
    right: 0,
  },
  leftText: {
    marginLeft: 16,
    fontSize: 16,
    width: '85%',
    color: Colors.black,
  },
  arrowImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
})
