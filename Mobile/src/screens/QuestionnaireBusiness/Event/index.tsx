import React from 'react'
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useLazyGetQuestionnaireDataQuery } from '../../../services/modules/questionnaire'
import {
  YesNoButtonProps,
  YesNoResult,
} from '../../../theme/common/YesNoButton/types'
import { aList } from './utils'
import { useTranslation } from 'react-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import EventUI from './EventUI'
import {
  useLazyGetEventsQuery,
  useLazyGetUpdateMultipleEventsQuery,
} from '../../../services/modules/eventScreen'
import { get1and0 } from '../../../../src/theme/constants'
import { useLazyGetHomeBankDoneQuery } from '../../../services/modules/ElectronicFundsScreen'
import { errorMessageToast } from '../../Error/utils'

const EventUIScreen = ({ navigation }) => {
  let isDone: number
  const [isRefresh, setIsRefresh] = useState(false)
  const [isFetching, setFetching] = useState(true)
  const [disableAll, setDisableAll] = useState(false)
  const [showTextInputFirst, setShowTextInputFirst] = useState(false)
  const [showTextInputSecond, setShowTextInputSecond] = useState(false)
  const [showTextInputThird, setShowTextInputThird] = useState(false)
  const [showTextInputFour, setShowTextInputFour] = useState(false)
  const [showTextInputFive, setShowTextInputFive] = useState(false)

  const [switchFirst, setSwitchFirst] = useState(false)
  const [switchSecond, setSwitchSecond] = useState(false)
  const [switchThird, setSwitchThird] = useState(false)
  const [switchFour, setSwitchFour] = useState(false)
  const [switchFive, setSwitchFive] = useState(false)

  const { t } = useTranslation()

  const [getGiftSummaryData] = useLazyGetQuestionnaireDataQuery()
  const [deleteDisbaleGiftData] = useLazyGetQuestionnaireDataQuery()

  const [getUpdateMultipleEvents] = useLazyGetUpdateMultipleEventsQuery()
  const [getHomeBankDone] = useLazyGetHomeBankDoneQuery()

  const [getEventsAPI] = useLazyGetEventsQuery()

  const [listData, setListData] = useState({})

  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstText: '',
      secondText: '',
      thirdText: '',
      fourText: '',
      fiveText: '',
    },
  })

  const fetchMovingSummary = () => {
    setIsRefresh(false)

    getEventsAPI()
      .unwrap()
      .then(res => {
        const dataMapData = res

        setIsRefresh(false)

        for (let i = 0; i < dataMapData.length; i++) {
          aList[i].answer = get1and0(dataMapData[i].answer)
        }

        if (dataMapData[0]?.answer == 'Y') {
          setShowTextInputFirst(true)
        }

        if (dataMapData[3]?.answer == 'Y') {
          setShowTextInputSecond(true)
        }

        if (dataMapData[4]?.answer == 'Y') {
          setShowTextInputThird(true)
        }

        if (dataMapData[5]?.answer == 'Y') {
          setShowTextInputFour(true)
        }

        if (dataMapData[9]?.answer == 'Y') {
          setShowTextInputFive(true)
        }

        if (dataMapData[0]?.drl == '1') {
          setSwitchFirst(true)
        }

        if (dataMapData[3]?.drl == '1') {
          setSwitchSecond(true)
        }

        if (dataMapData[4]?.drl == '1') {
          setSwitchThird(true)
        }

        if (dataMapData[5]?.drl == '1') {
          setSwitchFour(true)
        }

        if (dataMapData[9]?.drl == '1') {
          setSwitchFive(true)
        }

        reset({
          firstText: dataMapData[0]?.notesText,
          secondText: dataMapData[3]?.notesText,
          thirdText: dataMapData[4]?.notesText,
          fourText: dataMapData[5]?.notesText,
          fiveText: dataMapData[9]?.notesText,
        })

        setFetching(false)
        setIsRefresh(true)
      })
      .catch(error => {
        setFetching(false)
        setIsRefresh(true)
      })
  }

  useFocusEffect(
    useCallback(() => {
      setShowTextInputFirst(false)
      setShowTextInputSecond(false)
      setShowTextInputThird(false)
      setShowTextInputFour(false)
      setShowTextInputFive(false)

      fetchMovingSummary()
    }, [])
  )

  const submitMiscIncomeExpensesDetails: SubmitHandler<
    Record<string, string>
  > = async formdata => {
    const multipleDataSelection = []

    for (let i = 0; i < aList.length; i++) {
      const payload = {
        id: aList[i].id,
        drlQuestionId: aList[i].drlQuestionId,
        answer: convertYNValue(aList[i]?.answer, true),
        notesText: aList[i].notesText,
        drl: aList[i].drl,
      }

      if (i == 0) {
        payload.notesText = formdata.firstText
        payload.drl = switchFirst ? '1' : '0'
      }
      if (i == 3) {
        payload.notesText = formdata.secondText
        payload.drl = switchSecond ? '1' : '0'
      }

      if (i == 4) {
        payload.notesText = formdata.thirdText
        payload.drl = switchThird ? '1' : '0'
      }

      if (i == 5) {
        payload.notesText = formdata.fourText
        payload.drl = switchFour ? '1' : '0'
      }

      if (i == 9) {
        payload.notesText = formdata.fiveText
        payload.drl = switchFive ? '1' : '0'
      }

      multipleDataSelection.push(payload)
    }

    multipleDataSelection[3].notesText = formdata.secondText

    setFetching(true)

    getUpdateMultipleEvents(multipleDataSelection)
      .unwrap()
      .then(() => {
        const updateData = {
          tileId: 4,
          complete: isDone,
        }
        getHomeBankDone(updateData)
          .unwrap()
          .then(response => {
            setFetching(false)
            navigation.goBack()
          })
          .catch(error => {
            setFetching(false)
          })
      })
      .catch(error => {
        setFetching(false)
        errorMessageToast(error)
      })
  }

  const convertYNValue = (value, isYN: boolean) => {
    if (value == '1' || value == 'Y') {
      return isYN ? 'Y' : '1'
    } else if (value == '0' || value == 'N') {
      return isYN ? 'N' : '0'
    }
    return ''
  }

  const YesNoCallback = (state: YesNoResult, data: YesNoButtonProps) => {
    const ynoseletedValue = state === '1' ? 'Y' : state === '0' ? 'N' : ''
    const miscObejct = { ...listData }

    switch (data.apiKey) {
      case '25012':
        aList[0].answer = ynoseletedValue

        setListData(miscObejct)

        if (state == '1') {
          setShowTextInputFirst(true)
        } else {
          setShowTextInputFirst(false)
        }

        break

      case '25013':
        aList[1].answer = ynoseletedValue

        break

      case '25014':
        aList[2].answer = ynoseletedValue

        break
      case '25015':
        aList[3].answer = ynoseletedValue

        if (state == '1') {
          setShowTextInputSecond(true)
        } else {
          setShowTextInputSecond(false)
        }

        break
      case '25016':
        aList[4].answer = ynoseletedValue

        if (state == '1') {
          setShowTextInputThird(true)
        } else {
          setShowTextInputThird(false)
        }

        break

      case '25017':
        aList[5].answer = ynoseletedValue

        if (state == '1') {
          setShowTextInputFour(true)
        } else {
          setShowTextInputFour(false)
        }

        break
      case '25018':
        aList[6].answer = ynoseletedValue

        break

      case '25019':
        aList[7].answer = ynoseletedValue
        setListData(miscObejct)
        break

      case '25020':
        miscObejct.ynoMortIntPdNo1098 = ynoseletedValue
        aList[8].answer = ynoseletedValue
        setListData(miscObejct)
        break

      case '25021':
        miscObejct.ynoRecMortAssistance = ynoseletedValue
        aList[9].answer = ynoseletedValue
        setListData(miscObejct)

        if (state == '1') {
          setShowTextInputFive(true)
        } else {
          setShowTextInputFive(false)
        }

        break

      case '25022':
        miscObejct.ynoMovingExpenses = ynoseletedValue
        aList[10].answer = ynoseletedValue
        setListData(miscObejct)
        break

      case '25023':
        miscObejct.ynoMovingExpenses = ynoseletedValue
        aList[11].answer = ynoseletedValue
        setListData(miscObejct)
        break

      case '25024':
        miscObejct.ynoMovingExpenses = ynoseletedValue
        aList[12].answer = ynoseletedValue
        setListData(miscObejct)
        break

      case '25025':
        miscObejct.ynoMovingExpenses = ynoseletedValue
        aList[13].answer = ynoseletedValue
        setListData(miscObejct)
        break

      case '25026':
        miscObejct.ynoMovingExpenses = ynoseletedValue
        aList[14].answer = ynoseletedValue
        setListData(miscObejct)
        break

      case '25027':
        miscObejct.ynoMovingExpenses = ynoseletedValue
        aList[15].answer = ynoseletedValue
        setListData(miscObejct)
        break

      case '25028':
        miscObejct.ynoMovingExpenses = ynoseletedValue
        aList[16].answer = ynoseletedValue
        setListData(miscObejct)
        break

      case '25029':
        miscObejct.ynoMovingExpenses = ynoseletedValue
        aList[17].answer = ynoseletedValue
        setListData(miscObejct)
        break

      case '25030':
        miscObejct.ynoMovingExpenses = ynoseletedValue
        aList[18].answer = ynoseletedValue
        setListData(miscObejct)
        break

      case '25031':
        miscObejct.ynoMovingExpenses = ynoseletedValue
        aList[19].answer = ynoseletedValue
        setListData(miscObejct)
        break

      case '25032':
        miscObejct.ynoMovingExpenses = ynoseletedValue
        aList[20].answer = ynoseletedValue
        setListData(miscObejct)
        break
    }
  }

  const onValueChangeFirst = () => {
    setSwitchFirst(!switchFirst)
  }

  const onValueChangeSecond = () => {
    setSwitchSecond(!switchSecond)
  }
  const onValueChangeThird = () => {
    setSwitchThird(previousState => !previousState)
  }
  const onValueChangeFour = () => {
    setSwitchFour(!switchFour)
  }

  const onValueChangeFive = () => {
    setSwitchFive(!switchFive)
  }

  return (
    <EventUI
      aList={aList}
      isRefresh={isRefresh}
      isFetching={isFetching}
      disableAll={disableAll}
      YesNoCallback={YesNoCallback}
      submitMiscIncomeExpensesDetailsFinish={handleSubmit(d => {
        ;(isDone = 0), submitMiscIncomeExpensesDetails(d)
      })}
      submitMiscIncomeExpensesDetailsDone={handleSubmit(d => {
        ;(isDone = 1), submitMiscIncomeExpensesDetails(d)
      })}
      showTextInputFirst={showTextInputFirst}
      showTextInputSecond={showTextInputSecond}
      showTextInputThird={showTextInputThird}
      showTextInputFour={showTextInputFour}
      showTextInputFive={showTextInputFive}
      switchFirst={switchFirst}
      switchSecond={switchSecond}
      switchThird={switchThird}
      switchFour={switchFour}
      switchFive={switchFive}
      control={control}
      onValueChangeFirst={onValueChangeFirst}
      onValueChangeSecond={onValueChangeSecond}
      onValueChangeThird={onValueChangeThird}
      onValueChangeFour={onValueChangeFour}
      onValueChangeFive={onValueChangeFive}
    />
  )
}
export default EventUIScreen
