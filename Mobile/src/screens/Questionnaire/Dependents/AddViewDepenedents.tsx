import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import loaderStyle from '../../Common/LoaderStyle'
import CheckBox from '@react-native-community/checkbox'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import Input from '../../../theme/common/Input'
import Text from '../../../theme/common/Text'
import styles from './styles'
import { useForm, Controller } from 'react-hook-form'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  dateFormat,
  formatWithStar,
  get1and0,
  getYandN,
  dateFormatPlaceHolder,
} from '../../../theme/constants'

import { formatCurrency } from '../../../theme/common/TextInput/utils'
import { useSelector } from 'react-redux'
import {
  useLazyAddDependentPageIntityQuery,
  useLazyAddDetailsDependentPageIntityQuery,
  useLazyEditDependentPageIntityAPIQuery,
  useLazyGetDependentDisplayDataQuery,
} from '../../../services/modules/questionnaire'
import { PageCode } from '../../../services/constants/PageCode'
import { listData } from './utils'
import YesNoButton from '../../../../src/theme/common/YesNoButton'
import {
  YesNoButtonProps,
  YesNoResult,
} from '../../../../src/theme/common/YesNoButton/types'
import {
  NumberField,
  ZipCodeField,
} from '../../../../src/theme/common/TextInput/InputFormComponents'
import CommonDatePicker from '../../../../src/theme/common/CommonDatePicker'
import { errorMessageToast } from '../../Error/utils'
import { glbStyles } from '../../../../src/styles/global'

