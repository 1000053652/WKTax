import Text from '../../../theme/common/Text'
import React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import styles from '../styles'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../Common/LoaderStyle'
import { Colors, FontFamily, moderateScale } from '../../../theme/constants'
import BusinessListing from '../BusinessRental/BusinessListing'

import Button from '../../../theme/common/Button'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import { BusinessRentalFarmType } from '../BusinessRental/Utils'
import YesNoButton from '../../../theme/common/YesNoButton'
import { YesNoResult } from '../../../theme/common/YesNoButton/types'

import { TaxPaymentType } from './utils'
import useTaxPaymentBusinessHook from './hooks/useTaxPaymentBusinessHook'
import { useTranslation } from 'react-i18next'
import { glbStyles } from '../../../../src/styles/global'

const TaxPaymentBusiness = ({ navigation }: ApplicationScreenProps) => {
  const { t } = useTranslation()

  const {
    isFetching,
    singleServiceListData,
    isRefersh,
    YesNoCallback,
    taxPaymentYNo,
    federalEntities,
    onRowDeleting,
    callAddEdit,
    stateEntities,
    cityEntities,
    submitBusiness,
  } = useTaxPaymentBusinessHook(navigation)

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Spinner
        visible={isFetching}
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <ScrollView>
        <View style={styles.horizontalLine} />
        <View style={styles.grayTextArea}>
          <Text
            stylesContainerText={styles.grayTitleText}
            testID="ss"
            children={
              'IN ' +
              ` ${singleServiceListData?.taxYear}  ` +
              t('taxpayment:BUSINESS_SUB_TITLE')
            }
          />
        </View>
        <View style={styles.horizontalLine} />
        {isRefersh && (
          <YesNoButton
            callback={YesNoCallback}
            apiKey="ABCD1_KEY"
            title={t('taxpayment:BUSINESS_YNO_TITLE')}
            defaultValue={
              taxPaymentYNo === '1'
                ? YesNoResult.YES
                : taxPaymentYNo === '0'
                ? YesNoResult.NO
                : YesNoResult.NONE
            }
          />
        )}

        <View style={styles.horizontalLine} />

        <BusinessListing
          type={BusinessRentalFarmType.BFederal}
          listingData={federalEntities}
          deleteRow={entityID =>
            onRowDeleting(entityID, TaxPaymentType.Federal)
          }
          onClickRow={entityID =>
            callAddEdit(entityID, TaxPaymentType.Federal, true)
          }
          onAddClick={() => {
            callAddEdit('', TaxPaymentType.Federal, false)
          }}
          isForBusiness={true}
        />
        <BusinessListing
          type={BusinessRentalFarmType.BState}
          listingData={stateEntities}
          isForBusiness={true}
          deleteRow={entityID => onRowDeleting(entityID, TaxPaymentType.State)}
          onClickRow={entityID =>
            callAddEdit(entityID, TaxPaymentType.State, true)
          }
          onAddClick={() => {
            callAddEdit('', TaxPaymentType.State, false)
          }}
        />
        <BusinessListing
          type={BusinessRentalFarmType.BCity}
          listingData={cityEntities}
          isForBusiness={true}
          deleteRow={entityID => onRowDeleting(entityID, TaxPaymentType.City)}
          onClickRow={entityID =>
            callAddEdit(entityID, TaxPaymentType.City, true)
          }
          onAddClick={() => {
            callAddEdit('', TaxPaymentType.City, false)
          }}
        />
      </ScrollView>

      <View style={styles.horizontalLine} />

      <View style={styles.buttonConatinerStyle}>
        <Button
          testID="aboutYou.btn.finishlater"
          disable={false}
          title={t('aboutYou:FINISHLATER')}
          onPress={() => {
            submitBusiness(false, taxPaymentYNo)
          }}
          stylesContainer={styles.buttonFinishContactStyle}
          stylesContainerText={{
            fontSize: moderateScale(14),
            justifyContent: 'center',
            textAlign: 'center',
            color: Colors.black,
            fontFamily: FontFamily.FiraSansRegular,
          }}
        />

        <Button
          testID="aboutYou.btn.done"
          disable={false}
          title={t('aboutYou:DONE')}
          onPress={() => {
            submitBusiness(true, taxPaymentYNo)
          }}
          stylesContainer={styles.buttonContactStyle}
          stylesContainerText={styles.buttonDoneContactStyle}
        />
      </View>
      <View style={styles.horizontalLine} />
    </SafeAreaView>
  )
}

export default TaxPaymentBusiness
