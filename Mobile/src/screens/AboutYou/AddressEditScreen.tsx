import React, { useState } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { ApplicationScreenProps } from '../../../@types/navigation'
import Button from '../../theme/common/Button'
import Input from '../../theme/common/Input'
import Text from '../../theme/common/Text'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'

import {
  QueryParamAboutYou,
  useLazyAboutYouDataApiQuery,
} from '../../services/modules/aboutYou'
import { PageCode } from '../../services/constants/PageCode'
import { QAndAModel } from '../../../src/store/aboutyou/types'
import { AboutYouRequestBody } from '../../../src/services/modules/aboutYou/AboutYouRequestBody'
import { states } from '../../../src/services/constants/ConstantsData'
import { Header } from 'react-native-elements'
import { errorMessageToast } from '../Error/utils'
import { CustomDropdown } from '../../../src/theme/common/CustomDropdown'
import { glbCustomerHeaderOptions, glbStyles } from '../../../src/styles/global'

const AddressEditScreen = ({ navigation }: ApplicationScreenProps) => {
  const { t } = useTranslation()
  const [selectedStateCode, setSelectedStateCode] = useState('')
  const getTaxPayerData = useSelector(state => state?.aboutyou?.taxPayer)
  const getspouseTaxPayerData = useSelector(
    state => state?.aboutyou?.spouseTaxPayer
  )
  const getaddressData = useSelector(state => state?.aboutyou?.address)
  const arrayListQandA: Array<QAndAModel> = useSelector(
    state => state?.aboutyou?.qAndA
  )

  const [aboutYouDataApi, { isSuccess, isError }] =
    useLazyAboutYouDataApiQuery()
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      txtApt: getaddressData.txtApt,
      txtCity: getaddressData.txtCity,
      txtForeignCountry: getaddressData.txtForeignCountry,
      txtForeignCounty: getaddressData.txtForeignCounty,
      txtState: getaddressData.txtState,
      txtStreet: getaddressData.txtStreet,
      txtZIP: getaddressData.txtZIP,
      txtForeignPostalCode: getaddressData.txtForeignPostalCode,
    },
  })

  const cancelClick = () => {
    navigation.goBack()
  }

  const SubmitAboutYou = data => {
    const updateAboutYouBody = {
      cmbSPState: getspouseTaxPayerData.cmbTPState as string,
      cmbTPState: getTaxPayerData.cmbTPState as string,
      code: '6003' as string,
      datSPDOB: getspouseTaxPayerData.datTPDOB as string,
      datSPDeceased: getspouseTaxPayerData.datTPDeceased as string,
      datSPExpiration: getspouseTaxPayerData.datTPExpiration as string,
      datSPIssue: getspouseTaxPayerData.datTPIssue as string,
      datTPDOB: getTaxPayerData.datTPDOB as string,
      datTPDeceased: getTaxPayerData.datTPDeceased as string,
      datTPExpiration: getTaxPayerData.datTPExpiration as string,
      datTPIssue: getTaxPayerData.datTPIssue as string,
      ssnSP_X: getspouseTaxPayerData.ssnTP_X as string,
      ssnTP_X: getTaxPayerData.ssnTP_X as string,
      txtApt: data.txtApt as string,
      txtCity: data.txtCity as string,
      txtForeignCountry: data.txtForeignCountry as string,
      txtForeignCounty: data.txtForeignCounty as string,
      txtForeignPostalCode: data.txtForeignPostalCode as string,
      txtSPCellPH: getspouseTaxPayerData.txtTPCellPH as string,
      txtSPCellPref: getspouseTaxPayerData.txtTPCellPref as string,
      txtSPDL: getspouseTaxPayerData.txtTPDL as string,
      txtSPDTPref: getspouseTaxPayerData.txtTPDTPref as string,
      txtSPEPPref: getspouseTaxPayerData.txtTPEPPref as string,
      txtSPEmail: getspouseTaxPayerData.txtTPEmail as string,
      txtSPEveningPH: getspouseTaxPayerData.txtTPEveningPH as string,
      txtSPFirstName: getspouseTaxPayerData.txtTPFirstName as string,
      txtSPLastName: getspouseTaxPayerData.txtTPLastName as string,
      txtSPMiddleInitial: getspouseTaxPayerData.txtTPMiddleInitial as string,
      txtSPOccupation: getspouseTaxPayerData.txtTPOccupation as string,
      txtSPWorkPH: getspouseTaxPayerData.txtTPWorkPH as string,
      txtState: selectedStateCode,
      txtStreet: data.txtStreet as string,
      txtTPCellPH: getTaxPayerData.txtTPCellPH as string,
      txtTPCellPref: getTaxPayerData.txtTPCellPref as string,
      txtTPDL: getTaxPayerData.txtTPDL as string,
      txtTPDTPref: getTaxPayerData.txtTPDTPref as string,
      txtTPEPPref: getTaxPayerData.txtTPEPPref as string,
      txtTPEmail: getTaxPayerData.txtTPEmail as string,
      txtTPEveningPH: getTaxPayerData.txtTPEveningPH as string,
      txtTPFirstName: getTaxPayerData.txtTPFirstName as string,
      txtTPLastName: getTaxPayerData.txtTPLastName as string,
      txtTPMiddleInitial: getTaxPayerData.txtTPMiddleInitial as string,
      txtTPOccupation: getTaxPayerData.txtTPOccupation as string,
      txtTPWorkPH: getTaxPayerData.txtTPWorkPH as string,
      txtZIP: data.txtZIP as string,
      ynoCheck: '0',
      ynoSPCitizen: arrayListQandA[3].spYOrN as string,
      ynoSPClaimed: arrayListQandA[0].spYOrN as string,
      ynoSPLegallyBlind: arrayListQandA[1].spYOrN as string,
      ynoSPMilitary: arrayListQandA[4].spYOrN as string,
      ynoSPPECF: arrayListQandA[2].spYOrN as string,
      ynoTPCitizen: arrayListQandA[3].taxYOrN as string,
      ynoTPClaimed: arrayListQandA[0].taxYOrN as string,
      ynoTPLegallyBlind: arrayListQandA[1].taxYOrN as string,
      ynoTPMilitary: arrayListQandA[4].taxYOrN as string,
      ynoTPPECF: arrayListQandA[2].taxYOrN as string,
    } as AboutYouRequestBody
    const paramsSaveAboutYou = {
      pageCode: PageCode.AboutYou,
      bodyParam: updateAboutYouBody,
    } as QueryParamAboutYou

    aboutYouDataApi(paramsSaveAboutYou)
      .unwrap()
      .then(res => {
        navigation.goBack()
      })
      .catch(err => {
        console.error('APIEror:- ', err)
        errorMessageToast(err)
      })
  }
  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Header
        statusBarProps={glbCustomerHeaderOptions}
        leftComponent={
          <TouchableOpacity onPress={cancelClick}>
            <Text
              testID="header_back_from_aboutyou_change"
              stylesContainerText={styles.headerButtonText}
            >
              {t('common:CANCEL')}
            </Text>
          </TouchableOpacity>
        }
        centerComponent={
          <View>
            <Text
              testID="aboutyou_change_aboutyou"
              stylesContainerText={styles.headerTitle}
            >
              {t('aboutYou:ADDRESS')}
            </Text>
          </View>
        }
        rightComponent={
          <TouchableOpacity onPress={handleSubmit(SubmitAboutYou)}>
            <Text
              testID="aboutyou_save"
              stylesContainerText={styles.headerButtonText}
            >
              {t('common:SAVE')}
            </Text>
          </TouchableOpacity>
        }
        containerStyle={styles.headerContainer}
      />
      <View style={styles.horizontalLine} />
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.inputBoxView}>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('aboutYou:STREETADDRESS_LOWER')}
                {...register('txtStreet', {
                  maxLength: {
                    value: 45,
                    message: t('aboutYou:ERROR_WORD_LESS_THEN_45'),
                  },
                })}
                placeholder=""
                error={errors?.txtStreet?.message}
                showError={errors?.txtStreet?.type}
                value={value}
                //onBlur={onBlur}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
                testID="aboutyou_street_address"
              />
            )}
            name="txtStreet"
          />
        </View>
        <View style={styles.inputBoxView}>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                testID="aboutyou_apartment"
                {...register('txtApt', {
                  maxLength: {
                    value: 6,
                    message: t('aboutYou:ERROR_APT_6_DIGITS'),
                  },
                })}
                label={t('aboutYou:APART_NAME')}
                placeholder=""
                error={errors?.txtApt?.message}
                showError={errors?.txtApt?.type}
                value={value}
                //onBlur={onBlur}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
              />
            )}
            name="txtApt"
          />
        </View>
        <View style={styles.inputBoxView}>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                testID="aboutyou_last_name"
                {...register('txtCity', {
                  maxLength: {
                    value: 40,
                    message: t('aboutYou:ERROR_WORD_LESS_THEN_40'),
                  },
                })}
                label={t('aboutYou:CITY_LOWER')}
                placeholder=""
                error={errors?.txtCity?.message}
                showError={errors?.txtCity?.type}
                value={value}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
              />
            )}
            name="txtCity"
          />
        </View>

        <CustomDropdown
          error={errors.txtState?.message}
          containerStyle={styles.dropDownContainer}
          boxStyles={styles.dropdownBoxViewStyle}
          control={control}
          name="txtState"
          label={t('aboutYou:STATE_LOWER')}
          data={states}
          dropdownKey={'key'}
          search={true}
          dropdownValueChange={item => {
            if (item != undefined) {
              setSelectedStateCode(item)
            }
          }}
        />

        <View style={styles.inputBoxView}>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                testID="aboutyou_address_ZIP"
                {...register('txtZIP', {
                  maxLength: {
                    value: 16,
                    message: t('aboutYou:ERROR_ZIP_CODE'),
                  },
                })}
                label={t('aboutYou:ZIPCODE')}
                placeholder=""
                error={errors?.txtZIP?.message}
                showError={errors?.txtZIP?.type}
                value={value}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
              />
            )}
            name="txtZIP"
          />
        </View>

        <View style={styles.inputBoxView}>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                testID="aboutyou_ForeignCounty"
                {...register('txtForeignCounty', {
                  maxLength: {
                    value: 17,
                    message: t('aboutYou:ERROR_WORD_LESS_THAN_17'),
                  },
                })}
                label={t('aboutYou:FOREIGN_STATE')}
                placeholder=""
                error={errors?.txtForeignCounty?.message}
                showError={errors?.txtForeignCounty?.type}
                value={value}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
              />
            )}
            name="txtForeignCounty"
          />
        </View>

        <View style={styles.inputBoxView}>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                testID="aboutyou_dob"
                {...register('txtForeignCountry', {
                  maxLength: {
                    value: 17,
                    message: t('aboutYou:ERROR_WORD_LESS_THAN_17'),
                  },
                })}
                label={t('aboutYou:FOREIGN_COUNTRY')}
                placeholder=""
                error={errors?.txtForeignCountry?.message}
                showError={errors?.txtForeignCountry?.type}
                value={value}
                //onBlur={onBlur}
                onChangeText={onChange}
                iconClick={true}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
              />
            )}
            name="txtForeignCountry"
          />
        </View>

        <View style={styles.inputBoxView}>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                testID="datTPDeceased"
                {...register('txtForeignPostalCode', {
                  maxLength: {
                    value: 17,
                    message: t('aboutYou:ERROR_WORD_LESS_THAN_16'),
                  },
                })}
                label={t('aboutYou:FOREIGN_POSTAL_CODE')}
                placeholder=""
                error={errors?.txtForeignPostalCode?.message}
                showError={errors?.txtForeignPostalCode?.type}
                value={value}
                //onBlur={onBlur}
                onChangeText={onChange}
                iconClick={true}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
              />
            )}
            name="txtForeignPostalCode"
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default AddressEditScreen
