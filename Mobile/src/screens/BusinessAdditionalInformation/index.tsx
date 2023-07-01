import React, { useCallback, useEffect, useState } from 'react'
import { ApplicationScreenProps } from 'Mobile/@types/navigation'
import BusinessInformation from './BusinessInformation'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import {
  useLazyGetBusinessEntityMultipleQuery,
  useLazyGetSubmitCustomQuestionsEventQuery,
} from '../../services/modules/BusinessEntity'
import { useFocusEffect } from '@react-navigation/native'
import { useLazyGetHomeBankDoneQuery } from '../../services/modules/ElectronicFundsScreen'
import { errorMessageToast } from '../Error/utils'
export type AddQuestionData = {
  answer: string
  order: number
  questionId: string
  questionType: string
  text: string
}

const BusinessAdditionalInformation = (props: ApplicationScreenProps) => {
  const [isAsstesData, setAsstesData] = useState(false)
  const [isSelected] = useState(true)
  const [questions, setQuestions] = useState<AddQuestionData[]>([])
  const [error, setError] = useState(false)
  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
  })
  const [getBusinessEntityMultiple] = useLazyGetBusinessEntityMultipleQuery()
  const [getSubmitCustomQuestionsEvent] =
    useLazyGetSubmitCustomQuestionsEventQuery()
  const [getHomeBankDone] = useLazyGetHomeBankDoneQuery()
  const submitProfile = async (
    formdata: Record<string, string>,
    isDone: boolean
  ) => {
    questions.forEach(element => {
      element.answer = formdata[element.questionId]
      if (element.answer == null) {
        element.answer = ' '
      }
    })
    getSubmitCustomQuestionsEvent(JSON.stringify(questions))
      .unwrap()
      .then(() => {
        const item = {
          tileId: 7,
          complete: isDone,
          enabled: true,
        }
        getHomeBankDone(item)
          .unwrap()
          .then(() => {
            props.navigation.goBack()
          })
          .catch(error => {
            console.error('error', error)
            errorMessageToast(error)
          })
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
        setQuestions(responseQuestions)
        const answerData = {}
        responseQuestions.forEach(element => {
          answerData[element.questionId] = element.answer
        })
        reset(answerData)
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
      <BusinessInformation
        isAsstesData={isAsstesData}
        control={control}
        autoFillData={questions}
        isSelected={isSelected}
        handleSubmit={handleSubmit}
        submitProfile={submitProfile}
        onError={onError}
      />
    </>
  )
}
export default BusinessAdditionalInformation
