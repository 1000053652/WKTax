import { ApplicationScreenProps } from '../../../../@types/navigation'
import { styles } from '../../FilingDetails/styles'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import { t } from 'i18next'
import loaderStyle from '../../Common/LoaderStyle'
import DynamicForm from '../Tabs/DynamicForm'
import { Alert, SafeAreaView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {getValueFromAPIKey, listData, removeZeroAfterDecimal} from './utils'
import {
  YesNoButtonProps,
  YesNoResult,
} from '../../../theme/common/YesNoButton/types'
import { useIsFocused } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { NumberField } from '../../../theme/common/TextInput/InputFormComponents'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { useLazyGetRetirementDetailsQuery } from '../../../services/modules/retirement'
import { getAnswerData } from './utils'
import { mapOtherData, questionnaireData } from './utils'
import { errorMessageToast } from '../../Error/utils'
import { glbStyles } from '../../../../src/styles/global'

const Retirement = ({ navigation }: ApplicationScreenProps) => {
  const isFocused = useIsFocused()

  const [isPageRefresh, setIsPageRefresh] = useState(false)
  const [isFetching, setFetching] = useState(false)
  const [isIRA, setIRA] = useState(false)
  const [listData1, setListData1] = useState(listData)
  const [autoFillData, setAUtoFillData] = useState([])

  const [getRetirementDetails] = useLazyGetRetirementDetailsQuery()
  const singleServiceListData = useSelector(
    state => state?.home?.singleServiceListData
  )

  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
  })

  useEffect(() => {
    setIsPageRefresh(true)
    setFetching(true)
    const postdata = {
      id: null,
      data: JSON.stringify({ data: null, grid: null }),
      header: null,
    }
    serviceCall(postdata, false)
  }, [isFocused])

  const serviceCall = (postdata: {}, isNavBack: boolean) => {
    getRetirementDetails(postdata)
      .unwrap()
      .then(response => {
        if (isNavBack) {
          navigation.goBack()
          return
        }
        const jsonData = JSON.parse(response?.payload)
        setAUtoFillData(jsonData?.miDataModel?.data)
        dataMapping(response)
        setFetching(false)
      })
      .catch(error => {
        console.error('retirement Error', error)
        errorMessageToast(error)
        setFetching(false)
      })
  }
  const dataMapping = (response: any) => {
    const yesNodata = listData
    const answerData = JSON.parse(response?.payload)?.miDataModel?.data
    const answerValue = getAnswerData(answerData)
    yesNodata.map((value, index) => {
      if (index != 0) {
        const val = getValueFromAPIKey(answerData,value.APIkey)
        value.value = convertYNValue(val, false)
      } else {
        value.value = answerValue[index]
      }
      // replacing Year
      if (value?.isHeaderQuestion) {
        value.headerTitle = value?.headerTitle?.replace(
          '${YEAR}',
          singleServiceListData?.taxYear
        )
      }
      if (index == 1 && value.value == '1') {
        setIRA(true)
      }
    })
    setListData1(yesNodata)
    if (yesNodata[0].value == '1') {
      enableTitles()
    }
    setIsPageRefresh(true)
  }
  const onSubmit = (formdata: Record<string, string>, isDone: boolean) => {
    const data = questionnaireData()
    listData1.forEach((item, index) => {
      if (index != 0) {
        data[item.APIkey] = convertYNValue(item.value, true)
      }
      else
      {
        data[item.APIkey] = convertYNValue(item.value, false)
      }
    })
    const count = Object.keys(formdata).length
    const dataMapped = mapOtherData(data, isDone, count > 0 ? formdata : data)
    const postData = {
      id: null,
      data: JSON.stringify({ data: dataMapped, grid: null }),
      headers: null,
    }
    serviceCall(postData, true)
  }
  const onError: SubmitErrorHandler<Record<string, string>> = errors => {
    console.error(errors)
  }
  const convertYNValue = (value: string, isYN: boolean) => {
    if (value == '1' || value == 'Y') {
      return isYN ? 'Y' : '1'
    } else if (value == '0' || value == 'N') {
      return isYN ? 'N' : '0'
    }
    return ''
  }

  const showAlertConfirmation = (buttonType: boolean, state: string) => {
    Alert.alert('', t('common:Q_ALERT_MSG'), [
      {
        text: t('common:NO'),
        onPress: () => {
          if (state != '1') {
            setIsPageRefresh(false)
            const x = listData1
            x[0].value = '1'
            const yesNodata = listData1
            yesNodata.map((value, index) => {
              if (index == 0) {
                yesNodata[0].value = '1'
              } else {
                yesNodata[index].value = convertYNValue(value.value, false)
              }
            })
            setListData1(x)
            setIsPageRefresh(true)
          }
        },
        style: 'cancel',
      },
      {
        text: t('common:YES'),
        onPress: () => resetDefaultSelection(false),
      },
    ])
  }

  const pressQuestionaries = (
    buttonType: boolean,
    state: string,
    index: number,
    isAlert: boolean
  ) => {
    let ynoseletedValue = state
    if (index != 0) {
      ynoseletedValue = convertYNValue(state, true)
    } else {
      if (buttonType) {
        enableTitles()
      }
      showAlert(state, listData1[0].value)
    }
    const yesNodata = listData1
    if (buttonType) {
      yesNodata[index].value = ynoseletedValue
    } else {
      yesNodata[index].value = ynoseletedValue
    }
    setListData1(yesNodata)
  }
  const resetDefaultSelection = (isYesSelected: boolean) => {
    setIsPageRefresh(false)
    const data = listData1
    data.map((value, index) => {
      if (index != 0) {
        value.enable = true
        value.value = ''
      } else {
        value.enable = false
      }
    })
    reset({
      curRothAmtTP: '',
      curRothAmtSP: '',
      curTradIRATP: '',
      curTradIRASP: '',
    })
    setIRA(false)
    setListData1(data)
    setIsPageRefresh(true)
  }
  const showAlert = (state, prevState) => {
    if (state == '' && prevState == '1') {
      showAlertConfirmation(true, state)
    } else if (state == '0' && prevState == '1') {
      showAlertConfirmation(false, state)
    }
  }
  const enableTitles = async () => {
    enableTiles()
  }
  function enableTiles() {
    setTimeout(setTilesEnable, 500)
  }
  function setTilesEnable() {
    setIsPageRefresh(false)
    const yesNodata = listData1
    yesNodata.map((value, index) => {
      yesNodata[index].enable = false
    })
    setListData1(yesNodata)
    setIsPageRefresh(true)
  }

  const YesNoCallback = (state: YesNoResult, data1: YesNoButtonProps) => {
    if (data1.index == 1) {
      setIRA(state == '1' ? true : false)
      if (state !== '1') {
        reset({
          curRothAmtTP: '',
          curRothAmtSP: '',
          curTradIRATP: '',
          curTradIRASP: '',
        })
      }
    }
    pressQuestionaries(state === '1' ? true : false, state, data1.index, true)
  }
  const addSpace = (margin: number) => {
    return <View style={{ margin: margin ? margin : 5 }}></View>
  }

  const renderSubItems = () => {
    return (
      <View>
        {addSpace(10)}
        <NumberField
          placeholder=""
          control={control}
          max={14}
          fieldType={'currency'}
          name="curRothAmtTP"
          label={'Roth IRA amount (Taxpayer)'}
          defaultValue={removeZeroAfterDecimal(autoFillData?.curRothAmtTP)}
          testID="curRothAmtTP"
        />
        {addSpace(10)}
        <NumberField
          placeholder=""
          control={control}
          max={14}
          fieldType={'currency'}
          name="curRothAmtSP"
          label={'Traditional IRA amount (Taxpayer)'}
          defaultValue={removeZeroAfterDecimal(autoFillData?.curRothAmtSP)}
          testID="curRothAmtSP"
        />
        {addSpace(10)}
        <NumberField
          placeholder=""
          control={control}
          max={14}
          fieldType={'currency'}
          name="curTradIRATP"
          label={'Roth IRA amount (Spouse)'}
          defaultValue={removeZeroAfterDecimal(autoFillData?.curTradIRATP)}
          testID="curTradIRATP"
        />
        {addSpace(10)}
        <NumberField
          placeholder=""
          control={control}
          max={14}
          fieldType={'currency'}
          name="curTradIRASP"
          label={'Traditional IRA amount (Spouse)'}
          defaultValue={removeZeroAfterDecimal(autoFillData?.curTradIRASP)}
          testID="curTradIRASP"
        />
        {addSpace(10)}
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
      <DynamicForm
        isDoneSelected={true}
        isPageRefresh={isPageRefresh}
        listData={listData1}
        children={isIRA ? renderSubItems() : null}
        formCallback={YesNoCallback}
        toggleBottomButton={handleSubmit(
          (data, isDone) => onSubmit(data, isDone),
          errors => onError(errors)
        )}
      />
    </SafeAreaView>
  )
}

export default Retirement