let detailedDependentData = {}
let isYesSelected = ''
const AddViewDependentScreen = (props: ApplicationScreenProps) => {
  const { navigation, route } = props
  const params = route?.params
  const [isSelectedPrefer, setSelectionPrefer] = useState(false)
  const singleServiceListData = useSelector(
    state => state?.home?.singleServiceListData
  )
  const [isFetching, setFetching] = useState(true)
  const [isRefresh, setIsRefresh] = useState(false)
  const [isIRSNumber, setErrorIRSNumber] = useState(false)

  const [showTextFieldIRSPin, setShowTextFieldIRSPin] = useState(false)
  const [showTextFieldChildCare, setShowTextFieldChildCare] = useState(false)
  const [showTextFieldIncur, setShowTextFieldIncur] = useState(false)

  const [addDependentPageIntity] = useLazyAddDependentPageIntityQuery()
  const [addDetailsDependentPageIntity] =
    useLazyAddDetailsDependentPageIntityQuery()
  const [editDependentPageIntityAPI] = useLazyEditDependentPageIntityAPIQuery()
  const [getDependentDisplayData] = useLazyGetDependentDisplayDataQuery()

  const getDetailedDependent = useSelector(
    state => state?.questionnaire?.detailedDisplayDependent
  )
  const displayDependent = useSelector(
    state => state?.questionnaire?.displayDependent
  )

  useEffect(() => {
    const fullURL = `?code=${PageCode.DependentDetails}&entityId=${params?.item?.entityID}`
    setFetching(true)
    addDetailsDependentPageIntity(fullURL)
      .unwrap()
      .then(res => {
        const newData = JSON.parse(res?.payload)?.miDataModel?.data

        ;(listData[0].status = get1and0(newData?.ynoDepOfAnother)),
          (listData[1].status = get1and0(newData?.ynoDisabled))
        listData[2].status = get1and0(newData?.ynoDepIncomeLevel)
        listData[3].status = get1and0(newData?.ynoDepUnearnedInc)
        listData[4].status = get1and0(newData?.ynoCitizen)
        listData[5].status = get1and0(newData?.ynoIDTheft)
        listData[6].status = get1and0(newData?.ynoClaimExpemption)
        listData[7].status = get1and0(newData?.ynoCareExp)
        listData[8].status = get1and0(newData?.ynoAdoptExp)

        isYesSelected = newData?.ynoDepInfo

        setListData1(listData)
        setIsRefresh(true)

        if (get1and0(newData?.ynoIDTheft) == '1') {
          setShowTextFieldIRSPin(true)
        }

        if (get1and0(newData?.ynoCareExp) == '1') {
          setShowTextFieldChildCare(true)
        }

        if (get1and0(newData?.ynoAdoptExp) == '1') {
          setShowTextFieldIncur(true)
        }

        setFetching(false)
      })
      .catch(error => {
        errorMessageToast(error)
        setFetching(false)
      })
  }, [listData])

  useEffect(() => {
    setFetching(true)
    if (getDetailedDependent != '') {
      detailedDependentData = JSON.parse(getDetailedDependent?.payload)
        .miDataModel?.data
      const checkDoc =
        detailedDependentData?.chkAdoptDoc === 'True' ? true : false

      setSelectionPrefer(checkDoc)
    } else {
      detailedDependentData = {}
    }
    setFetching(false)
  }, [getDetailedDependent])

  if (getDetailedDependent && getDetailedDependent != '') {
    detailedDependentData = JSON.parse(getDetailedDependent?.payload)
      .miDataModel?.data
  } else {
    detailedDependentData = {}
  }


  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      firstName: detailedDependentData?.txtFirstName,
      middleInitial: detailedDependentData?.txtMiddleInitial,
      lastName: detailedDependentData?.txtLastName,
      socialSecurityNumber: detailedDependentData?.ssnDep_X,
      relationshipToTax: detailedDependentData?.txtRelationship,
      monthLivedInHome: detailedDependentData?.numMonths,
      irsIssuePin: detailedDependentData?.numPIN
        ? detailedDependentData?.numPIN
        : '',
      carePay: formatCurrency(detailedDependentData?.curCareExp, true),
      carryover: formatCurrency(detailedDependentData?.curCarryover, true),
      ammountInPaid: formatCurrency(detailedDependentData?.curAdoptExp, true),
      dob: detailedDependentData?.datDOB,
      dobDeceased: detailedDependentData?.datDeceased,
    },
  })

  const { t } = useTranslation()

  const [listData1, setListData1] = useState(listData)

  const cancelClick = () => {
    navigation.goBack()
  }

  const saveEditAddUpdateData = finalPayload => {
    setFetching(true)
    editDependentPageIntityAPI(finalPayload)
      .unwrap()
      .then(payload => {
        getDependentDisplayData()
          .unwrap()
          .then(payload => {
            setFetching(false)
            navigation.goBack()
          })
          .catch(error => {
            setFetching(false)
            errorMessageToast(error)
          })
      })
      .catch(error => {
        errorMessageToast(error)
      })
  }

  const onSubmit = data => {
    if (data?.irsIssuePin?.length == 0 || data?.irsIssuePin?.length == 6) {
      setErrorIRSNumber(false)

      const dependentData = {
        ynoDepOfAnother: getYandN(listData[0]?.status),
        ynoDisabled: getYandN(listData[1]?.status),
        ynoDepIncomeLevel: getYandN(listData[2]?.status),
        ynoDepUnearnedInc: getYandN(listData[3]?.status),
        ynoCitizen: getYandN(listData[4]?.status),
        ynoIDTheft: getYandN(listData[5]?.status),
        ynoClaimExpemption: getYandN(listData[6]?.status),
        ynoCareExp: getYandN(listData[7]?.status),
        ynoAdoptExp: getYandN(listData[8]?.status),
      }

      if (params?.isAdd) {
        const addPayload = {
          entityPageID: JSON.parse(displayDependent?.payload).navHelper
            ?.pageListItems[0]?.EntityHelper?.entityPageID,
          PageCode: PageCode.Dependents,
        }

        addDependentPageIntity(addPayload)
          .unwrap()
          .then(res => {
            const SelectedEntityId = JSON.parse(res?.payload)?.selectedEntityId
            const pageCode = JSON.parse(res?.payload)?.navHelper?.pageCode

            const fullURL = `?code=${
              JSON.parse(res?.payload)?.navHelper?.pageCode
            }&entityId=${JSON.parse(res?.payload)?.selectedEntityId}`

            addDetailsDependentPageIntity(fullURL)
              .unwrap()
              .then(res => {
                const editEndpoint = `/${SelectedEntityId}/${PageCode.DependentDetails}/${SelectedEntityId}`

                let payload = {
                  txtFirstName: data?.firstName,
                  txtMiddleInitial: data?.middleInitial,
                  txtLastName: data?.lastName,
                  ssnDep_X: data?.socialSecurityNumber,
                  datDOB: data.dob,
                  datDeceased: data.dobDeceased,
                  txtRelationship: data?.relationshipToTax,
                  numMonths: data?.monthLivedInHome,

                  numPIN: data?.irsIssuePin,
                  curCareExp: data?.carePay,
                  curCarryover: data?.carryover,
                  curAdoptExp: data?.ammountInPaid,
                  code: PageCode.DependentDetails,
                  entityid: SelectedEntityId,
                  isDirty: 'true',
                  chkAdoptDoc: isSelectedPrefer ? '1' : '0',
                  ynoDepInfo: isYesSelected,
                }

                payload = {
                  ...dependentData,
                  ...payload,
                }

                const headerPayload = { data: payload, grids: null }

                const finalPayload = {
                  endPoint: editEndpoint,
                  headers: JSON.stringify(headerPayload),
                  data: {},
                }
                saveEditAddUpdateData(finalPayload)
              })
              .catch(err => {
                errorMessageToast(err)
              })
          })
          .catch(error => {
            errorMessageToast(error)
          })
      } else {
        let payload = {
          txtFirstName: data.firstName,
          txtMiddleInitial: data.middleInitial,
          txtLastName: data.lastName,
          ssnDep_X: data.socialSecurityNumber,
          datDOB: data.dob,
          datDeceased: data.dobDeceased,
          txtRelationship: data.relationshipToTax,
          numMonths: data.monthLivedInHome,

          numPIN: data.irsIssuePin,
          curCareExp: data.carePay,
          curCarryover: data.carryover,
          curAdoptExp: data.ammountInPaid,

          chkAdoptDoc: isSelectedPrefer ? '1' : '0',
          chkCareDoc: 'False',

          code: PageCode.DependentDetails,
          entityid: params?.item?.entityID,
          isDirty: 'true',
          ynoDepInfo: isYesSelected,
        }

        payload = {
          ...dependentData,
          ...payload,
        }

        const editEndpoint = `/${params?.item?.entityID}/${PageCode.DependentDetails}/${params?.item?.entityID}`

        const headerPayload = { data: payload, grids: null }

        const finalPayload = {
          endPoint: editEndpoint,
          headers: JSON.stringify(headerPayload),
          data: {},
        }

        saveEditAddUpdateData(finalPayload)
      }
    } else {
      setErrorIRSNumber(true)
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View>
        {isRefresh && (
          <YesNoButton
            callback={YesNoCallbackMain}
            apiKey={item?.answerKey}
            title={item?.title}
            defaultValue={item?.status}
          />
        )}

        {item?.title == t('dependent:HAS_DEPENDENT_VICTIM') &&
        showTextFieldIRSPin ? (
          <View>
            <ZipCodeField
              placeholder=""
              control={control}
              name="irsIssuePin"
              label={t('dependent:6_DIGIT_IRS_PIN')}
              max={6}
              min={6}
              keyboardType="number-pad"
              error={isIRSNumber ? t('fillingdetails:SP_PIN_VALIDATION') : ''}
            />
          </View>
        ) : null}

        {item?.title == t('dependent:DID_PAY') && showTextFieldChildCare ? (
          <View>
            <NumberField
              fieldType={'currency'}
              placeholder=""
              control={control}
              name="carePay"
              label={t('dependent:CARE_AMOUNT')}
            />
          </View>
        ) : null}

        {item?.title == t('dependent:DID_ADOPTION') && showTextFieldIncur ? (
          <View>
            <NumberField
              fieldType={'currency'}
              placeholder=""
              control={control}
              name="carryover"
              label={t('dependent:CARRIOVER_FROM_PRIOR')}
            />

            {addSpace(10)}

            <NumberField
              fieldType={'currency'}
              placeholder=""
              control={control}
              name="ammountInPaid"
              label={
                t('dependent:AMOUNT_PAID_IN') + singleServiceListData?.taxYear
              }
            />

            <View style={styles.checkBoxViewStyle}>
              <CheckBox
                value={isSelectedPrefer}
                onValueChange={setSelectionPrefer}
                style={styles.checkboxStyle}
                boxType="square"
              />
              <Text
                children={t('dependent:I_PREFER_TO_ATTACH_DOCUMENTATION')}
                stylesContainerText={styles.checkboxTextStyle}
                testID="questionnaire_main_name"
              />
            </View>
          </View>
        ) : null}
      </View>
    )
  }

  const addSpace = (margin: number) => {
    return <View style={{ margin: margin ? margin : 5 }}></View>
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: params?.isAdd
        ? t('dependent:ADD_DEPENDENT')
        : t('dependent:EDIT_DEPENDENT'),
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text
            testID="Save_Button"
            stylesContainerText={styles.saveButton}
            children={t('common:SAVE')}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={cancelClick}>
          <Text
            testID="Cancel_Button"
            stylesContainerText={styles.cancelButton}
            children={t('common:CANCEL')}
          />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  const monthLiveInHomeDataFormat = value => {
    return value == 0 ? '' : value?.replace(/^\D+/g, '')
  }

  const YesNoCallbackSignle = (state: YesNoResult, data: YesNoButtonProps) => {
    const ynoseletedValue = state === '1' ? 'Y' : state === '0' ? 'N' : ''

    isYesSelected = ynoseletedValue
  }

  const checkDateEmpty = value => {
    return value?.length > 0
      ? detailedDependentData?.datDeceased
      : dateFormatPlaceHolder
  }

  const YesNoCallbackMain = (state: YesNoResult, item: YesNoButtonProps) => {
    const ynoseletedValue = state === '1' ? '1' : state === '0' ? '0' : ''
    const giftObject = { ...listData }

    if (item?.title === t('dependent:HAS_DEPENDENT_VICTIM')) {
      reset(formValues => ({
        ...formValues,
        irsIssuePin: '',
      }))
    } else if (item?.title === t('dependent:DID_PAY')) {
      reset(formValues => ({
        ...formValues,
        carePay: '',
      }))
    } else if (item?.title === t('dependent:DID_ADOPTION')) {
      reset(formValues => ({
        ...formValues,
        carryover: '',
        ammountInPaid: '',
      }))
    }

    switch (item.apiKey) {
      case 'ynoDepOfAnother':
        giftObject.ynoDepOfAnother = ynoseletedValue
        listData[0].status = state
        setListData1(giftObject)
        break
      case 'ynoDisabled':
        giftObject.ynoDisabled = ynoseletedValue
        listData[1].status = state
        setListData1(giftObject)
        break
      case 'ynoDepIncomeLevel':
        giftObject.ynoDepIncomeLevel = ynoseletedValue
        listData[2].status = state
        setListData1(giftObject)
        break
      case 'ynoDepUnearnedInc':
        giftObject.ynoDepUnearnedInc = ynoseletedValue
        listData[3].status = state
        setListData1(giftObject)
        break

      case 'ynoCitizen':
        giftObject.ynoCitizen = ynoseletedValue
        listData[4].status = state
        setListData1(giftObject)
        break

      case 'ynoIDTheft':
        giftObject.ynoIDTheft = ynoseletedValue
        listData[5].status = state
        setListData1(giftObject)
        if (state == '1') {
          setShowTextFieldIRSPin(true)
        } else {
          setShowTextFieldIRSPin(false)
        }
        break
      case 'ynoClaimExpemption':
        giftObject.ynoClaimExpemption = ynoseletedValue
        listData[6].status = state
        setListData1(giftObject)
        break
      case 'ynoCareExp':
        giftObject.ynoCareExp = ynoseletedValue
        listData[7].status = state
        setListData1(giftObject)
        if (state == '1') {
          setShowTextFieldChildCare(true)
        } else {
          setShowTextFieldChildCare(false)
        }

        break
      case 'ynoAdoptExp':
        giftObject.ynoAdoptExp = ynoseletedValue
        listData[8].status = state
        setListData1(giftObject)
        if (state == '1') {
          setShowTextFieldIncur(true)
        } else {
          setShowTextFieldIncur(false)
        }

        break
    }

    setListData1(listData)
    setIsRefresh(true)
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Spinner
        visible={isFetching}
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />

      <Text
        children={params?.item?.fieldValue}
        stylesContainerText={styles.stylesContainerText}
        testID="questionnaire_main_name"
      />
      <KeyboardAwareScrollView>
        <View>
          {isRefresh && (
            <YesNoButton
              callback={YesNoCallbackSignle}
              apiKey={'text_id_did_you_pay'}
              title={
                t('dependent:SHOULD_DEPENDENT') +
                ' ' +
                singleServiceListData?.taxYear +
                '?'
              }
              defaultValue={
                isYesSelected == 'Y' ? '1' : isYesSelected == 'N' ? '0' : ''
              }
            />
          )}
        </View>

        <View style={styles.horizontalLine} />
        <View style={styles.emptyView} />
        <View style={styles.inputBoxView}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                {...register('firstName', {
                  required: t('dependent:PLEASE_ENTER_FIRST_NAME'),
                })}
                label={t('dependent:FIRST_NAME')}
                placeholder=""
                error={errors?.firstName?.message}
                showError={errors?.firstName?.type}
                value={value}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
                testID="dependent_first_name"
                maxLength={38}
              />
            )}
            name="firstName"
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
                {...register('middleInitial', {
                  maxLength: {
                    value: 1,
                    message: t('dependent:ENTER_ONLY_ONE_CHAR'),
                  },
                })}
                label={t('dependent:MIDDLE_NAME')}
                placeholder=""
                error={errors?.middleInitial?.message}
                showError={errors?.middleInitial?.type}
                value={value}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
                testID="dependent_initial_name"
                maxLength={1}
              />
            )}
            name="middleInitial"
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
                {...register('lastName', {
                  required: t('dependent:ENTER_LAST_NAME'),
                })}
                label={t('dependent:LAST_NAME')}
                placeholder=""
                error={errors?.lastName?.message}
                showError={errors?.lastName?.type}
                value={value}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
                testID="dependent_last_name"
                maxLength={25}
              />
            )}
            name="lastName"
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
                {...register('socialSecurityNumber', {
                  maxLength: {
                    value: 9,
                    message: t('dependent:SSN_MUST_BE_NINE_DIGIT'),
                  },
                  minLength: {
                    value: 9,
                    message: t('dependent:SSN_MUST_BE_NINE_DIGIT'),
                  },
                })}
                label={t('dependent:SOCIAL_NUMBER')}
                placeholder=""
                error={errors?.socialSecurityNumber?.message}
                showError={errors?.socialSecurityNumber?.type}
                value={formatWithStar(value)}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
                testID="dependent_socialSecurityNumber"
                maxLength={11}
                minLength={11}
                keyboardType="number-pad"
              />
            )}
            name="socialSecurityNumber"
          />
        </View>

        <CommonDatePicker
          control={control}
          name={'dob'}
          containerStyle={styles.datePickerContrainer}
          maximumDate={new Date()}
          title={t('dependent:DAT_OF_BIRTH')}
          dateFormat={dateFormat}
          placeholderText={checkDateEmpty(detailedDependentData?.datDOB)}
          testId="date_picker_general"
        />

        <View style={styles.inputBoxView}>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                {...register('relationshipToTax')}
                label={t('dependent:RELATION_TAXPAYER')}
                placeholder=""
                error={errors?.relationshipToTax?.message}
                showError={errors?.relationshipToTax?.type}
                value={value}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
                testID="profile_first_name"
                maxLength={38}
              />
            )}
            name="relationshipToTax"
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
                {...register('monthLivedInHome', {
                  validate: {
                    require: value => {
                      if (value) {
                        if (value > 12 || value < 1)
                          return t('homeModule:MONTH_MUST_BE_BETWEEN_0_TO_12')
                      }
                    },
                  },
                })}
                label={t('dependent:MONTH_IN_HOME')}
                placeholder=""
                error={errors?.monthLivedInHome?.message}
                showError={errors?.monthLivedInHome?.type}
                value={monthLiveInHomeDataFormat(value)}
                onChangeText={onChange}
                iconClick={false}
                inputBoxStyles={styles.inputBox}
                labelStyles={styles.labelStyle}
                testID="dependent_monthLivedInHome"
                maxLength={2}
                keyboardType="number-pad"
                pointerEvents={'box-only'}
              />
            )}
            name="monthLivedInHome"
          />
        </View>

        <CommonDatePicker
          control={control}
          name={'dobDeceased'}
          containerStyle={styles.datePickerContrainer}
          maximumDate={new Date()}
          title={t('dependent:IF_DECEASED')}
          dateFormat={dateFormat}
          placeholderText={checkDateEmpty(detailedDependentData?.datDeceased)}
          testId="date_picker_dobDeceased"
        />

        <View style={styles.grayArea} />

        <FlatList
          data={listData1}
          renderItem={renderItem}
          refreshing={isRefresh}
          extraData={listData1}
        />
        <View style={styles.horizontalLine} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default AddViewDependentScreen
