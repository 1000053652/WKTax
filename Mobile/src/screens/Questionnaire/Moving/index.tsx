import React from 'react'
import { useState, useCallback } from 'react'

import { Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useLazyGetQuestionnaireDataQuery } from '../../../services/modules/questionnaire'
import {
  YesNoButtonProps,
  YesNoResult,
} from '../../../theme/common/YesNoButton/types'
import { aList } from './utils'
import { useTranslation } from 'react-i18next'
import { PageCode } from '../../../services/constants/PageCode'

import { SubmitHandler, useForm } from 'react-hook-form'
import MovingUI from './MovingUI'

const MovingScreen = ({ navigation }) => {
  let isDone = ''
  const [isRefresh, setIsRefresh] = useState(false)
  const [isFetching, setFetching] = useState(true)
  const [disableAll, setDisableAll] = useState(false)
  const [showTextInput, setShowTextInput] = useState(false)
  const [refreshPage, setRefreshPage] = useState(false)

  const { t } = useTranslation()

  const [getGiftSummaryData] = useLazyGetQuestionnaireDataQuery()
  const [deleteDisbaleGiftData] = useLazyGetQuestionnaireDataQuery()
  const [listData, setListData] = useState({})

  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      numNewWorkPlace: '',
      numoldWorkPlace: '',
    },
  })

  const fetchMovingSummary = () => {
    setIsRefresh(false)
    const finalPayload = {
      payLoad: '',
      endPoitns: `${PageCode.Moving}`,
    }

    getGiftSummaryData(finalPayload)
      .unwrap()
      .then(res => {
        const dataMapData = dataMap(JSON.parse(res?.payload).miDataModel?.data)

        for (let i = 0; i < dataMapData.length; i++) {
          if (dataMapData[i] == 'Y') {
            aList[i].value = '1'
          } else if (dataMapData[i] == 'N') {
            aList[i].value = '0'
          } else {
            aList[i].value = ''
          }
        }

        if (JSON.parse(res?.payload).miDataModel?.data?.NavMoving == 0) {
          setDisableAll(true)
        } else {
        }

        aList[0].value = JSON.parse(res?.payload).miDataModel?.data?.NavMoving

        if (
          JSON.parse(res?.payload).miDataModel?.data?.ynoMoveDiffHome == 'Y'
        ) {
          setShowTextInput(true)
          reset(JSON.parse(res?.payload).miDataModel?.data)
        }

        setFetching(false)
        setIsRefresh(true)
      })
      .catch(error => {
        setFetching(false)
        setIsRefresh(false)
      })
  }

  const dataMap = (objData: object) => {
    const arrayObject = [
      objData.NavMoving,
      objData.IN_DID_YOU,
      objData.ynoChangeAddress,
      objData.ynoTotalMortgage,
      objData.ynoMoveDiffHome,
      objData.ynoSellHome,
      objData.ynoHomeBuyerCredit,
      objData.ynoIRAPrincipalRes,
      objData.ynoEquityLoan,
      objData.ynoMortIntPdNo1098,
      objData.ynoRecMortAssistance,
      objData.ynoMovingExpenses,
    ]

    return arrayObject
  }

  useFocusEffect(
    useCallback(() => {
      setShowTextInput(false)
      fetchMovingSummary()
    }, [refreshPage])
  )

  const getYandN = (yAndNValue: string) => {
    let val = ''
    if (yAndNValue == '1') {
      val = 'Y'
    } else if (yAndNValue == '0') {
      val = 'N'
    } else {
      val = ''
    }
    return val
  }

  const submitMiscIncomeExpensesDetails: SubmitHandler<
    Record<string, string>
  > = async formdata => {
    if (!isFetching) {
      setFetching(true)
      var finalPayload = {
        data: {
          ynoChangeAddress: getYandN(aList[2].value),
          ynoTotalMortgage: getYandN(aList[3].value),
          ynoMoveDiffHome: getYandN(aList[4].value),
          ynoSellHome: getYandN(aList[5].value),
          ynoHomeBuyerCredit: getYandN(aList[6].value),
          ynoIRAPrincipalRes: getYandN(aList[7].value),
          ynoEquityLoan: getYandN(aList[8].value),
          ynoMortIntPdNo1098: getYandN(aList[9].value),
          ynoRecMortAssistance: getYandN(aList[10].value),
          ynoMovingExpenses: getYandN(aList[11].value),
          NavMoving: aList[0].value,
          NavMovingComplete: isDone,
          NavMovingDescription: '',
          numNewWorkPlace: formdata?.numNewWorkPlace,
          numoldWorkPlace: formdata?.numoldWorkPlace,
          code: PageCode.Moving,
        },
        endPoitns: `${PageCode.Moving}`,
      }

      getGiftSummaryData(finalPayload)
        .unwrap()
        .then(res => {
          navigation.goBack()

          setFetching(false)
        })
        .catch(error => {
          setFetching(false)
        })
    }
  }

  const disbaleAndDeleteMiscData = (deselectOrNo: string) => {
    const payload = {
      ynoChangeAddress: '',
      ynoTotalMortgage: '',
      ynoMoveDiffHome: '',
      numNewWorkPlace: '',
      numoldWorkPlace: '',
      ynoMovingExpenses: '',
      ynoSellHome: '',
      ynoHomeBuyerCredit: '',
      ynoIRAPrincipalRes: '',
      ynoEquityLoan: '',
      ynoMortIntPdNo1098: '',
      ynoRecMortAssistance: '',
      NavMoving: deselectOrNo,
      NavMovingComplete: '0',
      NavMovingDescription: '',
      code: PageCode.Moving,
    }

    const finalPayload = {
      data: payload,
      endPoitns: `${PageCode.Moving}`,
    }
    setFetching(true)
    deleteDisbaleGiftData(finalPayload)
      .unwrap()
      .then(res => {
        setFetching(false)
        setRefreshPage(!refreshPage)
      })
      .catch(error => {
        setFetching(false)
      })
  }

  const confirmationDeleteMiscIncomeExpenses = (val: string) => {
    Alert.alert(
      t('businessRental:CONFIRMATION_TITLE'),
      t('businessRental:CONFIRMATION_TEXT'),
      [
        {
          text: t('common:NO'),
          onPress: () => {
            setIsRefresh(false),
              (aList[0].value = '1'),
              setIsRefresh(true),
              setDisableAll(false)
          },

          style: 'cancel',
        },
        {
          text: t('common:YES'),
          onPress: () => disbaleAndDeleteMiscData(val),

          style: 'default',
        },
      ]
    )
  }

  const YesNoCallback = (state: YesNoResult, data: YesNoButtonProps) => {
    const ynoseletedValue = state === '1' ? 'Y' : state === '0' ? 'N' : ''
    const miscObejct = { ...listData }

    if (
      YesNoResult.NO === state &&
      data?.title === t('questionnaire:NAVMOVING')
    ) {
      reset({ numNewWorkPlace: '', numoldWorkPlace: '' })
      setDisableAll(true)
      confirmationDeleteMiscIncomeExpenses("0")
    } else if (
      YesNoResult.NONE == state &&
      data?.defaultValue == '1' &&
      data?.title === t('questionnaire:NAVMOVING')
    ) {
      reset({ numNewWorkPlace: '', numoldWorkPlace: '' })
      setDisableAll(true)
      confirmationDeleteMiscIncomeExpenses("")
    } else if (
      YesNoResult.YES === state &&
      data?.title === t('questionnaire:NAVMOVING')
    ) {
      setDisableAll(false)
    }

    switch (data.apiKey) {
      case 'NavMoving':
        miscObejct.NavMoving = ynoseletedValue
        aList[0].value = state
        setListData(miscObejct)
        break

      case 'ynoChangeAddress':
        miscObejct.ynoChangeAddress = ynoseletedValue
        aList[2].value = state
        setListData(miscObejct)
        break
      case 'ynoTotalMortgage':
        miscObejct.ynoTotalMortgage = ynoseletedValue
        aList[3].value = state
        setListData(miscObejct)

        break
      case 'ynoMoveDiffHome':
        miscObejct.ynoMoveDiffHome = ynoseletedValue
        aList[4].value = state
        setListData(miscObejct)
        if (state == '1') {
          setShowTextInput(true)
        } else {
          setShowTextInput(false)
        }

        if (YesNoResult.NO === state) {
          reset({ numNewWorkPlace: '', numoldWorkPlace: '' })
        }
        break
      case 'ynoSellHome':
        miscObejct.ynoSellHome = ynoseletedValue
        aList[5].value = state
        setListData(miscObejct)
        break

      case 'ynoHomeBuyerCredit':
        miscObejct.ynoHomeBuyerCredit = ynoseletedValue
        aList[6].value = state
        setListData(miscObejct)
        break
      case 'ynoIRAPrincipalRes':
        miscObejct.ynoIRAPrincipalRes = ynoseletedValue
        aList[7].value = state
        setListData(miscObejct)
        break

      case 'ynoEquityLoan':
        miscObejct.ynoEquityLoan = ynoseletedValue
        aList[8].value = state
        setListData(miscObejct)
        break

      case 'ynoMortIntPdNo1098':
        miscObejct.ynoMortIntPdNo1098 = ynoseletedValue
        aList[9].value = state
        setListData(miscObejct)
        break

      case 'ynoRecMortAssistance':
        miscObejct.ynoRecMortAssistance = ynoseletedValue
        aList[10].value = state
        setListData(miscObejct)
        break

      case 'ynoMovingExpenses':
        miscObejct.ynoMovingExpenses = ynoseletedValue
        aList[11].value = state
        setListData(miscObejct)
        break
    }
  }

  return (
    <MovingUI
      aList={aList}
      isRefresh={isRefresh}
      isFetching={isFetching}
      disableAll={disableAll}
      YesNoCallback={YesNoCallback}
      submitMiscIncomeExpensesDetailsFinish={handleSubmit(d => {
        ;(isDone = '0'), submitMiscIncomeExpensesDetails(d)
      })}
      submitMiscIncomeExpensesDetailsDone={handleSubmit(d => {
        ;(isDone = '1'), submitMiscIncomeExpensesDetails(d)
      })}
      showTextInput={showTextInput}
      control={control}
      refreshPage={refreshPage}
    />
  )
}
export default MovingScreen
