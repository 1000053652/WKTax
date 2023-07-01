import React from 'react'
import { StyleSheet, ViewStyle, View } from 'react-native'
import { TextRole, TextAlignment, Spacing } from '../../constants'
import { BaseProps } from '../../../types'
import Text from '../Text'

import {
  chooseMinWidthV,
  chooseWidthV,
  chooseWidthH,
  chooseMinWidthH,
  getRelPercWidth,
} from './listItemStyles'

type ListItemBaseType =
  | string
  | React.ReactElement
  | (() => React.ReactElement)
  | undefined
  | null // handle undefined element
type ListItemNodeType = ListItemBaseType | ListItemBaseType[]
type widthType = number | string

interface ListItemProps extends BaseProps {
  title: ListItemNodeType
  description?: ListItemNodeType
  leftSlot?: ListItemNodeType
  rightSlot?: ListItemNodeType
  centerSlot?: ListItemNodeType
  leftSlotWidth?: widthType
  rightSlotWidth?: widthType
  titleWidth?: widthType
  descriptionWidth?: number | string
  layout?: string
  stretch?: boolean // decide whether the list item takes whole screen width, when true, the right side will be placed at far right
  leftSlotDirection?: 'row' | 'column'
  rightSlotDirection?: 'row' | 'column'
  verticalAlign?: 'flex-start' | 'center' // Decide right, left and center containers veritcal alignent in the outer container
  titleTestID?: string
  descriptionTestID?: string
  leftSlotTestID?: string
  rightSlotTestID?: string
  isHeader?: boolean
}

