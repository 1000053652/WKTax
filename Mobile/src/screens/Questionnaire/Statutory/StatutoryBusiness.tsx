import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, TouchableOpacity } from 'react-native'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import styles from './styles'
import Text from '../../../theme/common/Text'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import { PageCode } from '../../../services/constants/PageCode'
import loaderStyle from '../../Common/LoaderStyle'
import { useForm, SubmitHandler } from 'react-hook-form'
import { statutoryHeading, textfieldArray } from './utils'
import { Header } from 'react-native-elements'
import { glbCustomerHeaderOptions, glbStyles } from '../../../../src/styles/global'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  useLazyGetDetailedDependentDisplayDataQuery,
  useLazyEditDependentPageIntityAPIQuery,
} from '../../../services/modules/questionnaire'
import YesNoButton from '../../../theme/common/YesNoButton'
import { RenderTheeColumView } from '../../../theme/common/RowWithTwoTextfieldOneText'
import {
  YesNoButtonProps,
  YesNoResult,
} from '../../../../src/theme/common/YesNoButton/types'
import { errorMessageToast } from '../../Error/utils'
import { formatCurrency } from '../../../../src/theme/common/TextInput/utils'

const StatutoryBusinessScreen = (props: ApplicationScreenProps) => {
  const { navigation, route } = props
  const params = route?.params

  const entityID = params?.entityID

  const [isFetching, setFetching] = useState(true)
  const [isYesSelected, setYesSelected] = useState('')
  const [editDependentPageIntityAPI] = useLazyEditDependentPageIntityAPIQuery()

  const [getDetailedDependentDisplayData] =
    useLazyGetDetailedDependentDisplayDataQuery()

  const { t } = useTranslation()
  const { control, reset, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      curExpenses:'',
      curProExpenses: '',
      curMeals: '',
      curProMeals:'',
    },
  })

  useEffect(() => {
    const endPoints = `code=${PageCode.BusinessEmployeeDetail}&entityId=${entityID}`
    getDetailedDependentDisplayData(endPoints)
      .unwrap()
      .then(res => {

        const statutoryData = JSON.parse(res?.payload).miDataModel?.data
        statutoryData.curExpenses = formatCurrency(statutoryData.curExpenses, true)
        statutoryData.curProExpenses = formatCurrency(statutoryData.curProExpenses, true)
        statutoryData.curMeals = formatCurrency(statutoryData.curMeals, true)
        statutoryData.curProMeals = formatCurrency(statutoryData.curProMeals, true)

        reset(statutoryData)
        setYesSelected(JSON.parse(res?.payload).miDataModel?.data?.ynoStatutory)
        setFetching(false)
      })
      .catch(error => {
        setFetching(false)
        errorMessageToast(error)
      })
  }, [])

  const saveEditAddUpdateData = finalPayload => {
    setFetching(true)
    editDependentPageIntityAPI(finalPayload)
      .unwrap()
      .then(payload => {
        setFetching(false)
        navigation.goBack()
      })
      .catch(error => {
        errorMessageToast(error)
        setFetching(false)
      })
  }

  const YesNoCallback = (state: YesNoResult, data: YesNoButtonProps) => {
    const ynoseletedValue = state === '1' ? 'X' : state === '0' ? 'N' : ''

    setYesSelected(ynoseletedValue)
  }

  const cancelClick = () => {
    navigation.goBack()
  }

  const renderTheeColumView = num => {
    return (
      <RenderTheeColumView
        control={control}
        index={num}
        disablePriorYearTextField
        data={textfieldArray}
      />
    )
  }

  const submitIncome: SubmitHandler<
    Record<string, string>
  > = async formdata => {
    const editEndpoint = `/${entityID}/${PageCode.BusinessEmployeeDetail}/${entityID}`
    const payload = {
      data: {
        curExpenses: formdata.curExpenses,
        curProExpenses: formdata.curProExpenses,
        curMeals: formdata.curMeals,
        curProMeals: formdata.curProMeals,
        ynoStatutory: isYesSelected,
        isDirty: 'true',
        code: PageCode.BusinessEmployeeDetail,
        entityid: entityID,
      },
      grids: null,
    }

    const finalPayload = {
      endPoint: editEndpoint,
      headers: JSON.stringify(payload),
      data: {},
    }
    saveEditAddUpdateData(finalPayload)
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Header
        statusBarProps={glbCustomerHeaderOptions}
        leftComponent={
          <TouchableOpacity onPress={cancelClick}>
            <Text
              testID="header_cancel"
              stylesContainerText={glbStyles.headerButtonText}
              children={t('common:CANCEL')}
            />
          </TouchableOpacity>
        }
        centerComponent={
          <View>
            <Text
              testID="header_title"
              stylesContainerText={glbStyles.headerTitle}
              children={t('income:STATUTORY_EMP_SCHEDULE_C')}
              numberOfLines={1}
            />
            <Text
              testID="header_titile"
              stylesContainerText={glbStyles.headerSubTitle}
              children={route?.params?.selectedItemName}
            />
          </View>
        }
        rightComponent={
          <TouchableOpacity onPress={handleSubmit(submitIncome)}>
            <Text
              testID="header_save"
              stylesContainerText={glbStyles.headerButtonText}
              children={t('common:SAVE')}
            />
          </TouchableOpacity>
        }
        containerStyle={glbStyles.headerContainer}
      />
      <KeyboardAwareScrollView>
        <Spinner
          visible={isFetching}
          textContent={t('common:LOADING')}
          size={'large'}
          textStyle={loaderStyle.spinnerTextStyle}
        />

        <View style={styles.horizontalLine2} />

        <View style={styles.incomeMainViewWhite}>


        <RenderTheeColumView
          control={control}
          index={'1'}
          disablePriorYearTextField
          data={statutoryHeading}
          isHeader={true}
        />
      
          <Text
            children={t('income:LIST_ONLY_REIMBURSEMENT_NOT_REPORTED')}
            stylesContainerText={styles.stylesContainerTextMain}
            testID="questionnaire_main_name"
          />
          <View style={styles.horizontalLine2} />

          {textfieldArray.map(person => {
            return renderTheeColumView(person.id)
          })}
          {!isFetching && (
            <YesNoButton
              callback={YesNoCallback}
              apiKey="business_account"
              title={t('income:If_YOU_ARE_A_STATUTORY_EMPLOYEE')}
              defaultValue={
                isYesSelected === 'X'
                  ? YesNoResult.YES
                  : isYesSelected === 'N'
                  ? YesNoResult.NO
                  : YesNoResult.NONE
              }
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default StatutoryBusinessScreen
