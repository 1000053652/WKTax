import { ApplicationScreenProps } from '../../../../@types/navigation'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native'
import styles from '../styles'
import { Header } from 'react-native-elements'
import Text from '../../../../src/theme/common/Text'
import { useTranslation } from 'react-i18next'
import { PageCode } from '../../../../src/services/constants/PageCode'
import EmptyAreas from '../BusinessRental/EmptyAreas'
import { SwipeListView } from 'react-native-swipe-list-view'
import { imageConstant } from '../../../../src/theme/Images'
import {
  useLazyGetHomeOfficeDataQuery,
  useLazyGetHomeOfficeDeleteTilesQuery,
} from '../../../../src/services/modules/homeOffice'
import { HomeOfficeRequest } from '../../../../src/store/questionnaire/homeOffice/types'
import { getBusinessHomeOffice } from '../../../../src/store/questionnaire/homeOffice'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../Common/LoaderStyle'
import { useFocusEffect } from '@react-navigation/native'
import { moderateScale } from '../../../../src/theme/constants'
import WKSwipeListView from '../../../theme/common/SwipeList/WKSwipeListView'
import { glbCustomerHeaderOptions, glbStyles } from '../../../../src/styles/global'

const HomeOfficeListing = ({ navigation, route }: ApplicationScreenProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const pageCode = route?.params?.code
  const gridCode = route?.params?.gridCode
  const entityid = route?.params?.entityID
  const entityPageID = route?.params?.entityPageID
  const selectedItemName = route?.params?.selectedItemName
  const expGridCode = route?.params?.expGridCode
  const expPageCode = route?.params?.expPageCode
  const HomeOfficeListingData = useSelector(
    state => state?.homeOffice?.businessHomeOffice?.miDataModel?.grids[0]?.data
  )
  const [getHomeOfficeData] = useLazyGetHomeOfficeDataQuery()
  const [getHomeOfficeDeleteTiles] = useLazyGetHomeOfficeDeleteTilesQuery()
  const [isFetching, setIsFetching] = useState(false)
  const backClick = () => {
    navigation.goBack()
  }

  useEffect(() => {
    callRefersh()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      callRefersh()
    }, [])
  )
  const callRefersh = () => {
    const homeOfficeParam = {
      entityPageID: entityPageID,
      pageCode: pageCode,
      gridCode: gridCode,
      entityID: entityid,
    } as HomeOfficeRequest
    setIsFetching(true)
    getHomeOfficeData(homeOfficeParam)
      .unwrap()
      .then(data => {
        dispatch(getBusinessHomeOffice(JSON.parse(data?.payload)))
        setIsFetching(false)
      })
      .catch(() => {
        setIsFetching(false)
      })
  }

  const callHomeOfficeEditor = (selectedItem: any | null, index) => {
    navigation.navigate('HomeOfficeAddEdit', {
      pageCode: pageCode,
      gridCode: gridCode,
      entityid: entityid,
      entityPageID: entityPageID,
      selectedItemName:
        selectedItem?.Description.length > 0
          ? selectedItem?.Description
          : `Add Home Office`,
      isEdit: selectedItem !== null,
      itemID: selectedItem !== null ? selectedItem?.id : '0',
      expGridCode: expGridCode,
      expPageCode: expPageCode,
      index: index,
    })
  }
  const renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          style={item?.id != 'new' ? styles.item : styles.blackItem}
          onPress={() => {
            callHomeOfficeEditor(item, index + 1)
          }}
        >
          <Text
            stylesContainerText={
              item?.id != 'new' ? styles.listitem : styles.blackItem
            }
            children={
              item?.Description?.length > 0
                ? item?.Description
                : `Office ${index + 1}`
            }
            testID="dependent_list_item"
          />
          <Image
            style={styles.img}
            source={
              item?.id != 'new' ? imageConstant.rightArrow : styles.blackItem
            }
          />
        </TouchableOpacity>
        <View
          style={item?.id != 'new' ? styles.horizontalLine2 : styles.blackItem}
        />
      </View>
    )
  }

  const deleteHomeOfficeAPI = (id: string) => {
    const payloadID = {
      data: {
        pageCode: pageCode,
        gridCode: gridCode,
        entityid: entityid,
      },
      grids: [
        {
          data: [
            {
              'Area Used Exclusively for Business': '',
              Description: '',
              'Improvements Made': '',
              'StatusDate In Service': '',
              'Total Area of Home': '',
              'Selling Price': '',
              id: id,
            },
          ],
        },
      ],
    }
    setIsFetching(true)
    getHomeOfficeDeleteTiles(payloadID)
      .unwrap()
      .then(response => {
        callRefersh()
      })
      .catch(error => {
        setIsFetching(false)
        console.error('error', error)
      })
  }

  const confirmationDeleteBusiness = (message: string, itemId: string) => {
    Alert.alert(t('homeOffice:DELETE'), message, [
      {
        text: t('common:NO'),
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: t('common:YES'),
        onPress: () => {
          deleteHomeOfficeAPI(itemId)
        },
        style: 'default',
      },
    ])
  }

  const renderHiddenItem = (data, rowMap) => {
    return (
      <View style={styles.rowBack}>
        <View />
        <TouchableOpacity
          style={styles.stylesSwipeViewStyle}
          onPress={() => {
            confirmationDeleteBusiness(
              t('homeOffice:DELETE_ITEM') + data.item.Description + '?',
              data.item.id
            )
          }}
        >
          <Text
            children={t('common:DELETE')}
            stylesContainerText={styles.stylesSwipeTextStyle}
            testID="dependent_list_item"
            disable={true}
          />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Spinner
        visible={isFetching}
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <Header
        statusBarProps={glbCustomerHeaderOptions}
        leftComponent={
          <View style={styles.row}>
            <TouchableOpacity onPress={backClick}>
              <Image style={styles.img} source={imageConstant.leftArrow} />
            </TouchableOpacity>
          </View>
        }
        centerComponent={
          <View>
            <Text
              testID="header_screen_title"
              stylesContainerText={styles.headerTitle}
            >
              {pageCode === PageCode.BusinessOfficeList
                ? t('homeOffice:TITLE_SCH_C')
                : pageCode === PageCode.BusinessRentalHomeOfficeExp
                ? t('homeOffice:TITLE_SCH_E')
                : t('homeOffice:TITLE_SCH_F')}
            </Text>
            <Text
              testID="header_screen_title"
              stylesContainerText={styles.headerSubTitle}
            >
              {selectedItemName}
            </Text>
          </View>
        }
        containerStyle={styles.headerContainer}
      />

      {EmptyAreas()}
      <View style={styles.item}>
        <Text
          stylesContainerText={styles.listTitleStyle}
          children={t('homeOffice:HOME_OFFICE')}
          testID="home_office"
          disable={false}
        />
      </View>
      <View style={styles.horizontalLine} />
      <View>
        <SwipeListView
          recalculateHiddenLayout={true}
          data={HomeOfficeListingData}
          renderItem={renderItem}
          keyExtractor={item => item?.id}
          renderHiddenItem={(data, rowMap) => renderHiddenItem(data, rowMap)}
          leftOpenValue={0}
          rightOpenValue={-100}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          callHomeOfficeEditor(null, null)
        }}
        style={styles.item}
      >
        <Text
          stylesContainerText={styles.addItem}
          children={t('homeOffice:ADD_OFFICE')}
          testID="add_dependent"
          disable={true}
        />
      </TouchableOpacity>
    </SafeAreaView>
  )
}
export default HomeOfficeListing