const ListItem = ({
  leftSlot,
  rightSlot,
  centerSlot,
  leftSlotWidth = 'auto',
  rightSlotWidth = 'auto',
  titleWidth = 'auto',
  descriptionWidth = 'auto',
  title,
  description,
  layout = 'twoColumn',
  stretch = true,
  leftSlotDirection = 'row',
  rightSlotDirection = 'row',
  verticalAlign = 'flex-start',
  testID = 'test_id_list_item',
  titleTestID = 'test_id_list_item_title',
  descriptionTestID = 'test_id_list_item_description',
  leftSlotTestID = 'test_id_list_item_leftslot',
  rightSlotTestID = 'test_id_list_item_rightslot',
  isHeader: isHeader,
}: ListItemProps) => {
  const defaultWidth = 'auto'
  const defaultTextRole = TextRole.body
  const defaultTextAlign = TextAlignment.left

  const baseHContainerStyle = {
    ...styles.containerBase,
    alignItems: verticalAlign,
  }

  const baseVContainerStyle = {
    ...styles.containerBase,
    justifyContent: verticalAlign,
    flexDirection: 'column',
  }
  const innerHContainerStyle = { ...baseHContainerStyle, ...styles.innerBase }
  const innerVContainerStyle = { ...baseVContainerStyle, ...styles.innerBase }

  let contentWidth: widthType = 'auto'
  let minContentWidth: widthType = 0

  const calculateWidth = () => {
    switch (layout) {
      case 'twoColumn': // only needed when all the elements are present
        if (leftSlot && title && description && rightSlot) {
          contentWidth = chooseWidthV(
            chooseWidthH(titleWidth, rightSlotWidth),
            descriptionWidth
          )
          minContentWidth = chooseMinWidthV(
            chooseMinWidthH(titleWidth, rightSlotWidth),
            descriptionWidth
          )
          if (typeof descriptionWidth !== 'number')
            descriptionWidth = defaultWidth
          if (typeof contentWidth === 'string') {
            // handlel percentage case
            if (typeof titleWidth === 'string')
              titleWidth = getRelPercWidth(titleWidth, contentWidth)
            if (typeof rightSlotWidth === 'string')
              rightSlotWidth = getRelPercWidth(rightSlotWidth, contentWidth)
          }
        }
        break
      case 'threeColumn':
        if (title && description && leftSlot && rightSlot && centerSlot) {
          // only needed when both elements are present
          contentWidth = chooseWidthV(titleWidth, descriptionWidth)
          minContentWidth = chooseMinWidthV(titleWidth, descriptionWidth)
          // handle child percentage case
          if (typeof titleWidth !== 'number') titleWidth = defaultWidth
          if (typeof descriptionWidth !== 'number')
            descriptionWidth = defaultWidth
        } else {
          contentWidth = titleWidth
          titleWidth = defaultWidth
        }
        break
      default:
        break
    }
  }

  calculateWidth()

  const centerVContainerStyle = {
    ...innerVContainerStyle,
    ...styles.centerBase,
    width: contentWidth,
    minWidth: minContentWidth,
  }

  const centerHContainerStyle = {
    ...innerHContainerStyle,
    ...styles.centerBase,
    width: contentWidth,
    minWidth: minContentWidth,
  }

  const renderListItemNode = (
    liNode: ListItemBaseType,
    TextRole: TextRole,
    textAlignment: TextAlignment,
    testID: string,
    index = -1
  ) => {
    if (!liNode) return null
    if (typeof liNode === 'function') return liNode()
    else if (React.isValidElement(liNode)) return liNode
    else {
      const testIDStr =
        index === -1 ? `${testID}_text` : `${testID}_text_${index}`
      return (
        <Text testID={testIDStr} role={TextRole} textAlign={textAlignment}>
          {liNode}
        </Text>
      )
    }
  }

  const renderListItemNodeType = (
    lrNode: ListItemNodeType,
    TextRole: TextRole,
    textAlignment: TextAlignment,
    hasContainer: boolean,
    testID: string,
    containerStyle?: ViewStyle
  ) => {
    if (!lrNode) return null

    const t = typeof lrNode
    const _render = () => {
      if (t === 'function' || t === 'string' || React.isValidElement(lrNode)) {
        return renderListItemNode(
          lrNode as ListItemBaseType,
          TextRole,
          textAlignment,
          testID
        )
      } else {
        return (lrNode as Array<ListItemBaseType>).map((node, index) =>
          renderListItemNode(node, TextRole, textAlignment, testID, index)
        )
      }
    }
    return hasContainer ? (
      <View style={containerStyle} testID={`${testID}_view`}>
        {_render()}
      </View>
    ) : (
      <>{_render()}</>
    )
  }

  const renderTitle = (hasContainer = true) => {
    return renderListItemNodeType(
      title,
      defaultTextRole,
      defaultTextAlign,
      hasContainer,
      titleTestID,
      { ...innerHContainerStyle, ...styles.centerBase, width: titleWidth }
    )
  }

  const renderDescription = (hasContainer = true) => {
    return (
      description &&
      renderListItemNodeType(
        description,
        TextRole.subhead,
        defaultTextAlign,
        hasContainer,
        descriptionTestID,
        {
          ...innerVContainerStyle,
          ...styles.centerBase,
          width: descriptionWidth,
          marginTop: Spacing.small1,
        }
      )
    )
  }

  const getLRBaseStyle = (flexDirection: 'row' | 'column') => {
    return flexDirection === 'row' ? innerHContainerStyle : innerVContainerStyle
  }
  const renderLeft = () => {
    const baseStyle = getLRBaseStyle(leftSlotDirection)
    const containerStyle = {
      ...baseStyle,
      ...styles.leftBase,
      width: leftSlotWidth,
    }
    return (
      leftSlot &&
      renderListItemNodeType(
        leftSlot,
        defaultTextRole,
        defaultTextAlign,
        true,
        leftSlotTestID,
        containerStyle
      )
    )
  }

  const renderRight = () => {
    const baseStyle = getLRBaseStyle(rightSlotDirection)
    const alignStyle =
      rightSlotDirection === 'row'
        ? { justifyContent: 'flex-end' }
        : { alignItems: 'flex-end' } // right node will align to the right
    const flexStyle = stretch ? { flexGrow: 1 } : { flexGrow: 0 }
    const containerStyle = {
      ...baseStyle,
      ...styles.rightBase,
      ...alignStyle,
      width: rightSlotWidth,
      ...flexStyle,
    }

    return (
      rightSlot &&
      renderListItemNodeType(
        rightSlot,
        defaultTextRole,
        TextAlignment.right,
        true,
        rightSlotTestID,
        containerStyle
      )
    )
  }

  // refactored code and added element check to minimize nest level
  const renderCenter = () => {
    if (title && description) {
      return (
        <View style={centerVContainerStyle}>
          {renderTitle()}
          {renderDescription()}
        </View>
      )
    } else {
      // only title
      const baseStyle = getLRBaseStyle(rightSlotDirection)
      const alignStyle =
        rightSlotDirection === 'row'
          ? { justifyContent: 'center' }
          : { alignItems: 'center' } // right node will align to the right
      const flexStyle = stretch ? { flexGrow: 1 } : { flexGrow: 0 }
      const containerStyle = {
        ...baseStyle,
        ...styles.rightBase,
        ...alignStyle,
        width: rightSlotWidth,
        ...flexStyle,
      }

      return (
        centerSlot &&
        renderListItemNodeType(
          centerSlot,
          defaultTextRole,
          TextAlignment.right,
          true,
          rightSlotTestID,
          containerStyle
        )
      )
    }
  }

  const renderDefault = () => {
    return (
      <View style={baseHContainerStyle} testID={testID}>
        {renderLeft()}
        {layout === 'threeColumn' && renderCenter()}
        {renderRight()}
      </View>
    )
  }

  const renderDescriptionBelow = () => {
    if (description)
      return (
        <View style={baseVContainerStyle} testID={testID}>
          <View style={[innerHContainerStyle]}>
            {renderLeft()}
            {renderTitle()}
            {renderRight()}
          </View>
          {renderDescription()}
        </View>
      )
    else return renderDefault()
  }

  const renderItem = () => {
    if (!(leftSlot && rightSlot)) return renderDefault()

    // has at least one left or rightSlot element
    switch (layout) {
      case 'descriptionBelow':
        return renderDescriptionBelow()
      case 'twoColumn':
        if (!leftSlot) return renderDescriptionBelow()
        if (!description) return renderDefault()
        return (
          <View style={baseHContainerStyle} testID={testID}>
            {renderLeft()}
            <View style={centerVContainerStyle}>
              <View style={innerHContainerStyle}>
                {renderTitle()}
                {renderRight()}
              </View>
              {renderDescription()}
            </View>
          </View>
        )
      case 'titleAbove':
        return (
          <View style={baseVContainerStyle} testID={testID}>
            {renderTitle()}
            <View style={innerHContainerStyle}>
              {renderLeft()}
              {renderDescription()}
              {renderRight()}
            </View>
          </View>
        )
      default:
        return renderDefault()
    }
  }
  return renderItem()
}

const styles = StyleSheet.create({
  containerBase: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: Spacing.medium1,
    padding: 0,
    borderWidth: 0,
  },
  innerBase: {
    margin: 0,
  },
  leftBase: {
    marginRight: Spacing.medium1,
  },
  centerBase: {
    flexWrap: 'wrap',
    flexShrink: 1, // needed for displaying long description text
    // flexGrow: 1
    // comment out flexGrow as it causes the title/description expend vertically when there is a big rightSlot, also make right slot always stretched
  },
  rightBase: {
    marginLeft: Spacing.medium1,
    flexGrow: 1, // for right element to be displayed at the right end
    // flexShrink: 1,  // comment both lines out as it can cause right not stretched to right
    // flexWrap: 'wrap',
  },
})

export default ListItem
