import { ApplicationScreenProps } from '../../../../@types/navigation'
import Text from '../../../../src/theme/common/Text'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ActionSheetIOS,
  FlatList,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native'
import styles from '../styles'
import { imageConstant } from '../../../../src/theme/Images'
import {
  useLazyDeleteBusinessEntityListQuery,
  useLazyGetBusinessItemDetailsQuery,
} from '../../../../src/services/modules/business'
import { getSelectedBusinessItemDetails } from '../../../../src/store/business'
import { useDispatch, useSelector } from 'react-redux'
import {
  BusinessEntityHelper,
  PageListItems,
} from 'Mobile/src/store/business/types'
import ContactModal from '../../../theme/common/Modal'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { GridCode } from '../../../services/constants/GridCode'
import { PageCode } from '../../../services/constants/PageCode'
import { infoTypeBusinessListingKeyValue } from './Utils'
import DeviceInfo from 'react-native-device-info'
import { errorMessageToast } from '../../Error/utils'
import { glbStyles } from '../../../../src/styles/global'

const BusinessEntityInfo = ({ navigation, route }: ApplicationScreenProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const [selectedItemName, setSelectedItemName] = useState('')
  const [getBusinessItemDetails] = useLazyGetBusinessItemDetailsQuery()
  const [deleteBusinessEntityList] = useLazyDeleteBusinessEntityListQuery()
  const businessEntitiesData: PageListItems = useSelector(
    state => state?.business?.businessEntities
  )
  const [isHasPriorData, setIsHasPriorData] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const navigationList = (item: { id: string; title: string }) => {
    switch (item.id) {
      case '0':
        navigation.navigate('AddUpdateBusinessGeneralDetails', {
          selectedItemName: selectedItemName,
          entityID: route?.params?.entityID,
          entityPageID: route?.params?.entityPageID,
        })
        break
      case '1':
        navigation.navigate('Income', {
          isAdd: false,
          selectedItemName: selectedItemName,
          entityID: route?.params?.entityID,
          entityPageID: route?.params?.entityPageID,
        })
        break
      case '2':
        navigation.navigate('BusinessExpensesView', {
          entityID: route?.params?.entityID,
          entityPageID: route?.params?.entityPageID,
          selectedItemName: selectedItemName,
        })
        break
      case '3':
        navigation.navigate('AsstesScreen', {
          entityID: route?.params?.entityID,
          selectedItemName: selectedItemName,
          entityPageID: route?.params?.entityPageID,
          code: PageCode.BusinessAssets,
          gridCode: GridCode.BusinessAssets,
          pageName: t('task:Assets1'),
        })
        break
      case '4':
        navigation.navigate('VehiclesScreen', {
          entityID: route?.params?.entityID,
          entityPageID: route?.params?.entityPageID,
          code: PageCode.BusinessVehicleDetail,
          gridCode: GridCode.BusinessVehicles,
          selectedItemName: selectedItemName,
        })
        break
      case '5':
        navigation.navigate('HomeOfficeListing', {
          entityID: route?.params?.entityID,
          entityPageID: route?.params?.entityPageID,
          code: PageCode.BusinessOfficeList,
          gridCode: GridCode.BusinessOffice,
          selectedItemName: selectedItemName,
          expPageCode: PageCode.OtherBusinessOffices,
          expGridCode: GridCode.OtherBusinessOffices,
        })
        break
      case '6':
        navigation.navigate('StatutoryBusiness', {
          selectedItemName: selectedItemName,
          entityID: route?.params?.entityID,
          entityPageID: route?.params?.entityPageID,
        })
        break

      default:
        break
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigationList(item)}
        >
          <Text
            stylesContainerText={styles.listitem}
            children={item.title}
            testID="dependent_list_item"
          />
          <Image style={styles.img} source={imageConstant.rightArrow} />
        </TouchableOpacity>
        <View style={styles.horizontalLine2} />
      </View>
    )
  }
  useFocusEffect(
    React.useCallback(() => {
      callRefersh()
    }, [isFocused])
  )
  const callRefersh = () => {
    if (route?.params?.entityID != null) {
      getBusinessItemDetails(route?.params?.entityID)
        .unwrap()
        .then(resp => {
          if (resp != null && resp?.payload != null) {
            dispatch(getSelectedBusinessItemDetails(JSON.parse(resp?.payload)))
            setSelectedItemName(
              JSON.parse(resp?.payload)?.miDataModel?.data?.txtBusinessName
            )
            if (businessEntitiesData.Entities != null) {
              businessEntitiesData.Entities.forEach(element => {
                if (element.entityID === route?.params?.entityID) {
                  setIsHasPriorData(element.isProforma)
                }
              })
            }
          }
        })
    }
  }

  const deleteData = (entityPageID: string | '', entityID: string) => {
    const deletingParam = {
      entityPageID: entityPageID,
      entityID: entityID,
    } as BusinessEntityHelper
    deleteBusinessEntityList(deletingParam)
      .unwrap()
      .then(res => {
        navigation.goBack()
      })
      .catch(error => {
        console.error(error)
        errorMessageToast(error)
      })
  }

  const onPress = () => {
    let btnArray: any = [
      t('common:CANCEL'),
      t('common:DELETE') + ' ' + `${selectedItemName}`,
    ]
    if (DeviceInfo.getDeviceType() === 'Tablet') {
      btnArray = [
        t('common:CANCEL'),
        t('common:DELETE') + ' ' + `${selectedItemName}`,
        t('common:CANCEL'),
      ]
    }
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: btnArray,
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'light',
        message: t('businessRental:REMOVE_THIS') + `${selectedItemName}`,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          if (businessEntitiesData.EntityHelper != null) {
            deleteData(
              businessEntitiesData.EntityHelper?.entityPageID,
              route?.params?.entityID
            )
          }
        }
      }
    )
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <ScrollView>
        <Text
          children={selectedItemName}
          stylesContainerText={styles.headerSubTitleForBRF}
          testID="questionnaire_main_name"
        />
        <View>
          <FlatList
            data={infoTypeBusinessListingKeyValue}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
          <View style={styles.grayTextArea} />
          <View style={styles.horizontalLine} />
          {!isHasPriorData ? (
            <View>
              <TouchableOpacity
                style={styles.deleteBtnViewStyle}
                onPress={() => {
                  if (businessEntitiesData.EntityHelper != null) {
                    if (Platform.OS == 'ios') {
                      onPress()
                    } else if (Platform.OS == 'android') {
                      setModalVisible(true)
                    }
                  }
                }}
              >
                <Text
                  children={t('businessRental:BUSINESS_DELETE_TEXT')}
                  stylesContainerText={styles.deleteTextStyle}
                  testID="dependent_list_item"
                  disable={true}
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <ContactModal
            onPress={() => setModalVisible(false)}
            onPressText={() => {
              if (businessEntitiesData.EntityHelper != null) {
                deleteData(
                  businessEntitiesData.EntityHelper?.entityPageID,
                  route?.params?.entityID
                )
              }
            }}
            title={t('businessRental:REMOVE_THIS') + `${selectedItemName}`}
            description={t('common:REMOVE') + `${selectedItemName}`}
            buttonText={t('common:CANCEL')}
          />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  )
}

export default BusinessEntityInfo
