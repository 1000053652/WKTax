import React from 'react'
import { useState, useCallback } from 'react'
import { Alert, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import {
  useLazyGetQuestionnaireDataQuery,
  useLazyDeleteDependentAPICallQuery,
} from '../../../services/modules/questionnaire'
import {
  YesNoButtonProps,
  YesNoResult,
} from '../../../theme/common/YesNoButton/types'
import { aList } from './utils'
import { useTranslation } from 'react-i18next'
import { PageCode } from '../../../services/constants/PageCode'
import GiftSummaryUI from './GiftSummaryUI'
import { showErrorMessage } from '../../Common/Utils'

const GiftsScreen = ({ navigation }) => {
  const { t } = useTranslation()

  const [giftData, setGiftData] = useState([])
  const [forGivenData, setForgivenData] = useState([])
  const [isRefresh, setIsRefresh] = useState(false)
  const [isFetching, setFetching] = useState(true)
  const [disableAll, setDisableAll] = useState(false)
  const [isSitchEnabledGift, setSwitchEnabledGift] = useState(false)
  const [isSitchEnabledForgiven, setSwitchEnabledForgiven] = useState(false)
  const [entityPageIDGift, setEntityPageIDGift] = useState('')
  const [entityPageIDForGiven, setEntityPageIDForGiven] = useState('')
  const [listData, setListData] = useState({})

  const [refreshPage, setRefreshPage] = useState(false)

  const [getGiftSummaryData] = useLazyGetQuestionnaireDataQuery()
  const [getGiftData] = useLazyGetQuestionnaireDataQuery()
  const [getForGiveData] = useLazyGetQuestionnaireDataQuery()
  const [deleteDisbaleGiftData] = useLazyGetQuestionnaireDataQuery()
  const [deleteGiftAPICall] = useLazyDeleteDependentAPICallQuery()

  const fetchGiftSummary = () => {
    const finalPayload = {
      payLoad: '',
      endPoitns: `${PageCode.Gifts}`,
    }

    getGiftSummaryData(finalPayload)
      .unwrap()
      .then(res => {
        const dataMapData = dataMap(JSON.parse(res?.payload).miDataModel?.data)

        for (let i = 0; i < dataMapData.length; i++) {
          if (dataMapData[i] == 'Y') {
            aList[i + 2].status = '1'
          } else if (dataMapData[i] == 'N') {
            aList[i + 2].status = '0'
          } else {
            aList[i + 2].status = ''
          }
        }

        if (JSON.parse(res?.payload).miDataModel?.data?.NavGifts == 0) {
          setDisableAll(true)
        } else {
        }

        aList[0].status = JSON.parse(res?.payload).miDataModel?.data?.NavGifts

        setSwitchEnabledGift(
          JSON.parse(res?.payload).miDataModel?.data?.chkGiftDoc == 'Y'
            ? true
            : false
        )
        setSwitchEnabledForgiven(
          JSON.parse(res?.payload).miDataModel?.data?.chkDebtForgiveDoc == 'Y'
            ? true
            : false
        )
        setFetching(false)
        setIsRefresh(true)
      })
      .catch(error => {
        setFetching(false)
        setIsRefresh(true)
        showErrorMessage(error)
      })
  }

  const dataMap = (objData: object) => {
    const arrayObject = [
      objData.ynoDifAssetsValue,
      objData.ynoNewTrust,
      objData.ynoLifeInsTrust,
      objData.ynoPurchaseAutoForInd,
    ]
    return arrayObject
  }

  const fetchGiftSummaryGiftDetails = () => {
    const finalPayload = {
      payLoad: '',
      endPoitns: `${PageCode.GiftsIndividualsTrusts}`,
    }

    getGiftData(finalPayload)
      .unwrap()
      .then(res => {
        setGiftData(
          JSON.parse(res?.payload)?.navHelper?.pageListItems[0]?.Entities
        )
        setEntityPageIDGift(
          JSON.parse(res?.payload)?.navHelper?.pageListItems[0]?.EntityHelper
            ?.entityPageID
        )
        setFetching(false)
      })
      .catch(error => {
        setFetching(false)
        showErrorMessage(error)
      })
  }

  const fetchGiftSummaryForGivenDetails = () => {
    const finalPayload = {
      payLoad: '',
      endPoitns: `${PageCode.GiftsDebtForgiveness}`,
    }

    getForGiveData(finalPayload)
      .unwrap()
      .then(res => {
        setForgivenData(
          JSON.parse(res?.payload)?.navHelper?.pageListItems[0]?.Entities
        )
        setEntityPageIDForGiven(
          JSON.parse(res?.payload)?.navHelper?.pageListItems[0]?.EntityHelper
            ?.entityPageID
        )
        setFetching(false)
      })
      .catch(error => {
        setFetching(false)
        showErrorMessage(error)
      })
  }
  useFocusEffect(
    useCallback(() => {
      setIsRefresh(false)
      fetchGiftSummary()
      fetchGiftSummaryGiftDetails()
      fetchGiftSummaryForGivenDetails()
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

  const getSwitchValue = (yAndNValue: boolean) => {
    let val = ''
    if (yAndNValue) {
      val = 'Y'
    } else if (yAndNValue) {
      val = 'N'
    } else {
      val = ''
    }
    return val
  }

  const submitGiftDetails = (isDone: string) => {
    setFetching(true)
    serverCallDoneButton(isDone)
  }
  const serverCallDoneButton = async (isDone: string, isNav = true) => {
    const finalPayload = {
      data: {
        ynoDifAssetsValue: getYandN(aList[2].status),
        ynoNewTrust: getYandN(aList[3].status),
        ynoLifeInsTrust: getYandN(aList[4].status),
        ynoPurchaseAutoForInd: getYandN(aList[5].status),
        chkGiftDoc: getSwitchValue(isSitchEnabledGift),
        chkDebtForgiveDoc: getSwitchValue(isSitchEnabledForgiven),
        NavGifts: aList[0].status,
        NavGiftsComplete: isDone,
        NavGiftsDescription: '',
        code: PageCode.Gifts,
      },
      endPoitns: `${PageCode.Gifts}`,
    }

    getGiftSummaryData(finalPayload)
      .unwrap()
      .then(() => {
        if (isNav) {
          navigation.goBack()
        }
        setFetching(false)
      })
      .catch(error => {
        setFetching(false)
        showErrorMessage(error)
      })
  }
  const disbaleAndDeleteGiftData = (deseelctOrNo: string) => {
    const payload = {
      ynoDifAssetsValue: '',
      ynoNewTrust: '',
      ynoLifeInsTrust: '',
      ynoPurchaseAutoForInd: '',
      chkGiftDoc: '',
      chkDebtForgiveDoc: '',
      NavGifts: deseelctOrNo,
      NavGiftsComplete: '0',
      NavGiftsDescription: '',
      code: PageCode.Gifts,
    }

    const finalPayload = {
      data: payload,
      endPoitns: `${PageCode.Gifts}`,
    }
    setFetching(true)
    deleteDisbaleGiftData(finalPayload)
      .unwrap()
      .then(() => {
        setRefreshPage(!refreshPage)
        setFetching(false)
      })
      .catch(error => {
        setFetching(false)
        showErrorMessage(error)
      })
    //delete for gift
    giftData.forEach(data => {
      console.log(data)
      deleteGiftAPI(data.entityID, true)
    })

    //delete for forgiven
    forGivenData.forEach(data => {
      console.log(data)
      deleteForGivenAPI(data.entityID, false)
    })
  }

  const confirmationDeleteGift = (val: string) => {
    Alert.alert(
      t('businessRental:CONFIRMATION_TITLE'),
      t('businessRental:CONFIRMATION_TEXT'),
      [
        {
          text: t('common:NO'),
          onPress: () => {
            setIsRefresh(false),
              (aList[0].status = '1'),
              setIsRefresh(true),
              setDisableAll(false)
          },

          style: 'cancel',
        },
        {
          text: t('common:YES'),
          onPress: () => disbaleAndDeleteGiftData(val),

          style: 'default',
        },
      ]
    )
  }

  const YesNoCallback = (state: YesNoResult, data: YesNoButtonProps) => {
    const ynoseletedValue = state === '1' ? 'Y' : state === '0' ? 'N' : ''
    const giftObject = { ...listData }

    if (
      (YesNoResult.NO === state ) &&
      data?.title ===
        t('questionnaireBusiness:DID_YOU_MAKE_ANY_SIGNIFICANT_GIFT')
    ) {
      setDisableAll(true)
      confirmationDeleteGift("0")
    } 
    
    else if((YesNoResult.NONE == state && data?.defaultValue == '1') &&
    data?.title ===
      t('questionnaireBusiness:DID_YOU_MAKE_ANY_SIGNIFICANT_GIFT'))
    
    {
      setDisableAll(true)
      confirmationDeleteGift("")
    } 
    else if (
      YesNoResult.YES === state &&
      data?.title ===
        t('questionnaireBusiness:DID_YOU_MAKE_ANY_SIGNIFICANT_GIFT')
    ) {
      setDisableAll(false)
    }

    switch (data.apiKey) {
      case 'ynoDifAssetsValue':
        giftObject.ynoDifAssetsValue = ynoseletedValue
        aList[2].status = state
        setListData(giftObject)
        break
      case 'ynoNewTrust':
        giftObject.ynoNewTrust = ynoseletedValue
        aList[3].status = state
        setListData(giftObject)
        break
      case 'ynoLifeInsTrust':
        giftObject.ynoLifeInsTrust = ynoseletedValue
        aList[4].status = state
        setListData(giftObject)
        break
      case 'ynoPurchaseAutoForInd':
        giftObject.ynoPurchaseAutoForInd = ynoseletedValue
        aList[5].status = state
        setListData(giftObject)
        break

      case 'NavGifts':
        giftObject.NavGifts = ynoseletedValue
        aList[0].status = state
        setListData(giftObject)
        break
    }
  }

  const dtToggleSwitch = () => {
    setSwitchEnabledGift(previousState => !previousState)
  }
  const dtToggleSwitchForgiven = () => {
    setSwitchEnabledForgiven(previousState => !previousState)
  }

  const navigateToScreen = item => {
    navigation.navigate('AddGifts', {
      isEdit: true,
      entityID: item?.entityID,
      pageId: entityPageIDGift,
    })
  }

  const navigateToScreenForgiven = item => {
    navigation.navigate('AddForgivenGifts', {
      isEdit: true,
      entityID: item?.entityID,
      pageId: entityPageIDForGiven,
    })
  }

  const getModelJson = () => {
    return {
      data: {
        txtName: '',
        curValue: '',
        datDateGift: '',
        chkIndividual: '',
        chkTrust: '',
      },
      grids: null,
    }
  }

  const deleteGiftAPI = (entityID: string) => {

    setFetching(true)
    const endPoint =
      '0/' +
      PageCode.GiftsIndividualsTrusts +
      '/0/' +
      entityID +
      '/' +
      entityPageIDGift

    const postData = {
      endPoint: endPoint,
      data: {},
      headers: JSON.stringify(getModelJson()),
    }
    deleteGiftAPICall(postData)
      .unwrap()
      .then(response => {
        setFetching(false)
        fetchGiftSummaryGiftDetails()
      })
      .catch(error => {
        setFetching(false)
        Alert.alert(error?.data?.errorMessages[0]?.message)
        showErrorMessage(error)
      })
  }

  const deleteForGivenAPI = (entityID: string) => {

    setFetching(true)
    
    const endPoint =
      '0/' +
      PageCode.GiftsDebtForgiveness +
      '/0/' +
      entityID +
      '/' +
      entityPageIDForGiven

    const postData = {
      endPoint: endPoint,
      data: {},
      headers: JSON.stringify(getModelJson()),
    }
    deleteGiftAPICall(postData)
      .unwrap()
      .then(() => {
        setFetching(false)
        fetchGiftSummaryForGivenDetails()
      })
      .catch(error => {
        setFetching(false)
        Alert.alert(error?.data?.errorMessages[0]?.message)
        showErrorMessage(error)
      })
  }

  const deleteGift = (entityID: string, checkGift: boolean) => {
    Alert.alert(t('common:DELETE'), checkGift? t('questionnaire:DELETE_GIFT'):t('questionnaire:DELETE_FORGIVE'), [
      {
        text: t('common:CANCEL'),
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: t('common:DELETE'),
        onPress: () =>
          checkGift ? deleteGiftAPI(entityID) : deleteForGivenAPI(entityID),
        style: 'default',
      },
    ])
  }

  const onPressAddGift = async () => {
    await serverCallDoneButton('0', false)
    navigation.navigate('AddGifts', {
      isEdit: false,
      entityID: '',
      pageId: entityPageIDGift,
    })
  }

  const onPressAddForgiven = async () => {
    await serverCallDoneButton('0', false)
    navigation.navigate('AddForgivenGifts', {
      isEdit: false,
      entityID: '',
      pageId: entityPageIDForGiven,
    })
  }

  return (
    <GiftSummaryUI
      giftData={giftData}
      forGivenData={forGivenData}
      isRefresh={isRefresh}
      disableAll={disableAll}
      isSitchEnabledGift={isSitchEnabledGift}
      isSitchEnabledForgiven={isSitchEnabledForgiven}
      dtToggleSwitch={dtToggleSwitch}
      dtToggleSwitchForgiven={dtToggleSwitchForgiven}
      YesNoCallback={YesNoCallback}
      onPressAddGift={onPressAddGift}
      onPressAddForgiven={onPressAddForgiven}
      navigateToScreen={navigateToScreen}
      navigateToScreenForgiven={navigateToScreenForgiven}
      deleteGift={deleteGift}
      submitGiftDetails={submitGiftDetails}
      isFetching={isFetching}
    />
  )
}

export default GiftsScreen
