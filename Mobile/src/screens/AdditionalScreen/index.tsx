import React, { useCallback, useEffect, useState } from 'react'
import { ApplicationScreenProps } from 'Mobile/@types/navigation'
import AdditionalScreen from './AdditionalScreen'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import {
  useLazyGetBusinessEntityMultipleQuery,
  useLazyGetBusinessEntityEventQuery,
} from '../../services/modules/BusinessEntity'
import { useFocusEffect } from '@react-navigation/native'
import { errorMessageToast } from '../Error/utils'
import { ScrollView } from 'react-native'

export type AddQuestionData = {
  answer: string
  order: number
  questionId: string
  questionType: string
  text: string
}

const AdditionalInformation = (props: ApplicationScreenProps) => {
  const [isAsstesData, setAsstesData] = useState(false)
  const [isSelected] = useState(true)
  const [questions, setQuestions] = useState<AddQuestionData[]>([])
  const [error, setError] = useState(false)
  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
  })
  const [getBusinessEntityMultiple] = useLazyGetBusinessEntityMultipleQuery()
  const [getBusinessEntityEvent] = useLazyGetBusinessEntityEventQuery()
  const isBusiness = props?.route?.params?.BusinessAdditionalInformation
  const submitProfile = async (
    formdata: Record<string, string>,
    isDone: boolean
  ) => {
    const submitValue = isDone ? '1' : '0'
    const request = {
      data: { ...formdata, code: '9001', NavAddlInfoComplete: submitValue },
      grids: null,
      isBusiness: props?.route?.params?.BusinessAdditionalInformation,
    }
    getBusinessEntityEvent(request)
      .unwrap()
      .then(() => {
        props.navigation.goBack()
      })
      .catch(err => {
        setAsstesData(false)
        errorMessageToast(err)
      })
  }

  const fetchAssetsList = () => {
    setAsstesData(true)

    getBusinessEntityMultiple()
      .unwrap()
      .then(responseQuestions => {
        const assetList = {
          data: null,
          grids: null,
        }
        if (isBusiness) {
          setQuestions(responseQuestions)
          const newRes = []
          for (const i in responseQuestions) {
            const newObj = { ...responseQuestions[i] }
            const key = newObj.questionId
            newObj[key] = responseQuestions[i]['answer']
            newRes.push(newObj)
          }
          reset(newRes)
          setAsstesData(false)
        } else {
          getBusinessEntityEvent(assetList)
            .unwrap()
            .then(answerData => {
              const jsonData = JSON.parse(answerData?.payload)?.miDataModel
                ?.data
              setQuestions(responseQuestions)
              reset(jsonData)
              setAsstesData(false)
            })
            .catch(err => {
              setAsstesData(false)
              errorMessageToast(err)
            })
        }

        setAsstesData(false)
      })
      .catch(err => {
        setAsstesData(false)
        errorMessageToast(err)
      })
  }
  useFocusEffect(
    useCallback(() => {
      fetchAssetsList()
    }, [])
  )
  useEffect(() => {
    fetchAssetsList()
  }, [])
  const onError: SubmitErrorHandler<Record<string, string>> = errors => {
    console.error('Error on form submit', errors)
    setError(true)
  }
  return (
    <>
     <ScrollView>
      <AdditionalScreen
        isAsstesData={isAsstesData}
        control={control}
        autoFillData={questions}
        isSelected={isSelected}
        handleSubmit={handleSubmit}
        submitProfile={submitProfile}
        onError={onError}
      />
      </ScrollView>
    </>
  )
}
export default AdditionalInformation
