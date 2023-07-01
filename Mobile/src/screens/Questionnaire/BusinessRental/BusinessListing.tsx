import Text from '../../../../src/theme/common/Text'
import { Alert, Image, TouchableOpacity, View } from 'react-native'
import styles from '../styles'
import { imageConstant } from '../../../../src/theme/Images'
import { SwipeListView } from 'react-native-swipe-list-view'
import { BusinessListingProps, BusinessRentalFarmType } from './Utils'
import { useTranslation } from 'react-i18next'
import { moderateScale } from '../../../../src/theme/constants'
import { glbStyles } from '../../../../src/styles/global'
import { states } from '../../../../src/services/constants/ConstantsData'
import React from 'react'
import { formatCurrency } from '../../../../src/theme/common/TextInput/utils'

const BusinessListing = (props: BusinessListingProps) => {
  const { t } = useTranslation()

  const deleteDependent = (item: {}) => {
    let message = 'new'
    switch (props.type) {
      case BusinessRentalFarmType.Business:
      case BusinessRentalFarmType.Rental:
      case BusinessRentalFarmType.Farm:
        message =
          t('questionnaire:DELETE_BUSINESS') +
          ' ' +
          item?.processedFieldValue +
          '?'
        break
      case BusinessRentalFarmType.Federal:
      case BusinessRentalFarmType.State:
      case BusinessRentalFarmType.City:
        message =
          t('questionnaire:DELETE_BUSINESS') + ' ' + item?.description + '?'
        break
      case BusinessRentalFarmType.BFederal:
        message = t('taxpayment:DELETE_F')
        break
      case BusinessRentalFarmType.BState:
        message = t('taxpayment:DELETE_S')
        break
      case BusinessRentalFarmType.BCity:
        message = t('taxpayment:DELETE_C')
        break

      default:
        break
    }
    Alert.alert(t('common:DELETE'), message, [
      {
        text: t('common:CANCEL'),
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: t('common:OK'),
        onPress: () => {
          switch (props.type) {
            case BusinessRentalFarmType.BFederal:
            case BusinessRentalFarmType.BState:
            case BusinessRentalFarmType.BCity:
              props.deleteRow(item?.paymentId)
              break
            default:
              props.deleteRow(item?.entityID)

              break
          }
        },
        style: 'default',
      },
    ])
  }

  const title: string =
    props.type == BusinessRentalFarmType.Business
      ? t('businessRental:BUSINESS_C')
      : props.type == BusinessRentalFarmType.Rental
      ? t('businessRental:RENTAL_TITLE')
      : props.type == BusinessRentalFarmType.Farm
      ? t('businessRental:FARM')
      : props.type == BusinessRentalFarmType.Federal ||
        props.type == BusinessRentalFarmType.BFederal
      ? t('taxpayment:FEDERAL')
      : props.type == BusinessRentalFarmType.State ||
        props.type == BusinessRentalFarmType.BState
      ? t('taxpayment:STATE')
      : props.type == BusinessRentalFarmType.City ||
        props.type == BusinessRentalFarmType.BCity
      ? t('taxpayment:CITY')
      : ''

  const buttonTitle: string =
    props.type == BusinessRentalFarmType.Business
      ? t('businessRental:ADD_BUSINESS')
      : props.type == BusinessRentalFarmType.Rental
      ? t('businessRental:ADD_RENTAL')
      : props.type == BusinessRentalFarmType.Farm
      ? t('businessRental:ADD_FARM')
      : props.type == BusinessRentalFarmType.Federal ||
        props.type == BusinessRentalFarmType.BFederal
      ? t('taxpayment:ADD_FEDERAL')
      : props.type == BusinessRentalFarmType.State ||
        props.type == BusinessRentalFarmType.BState
      ? t('taxpayment:ADD_STATE')
      : props.type == BusinessRentalFarmType.City ||
        props.type == BusinessRentalFarmType.BCity
      ? t('taxpayment:ADD_CITY')
      : ''

  const rowMultiple = ({ item }) => {
    switch (props.type) {
      case BusinessRentalFarmType.Federal:
      case BusinessRentalFarmType.BFederal:
        if (props.isForBusiness) {
          return withData(
            t('taxpayment:FEDERAL_LOWER'),
            item?.paymentDate,
            item?.paymentAmount,
            item?.paymentId
          )
        } else {
          return withData(
            t('taxpayment:FEDERAL_LOWER'),
            JSON.parse(item?.processedFieldValue)?.datFedPaymentDate,
            JSON.parse(item?.processedFieldValue)?.curPaymentAmount,
            item?.entityID
          )
        }

        break
      case BusinessRentalFarmType.State:
      case BusinessRentalFarmType.BState:
        if (props.isForBusiness) {
          return withData(
            item?.stateName,
            item?.paymentDate,
            item?.paymentAmount,
            item?.paymentId
          )
        } else {
          const stateValue = states.filter(
            state => state.key == JSON.parse(item?.processedFieldValue)?.txtState
          )[0]?.value
          return withData(
            stateValue,
            JSON.parse(item?.processedFieldValue)?.datStatePaymentDate,
            JSON.parse(item?.processedFieldValue)?.curStatePaymentAmount,
            item?.entityID
          )
        }
        break
      case BusinessRentalFarmType.City:
      case BusinessRentalFarmType.BCity:
        if (props.isForBusiness) {
          return withData(
            item?.districtName,
            item?.paymentDate,
            item?.paymentAmount,
            item?.paymentId
          )
        } else {
          return withData(
            JSON.parse(item?.processedFieldValue).txtState,
            JSON.parse(item?.processedFieldValue).datCityPaymentDate,
            JSON.parse(item?.processedFieldValue).curCityPaymentAmount,
            item.entityID
          )
        }
        break

      default:
        break
    }
  }
  const withData = (
    Description: string,
    dt: string,
    amount: string,
    entityID: string
  ) => {
    return (
      <View style={glbStyles.cutout}>
        <TouchableOpacity onPress={() => props.onClickRow(entityID)}>
          <View style={Description != '' ? styles.item : styles.blackItem}>
            <Text
              stylesContainerText={
                Description != '' ? styles.listitem : styles.blackItem
              }
              children={Description}
              testID="dependent_list_item"
            />
            <Image
              style={styles.img}
              source={
                Description != '' ? imageConstant.rightArrow : styles.blackItem
              }
            />
          </View>
          <View style={styles.row}>
            <View style={styles.expLeftItem}>
              <Text
                stylesContainerText={styles.expListitem}
                children={t('taxpayment:DATE')}
                testID="dependent_list_item"
              />
              <Text
                stylesContainerText={styles.expListsubitem}
                children={dt}
                testID="dependent_list_item"
              />
            </View>
            <View style={styles.expItem}>
              <Text
                stylesContainerText={styles.expListitem}
                children={t('taxpayment:AMOUNT')}
                testID="dependent_list_item"
              />
              <Text
                stylesContainerText={styles.expListsubitem}
                children={formatCurrency(amount, true)}
                testID="dependent_list_item"
              />
            </View>
          </View>
          <View
            style={Description != '' ? styles.horizontalLine : styles.blackItem}
          />
        </TouchableOpacity>
      </View>
    )
  }
  const rowSingle = ({ item }) => {
    return (
      <View style={glbStyles.cutout}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => props.onClickRow(item?.entityID)}
        >
          <Text
            stylesContainerText={styles.listitem}
            children={item?.processedFieldValue}
            testID="dependent_list_item"
          />
          <Image style={styles.img} source={imageConstant.rightArrow} />
        </TouchableOpacity>
        <View style={styles.horizontalLine2} />
      </View>
    )
  }
  const renderHiddenItem = (data, rowMap) => {
    return !data?.item.isProforma ? (
      <View style={styles.rowBack}>
        <View />
        <TouchableOpacity
          style={styles.stylesSwipeViewStyle}
          onPress={() => deleteDependent(data?.item)}
        >
          <Text
            children={t('common:DELETE')}
            stylesContainerText={styles.stylesSwipeTextStyle}
            testID="dependent_list_item"
            disable={true}
          />
        </TouchableOpacity>
      </View>
    ) : null
  }
  return (
    <View>
      <View style={styles.grayArea} />
      <View style={styles.item}>
        <Text
          stylesContainerText={styles.headerText}
          children={title}
          testID="add_business_rental"
          disable={false}
        />
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.swipeListViewStyle}>
        <SwipeListView
          data={props.listingData}
          recalculateHiddenLayout={true}
          renderItem={
            props.type == BusinessRentalFarmType.Business ||
            props.type == BusinessRentalFarmType.Rental ||
            props.type == BusinessRentalFarmType.Farm
              ? rowSingle
              : rowMultiple
          }
          keyExtractor={item => item?.entityID}
          renderHiddenItem={(data, rowMap) => renderHiddenItem(data, rowMap)}
          leftOpenValue={0}
          rightOpenValue={-moderateScale(100)}
        />
      </View>
      <TouchableOpacity
        onPress={() => props.onAddClick(props.type)}
        style={styles.item}
      >
        <Text
          stylesContainerText={styles.addItem}
          children={buttonTitle}
          testID="add_dependent"
          disable={true}
        />
        <Image style={styles.img} source={imageConstant.rightArrow} />
      </TouchableOpacity>
    </View>
  )
}

export default BusinessListing
