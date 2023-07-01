import React, { useState } from 'react'
import { View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import Text from '../../../theme/common/Text'
import { Divider } from 'react-native-paper'
import { styles } from './styles'
import {
  useLazyGetFillingDetailsEditQuery,
  useLazyGetFillingDetailsSaveQuery,
  useLazyGetFillingDetailsPageQuery,
} from '../../../services/modules/fillingdetails'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import {
  accountTypeDropdownData,
  accountOwnerDropdownData,
  pageCode,
  questionariesList,
  autoFillInitialValue,
  autoDataType,
  getAccountTypeDisplay,
} from './utils'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../Common/LoaderStyle'
import { t } from 'i18next'
import {
  TextField,
  ZipCodeField,
} from '../../../theme/common/TextInput/InputFormComponents'
import YesNoButton from '../../../theme/common/YesNoButton'
import { YesNoResult } from '../../../theme/common/YesNoButton/types'
import { YesNoButtonProps } from '../../../theme/common/YesNoButton/types'
import { convertStringToNumber } from '../utils'
import { useFocusEffect } from '@react-navigation/native'
import { errorMessageToast } from '../../Error/utils'
import { CustomDropdown } from '../../../../src/theme/common/CustomDropdown'
import { glbStyles } from '../../../../src/styles/global'

let mydata = {}
const AddFinancial = ({ navigation, route }: ApplicationScreenProps) => {
  const isEdit: boolean = route?.params?.isEdit
  const [isFetching, setFetching] = useState(false)
  const [selectedEntityId, setSelectedEntityId] = useState('')
  const [autoFillData, setautoFilingDetailsData] = useState({})
  const [refreshPage, setRefreshPage] = useState(false)
  const [errorRoutingNumber, setErrorRoutingNumber] = useState(false)
  const [error, setError] = useState(false)

  const [getFillingDetailsEdit] = useLazyGetFillingDetailsEditQuery()
  const [getFillingDetailsSave] = useLazyGetFillingDetailsSaveQuery()
  const [getFillingDetailsPage] = useLazyGetFillingDetailsPageQuery()

  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
  })

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerTitle: isEdit
          ? t('fillingdetails:FILLING_DETAILS_EDIT_TITLE')
          : t('fillingdetails:FILLING_DETAILS_ADD_TITLE'),
        headerRight: () => (
          <TouchableOpacity
            onPress={handleSubmit(
              data => onSubmit(data),
              errors => onError(errors)
            )}
          >
            <Text
              testID="Cancel_Button"
              stylesContainerText={styles.saveButton}
            >
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
      if (isEdit) {
        const entityId: string = route?.params?.data?.item.entityID
        if (entityId) {
          detailPageAPICall(entityId, {})
        }
      }
      else
      {
          mydata = {
              cmbAccountType: '',
              cmbTSJ: '',
              txtAccountNo_X: '',
              txtName: '',
              txtRoutingNo: '',
              ynoBussAcct: '',
              ynoDirDeposit: '',
              ynoPayEstimate: '',
              ynoPayReturn: '',
          }
      }
    }, [])
  )

  const createPosData = (formdata: Record<string, string>) => {
    return {
      data: {
        cmbAccountType:
          `${convertStringToNumber(mydata?.cmbAccountType)}` ?? '', //Account type
        cmbTSJ: mydata?.cmbTSJ ?? '', //Account owner
        txtAccountNo_X: formdata?.Account_number ?? '', //Account number
        txtName: formdata?.Bank_name ?? '1234', //Bank Name
        txtRoutingNo: formdata?.Routing_number ?? '', //Routing transit number
        ynoBussAcct: mydata?.ynoBussAcct ?? '', //Is this a business account?
        ynoDirDeposit: mydata?.ynoDirDeposit ?? '', //Deposit refunds
        ynoPayEstimate: mydata?.ynoPayEstimate ?? '', //Pay amounts due with your tax returns
        ynoPayReturn: mydata?.ynoPayReturn ?? '', //Pay estimated payments
        code: pageCode,
        entityid: isEdit
          ? route?.params?.data?.item.entityID
          : selectedEntityId,
        isDirty: true,
      },
      grid: null,
    }
  }
  const onSubmit = async (formdata: Record<string, string>) => {
    const data = createPosData(formdata)
    if (
      formdata.Routing_number.length === 0 ||
      formdata.Routing_number.length === 9
    ) {
      setErrorRoutingNumber(false)
      if (isEdit) {
        editAPICall(data, route?.params?.data?.item.entityID)
      } else {
        await addAPICall(data)
      }
    } else {
      setErrorRoutingNumber(true)
    }
  }

  const editAPICall = async (data: {}, entityID: string) => {
    if (entityID) {
      setFetching(true)
      const id = entityID + '/' + pageCode + '/' + entityID
      const postData = { id: id, data: {}, headers: JSON.stringify(data) }
      getFillingDetailsEdit(postData)
        .unwrap()
        .then(response => {
          setFetching(false)
          navigation.goBack()
        })
        .catch(error => {
          setFetching(false)
          console.error('response error===', error)
          errorMessageToast(error)
        })
    }
  }

  const addAPICall = async (detailsData: {}) => {
    setFetching(true)
    const id = route?.params?.entityPageID + '/' + '6006/0'
    const postData = {
      id: id,
      data: {},
      headers: JSON.stringify({ data: null, grid: null }),
    }
    getFillingDetailsSave(postData)
      .unwrap()
      .then(response => {
        setFetching(false)
        const data = JSON.parse(response?.payload)
        setSelectedEntityId(data?.selectedEntityId)
        const data1 = detailsData
        if (data?.selectedEntityId) {
          data1.data.entityid = data?.selectedEntityId
          detailPageAPICall(data?.selectedEntityId, data1)
        }
      })
      .catch(error => {
        console.error('response error===', error)
        errorMessageToast(error)
      })
  }
  const detailPageAPICall = async (selectedId: string, data: {}) => {
    setFetching(true)
    if (selectedId) {
      const id = pageCode + '&entityId=' + selectedId
      const postData = {
        id: id,
        data: {},
        headers: JSON.stringify({ data: null, grids: null }),
      }
      getFillingDetailsPage(postData)
        .unwrap()
        .then(response => {
          const entityIDData = JSON.parse(response?.payload)
          setautoFilingDetailsData(
            isEdit ? entityIDData?.miDataModel?.data : autoFillInitialValue
          )
          mydata = isEdit
            ? entityIDData?.miDataModel?.data
            : autoFillInitialValue
          setFetching(false)
          setRefreshPage(true)
          if (!isEdit) {
            editAPICall(data, selectedId)
          }
        })
        .catch(error => {
          setFetching(false)
          console.error('response error===', error)
          errorMessageToast(error)
        })
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
      case 'business_account':
        autoFillData1.ynoBussAcct = ynoseletedValue
        break
      case 'Deposit_refunds':
        autoFillData1.ynoDirDeposit = ynoseletedValue
        break
      case 'Tax_returns':
        autoFillData1.ynoPayReturn = ynoseletedValue
        break
      case 'Pay_estimate':
        autoFillData1.ynoPayEstimate = ynoseletedValue
        break
    }
    mydata = autoFillData1
    setautoFilingDetailsData(autoFillData1)
  }

  const getdropdownValue = (type: number) => {
    if (type == 0) {
      if (autoFillData?.cmbAccountType.length > 0) {
        const value = convertStringToNumber(autoFillData?.cmbAccountType)
        if (value >= 0) {
          return accountTypeDropdownData[
            convertStringToNumber(autoFillData?.cmbAccountType)
          ].value
        }
        return ''
      }
      return ''
    } else {
      if (autoFillData?.cmbTSJ.length > 0) {
        const c = accountOwnerDropdownData.filter(function (data) {
          return data?.status === autoFillData?.cmbTSJ
        })
        return c[0].value ?? ''
      }
      return ''
    }
  }
  const dropdownValueChange = (value: string, type: number | null) => {
    const data = mydata
    if (type == 0) {
      data.cmbAccountType = value
    } else {
      data.cmbTSJ =
        accountOwnerDropdownData[convertStringToNumber(value) - 1].status
    }
    mydata = data
    setautoFilingDetailsData(data)
  }

  const addSpace = (margin: number) => {
    return <View style={{ margin: margin ? margin : 5 }}></View>
  }

  const yesNoComponents = (data, state, index,apiKey)=>
  {
return <YesNoButton
    callback={YesNoCallback}
    apiKey={apiKey}
    title={questionariesList[index].title}
    defaultValue={
        !isEdit
            ? ''
            : state === 'Y'
                ? YesNoResult.YES
                : state === 'N'
                    ? YesNoResult.NO
                    : YesNoResult.NONE
    }
/>
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
            name="Bank_name"
            max={35}
            label={t('fillingdetails:BANKNAME')}
            defaultValue={isEdit ? data?.txtName : ''}
            required
          />
          {addSpace(8)}
          <ZipCodeField
            placeholder=""
            control={control}
            max={9}
            min={9}
            keyboardType="numeric"
            name="Routing_number"
            error={
              errorRoutingNumber
                ? t('fillingdetails:ROUTING_NUMBER_VALIDATION')
                : null
            }
            label={t('fillingdetails:ROUTING-NUMBER')}
            defaultValue={data?.txtRoutingNo}
          />
          {addSpace(8)}
          <ZipCodeField
            placeholder=""
            control={control}
            max={17}
            name="Account_number"
            label={t('fillingdetails:ACCOUNT-NUMBER')}
            defaultValue={data?.txtAccountNo_X}
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
          placeholder={
            isEdit ? getAccountTypeDisplay(autoFillData?.cmbAccountType) : ''
          }
        />
        {addSpace(10)}
        <CustomDropdown
          label={t('fillingdetails:Account-OWNER')}
          control={control}
          name="Account_Owner"
          data={accountOwnerDropdownData}
          dropdownValueChange={(value: string | undefined) =>
            dropdownValueChange(value, 1)
          }
          placeholder={isEdit ? getdropdownValue(1) : ''}
        />
        {addSpace(10)}
          {yesNoComponents(data,data?.ynoBussAcct,0,"business_account")}
        {addSpace(5)}
        <Text
          stylesContainerText={styles.electronic}
          testID="ELECTRONIC-ACCOUNT">
          {t('fillingdetails:ELECTRONIC-ACCOUNT')}
        </Text>
          {addSpace(5)}
        <Divider />
        {addSpace(10)}
          {yesNoComponents(data,data?.ynoDirDeposit,1,"Deposit_refunds")}
          {yesNoComponents(data,data?.ynoPayEstimate,2,"Pay_estimate")}
          {yesNoComponents(data,data?.ynoPayReturn,3,"Tax_returns")}
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

export default AddFinancial
