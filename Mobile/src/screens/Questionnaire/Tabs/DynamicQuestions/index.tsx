import React, { useEffect, useState } from 'react'
import {
  getHeaderTitle,
  listData,
  mapOtherData,
  questionnaireData,
} from './utils'
import { ApplicationScreenProps } from '../../../../../@types/navigation'
import { useLazyGetYesNoQuestionsDetailsQuery } from '../../../../services/modules/YesNoQuestions'
import {
  YesNoButtonProps,
  YesNoResult,
} from '../../../../theme/common/YesNoButton/types'
import DynamicForm from '../DynamicForm'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { getAnswerData } from './utils'
import { styles } from '../../../FilingDetails/styles'
import { Alert, SafeAreaView } from 'react-native'
import { Spinner } from '../../../../theme/common/Spinner/Spinner'
import { t } from 'i18next'
import loaderStyle from '../../../Common/LoaderStyle'
import { useSelector } from 'react-redux'
import { glbStyles } from '../../../../../src/styles/global'

const DynamicQuestions = ({ navigation, route }: ApplicationScreenProps) => {
  const pageCode = route.params.pageCode
  const isFocused = useIsFocused()

  const [isPageRefresh, setIsPageRefresh] = useState(false)
  const [isFetching, setFetching] = useState(false)
  const [listData1, setListData1] = useState(listData(pageCode))

  const [getDataFromServer] = useLazyGetYesNoQuestionsDetailsQuery()
  const singleServiceListData = useSelector(
    state => state?.home?.singleServiceListData
  )

  useEffect(() => {
    navigation.setOptions({
      headerTitle: getHeaderTitle(pageCode),
    })
  }, [navigation])

  useFocusEffect(
    React.useCallback(() => {
      fetchDataFromAPI()
    }, [isFocused])
  )

  const fetchDataFromAPI = () => {
    const postData = {
      id: pageCode,
      data: { data: null, grid: null },
      headers: null,
    }
    serviceCall(postData, false)
  }
  const serviceCall = (postdata: {}, isDone: boolean) => {
    setFetching(true)
    getDataFromServer(postdata)
      .unwrap()
      .then(response => {
        if (isDone) {
          navigation.goBack()
        } else {
          dataMapping(response)
        }
        setFetching(false)
      })
      .catch(error => {
        console.error('getData Error=', error)
        setFetching(false)
      })
  }
  const dataMapping = response => {
    const yesNodata = listData(pageCode)
    const answerData = JSON.parse(response?.payload)?.miDataModel?.data
    const answerValue = getAnswerData(pageCode, answerData)
    yesNodata.map((value, index) => {
      if (index != 0) {
        value.value = convertYNValue(answerValue[index], false)
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
    })
    setListData1(yesNodata)
    if (yesNodata[0].value == '1') {
      enableTitles()
    }
    setIsPageRefresh(true)
  }
  const showAlertConfirmation = (buttonType: boolean, state: string, item) => {
    Alert.alert(t('common:CONFIRMATION'), t('common:Q_ALERT_MSG'), [
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
    setListData1(data)
    setIsPageRefresh(true)
  }

  const convertYNValue = (value, isYN: boolean) => {
    if (value == '1' || value == 'Y') {
      return isYN ? 'Y' : '1'
    } else if (value == '0' || value == 'N') {
      return isYN ? 'N' : '0'
    }
    return ''
  }
  const toggleBottomButton = (isDone: boolean) => {
    const data = questionnaireData(pageCode)
    listData1.forEach((item, index) => {
      if (index != 0) {
        data[item.APIkey] = convertYNValue(item.value, true)
      } else {
        data[item.APIkey] = item.value
      }
    })
    const dataMapped = mapOtherData(pageCode, data, isDone)
    const postData = {
      id: pageCode,
      data: { data: dataMapped, grid: null },
      headers: null,
    }
    serviceCall(postData, true)
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
      showAlert(state, listData1[0].value, index, buttonType)
    }
    const yesNodata = listData1
    if (buttonType) {
      yesNodata[index].value = ynoseletedValue
    } else {
      yesNodata[index].value = ynoseletedValue
    }
    setListData1(yesNodata)
  }
  const showAlert = (state, prevState, index, buttonType) => {
    if (state == '' && prevState == '1') {
      showAlertConfirmation(true, state, index)
    } else if (state == '0' && prevState == '1') {
      showAlertConfirmation(false, state, index)
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
    pressQuestionaries(state === '1' ? true : false, state, data1.index, true)
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
        formCallback={YesNoCallback}
        toggleBottomButton={isDone => toggleBottomButton(isDone)}
      />
    </SafeAreaView>
  )
}

export default DynamicQuestions
