import React, { useState, useEffect, useCallback } from 'react'
import { SafeAreaView, FlatList, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Spinner } from '../../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../../../screens/Common/LoaderStyle'
import { questionnaireBusiness, questionnaireBusinessType } from './utils'
import { states } from '../../../../services/constants/ConstantsData'
import { useTranslation } from 'react-i18next'
import { useFocusEffect } from '@react-navigation/native'
import Text from '../../../../theme/common/Text'
import {
  TextField,
  NumberField,
  ZipCodeField,
} from '../../../../theme/common/TextInput/InputFormComponents'
import CommonDatePicker from '../../../../theme/common/CommonDatePicker'
import { useLazyUpdateQuestionnaireBussinessQuery } from '../../../../../src/services/modules/questionnaireBusiness'

import { SubmitHandler, useForm } from 'react-hook-form'
import {
  dateFormat,
  dateFormatPlaceHolder,
  getStateName,
} from '../../.././../../src/theme/constants'
import { CustomDropdown } from '../../../../../src/theme/common/CustomDropdown'
import { glbStyles } from '../../../../../src/styles/global'

const ViewUpdateBusinessScreen = ({ navigation, route }) => {
  const aboutYouBusinessEntity = route?.params?.aboutYouBusinessEntity
  const [selectedState, setSelectedState] = useState('')

  const [updateQuestionnaireBussiness] =
    useLazyUpdateQuestionnaireBussinessQuery()

  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      nameContinued: '',
      ein: '',
      primaryActivity: '',
      incorporationState: '',
      yearEnd: '',
      incorporationDate: '',
    },
  })

  useFocusEffect(
    useCallback(() => {
      reset({
        name: aboutYouBusinessEntity?.name,
        nameContinued: aboutYouBusinessEntity?.nameContinued,
        ein: aboutYouBusinessEntity?.ein,
        primaryActivity: aboutYouBusinessEntity?.primaryActivity,
        yearEnd: aboutYouBusinessEntity?.yearEnd,
        incorporationDate: aboutYouBusinessEntity?.incorporationDate,
        incorporationState: aboutYouBusinessEntity?.incorporationState,
      })

      setSelectedState(aboutYouBusinessEntity?.incorporationState)
    }, [])
  )

  const { t } = useTranslation()

  const updateQuestionnaireBusiness: SubmitHandler<
    Record<string, string>
  > = async formdata => {
    const data = {
      name: formdata?.name,
      nameContinued: formdata?.nameContinued,
      yearEnd: formdata?.yearEnd,
      ein: formdata?.ein,
      state: formdata?.incorporationState,
      incorporationDate: formdata?.incorporationDate,
      incorporationState: formdata?.incorporationState,
      primaryActivity: formdata?.primaryActivity,
      haveInfo: false,
    }

    const request = {
      endPoints: 'Info',
      data: data,
    }

    updateQuestionnaireBussiness(request)
      .unwrap()
      .then(res => {
        navigation.goBack()
      })
      .catch(error => {})
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: t('questionnaireBusiness:BUSINESS'),
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit(updateQuestionnaireBusiness)}>
          <Text
            testID="Save_Button"
            stylesContainerText={styles.saveButton}
            children={t('common:SAVE')}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            testID="Cancel_Button"
            stylesContainerText={styles.cancelButton}
            children={t('common:CANCEL')}
          />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  const BusinessTextFieldsUI = (item: questionnaireBusinessType) => {
    return (
      <View>
        <View style={styles.emptyView} />
        <TextField
          placeholder=""
          control={control}
          name={item.APIkey}
          label={item.title}
          error={''}
          required={false}
          max={
            item.title == t('questionnaireBusiness:PRIMARYACTIIVITY') ? 23 : 40
          }
        />
      </View>
    )
  }

  const BusinessNumberUI = (item: questionnaireBusinessType) => {
    return (
      <View>
        <View style={styles.emptyView} />

        <ZipCodeField
          placeholder=""
          control={control}
          name={item.APIkey}
          label={item.title}
          error={''}
          required={false}
          max={9}
        />
      </View>
    )
  }

  const BusinessDropDownFieldsUI = (item: questionnaireBusinessType) => {
    return (
      <View>
        <View style={styles.emptyView} />
        <Text
          testID="dropdown_title"
          stylesContainerText={styles.dropdownTitle}
          children={t('questionnaireBusiness:INCORPORATION_FORMATION')}
        />

        <CustomDropdown
          containerStyle={styles.dropDownContainer}
          control={control}
          name={item.APIkey}
          label={item.title}
          data={states}
          dropdownKey={'key'}
          dropdownValue={'value'}
          placeholder={getStateName(selectedState)}
        />
      </View>
    )
  }

  const BusinessDateFieldsUI = item => {
    return (
      <View>
        <View style={styles.emptyView} />
        <CommonDatePicker
          control={control}
          name={item.APIkey}
          containerStyle={styles.datePickerContrainer}
          maximumDate={new Date()}
          title={item.title}
          dateFormat={dateFormat}
          testId="date_picker_general"
          placeholderText={dateFormatPlaceHolder}
        />
      </View>
    )
  }

  const renderQuestionnaireBusiness = ({ item }) => {
    switch (item.APIkey) {
      case 'name':
      case 'nameContinued':
      case 'primaryActivity':
        return BusinessTextFieldsUI(item)
      case 'ein':
        return BusinessNumberUI(item)
      case 'incorporationState':
        return BusinessDropDownFieldsUI(item)
      case 'incorporationDate':
      case 'yearEnd':
        return BusinessDateFieldsUI(item)
      default:
        break
    }
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <KeyboardAwareScrollView>
        <Spinner
          visible={false}
          textContent={t('common:LOADING')}
          size={'large'}
          textStyle={loaderStyle.spinnerTextStyle}
        />
        <FlatList
          data={questionnaireBusiness}
          renderItem={renderQuestionnaireBusiness}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default ViewUpdateBusinessScreen
