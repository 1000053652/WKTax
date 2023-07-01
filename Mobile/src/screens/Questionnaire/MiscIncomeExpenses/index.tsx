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
import MiscIncomeExpensesUI from './MiscIncomeExpensesUI'
import { formatCurrency } from '../../../../src/theme/common/TextInput/utils'

const MiscIncomeExpenses = props => {
  const { navigation, route } = props
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
      datLoanDeniedDate: '',
      curLoanDeniedAmt: '',
    },
  })

  const fetchGiftSummary = () => {
    setIsRefresh(false)
    const finalPayload = {
      payLoad: '',
      endPoitns: `${PageCode.Miscellaneous}`,
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

        if (JSON.parse(res?.payload).miDataModel?.data?.NavMiscellaneous == 0) {
          setDisableAll(true)
        } else {
        }

        aList[0].value = JSON.parse(
          res?.payload
        ).miDataModel?.data?.NavMiscellaneous

        if (
          JSON.parse(res?.payload).miDataModel?.data?.ynoloanForgiveness == 'N'
        ) {
          setShowTextInput(true)
          reset(JSON.parse(res?.payload).miDataModel?.data)
        }

        reset({
          curLoanDeniedAmt: formatCurrency(
            JSON.parse(res?.payload).miDataModel?.data?.curLoanDeniedAmt,
            true
          ),
        })

        setFetching(false)
        setIsRefresh(true)
      })
      .catch(error => {
        setFetching(false)
        setIsRefresh(true)
      })
  }

  const dataMap = (objData: object) => {
    const arrayObject = [
      objData.NavMiscellaneous,
      objData.IN_DID_YOU,
      objData.ynoStateTaxRefund,
      objData.yno1099G,
      objData.ynoNewJob,
      objData.ynoTipIncome,
      objData.ynoDamageAward,
      objData.ynoBartering,
      objData.ynoMinisterialIncome,
      objData.ynoAlimony,
      objData.ynoGambling,
      objData.ynoInternetPurchases,
      objData.ynoHHEmployees,
      objData.ynoPYReturnChanges,
      objData.ynoSplitDollarLifeIns,
      objData.ynoTrustee,
      objData.ynoTrusteeDied,
      objData.ynoTaxShelter,
      objData.ynoloanForgiveness,
    ]

    return arrayObject
  }

  useFocusEffect(
    useCallback(() => {
      setShowTextInput(false)
      fetchGiftSummary()
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
    setFetching(true)

    const finalPayload = {
      data: {
        ynoStateTaxRefund: getYandN(aList[2].value),
        yno1099G: getYandN(aList[3].value),
        ynoNewJob: getYandN(aList[4].value),
        ynoTipIncome: getYandN(aList[5].value),
        ynoDamageAward: getYandN(aList[6].value),
        ynoBartering: getYandN(aList[7].value),
        ynoMinisterialIncome: getYandN(aList[8].value),
        ynoAlimony: getYandN(aList[9].value),
        ynoGambling: getYandN(aList[10].value),
        ynoInternetPurchases: getYandN(aList[11].value),
        ynoHHEmployees: getYandN(aList[12].value),
        ynoPYReturnChanges: getYandN(aList[13].value),
        ynoSplitDollarLifeIns: getYandN(aList[14].value),
        ynoTrustee: getYandN(aList[15].value),
        ynoTrusteeDied: getYandN(aList[16].value),
        ynoTaxShelter: getYandN(aList[17].value),
        ynoloanForgiveness: getYandN(aList[18].value),

        NavMiscellaneous: aList[0].value,
        NavMiscellaneousComplete: isDone,
        NavMiscellaneousDescription: '',

        chPdPPPLoan: '0',
        chkIncludedBusExp: '0',
        curLoanRecAmt: '',
        curReceived: '',
        curRepaid: '',
        datLoanDeniedDate: formdata?.datLoanDeniedDate,
        curLoanDeniedAmt: formdata?.curLoanDeniedAmt,
        datLoanRecDate: '',
        ynoEconomicPayment: '',
        ynoUnableToWork: '',
        ynoTOPPP: '',
        code: PageCode.Miscellaneous,
      },
      endPoitns: `${PageCode.Miscellaneous}`,
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

  const disbaleAndDeleteMiscData = (deselectOrNo: string) => {
    const payload = {
      ynoStateTaxRefund: '',
      yno1099G: '',
      ynoNewJob: '',
      ynoTipIncome: '',
      ynoDamageAward: '',
      ynoBartering: '',
      ynoMinisterialIncome: '',
      ynoAlimony: '',
      ynoGambling: '',
      ynoInternetPurchases: '',
      ynoHHEmployees: '',
      ynoPYReturnChanges: '',
      ynoSplitDollarLifeIns: '',
      ynoTrustee: '',
      ynoTrusteeDied: '',
      ynoTaxShelter: '',
      ynoEconomicPayment: '',
      curReceived: '',
      curRepaid: '',
      ynoUnableToWork: '',
      ynoTOPPP: '',
      datLoanRecDate: '',
      curLoanRecAmt: '',
      chPdPPPLoan: '0',
      chkIncludedBusExp: '',
      ynoloanForgiveness: '',
      datLoanDeniedDate: '',
      curLoanDeniedAmt: '',
      NavMiscellaneous: deselectOrNo,
      NavMiscellaneousComplete: '0',
      NavMiscellaneousDescription: '',
      code: PageCode.Miscellaneous,
    }

    const finalPayload = {
      data: payload,
      endPoitns: `${PageCode.Miscellaneous}`,
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
      data?.title === t('questionnaire:NAVMISCELLANEOUS')
    ) {
      reset({ datLoanDeniedDate: '', curLoanDeniedAmt: '' })
      setDisableAll(true)
      confirmationDeleteMiscIncomeExpenses('0')
    } else if (
      YesNoResult.NONE == state &&
      data?.defaultValue == '1' &&
      data?.title === t('questionnaire:NAVMISCELLANEOUS')
    ) {
      reset({ datLoanDeniedDate: '', curLoanDeniedAmt: '' })
      setDisableAll(true)
      confirmationDeleteMiscIncomeExpenses('')
    } else if (
      YesNoResult.YES === state &&
      data?.title === t('questionnaire:NAVMISCELLANEOUS')
    ) {
      setDisableAll(false)
    }

    switch (data.apiKey) {
      case 'ynoStateTaxRefund':
        miscObejct.ynoStateTaxRefund = ynoseletedValue
        aList[2].value = state
        setListData(miscObejct)
        break
      case 'yno1099G':
        miscObejct.yno1099G = ynoseletedValue
        aList[3].value = state
        setListData(miscObejct)
        break
      case 'ynoNewJob':
        miscObejct.ynoNewJob = ynoseletedValue
        aList[4].value = state
        setListData(miscObejct)
        break
      case 'ynoTipIncome':
        miscObejct.ynoTipIncome = ynoseletedValue
        aList[5].value = state
        setListData(miscObejct)
        break

      case 'ynoDamageAward':
        miscObejct.ynoDamageAward = ynoseletedValue
        aList[6].value = state
        setListData(miscObejct)
        break
      case 'ynoBartering':
        miscObejct.ynoBartering = ynoseletedValue
        aList[7].value = state
        setListData(miscObejct)
        break

      case 'ynoMinisterialIncome':
        miscObejct.ynoMinisterialIncome = ynoseletedValue
        aList[8].value = state
        setListData(miscObejct)
        break

      case 'ynoAlimony':
        miscObejct.ynoAlimony = ynoseletedValue
        aList[9].value = state
        setListData(miscObejct)
        break

      case 'ynoGambling':
        miscObejct.ynoGambling = ynoseletedValue
        aList[10].value = state
        setListData(miscObejct)
        break

      case 'ynoInternetPurchases':
        miscObejct.ynoInternetPurchases = ynoseletedValue
        aList[11].value = state
        setListData(miscObejct)
        break

      case 'ynoHHEmployees':
        miscObejct.ynoHHEmployees = ynoseletedValue
        aList[12].value = state
        setListData(miscObejct)
        break

      case 'ynoPYReturnChanges':
        miscObejct.ynoPYReturnChanges = ynoseletedValue
        aList[13].value = state
        setListData(miscObejct)
        break

      case 'ynoSplitDollarLifeIns':
        miscObejct.ynoSplitDollarLifeIns = ynoseletedValue
        aList[14].value = state
        setListData(miscObejct)
        break

      case 'ynoTrustee':
        miscObejct.ynoTrustee = ynoseletedValue
        aList[15].value = state
        setListData(miscObejct)
        break

      case 'ynoTrusteeDied':
        miscObejct.ynoTrusteeDied = ynoseletedValue
        aList[16].value = state
        setListData(miscObejct)
        break

      case 'ynoTaxShelter':
        miscObejct.ynoTaxShelter = ynoseletedValue
        aList[17].value = state
        setListData(miscObejct)
        break

      case 'ynoloanForgiveness':
        miscObejct.ynoloanForgiveness = ynoseletedValue
        aList[18].value = state
        setListData(miscObejct)
        if (state == '0') {
          setShowTextInput(true)
        } else {
          setShowTextInput(false)
        }

        if (YesNoResult.NO === state) {
          reset({ datLoanDeniedDate: '', curLoanDeniedAmt: '' })
        }

        break

      case 'NavMiscellaneous':
        miscObejct.NavMiscellaneous = ynoseletedValue
        aList[0].value = state
        setListData(miscObejct)
        break
    }
  }

  return (
    <MiscIncomeExpensesUI
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
      isDone={isDone}
    />
  )
}

export default MiscIncomeExpenses
