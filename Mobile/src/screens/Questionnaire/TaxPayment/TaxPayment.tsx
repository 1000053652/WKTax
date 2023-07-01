import Text from '../../../theme/common/Text'
import React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import styles from '../styles'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../Common/LoaderStyle'
import { useTranslation } from 'react-i18next'
import { Colors, FontFamily, moderateScale } from '../../../theme/constants'
import BusinessListing from '../BusinessRental/BusinessListing'
import Button from '../../../theme/common/Button'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import EmptyAreas from '../BusinessRental/EmptyAreas'
import { BusinessRentalFarmType } from '../BusinessRental/Utils'
import { YesNoResult } from '../../../theme/common/YesNoButton/types'
import { TaxPaymentType } from './utils'
import useTaxPaymentHook from './hooks/useTaxPaymentHook'
import YNOSegmentedControl from '../../../../src/theme/common/YNOSegmentedControl'
import { glbStyles } from '../../../../src/styles/global'

const TaxPayment = ({ navigation }: ApplicationScreenProps) => {
  const { t } = useTranslation()

  const {
    isFetching,
    isRefersh,
    YesNoCallback,
    taxPaymentYNo,
    singleServiceListData,
    federalEntities,
    onRowDeleting,
    federalData,
    callAddEdit,
    stateEntities,
    stateData,
    cityEntities,
    cityData,
    submitBusiness,
  } = useTaxPaymentHook(navigation)

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Spinner
        visible={isFetching}
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <ScrollView>
        {EmptyAreas()}
        {isRefersh && (
          <YNOSegmentedControl
            value={taxPaymentYNo}
            yesValue={YesNoResult.YES}
            noValue={YesNoResult.NO}
            onValueChange={value => YesNoCallback(value)}
            title={t('taxpayment:YNO_TEXTS')}
          />
        )}

        <View style={styles.horizontalLine} />

        <View style={styles.grayTextArea}>
          <Text
            stylesContainerText={styles.grayTitleText}
            testID="ss"
            children={
              'IN ' +
              `${singleServiceListData?.taxYear} ` +
              t('taxpayment:YEARLYQUESTION') +
              ` ${singleServiceListData?.taxYear} ` +
              t('taxpayment:RETURN')
            }
          />
        </View>
        <BusinessListing
          type={BusinessRentalFarmType.Federal}
          listingData={federalEntities}
          deleteRow={entityID =>
            onRowDeleting(
              federalData.EntityHelper?.entityPageID == undefined
                ? ''
                : federalData.EntityHelper?.entityPageID,
              entityID,
              TaxPaymentType.Federal,
              false
            )
          }
          isForBusiness={false}
          onClickRow={entityID =>
            callAddEdit(
              federalData.EntityHelper?.entityPageID == undefined
                ? ''
                : federalData.EntityHelper?.entityPageID,
              entityID,
              TaxPaymentType.Federal,
              true
            )
          }
          onAddClick={() => {
            if (taxPaymentYNo === '1') {
              callAddEdit(
                federalData.EntityHelper?.entityPageID == undefined
                  ? ''
                  : federalData.EntityHelper?.entityPageID,
                '',
                TaxPaymentType.Federal,
                false
              )
            }
          }}
        />
        <BusinessListing
          type={BusinessRentalFarmType.State}
          listingData={stateEntities}
          deleteRow={entityID =>
            onRowDeleting(
              stateData.EntityHelper?.entityPageID == undefined
                ? ''
                : stateData.EntityHelper?.entityPageID,
              entityID,
              TaxPaymentType.State,
              false
            )
          }
          isForBusiness={false}
          onClickRow={entityID =>
            callAddEdit(
              stateData.EntityHelper?.entityPageID == undefined
                ? ''
                : stateData.EntityHelper?.entityPageID,
              entityID,
              TaxPaymentType.State,
              true
            )
          }
          onAddClick={() => {
            if (taxPaymentYNo === '1') {
              callAddEdit(
                stateData.EntityHelper?.entityPageID == undefined
                  ? ''
                  : stateData.EntityHelper?.entityPageID,
                '',
                TaxPaymentType.State,
                false
              )
            }
          }}
        />
        <BusinessListing
          type={BusinessRentalFarmType.City}
          listingData={cityEntities}
          deleteRow={entityID =>
            onRowDeleting(
              cityData.EntityHelper?.entityPageID == undefined
                ? ''
                : cityData.EntityHelper?.entityPageID,
              entityID,
              TaxPaymentType.City,
              false
            )
          }
          isForBusiness={false}
          onClickRow={entityID => {
            callAddEdit(
              cityData.EntityHelper?.entityPageID == undefined
                ? ''
                : cityData.EntityHelper?.entityPageID,
              entityID,
              TaxPaymentType.City,
              true
            )
          }}
          onAddClick={() => {
            if (taxPaymentYNo === '1') {
              callAddEdit(
                cityData.EntityHelper?.entityPageID == undefined
                  ? ''
                  : cityData.EntityHelper?.entityPageID,
                '',
                TaxPaymentType.City,
                false
              )
            }
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
            submitBusiness('0', true, taxPaymentYNo)
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
            submitBusiness('1', true, taxPaymentYNo)
          }}
          stylesContainer={styles.buttonContactStyle}
          stylesContainerText={styles.buttonDoneContactStyle}
        />
      </View>
      <View style={styles.horizontalLine} />
    </SafeAreaView>
  )
}

export default TaxPayment
