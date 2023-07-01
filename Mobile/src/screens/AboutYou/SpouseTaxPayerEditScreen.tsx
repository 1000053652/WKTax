import React, { useEffect, useState } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { ApplicationScreenProps } from '../../../@types/navigation'
import Input from '../../theme/common/Input'
import Text from '../../theme/common/Text'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
  dateFormatPlaceHolder,
  formatWithStar,
  getContryCodeData,
  getContryCodeLabel,
} from '../../../src/theme/constants'
import { QAndAModel } from '../../../src/store/aboutyou/types'
import { AboutYouRequestBody } from '../../../src/services/modules/aboutYou/AboutYouRequestBody'
import { states } from '../../../src/services/constants/ConstantsData'
import moment from 'moment'
import { Header } from 'react-native-elements'
import CommonDatePicker, {dateFormatPlaceFolder} from '../../../src/theme/common/CommonDatePicker'
import { CustomDropdown } from '../../../src/theme/common/CustomDropdown'
import {handleValidEmail} from "../../theme/Common";
import { glbCustomerHeaderOptions, glbStyles } from '../../../src/styles/global'
const SpouseTaxPayerEditScreen = ({ navigation }: ApplicationScreenProps) => {
  const [selectedStateCode, setSelectedStateCode] = useState('')

  const { t } = useTranslation()
  const [errorForDate, setErrorForDate] = useState('')
  const [dobDtValue, setDobDtValue] = useState('')
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
  // @ts-ignore
  const arrayListQandA: Array<QAndAModel> = useSelector(
    state => state?.aboutyou?.qAndA
  )
  type CountryCodeType = {
    label: string
    value: string
    abr: string
  }

  const [isEveningPEnabled, setIsEveningPEnabled] = useState(
    getspouseTaxPayerData.txtTPEPPref == 'Y'
  )
  const [isDtPEnabled, setIsDtPEnabled] = useState(
    getspouseTaxPayerData.txtTPDTPref == 'Y'
  )
  const [isMobilePEnabled, setIsMobilePEnabled] = useState(
    getspouseTaxPayerData.txtTPCellPref == 'Y'
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

  const [aboutYouDataApi, { isSuccess, isError }] =
    useLazyAboutYouDataApiQuery()
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    getValues
  } = useForm({
    defaultValues: {
      txtTPWorkPH: getPhoneNo(getspouseTaxPayerData.txtTPWorkPH),
      txtTPEveningPH: getPhoneNo(getspouseTaxPayerData.txtTPEveningPH),
      txtTPCellPH: getPhoneNo(getspouseTaxPayerData.txtTPCellPH),
      txtTPEmail: getspouseTaxPayerData.txtTPEmail,
      txtTPDL: getspouseTaxPayerData.txtTPDL,
      datTPIssue: getspouseTaxPayerData.datTPIssue,
      datTPExpiration: getspouseTaxPayerData.datTPExpiration,
      txtTPDTPref: getspouseTaxPayerData.txtTPDTPref,
      txtTPEPPref: getspouseTaxPayerData.txtTPEPPref,
      txtTPCellPref: getspouseTaxPayerData.txtTPCellPref,
      txtTPFirstName: getspouseTaxPayerData.txtTPFirstName,
      txtTPMiddleInitial: getspouseTaxPayerData.txtTPMiddleInitial,
      txtTPLastName: getspouseTaxPayerData.txtTPLastName,
      txtTPFullName: getspouseTaxPayerData.txtTPFullName,
      txtTPOccupation: getspouseTaxPayerData.txtTPOccupation,
      cmbTPState: getspouseTaxPayerData.cmbTPState,
      datTPDOB: getspouseTaxPayerData.datTPDOB,
      datTPDeceased: getspouseTaxPayerData.datTPDeceased,
      ssnTP_X: getspouseTaxPayerData.ssnTP_X,
      datTPDTExp: '',
      cmbDayTimePhone: getContryCodeData(
        countryData,
        getspouseTaxPayerData.txtTPWorkPH
      )?.value,
      cmbEPCC: getContryCodeData(countryData, getspouseTaxPayerData.txtTPEveningPH)
        ?.value,
      cmbMobilePhone: getContryCodeData(
        countryData,
        getspouseTaxPayerData.txtTPCellPH
      )?.value,
    },
  })

  useEffect(() => {
    if (getspouseTaxPayerData?.datTPExpiration) {
      const expDate = moment(
        getspouseTaxPayerData?.datTPExpiration,
        dateFormat
      ).toDate()
      if (getCurrentDate() > expDate) {
        setErrorForExpDate(t('aboutYou:DATE_ERROR'))
      } else {
        setErrorForExpDate('')
      }
    }
  }, [getspouseTaxPayerData])

  const cancelClick = () => {
    navigation.goBack()
  }
  const onError: SubmitErrorHandler<Record<string, string>> = errors => {
    if (dobDtValue === undefined || dobDtValue == '') {
      setErrorForDate(t('aboutYou:DATE_ERROR'))
    }
  }

  const SubmitAboutYou = data => {
    if(!handleValidEmail(getValues('txtTPEmail')))
    {
      setEmailValidError(true)
      return
    }
    const updateAboutYouBody = {
      cmbSPState: selectedStateCode,
      cmbTPState: getTaxPayerData.cmbTPState as string,
      code: PageCode.AboutYou as string,
      datTPDOB: getaddressData.datTPDOB as string,
      datTPDeceased: getaddressData.datTPDeceased as string,
      datTPExpiration: getaddressData.datTPExpiration as string,
      datTPIssue: getaddressData.datTPIssue as string,
      datSPDOB:  data.datTPDOB as string,
      datSPDeceased: data.datTPDeceased as string,
      datSPExpiration: data.datTPExpiration as string,
      datSPIssue: data.datTPIssue as string,
      ssnSP_X: data.ssnTP_X as string,
      ssnTP_X: getTaxPayerData.ssnTP_X as string,
      txtApt: getaddressData.txtApt as string,
      txtCity: getaddressData.txtCity as string,
      txtForeignCountry: getaddressData.txtForeignCountry as string,
      txtForeignCounty: getaddressData.txtForeignCounty as string,
      txtForeignPostalCode: getaddressData.txtForeignPostalCode as string,
      txtSPCellPH:
        data.txtTPCellPH != ''
          ? ((`(${data.cmbMobilePhone}) ` + data.txtTPCellPH) as string)
          : '',
      txtSPCellPref: isMobilePEnabled ? 'Y' : 'N',
      txtSPDL: data.txtTPDL as string,
      txtSPDTPref: isDtPEnabled ? 'Y' : 'N',
      txtSPEPPref: isEveningPEnabled ? 'Y' : 'N',
      txtSPEmail: data.txtTPEmail as string,
      txtSPEveningPH:
        data.txtTPEveningPH != ''
          ? ((`(${data.cmbEPCC}) ` + data.txtTPEveningPH) as string)
          : '',
      txtSPFirstName: data.txtTPFirstName as string,
      txtSPLastName: data.txtTPLastName as string,
      txtSPMiddleInitial: data.txtTPMiddleInitial as string,
      txtSPOccupation: data.txtTPOccupation as string,
      txtSPWorkPH:
        data.txtTPWorkPH != ''
          ? ((`(${data.cmbDayTimePhone}) ` + data.txtTPWorkPH) as string)
          : '',
      txtState: getaddressData.txtState as string,
      txtStreet: getaddressData.txtStreet as string,
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
      })
  }
  const getStateName = (key: string) => {
    if (key != '') {
      return states.filter(state => state.key == key)[0].value
    }
  }
  const getCurrentDate = () => {
    const date = t('aboutYou:FIRST_DATE')
    const month = t('aboutYou:FIRST_MONTH')
    const year = new Date().getFullYear() + 1
    return moment(month + '/' + date + '/' + year, dateFormat).toDate()
  }
  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Header
        statusBarProps={glbCustomerHeaderOptions}
        leftComponent={
          <TouchableOpacity onPress={cancelClick}>
            <Text
              testID="aboutyou_cancel"
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
              {t('aboutYou:SPOUSE')}
            </Text>
            <Text
              testID="header_home_office_item"
              stylesContainerText={styles.headerSubTitle}
            >
              {getspouseTaxPayerData.txtTPFirstName}
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
              testID="aboutyou_middle_inittial"
            />

            <Text
              stylesContainerText={styles.textMiddleNameStyle2}
              children="Optional"
              testID="aboutyou_middle_optional"
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
                maxLength={1}
                iconClick={false}
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
                error={errors?.txtTPOccupation?.message}
                showError={errors?.txtTPOccupation?.type}
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
          placeholderText={dateFormatPlaceFolder}
          required
          onConfirm={date => {
            setErrorForDate('')
            setDobDtValue(JSON.stringify(date))
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
          placeholderText={dateFormatPlaceFolder}
          testId="date_picker_general"
           
          placeholderText={dateFormatPlaceFolder}
        />

        <View style={styles.inputBoxView}>
          <Controller
            control={control}
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
                error={errors?.txtTPDL?.message}
                showError={errors?.txtTPDL?.type}
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
          control={control}
          boxStyles={styles.dropdownBoxViewStyle}
          name="cmbTPState"
          label={t('aboutYou:IS')}
          data={states}
          placeholderText={dateFormatPlaceFolder}
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
          placeholderText={dateFormatPlaceFolder}
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
              name="cmbDayTimePhone"
              data={countryData}
              dropdownKey={'value'}
              dropdownValue={'label'}
              search={true}
              placeholder={getContryCodeLabel(
                countryData,
                getspouseTaxPayerData.txtTPWorkPH
              )}
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
                  placeholder={t('aboutYou:PHONE')}
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
                getspouseTaxPayerData.txtTPEveningPH
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
                  placeholder={t('aboutYou:PHONE')}
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
                getspouseTaxPayerData.txtTPCellPH
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
                  placeholder={t('aboutYou:PHONE')}
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
            render={({ field: { onChange,  value } }) => (
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
export default SpouseTaxPayerEditScreen
