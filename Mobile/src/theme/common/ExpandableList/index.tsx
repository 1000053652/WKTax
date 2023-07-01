import React, { useEffect, useState } from 'react'
import { LayoutAnimation, Pressable, StyleSheet, UIManager } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Divider from '../Divider'
import Icon from '../Icon'
import Text from '../Text'
import { View } from '../../uiHelper'
import { IconName } from '../Icon/iconLibrary'
import { isAndroid } from '../../../utils/platform'
import { Color, Dimension, TextRole } from '../../constants'

const { chevronUpSolid, chevronDownSolid } = IconName

interface RowText {
  title: string
  subtitle?: string
  onItemPress: () => void
}

type SectionRows = {
  isExpanded: boolean
  sectionTitle: string
  showSectionIcon: boolean
  type: string
  rows: RowText[]
}

interface ExpandableListProps {
  content: SectionRows[]
  multiSelect?: boolean
}

const ExpandableList = ({
  content = [],
  multiSelect = true,
}: ExpandableListProps) => {
  const [listDataSource, setlistDataSource] = useState(content)

  if (isAndroid) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }

  const updateLayout = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    const array = [...listDataSource]

    if (multiSelect) {
      array[index].isExpanded = !array[index].isExpanded
    } else {
      array.map((_, placeIndex) =>
        placeIndex === index
          ? (array[placeIndex].isExpanded = !array[placeIndex].isExpanded)
          : (array[placeIndex].isExpanded = false)
      )
    }
    setlistDataSource(array)
  }

  return (
    <ScrollView testID="adc_scroll_view">
      {listDataSource.map((item, index) => (
        <Section
          item={item}
          key={index}
          onSectionHeaderPress={() => updateLayout(index)}
        />
      ))}
    </ScrollView>
  )
}

interface ExpandableSectionProps {
  item: SectionRows
  onSectionHeaderPress: () => void
}

const Section = ({ item, onSectionHeaderPress }: ExpandableSectionProps) => {
  const [layoutHeight, setlayoutHeight] = useState<number | null>(0)
  const { isExpanded, rows, sectionTitle, type } = item
  const testIdPrefix = `test_id_${
    type ? type.replace(/\s+/g, '_').toLowerCase() : 'section'
  }`

  useEffect(() => {
    if (isExpanded) {
      setlayoutHeight(null)
    } else {
      setlayoutHeight(0)
    }
  }, [isExpanded])

  const heightStyle = layoutHeight !== null ? { height: layoutHeight } : null

  return (
    <>
      <Pressable
        onPress={onSectionHeaderPress}
        testID={`${testIdPrefix}_title_button`}
        accessibilityLabel={`${testIdPrefix}_title_button`}
        accessible={false}
      >
        <View style={[styles.sectionItemContainer]} accessible={false}>
          <Text role={TextRole.title2} testID={`${testIdPrefix}_title_text`}>
            {sectionTitle}
          </Text>
          {!!rows.length && item.showSectionIcon && (
            <Icon
              color={Color.blue}
              name={isExpanded ? chevronUpSolid : chevronDownSolid}
              size={Dimension.xxSmall3}
            />
          )}
        </View>
      </Pressable>

      <View style={[styles.rowContainer, heightStyle]}>
        {rows.map(({ title, subtitle, onItemPress }, index) => (
          <Pressable
            key={index}
            testID={`${testIdPrefix}_item_${index}`}
            accessibilityLabel={`${testIdPrefix}_item_${index}`}
            onPress={onItemPress}
            accessible={false}
          >
            <Divider length="auto" />
            <View style={styles.sectionItemContainer} accessible={false}>
              <Text
                role={TextRole.body}
                testID={`${testIdPrefix}_item_${index}_title`}
              >
                {title}
              </Text>
              <Text
                role={TextRole.body}
                testID={`${testIdPrefix}_item_${index}_subtitle`}
                color={Color.grayMedium}
              >
                {subtitle}
              </Text>
            </View>
            <Divider length="auto" />
          </Pressable>
        ))}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    overflow: 'hidden',
  },
  sectionItemContainer: {
    alignItems: 'center',
    backgroundColor: Color.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Dimension.xxxSmall1,
  },
})
export default ExpandableList
