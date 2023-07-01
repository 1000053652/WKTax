import React, { useEffect, useState } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { ApplicationScreenProps } from '../../../@types/navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Input from '../../theme/common/Input'
import Text from '../../theme/common/Text'

import styles from './styles'
import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux'
import { useForm, Controller, SubmitErrorHandler } from 'react-hook-form'
import {
  QueryParamAboutYou,
  useLazyAboutYouDataApiQuery,
} from '../../../src/services/modules/aboutYou'
import { PageCode } from '../../../src/services/constants/PageCode'
import { Switch } from 'react-native-paper'
import {
  Colors,
  dateFormat,
  formatWithStar,
  getContryCodeData,
  getContryCodeLabel,
} from '../../../src/theme/constants'
import { QAndAModel } from '../../../src/store/aboutyou/types'
import { AboutYouRequestBody } from '../../../src/services/modules/aboutYou/AboutYouRequestBody'
import { states } from '../../../src/services/constants/ConstantsData'
import moment from 'moment'
import { Header } from 'react-native-elements'
import { CustomDropdown } from '../../../src/theme/common/CustomDropdown'
import CommonDatePicker, { dateFormatPlaceFolder } from '../../../src/theme/common/CommonDatePicker'
import { errorMessageToast } from '../Error/utils'
import { handleValidEmail } from '../../theme/Common'
import { glbCustomerHeaderOptions, glbStyles } from '../../../src/styles/global'
const TaxPayerEditScreen = ({ navigation }: ApplicationScreenProps) => {
  const [selectedStateCode, setSelectedStateCode] = useState('')

  const { t } = useTranslation()
  const [emailValidError,  setEmailValidError] = useState(false)
  const [errorForExpDate, setErrorForExpDate] = useState('')
  const selectOne = [{ abr: ' ', label: ' ', value: ' ' }]
  const countryData: CountryCodeType[] = [...selectOne, ...useSelector(
    state => state?.profile?.countryData)]
  const getTaxPayerData = useSelector(state => state?.aboutyou?.taxPayer)
  const getspouseTaxPayerData = useSelector(
    state => state?.aboutyou?.spouseTaxPayer
  )
  const getaddressData = useSelector(state => state?.aboutyou?.address)
  const arrayListQandA: Array<QAndAModel> = useSelector(
    state => state?.aboutyou?.qAndA
  )
  type CountryCodeType = {
    label: string
    value: string
    abr: string
  }

  const [isEveningPEnabled, setIsEveningPEnabled] = useState(
    getTaxPayerData.txtTPEPPref == 'Y'
  )
  const [isDtPEnabled, setIsDtPEnabled] = useState(
    getTaxPayerData.txtTPDTPref == 'Y'
  )
  const [isMobilePEnabled, setIsMobilePEnabled] = useState(
    getTaxPayerData.txtTPCellPref == 'Y'
  )
  const dtToggleSwitch = () => {
    setIsDtPEnabled(previousState => !previousState)
    setIsEveningPEnabled(false)
    setIsMobilePEnabled(false)
  }

  const eveningToggleSwitch = () => {
    setIsEveningPEnabled(previousState => !previousState)
    setIsDtPEnabled(false)
    setIsMobilePEnabled(false)
  }

  const mobileToggleSwitch = () => {
    setIsMobilePEnabled(previousState => !previousState)
    setIsDtPEnabled(false)
    setIsEveningPEnabled(false)
  }

  const [aboutYouDataApi, { isSuccess, isError }] =
    useLazyAboutYouDataApiQuery()

  const getPhoneNo = (TPWorkPH: string) => {
    if (TPWorkPH.includes(')')) {
      const countryCodeEPq = TPWorkPH.split(')')
      if (countryCodeEPq.length > 1) {
        return countryCodeEPq[1].trim() as number
      } else {
        return TPWorkPH
      }
    } else {
      return TPWorkPH
    }
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    getValues
  } = useForm({
    defaultValues: {
      txtTPWorkPH: getPhoneNo(getTaxPayerData.txtTPWorkPH),
      txtTPEveningPH: getPhoneNo(getTaxPayerData.txtTPEveningPH),
      txtTPCellPH: getPhoneNo(getTaxPayerData.txtTPCellPH),
      txtTPEmail: getTaxPayerData.txtTPEmail,
      txtTPDL: getTaxPayerData.txtTPDL,
      datTPIssue: getTaxPayerData.datTPIssue,
      datTPExpiration: getTaxPayerData.datTPExpiration,
      txtTPDTPref: getTaxPayerData.txtTPDTPref,
      txtTPEPPref: getTaxPayerData.txtTPEPPref,
      txtTPCellPref: getTaxPayerData.txtTPCellPref,
      txtTPFirstName: getTaxPayerData.txtTPFirstName,
      txtTPMiddleInitial: getTaxPayerData.txtTPMiddleInitial,
      txtTPLastName: getTaxPayerData.txtTPLastName,
      txtTPFullName: getTaxPayerData.txtTPFullName,
      txtTPOccupation: getTaxPayerData.txtTPOccupation,
      cmbTPState: getTaxPayerData.cmbTPState,
      datTPDOB: getTaxPayerData.datTPDOB,
      datTPDeceased: getTaxPayerData.datTPDeceased,
      ssnTP_X: getTaxPayerData.ssnTP_X,
      datTPDTExp: '',
      cmbDayTimePhone: getContryCodeData(
        countryData,
        getTaxPayerData.txtTPWorkPH
      )?.value,
      cmbEPCC: getContryCodeData(countryData, getTaxPayerData.txtTPEveningPH)
        ?.value,
      cmbMobilePhone: getContryCodeData(
        countryData,
        getTaxPayerData.txtTPCellPH
      )?.value,
    },
  })

  useEffect(() => {
    if (getTaxPayerData?.datTPExpiration) {
      const expDate = moment(
        getTaxPayerData?.datTPExpiration,
        dateFormat
      ).toDate()
      if (getCurrentDate() > expDate) {
        setErrorForExpDate(t('aboutYou:DATE_ERROR'))
      } else {
        setErrorForExpDate('')
      }
    }
  }, [getTaxPayerData])

  const getCurrentDate = () => {
    const date = t('aboutYou:FIRST_DATE')
    const month = t('aboutYou:FIRST_MONTH')
    const year = new Date().getFullYear() + 1
    return moment(month + '/' + date + '/' + year, dateFormat).toDate()
  }
  const cancelClick = () => {
    navigation.goBack()
  }
  const getStateName = (key: string) => {
    if (key != '') {
      return states.filter(state => state.key == key)[0].value
    }
  }
  const onError: SubmitErrorHandler<Record<string, string>> = errors => {
  }

  const SubmitAboutYou = data => {
    if(!handleValidEmail(getValues('txtTPEmail')))
    {
      setEmailValidError(true)
      return
    }

    const updateAboutYouBody = {
      cmbSPState: getspouseTaxPayerData.cmbTPState as string,
      cmbTPState: selectedStateCode,
      code: PageCode.AboutYou as string,
      datSPDOB: getspouseTaxPayerData.datTPDOB as string,
      datSPDeceased: getspouseTaxPayerData.datTPDeceased as string,
      datSPExpiration: getspouseTaxPayerData.datTPExpiration as string,
      datSPIssue: getspouseTaxPayerData.datTPIssue as string,
      datTPDOB: data.datTPDOB as string,
      datTPDeceased: data.datTPDeceased as string,
      datTPExpiration:data.datTPExpiration as string,
      datTPIssue: data.datTPIssue as string,
      ssnSP_X: getspouseTaxPayerData.ssnTP_X as string,
      ssnTP_X: data.ssnTP_X as string,
      txtApt: getaddressData.txtApt as string,
      txtCity: getaddressData.txtCity as string,
      txtForeignCountry: getaddressData.txtForeignCountry as string,
      txtForeignCounty: getaddressData.txtForeignCounty as string,
      txtForeignPostalCode: getaddressData.txtForeignPostalCode as string,
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
      txtState: getaddressData.txtState as string,
      txtStreet: getaddressData.txtStreet as string,
      txtTPCellPH:
        data.txtTPCellPH != ''
          ? ((`(${data.cmbMobilePhone}) ` + data.txtTPCellPH) as string)
          : '',
      txtTPCellPref: isMobilePEnabled ? 'Y' : 'N',
      txtTPDL: data.txtTPDL as string,
      txtTPDTPref: isDtPEnabled ? 'Y' : 'N',
      txtTPEPPref: isEveningPEnabled ? 'Y' : 'N',
      txtTPEmail: data.txtTPEmail as string,
      txtTPEveningPH:
        data.txtTPEveningPH != ''
          ? ((`(${data.cmbEPCC}) ` + data.txtTPEveningPH) as string)
          : '',
      txtTPFirstName: data.txtTPFirstName as string,
      txtTPLastName: data.txtTPLastName as string,
      txtTPMiddleInitial: data.txtTPMiddleInitial as string,
      txtTPOccupation: data.txtTPOccupation as string,
      txtTPWorkPH:
        data.txtTPWorkPH != ''
          ? ((`(${data.cmbDayTimePhone}) ` + data.txtTPWorkPH) as string)
          : '',
      txtZIP: getaddressData.txtZIP as string,
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
        console.error('APIEror:- ', err.data.errorMessages)
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
              testID="header_back_from_home_office_edit"
              stylesContainerText={styles.headerButtonText}
            >
              {t('common:CANCEL')}
            </Text>
          </TouchableOpacity>
        }
        centerComponent={
          <View>
            <Text
              testID="header_home_office_item"
              stylesContainerText={styles.headerTitle}
            >
              {t('aboutYou:TAXPAYER')}
            </Text>
            <Text
              testID="header_home_office_item"
              stylesContainerText={styles.headerSubTitle}
            >
              {getTaxPayerData.txtTPFirstName}
            </Text>
          </View>
        }
        rightComponent={
          <TouchableOpacity onPress={handleSubmit(SubmitAboutYou, onError)}>
            <Text
              testID="header_home_office_save"
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
        <View style={[styles.inputBoxView, styles.topSpaceScreen]}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                {...register('txtTPFirstName', {
                  required: t('aboutYou:ERROR_FIRST_NAME'),
                  maxLength: {
                    value: 25,
                    message: t('aboutYou:ERROR_WORD_LESS_THAN_25'),
                  },
                })}
                label="First name"
                placeholder=""
                error={errors?.txtTPFirstName?.message}
                showError={errors?.txtTPFirstName?.type}
                value={value}
                //onBlur={onBlur}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
                testID="aboutyou_first_name"
              />
            )}
            name="txtTPFirstName"
          />
        </View>
        <View style={styles.inputBoxView}>
          <View style={styles.viewMiddleNameStyle}>
            <Text
              stylesContainerText={styles.textMiddleNameStyle}
              children={t('aboutYou:Middle_initial')}
              testID="aboutyou_middle_name"
            />

            <Text
              stylesContainerText={styles.textMiddleNameStyle2}
              children="Optional"
              testID="aboutyou_middle_inittial"
            />
          </View>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                testID="aboutyou_middle_name"
                {...register('txtTPMiddleInitial', {
                  maxLength: {
                    value: 1,
                    message: t('aboutYou:ERROR_ONE_LATTER'),
                  },
                })}
                label=""
                placeholder=""
                error={errors?.txtTPMiddleInitial?.message}
                showError={errors?.txtTPMiddleInitial?.type}
                value={value}
                //onBlur={onBlur}
                onChangeText={onChange}
                iconClick={false}
                maxLength={1}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
              />
            )}
            name="txtTPMiddleInitial"
          />
        </View>
        <View style={styles.inputBoxView}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                testID="aboutyou_last_name"
                {...register('txtTPLastName', {
                  required: t('aboutYou:ERROR_LAST_NAME'),
                  maxLength: {
                    value: 25,
                    message: t('aboutYou:ERROR_WORD_LESS_THAN_25'),
                  },
                })}
                label={t('aboutYou:LAST_NAME')}
                placeholder=""
                error={errors?.txtTPLastName?.message}
                showError={errors?.txtTPLastName?.type}
                value={value}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
              />
            )}
            name="txtTPLastName"
          />
        </View>
        <View style={styles.inputBoxView}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                  pointerEvents={'box-only'}
                testID="aboutyou_Social_security_number"
                {...register('ssnTP_X', {
                  required: t('aboutYou:ERROR_SS_NO'),
                  maxLength: {
                    value: 9,
                    message: t('aboutYou:ERROR_SS_NO_DIGITS'),
                  },
                  minLength: {
                    value: 9,
                    message: t('aboutYou:ERROR_SS_NO_DIGITS'),
                  },
                })}
                label={t('aboutYou:SSN_TEXT')}
                placeholder=""
                error={errors?.ssnTP_X?.message}
                showError={errors?.ssnTP_X?.type}
                value={formatWithStar(value)}
                maxLength={11}
                keyboardType="number-pad"
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
              />
            )}
            name="ssnTP_X"
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
                testID="aboutyou_Occupation"
                {...register('txtTPOccupation', {
                  minLength: {
                    value: 2,
                    message: t('aboutYou:ERROR_WORD_MORE_THAN_2'),
                  },
                  maxLength: {
                    value: 23,
                    message: t('aboutYou:ERROR_WORD_MORE_LESS_23'),
                  },
                })}
                label={t('aboutYou:OCCUPATION_LOWER')}
                placeholder=""
                value={value}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
              />
            )}
            name="txtTPOccupation"
          />
        </View>
        <CommonDatePicker
          control={control}
          name={'datTPDOB'}
          containerStyle={styles.datePickerContrainer}
          maximumDate={new Date()}
          title={t('aboutYou:DOB')}
          dateFormat={dateFormat}
          testId="date_picker_general"
          required
          onConfirm={date => {
          }}
          placeholderText={dateFormatPlaceFolder}
        />
        <CommonDatePicker
          control={control}
          name={'datTPDeceased'}
          containerStyle={styles.datePickerContrainer}
          maximumDate={new Date()}
          title={t('aboutYou:DATEOFDEC')}
          dateFormat={dateFormat}
          testId="date_picker_general"
          onConfirm={date => {
          }}
          placeholderText={dateFormatPlaceFolder}
        />
        <View style={styles.inputBoxView}>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                testID="issue_id"
                {...register('txtTPDL', {
                  maxLength: {
                    value: 40,
                    message: t('aboutYou:ERROR_WORD_LESS_THEN_40'),
                  },
                })}
                label={t('aboutYou:SIID')}
                placeholder=""
                value={value}
                //onBlur={onBlur}
                onChangeText={onChange}
                iconClick={true}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
              />
            )}
            name="txtTPDL"
          />
        </View>

        <CustomDropdown
          error={errors.cmbTPState?.message}
          containerStyle={styles.dropDownContainer}
          boxStyles={styles.dropdownBoxViewStyle}
          control={control}
          name="cmbTPState"
          label={t('aboutYou:IS')}
          data={states}
          dropdownKey={'key'}
          search={true}
          placeholder={getStateName(getTaxPayerData.cmbTPState)}
          dropdownValueChange={item => {
            if (item != undefined) {
              setSelectedStateCode(item)
            }
          }}
        />
        <CommonDatePicker
          control={control}
          name={'datTPIssue'}
          containerStyle={styles.datePickerContrainer}
          maximumDate={new Date()}
          title={t('aboutYou:I_D')}
          dateFormat={dateFormat}
          testId="date_picker_general"
          placeholderText={dateFormatPlaceFolder}
        />

        <CommonDatePicker
          control={control}
          name={'datTPExpiration'}
          error={errorForExpDate}
          containerStyle={styles.datePickerContrainer}
          title={t('aboutYou:E_D')}
          dateFormat={dateFormat}
          minimumDate={getCurrentDate()}
          testId="date_picker_general"
          onConfirm={date => {
            if (getCurrentDate() > date) {
              setErrorForExpDate(t('aboutYou:ERROR_SIID'))
            } else {
              setErrorForExpDate('')
            }
          }}
          placeholderText={dateFormatPlaceFolder}
        />

        <View style={styles.inputBoxView}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              stylesContainerText={styles.textPhoneStyle}
              children={t('aboutYou:D_P')}
              testID="aboutyou_daytime"
            />
            <Text
              stylesContainerText={styles.textMiddleNameStyle2}
              children={t('aboutYou:PP')}
              testID="aboutyou_daytime_phone"
            />
          </View>
          <View style={styles.viewPhoneStyle}>
            <CustomDropdown
              error={''}
              containerStyle={styles.dropDownContainer}
              boxStyles={styles.dropdownBoxViewStyle}
              iconStyle={styles.dropDownIconStyle}
              selectedTextStyle={styles.selectedTextStyle}
              control={control}
              name={'cmbDayTimePhone'}
              data={countryData}
              dropdownKey={'value'}
              dropdownValue={'label'}
              search={true}
            />
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  testID="aboutyou_daytime"
                  {...register('txtTPWorkPH', {
                    maxLength: {
                      value: 14,
                      message: t('aboutYou:ERROR_WORD_LESS_THEN_14'),
                    },
                  })}
                  label=""
                  placeholder="Phone"
                  error={errors?.txtTPWorkPH?.message}
                  showError={errors?.txtTPWorkPH?.type}
                  value={value}
                  onChangeText={onChange}
                  iconClick={false}
                  inputBoxStyles={styles.inputBox1}
                  labelStyles={styles.labelStyle}
                  keyboardType="number-pad"
                  container={styles.phoneInputContainerStyle}
                />
              )}
              name="txtTPWorkPH"
            />

            <Switch
              trackColor={{
                false: Colors.backgroundUploadHome,
                true: Colors.testColorBlue,
              }}
              thumbColor={Colors.white}
              onValueChange={dtToggleSwitch}
              value={isDtPEnabled}
              style={styles.radiobtnContainerStyle}
            />
          </View>
        </View>

        <View style={styles.inputBoxView}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              stylesContainerText={styles.textPhoneStyle}
              children={t('aboutYou:E_P')}
              testID="aboutyou_evening_phone"
            />
          </View>
          <View style={styles.viewPhoneStyle}>
            <CustomDropdown
              error={''}
              dropdownPosition="top"
              containerStyle={styles.dropDownContainer}
              boxStyles={styles.dropdownBoxViewStyle}
              iconStyle={styles.dropDownIconStyle}
              selectedTextStyle={styles.selectedTextStyle}
              control={control}
              name="cmbEPCC"
              data={countryData}
              dropdownKey={'value'}
              dropdownValue={'label'}
              search={true}
              placeholder={getContryCodeLabel(
                countryData,
                getTaxPayerData.txtTPEveningPH
              )}
            />

            <Controller
              control={control}
              rules={{
                required: false,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  testID="aboutyou_evening_phone"
                  {...register('txtTPEveningPH', {
                    maxLength: {
                      value: 14,
                      message: t('aboutYou:ERROR_WORD_LESS_THEN_14'),
                    },
                  })}
                  label=""
                  placeholder="Phone"
                  error={errors?.txtTPEveningPH?.message}
                  showError={errors?.txtTPEveningPH?.type}
                  value={value}
                  onChangeText={onChange}
                  iconClick={false}
                  inputBoxStyles={styles.inputBox1}
                  labelStyles={styles.labelStyle}
                  keyboardType="number-pad"
                  container={styles.phoneInputContainerStyle}
                />
              )}
              name="txtTPEveningPH"
            />
            <Switch
              trackColor={{
                false: Colors.backgroundUploadHome,
                true: Colors.testColorBlue,
              }}
              thumbColor={Colors.white}
              onValueChange={eveningToggleSwitch}
              value={isEveningPEnabled}
              style={styles.radiobtnContainerStyle}
            />
          </View>
        </View>

        <View style={styles.inputBoxView}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              stylesContainerText={styles.textPhoneStyle}
              children={t('aboutYou:M_P')}
              testID="aboutyou_mobile_phone"
            />
          </View>
          <View style={styles.viewPhoneStyle}>
            <CustomDropdown
              error={''}
              dropdownPosition="top"
              containerStyle={styles.dropDownContainer}
              boxStyles={styles.dropdownBoxViewStyle}
              iconStyle={styles.dropDownIconStyle}
              selectedTextStyle={styles.selectedTextStyle}
              control={control}
              name="cmbMobilePhone"
              data={countryData}
              dropdownKey={'value'}
              dropdownValue={'label'}
              search={true}
              placeholder={getContryCodeLabel(
                countryData,
                getTaxPayerData.txtTPCellPH
              )}
            />

            <Controller
              control={control}
              rules={{
                required: false,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  testID="aboutyou_evening_phone"
                  {...register('txtTPCellPH', {
                    maxLength: {
                      value: 14,
                      message: t('aboutYou:ERROR_WORD_LESS_THEN_14'),
                    },
                  })}
                  label=""
                  placeholder="Phone"
                  error={errors?.txtTPCellPH?.message}
                  showError={errors?.txtTPCellPH?.type}
                  value={value}
                  onChangeText={onChange}
                  iconClick={false}
                  inputBoxStyles={styles.inputBox1}
                  labelStyles={styles.labelStyle}
                  keyboardType="number-pad"
                  container={styles.phoneInputContainerStyle}
                />
              )}
              name="txtTPCellPH"
            />

            <Switch
              trackColor={{
                false: Colors.backgroundUploadHome,
                true: Colors.testColorBlue,
              }}
              thumbColor={Colors.white}
              onValueChange={mobileToggleSwitch}
              value={isMobilePEnabled}
              style={styles.radiobtnContainerStyle}
            />
          </View>
        </View>

        <View style={styles.inputBoxView}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                testID="profile_email"
                label={t('aboutYou:EMAIL')}
                placeholder=""
                value={value}
                error={emailValidError? t('aboutYou:ERROR_VALID_EMAIL'):''}
                showError={emailValidError? t('aboutYou:ERROR_VALID_EMAIL'):''}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
              />
            )}
            name="txtTPEmail"
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default TaxPayerEditScreen
