import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { Colors } from '../../../theme/constants'
import React from 'react'
import { YesNoResult } from '../../../theme/common/YesNoButton/types'
import YesNoButton from '../../../theme/common/YesNoButton'
import { Divider } from 'react-native-paper'
import { t } from 'i18next'

type ListItemBaseType =
  | string
  | React.ReactElement
  | (() => React.ReactElement)
  | undefined
  | null // handle undefined element
type DynamicFormProps = {
  isDoneSelected: boolean
  isPageRefresh: boolean
  listData: any
  formCallback?: (state: any, data: any) => void
  toggleBottomButton: (isDone: boolean) => void
  control?: any
  name?: string
  children?: ListItemBaseType
  isHeader?: boolean
  headerStyle?: any
  disable?: boolean
  leftButtonName?: string
  rightButtonName?: string
}

const DynamicForm = (props: DynamicFormProps) => {
  const yesNoComponentRender = item => {
    return (
      <View
        style={styles.subContainer}
        pointerEvents={item?.enable ? 'none' : 'auto'}
      >
        <YesNoButton
          disable={item?.enable}
          name={item?.APIkey}
          index={item?.id}
          control={props.control}
          callback={props.formCallback}
          apiKey={props.name}
          title={item?.title}
          defaultValue={
            item?.value === '1'
              ? YesNoResult.YES
              : item?.value === '0'
              ? YesNoResult.NO
              : YesNoResult.NONE
          }
        />
      </View>
    )
  }
  const renderItemFlatlist = ({ item }) => {
    return (
      <View>
        {item?.isHeaderQuestion && (
          <View>
            <Divider />
            <Text style={[props.headerStyle, styles.header]}>
              {' '}
              {item?.headerTitle}
            </Text>
            <Divider />
          </View>
        )}
        {props.isPageRefresh && yesNoComponentRender(item)}
        {item?.children ? props.children : null}
      </View>
    )
  }
  const FooterButtons = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.finishLaterButtonContainer,
            {
              backgroundColor: props.isDoneSelected
                ? Colors.white
                : Colors.testColorBlue,
            },
          ]}
          onPress={() => props.toggleBottomButton(false)}
        >
          <Text
            style={{
              color: props.isDoneSelected ? Colors.black : Colors.white,
            }}
          >
            {props.leftButtonName ?? t('common:FINISH_LATER')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.doneButtonContainer,
            {
              backgroundColor: props.isDoneSelected
                ? Colors.testColorBlue
                : Colors.white,
            },
          ]}
          onPress={() => props.toggleBottomButton(true)}
        >
          <Text
            style={{
              color: props.isDoneSelected ? Colors.white : Colors.black,
            }}
          >
            {props.rightButtonName ?? t('common:DONE')}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={props.listData}
        renderItem={renderItemFlatlist}
        refreshing={props.isPageRefresh}
        keyExtractor={item => item?.id}
      />
      {FooterButtons()}
    </View>
  )
}
export default DynamicForm
