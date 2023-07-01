import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, TouchableOpacity } from 'react-native'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import styles from './styles'
import Text from '../../../theme/common/Text'
import ListItem from '../../../theme/common/ListItem'
import { useTranslation } from 'react-i18next'
import { Header } from 'react-native-elements'
import { glbCustomerHeaderOptions, glbStyles } from '../../../../src/styles/global'
import { useSelector } from 'react-redux'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import { PageCode } from '../../../services/constants/PageCode'
import loaderStyle from '../../Common/LoaderStyle'
import { NumberField } from '../../../theme/common/TextInput/InputFormComponents'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  useLazyGetDetailedDependentDisplayDataQuery,
  useLazyEditDependentPageIntityAPIQuery,
} from '../../../services/modules/questionnaire'
import EmptyAreas from '../BusinessRental/EmptyAreas'
import { formatCurrency } from '../../../../src/theme/common/TextInput/utils'
import { RenderTheeColumView } from '../../../theme/common/RowWithTwoTextfieldOneText'
import { utilRentalArray } from './utilsRental'
import { incomeHeading } from './utilsBusiness'

const IncomeScreen = (props: ApplicationScreenProps) => {
  const { navigation, route } = props
  const params = route?.params

  const entityID = params?.entityID
  const [isFetching, setFetching] = useState(true)
  const [editDependentPageIntityAPI] = useLazyEditDependentPageIntityAPIQuery()
  const [getDetailedDependentDisplayData] =
    useLazyGetDetailedDependentDisplayDataQuery()

  const singleServiceListData = useSelector(
    state => state?.home?.singleServiceListData
  )

  const { t } = useTranslation()
  const { control, reset, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      curOtherSources: '',
      curProOtherSources: '',
      curRoyalty: '',
      curProRoyalty: '',
      curRental: '',
      curProRental: '',
    },
  })

  const renderTheeColumView = num => {
    return (
      <RenderTheeColumView
        control={control}
        index={num}
        disablePriorYearTextField
        data={utilRentalArray}
      />
    )
  }
  useEffect(() => {
    if (!params?.isAdd) {
      const endPoitns = `code=${PageCode.BusinessRentalIncomeDetail}&entityId=${entityID}`
      getDetailedDependentDisplayData(endPoitns)
        .unwrap()
        .then(res => {
          const rentalData = JSON.parse(res?.payload).miDataModel?.data
          rentalData.curOtherSources = formatCurrency(
            rentalData.curOtherSources,
            true
          )
          rentalData.curProOtherSources = formatCurrency(
            rentalData.curProOtherSources,
            true
          )
          rentalData.curRoyalty = formatCurrency(rentalData.curRoyalty, true)
          rentalData.curProRoyalty = formatCurrency(
            rentalData.curProRoyalty,
            true
          )
          rentalData.curRental = formatCurrency(rentalData.curRental, true)
          rentalData.curProRental = formatCurrency(
            rentalData.curProRental,
            true
          )
          reset(rentalData)
          setFetching(false)
        })
        .catch(error => {
          setFetching(false)
        })
    }
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
        setFetching(false)
      })
  }

  const cancelClick = () => {
    navigation.goBack()
  }

  const saveDetails: SubmitHandler<Record<string, string>> = async formdata => {
    if (!params?.isAdd) {
      const editEndpoint = `/${entityID}/${PageCode.BusinessRentalIncomeDetail}/${entityID}`
      const payload = {
        data: {
          curOtherSources: formdata.curOtherSources,
          curProOtherSources: formdata?.curProOtherSources,
          curRoyalty: formdata.curRoyalty,
          curProRoyalty: formdata?.curProRoyalty,
          curRental: formdata.curRental,
          curProRental: formdata?.curProRental,

          isDirty: 'true',
          code: PageCode.BusinessRentalIncomeDetail,
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
              children={t('income:INCOME_(SCHEDULE_E)')}
            />
            <Text
              testID="header_titile"
              stylesContainerText={glbStyles.headerSubTitle}
              children={route?.params?.selectedItemName}
            />
          </View>
        }
        rightComponent={
          <TouchableOpacity onPress={handleSubmit(saveDetails)}>
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
        <EmptyAreas />
        <Spinner
          visible={isFetching}
          textContent={t('common:LOADING')}
          size={'large'}
          textStyle={loaderStyle.spinnerTextStyle}
        />

        <View style={styles.incomeMainViewWhite}>
          <RenderTheeColumView
            control={control}
            index={'1'}
            disablePriorYearTextField
            data={incomeHeading}
            isHeader={true}
          />

          {utilRentalArray.map(person => {
            return renderTheeColumView(person.id)
          })}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default IncomeScreen
