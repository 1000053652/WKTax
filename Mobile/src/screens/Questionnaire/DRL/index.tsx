import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, View, Switch } from 'react-native'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import { glbStyles } from '../../../styles/global'
import Text from '../../../theme/common/Text'
import styles from './styles'
import {
  useLazyGetDRLAttachmentListQuery,
  useLazyGetDRLCategoriesListQuery,
  useLazyGetDRLRequestListQuery,
} from '../../../services/modules/questionnaire'
import {
  DRLCategoriesResponse,
  DRLListResponse,
} from '../../../services/modules/questionnaire/responseTypes'
import DRLLineItemCategory from './components/DRLLineItemCategory'
import { useTranslation } from 'react-i18next'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../../screens/Common/LoaderStyle'
import { useSelector } from 'react-redux'
import { errorMessageToast } from '../../Error/utils'
import { Colors } from '../../../../src/theme/constants'

const DRLLandingScreen = ({ navigation, route }: ApplicationScreenProps) => {
  const { t } = useTranslation()
  const [showMissingDocs, setShowMissingDocs] = useState(
    route?.params?.showMissingDocs ?? false
  )
  const refreshDRLCategory = useSelector(
    state => state.questionnaire?.refreshDRLCategory
  )
  const [drlAPIResponseData, setAPIResponseData] = useState<
    DRLCategoriesResponse[]
  >([])
  const [filteredListData, setFilteredListData] = useState<
    DRLCategoriesResponse[]
  >([])
  const [isRender, setIsRender] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<
    DRLCategoriesResponse[]
  >([])

  // API
  const [getDRLCategoriesListQuery, { isFetching: isFetchingDRLCategories }] =
    useLazyGetDRLCategoriesListQuery()
  const [getDRLListQuery, { isFetching: isFetchingDRLRequestList }] =
    useLazyGetDRLRequestListQuery()
  const [getAttachmentListQuery, { isFetching: isFetchingAttachments }] =
    useLazyGetDRLAttachmentListQuery()

  const onToggleSwitch = (i: boolean) => {
    setShowMissingDocs(i)
  }
  const checkMissingDocs = (i: boolean) => {
    if (i) {
      const mappedCategoriesData: DRLCategoriesResponse[] = drlAPIResponseData
        .map(cat => {
          const missDocsList = cat.lineItems.filter(item => !item.completed)
          if (missDocsList.length > 0) {
            return {
              ...cat,
              lineItems: missDocsList,
            }
          } else {
            return null
          }
        })
        .filter(i => i != null)
      setFilteredListData(mappedCategoriesData)
    } else {
      setFilteredListData(drlAPIResponseData)
    }
    setIsRender(!isRender)
  }
  const getLineItemAttachments = (
    selectedCategory: DRLCategoriesResponse,
    selectedLineItem: DRLListResponse
  ) => {
    getAttachmentListQuery(selectedLineItem.requestListId)
      .unwrap()
      .then(attachments => {
        const mappedCategoriesData: DRLCategoriesResponse[] =
          drlAPIResponseData.map(category => {
            if (category.order === selectedCategory.order) {
              const updatedLineItems = category.lineItems.map(lineItem => {
                if (lineItem.requestListId === selectedLineItem.requestListId) {
                  return {
                    ...lineItem,
                    expanded: true,
                    attachments: attachments,
                  }
                } else {
                  return lineItem
                }
              })
              return { ...category, lineItems: updatedLineItems }
            } else {
              return category
            }
          })
        setAPIResponseData(mappedCategoriesData)
        setFilteredListData(mappedCategoriesData)
      })
      .catch(error => {
        console.error(error)
        errorMessageToast(error)
      })
  }

  const getLineItemsList = (categories: [DRLCategoriesResponse]) => {
    getDRLListQuery()
      .unwrap()
      .then(lineItemResponse => {
        const mappedCategoriesData: DRLCategoriesResponse[] = categories
          .map(cat => {
            const listData = lineItemResponse.filter(
              item => item.category === cat.category
            )
            const completedCount = listData.filter(
              item => item.completed
            ).length
            if (listData.length > 0) {
              return {
                ...cat,
                subTitle:
                  cat.category == 'Uncategorized'
                    ? `${listData.length} FILES`
                    : `${completedCount}/${listData.length} COMPLETED`,
                isCompleted:
                  cat.category != 'Uncategorized'
                    ? completedCount === listData.length
                    : false,
                expanded: expandedCategories.some(i => i.order == cat.order),
                lineItems: listData,
              }
            } else {
              return null
            }
          })
          .filter(i => i != null)
        setAPIResponseData(mappedCategoriesData)
        setFilteredListData(mappedCategoriesData)
      })
      .catch(err => {
        console.error(err)
        errorMessageToast(err)
      })
  }
  const getCategories = () => {
    getDRLCategoriesListQuery()
      .unwrap()
      .then(categories => {
        getLineItemsList(categories)
      })
      .catch(err => {
        errorMessageToast(err)
      })
  }
  const toggleHeader = (cat: DRLCategoriesResponse) => {
    const lineItem = filteredListData.find(
      listItem => listItem.order == cat.order
    )
    if (lineItem != null) {
      lineItem.expanded = !lineItem.expanded
      setIsRender(!isRender)
      const arr = filteredListData.filter(i => i.expanded)
      setExpandedCategories(arr)
    }
  }
  const toggleAttachments = (
    cat: DRLCategoriesResponse,
    selectedLineItem: DRLListResponse
  ) => {
    if (selectedLineItem.fileCount > 0 && !selectedLineItem.expanded) {
      getLineItemAttachments(cat, selectedLineItem)
    } else {
      const lineItems = filteredListData.find(
        i => i.order == cat.order
      ).lineItems
      if (lineItems.length > 0) {
        const index = filteredListData.findIndex(i => i.order == cat.order)
        const updateLineItems = lineItems?.map(dataItem => {
          if (dataItem.requestListId === selectedLineItem.requestListId) {
            return { ...dataItem, expanded: !dataItem.expanded }
          }
          return dataItem
        })
        const newListData = [...filteredListData]
        newListData[index].lineItems = updateLineItems
        setFilteredListData(newListData)
        setIsRender(!isRender)
      }
    }
  }
  const renderItem = ({ item }) => {
    return (
      <DRLLineItemCategory
        navigation={navigation}
        item={item}
        onHeaderPress={selected => {
          toggleHeader(selected)
        }}
        onPressAttachment={(cat, lineItem) => {
          toggleAttachments(cat, lineItem)
        }}
      />
    )
  }

  useEffect(() => {
    getCategories()
  }, [refreshDRLCategory])
  useEffect(() => {
    checkMissingDocs(showMissingDocs)
  }, [showMissingDocs, drlAPIResponseData])
  return (
    <SafeAreaView style={glbStyles.body}>
      <Spinner
        visible={
          isFetchingDRLCategories ||
          isFetchingDRLRequestList ||
          isFetchingAttachments
        }
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <View style={styles.missingDocumentView}>
        <Switch
          value={showMissingDocs}
          onValueChange={onToggleSwitch}
          trackColor={{
            false: Colors.backgroundUploadHome,
            true: Colors.testColorBlue,
          }}
          thumbColor={Colors.white}
        />
        <Text
          children={t('questionnaire:SHOW_MISSING_DOC')}
          stylesContainerText={styles.missingDocumentTitle}
        />
      </View>
      <FlatList
        extraData={isRender}
        data={filteredListData}
        keyExtractor={item => `${item.order}`}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}
export default DRLLandingScreen
