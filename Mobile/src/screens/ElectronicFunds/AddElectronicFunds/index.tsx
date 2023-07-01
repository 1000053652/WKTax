import React, { useState, useEffect, useCallback } from 'react'
import { View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import Text from '../../../theme/common/Text'
import { Divider } from 'react-native-paper'
import { styles } from './style'
import {
  useLazyGetHomeEditBankQuery,
  useLazyGetHomeBankQuery,
} from '../../../services/modules/ElectronicFundsScreen'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import {
  accountTypeDropdownData,
  questionariesList,
  autoDataType,
  autoFillInitialValue,
} from './utils'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../Common/LoaderStyle'
import { t } from 'i18next'
import {
  NumberField,
  TextField,
} from '../../../theme/common/TextInput/InputFormComponents'
import YesNoButton from '../../../theme/common/YesNoButton'
import { YesNoResult } from '../../../theme/common/YesNoButton/types'
import { YesNoButtonProps } from '../../../theme/common/YesNoButton/types'
import { convertStringToNumber } from '../../FilingDetails/utils'
import { useFocusEffect } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { errorMessageToast } from '../../Error/utils'
import { CustomDropdown } from '../../../../src/theme/common/CustomDropdown'
import { glbStyles } from '../../../../src/styles/global'


const AddElectronicFunds = ({ navigation, route }: ApplicationScreenProps) => {
  const isEdit: boolean = route?.params?.dataPayload?.isEdit
  const displayDependent = useSelector(
    state => state?.electronicFunds?.getBankData
  )
  const datavalue = route?.params?.dataPayload?.data
  const [isFetching, setFetching] = useState(false)
  const [selectedEntityId, setSelectedEntityId] = useState('')
  const [autoFillData, setAutoFillData] = useState(
    isEdit ? datavalue : autoFillInitialValue
  )
  const [refreshPage, setRefreshPage] = useState(false)
  const [errorRoutingNumber, setErrorRoutingNumber] = useState(false)

  const [error, setError] = useState(false)
  const [getHomeBank] = useLazyGetHomeBankQuery()
  const [getHomeEditBankAPI] = useLazyGetHomeEditBankQuery()

  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
  })
  useFocusEffect(
    useCallback(() => {
      fetchAssetsList()
    }, [])
  )

  const fetchAssetsList = () => {
    setFetching(true)
    getHomeBank()
      .unwrap()
      .then(response => {
        setFetching(false)
      })
      .catch(err => {
        setFetching(false)
        errorMessageToast(err)
      })
  }
  useEffect(() => {
    navigation.setOptions({
      headerTitle: isEdit
        ? t('fillingdetails:FILLING_DETAILS_EDIT_TITLE')
        : t('fillingdetails:FILLING_DETAILS_ADD_TITLE'),
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit(submitProfile, onError)}>
          <Text testID="Cancel_Button" stylesContainerText={styles.saveButton}>
            {t('common:SAVE')}
          </Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            testID="Cancel_Button"
            stylesContainerText={styles.cancelButton}
          >
            {t('common:CANCEL')}
          </Text>
        </TouchableOpacity>
      ),
    })

    setRefreshPage(isEdit ? true : false)
  }, [navigation])

  const createPosData = (formdata: Record<string, string>) => {
    const posData = {
      bankId: autoFillData?.bankId ?? '',
      name: formdata?.name ?? '',
      routingNumber: formdata?.Routing_number ?? '',
      accountNumber: formdata?.Account_number ?? '',
      accountType: autoFillData?.accountType ?? '',
      foreignAccount: autoFillData?.foreignAccount ?? '',
      funds: autoFillData?.funds ?? '',
      amountDue: autoFillData?.amountDue ?? '',
      payments: autoFillData?.payments ?? '',
      entityId: isEdit ? route?.params?.data?.item.entityID : selectedEntityId,
      method: 'PUT',
    }

    const posData1 = {
      funds: autoFillData?.funds ?? '',
      foreignAccount: autoFillData?.foreignAccount ?? '',
      amountDue: autoFillData?.amountDue ?? '',
      payments: autoFillData?.payments ?? '',
      name: formdata?.name ?? '',
      routingNumber: formdata?.Routing_number ?? '',
      accountNumber: formdata?.Account_number ?? '',
      accountType: autoFillData?.accountType ?? '',
      method: 'POST',
    }

    const posData2 = isEdit ? posData : posData1
    getHomeEditBankAPI(posData2)
      .unwrap()
      .then(() => {
        navigation.goBack() 
      })
      .then(() => {})
  }
  const submitProfile: SubmitHandler<
    Record<string, string>
  > = async formdata => {
    if (
      formdata.Routing_number.length === 0 ||
      formdata.Routing_number.length === 9
    ) {
      setErrorRoutingNumber(false)
      createPosData(formdata)
    } else {
      setErrorRoutingNumber(true)
    }
  }

  const onError: SubmitErrorHandler<Record<string, string>> = errors => {
    console.error('Error on form submit', errors)
    setError(true)
  }

  const YesNoCallback = (state: YesNoResult, data: YesNoButtonProps) => {
    const autoFillData1 = autoFillData
    const ynoseletedValue = state === '1' ? 'Y' : state === '0' ? 'N' : ''
    switch (data.apiKey) {
      case 'amountDue':
        autoFillData1.amountDue = ynoseletedValue
        break
      case 'foreignAccount':
        autoFillData1.foreignAccount = ynoseletedValue
        break
      case 'funds':
        autoFillData1.funds = ynoseletedValue
        break
      case 'payments':
        autoFillData1.payments = ynoseletedValue
        break
    }

    setAutoFillData(autoFillData1)
  }

  const getdropdownValue = () => {
    if (autoFillData?.accountType.length > 0) {
      const index = convertStringToNumber(autoFillData?.accountType)
      if (index > 0) {
        return accountTypeDropdownData[index - 1]?.value
      }
    }
    return ''
  }
  const dropdownValueChange = (value: string, type: number | null) => {
    const data = autoFillData
    if (type === 0) {
      data.accountType = value //accountTypeDropdownData[convertStringToNumber(value)-1].status
    }
    setAutoFillData(data)
  }

  const addSpace = (margin: number) => {
    return <View style={{ margin: margin ? margin : 5 }}></View>
  }

  const renderContent = (data: autoDataType) => {
    return (
      <View>
        <View>
          {addSpace(10)}
          <TextField
            placeholder=""
            control={control}
            error={error ? t('fillingdetails:BANK_NAME_VALIDATION_MSG') : ''}
            name="name"
            label={t('fillingdetails:BANKNAME')}
            defaultValue={data?.name}
            required
          />
          {addSpace(8)}
          <NumberField
            placeholder=""
            control={control}
            max={9}
            min={9}
            name="Routing_number"
            error={
              errorRoutingNumber
                ? t('fillingdetails:ROUTING_NUMBER_VALIDATION')
                : null
            }
            label={t('fillingdetails:ROUTING-NUMBER')}
            defaultValue={data?.routingNumber}
          />
          {addSpace(8)}
          <NumberField
            placeholder=""
            control={control}
            name="Account_number"
            label={t('fillingdetails:ACCOUNT-NUMBER')}
            defaultValue={data?.accountNumber}
            max={17}
          />
        </View>
        {addSpace(10)}
         
        <CustomDropdown
          label={t('fillingdetails:ACCOUNT-TYPE')}
          control={control}
          name="Account_Type"
          data={accountTypeDropdownData}
          dropdownValueChange={(value: string | undefined) =>
            dropdownValueChange(value, 0)
          }
          placeholder={isEdit ? getdropdownValue(0) : ''}
          boxStyles={styles.eboxStyle}
        />
        {addSpace(10)}
        <YesNoButton
          callback={YesNoCallback}
          apiKey="foreignAccount"
          title={questionariesList[0].title}
          defaultValue={
            data?.foreignAccount === 'Y'
              ? YesNoResult.YES
              : data?.foreignAccount === 'N'
              ? YesNoResult.NO
              : YesNoResult.NONE
          }
        />
        {addSpace(10)}
        <Text
          stylesContainerText={styles.electronic}
          testID="ELECTRONIC-ACCOUNT"
        >
          {t('fillingdetails:ELECTRONIC-ACCOUNT')}
        </Text>
        <Divider />
        {addSpace(10)}
        <YesNoButton
          callback={YesNoCallback}
          apiKey="funds"
          title={questionariesList[1].title}
          defaultValue={
            data?.funds === 'Y'
              ? YesNoResult.YES
              : data?.funds === 'N'
              ? YesNoResult.NO
              : YesNoResult.NONE
          }
        />
        <YesNoButton
          callback={YesNoCallback}
          apiKey="amountDue"
          title={questionariesList[2].title}
          defaultValue={
            data?.amountDue === 'Y'
              ? YesNoResult.YES
              : data?.amountDue === 'N'
              ? YesNoResult.NO
              : YesNoResult.NONE
          }
        />
        <YesNoButton
          callback={YesNoCallback}
          apiKey="payments"
          title={questionariesList[3].title}
          defaultValue={
            data?.payments === 'Y'
              ? YesNoResult.YES
              : data?.payments === 'N'
              ? YesNoResult.NO
              : YesNoResult.NONE
          }
        />
        <Text stylesContainerText={{ margin: 10 }} testID="Title">
          {t('fillingdetails:BOTTOM-TITLE')}
        </Text>
        <Divider />
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
      <ScrollView>
        {refreshPage && renderContent(autoFillData)}
        {!isEdit && renderContent(autoFillData)}
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddElectronicFunds
