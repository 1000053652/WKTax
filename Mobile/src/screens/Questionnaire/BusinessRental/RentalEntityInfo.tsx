import { ApplicationScreenProps } from 'Mobile/@types/navigation'
import Text from '../../../theme/common/Text'
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
} from 'react-native'
import styles from '../styles'
import { imageConstant } from '../../../theme/Images'
import {
  useLazyDeleteRentalEntityListQuery,
  useLazyGetRentalItemDetailsQuery,
} from '../../../services/modules/business'
import { getSelectedRentalItemDetails } from '../../../store/business'
import ContactModal from '../../../theme/common/Modal'
import { useDispatch, useSelector } from 'react-redux'
import {
  BusinessEntityHelper,
  PageListItems,
} from '../../../../src/store/business/types'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { GridCode } from '../../../services/constants/GridCode'
import { PageCode } from '../../../services/constants/PageCode'
import { ScrollView } from 'react-native-gesture-handler'
import { infoTypeRentalFarmListingKeyValue } from './Utils'
import { errorMessageToast } from '../../Error/utils'
import { glbStyles } from '../../../../src/styles/global'
const RentalEntityInfo = ({ navigation, route }: ApplicationScreenProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [selectedItemName, setSelectedItemName] = useState('')
  const [getRentalItemDetails] = useLazyGetRentalItemDetailsQuery()
  const [deleteRentalEntityList] = useLazyDeleteRentalEntityListQuery()
  const rentalEntitiesData: PageListItems = useSelector(
    state => state?.business?.rentalEntities
  )
  const [isHasPriorData, setIsHasPriorData] = useState(false)
  const isFocused = useIsFocused()
  const [modalVisible, setModalVisible] = useState(false)
  const navigationList = (item: { id: string; title: string }) => {
    switch (item.id) {
      case '0':
        navigation.navigate('AddUpdateRentalGeneralDetails', {
          selectedItemName: selectedItemName,
          entityID: route?.params?.entityID,
          entityPageID: route?.params?.entityPageID,
        })
        break
      case '1':
        navigation.navigate('RentalIncome', {
          isAdd: false,
          selectedItemName: selectedItemName,
          entityID: route?.params?.entityID,
          entityPageID: route?.params?.entityPageID,
        })
        break
      case '2':
        navigation.navigate('RentalExpensesView', {
          entityID: route?.params?.entityID,
          entityPageID: route?.params?.entityPageID,
          selectedItemName: selectedItemName,
        })
        break
      case '3':
        navigation.navigate('AsstesScreen', {
          entityID: route?.params?.entityID,
          entityPageID: route?.params?.entityPageID,
          code: PageCode.BusinessAssets,
          gridCode: GridCode.BusinessAssets,
          pageName: t('task:Assets2'),
          selectedItemName: selectedItemName,
        })
        break
      case '4':
        navigation.navigate('VehiclesScreen', {
          entityID: route?.params?.entityID,
          entityPageID: route?.params?.entityPageID,
          code: PageCode.BusinessRentalVehicles,
          gridCode: GridCode.BusinessVehicles,
          selectedItemName: selectedItemName,
        })
        break
      case '5':
        navigation.navigate('HomeOfficeListing', {
          entityID: route?.params?.entityID,
          entityPageID: route?.params?.entityPageID,
          code: PageCode.BusinessRentalHomeOfficeExp,
          gridCode: GridCode.RentalOffice,
          selectedItemName: selectedItemName,
          expPageCode: PageCode.OtherBusinessOffices,
          expGridCode: GridCode.OtherBusinessOffices,
        })
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
      getRentalItemDetails(route?.params?.entityID)
        .unwrap()
        .then(resp => {
          if (resp != null && resp?.payload != null) {
            dispatch(getSelectedRentalItemDetails(JSON.parse(resp?.payload)))
            setSelectedItemName(
              JSON.parse(resp?.payload)?.miDataModel?.data?.txtPropAddr
            )
            if (rentalEntitiesData.Entities != null) {
              rentalEntitiesData.Entities.forEach(element => {
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
    deleteRentalEntityList(deletingParam)
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
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          t('common:CANCEL'),
          t('common:DELETE') + ' ' + `${selectedItemName}`,
        ],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'light',
        message: t('businessRental:REMOVE_THIS') + `${selectedItemName}`,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          if (rentalEntitiesData.EntityHelper != null) {
            deleteData(
              rentalEntitiesData.EntityHelper?.entityPageID,
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
            data={infoTypeRentalFarmListingKeyValue}
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
                  if (rentalEntitiesData.EntityHelper != null) {
                    if (Platform.OS == 'ios') {
                      onPress()
                    } else if (Platform.OS == 'android') {
                      setModalVisible(true)
                    }
                  }
                }}
              >
                <Text
                  children={t('businessRental:RENTAL_DELETE_TEXT')}
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
              if (rentalEntitiesData.EntityHelper != null) {
                deleteData(
                  rentalEntitiesData.EntityHelper?.entityPageID,
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

export default RentalEntityInfo
