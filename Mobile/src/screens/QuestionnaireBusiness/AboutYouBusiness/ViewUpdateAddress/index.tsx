import React, { useState, useEffect, useCallback } from 'react'
import { SafeAreaView, FlatList, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Spinner } from '../../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../../../screens/Common/LoaderStyle'
import { questionnaireAddressData, questionnaireBusinessType } from './utils'
import { states } from '../../../../services/constants/ConstantsData'
import { useTranslation } from 'react-i18next'
import { useFocusEffect } from '@react-navigation/native'
import Text from '../../../../theme/common/Text'
import {
  TextField,
  NumberField,
} from '../../../../theme/common/TextInput/InputFormComponents'
import CommonDatePicker from '../../../../theme/common/CommonDatePicker'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import {
  dateFormat,
  dateFormatPlaceHolder,
  getStateName,
} from '../../.././../../src/theme/constants'

import { useLazyUpdateQuestionnaireBussinessQuery } from '../../../../../src/services/modules/questionnaireBusiness'
import { CustomDropdown } from '../../../../../src/theme/common/CustomDropdown'
import { glbStyles } from '../../../../../src/styles/global'

const ViewUpdateAddress = ({ navigation, route }) => {
  const aboutYouAddressEntity = route?.params?.aboutYouAddressEntity
  const [selectedState, setSelectedState] = useState('')

  const [updateQuestionnaireBussiness] =
    useLazyUpdateQuestionnaireBussinessQuery()

  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      foreignProvince: '',
      foreignCountry: '',
      foreignPostalCode: '',
    },
  })

  useFocusEffect(
    useCallback(() => {
      reset({
        street: aboutYouAddressEntity?.street,
        city: aboutYouAddressEntity?.city,
        state: aboutYouAddressEntity?.state,
        zipCode: aboutYouAddressEntity?.zipCode,
        foreignProvince: aboutYouAddressEntity?.foreignProvince,
        foreignCountry: aboutYouAddressEntity?.foreignCountry,
        foreignPostalCode: aboutYouAddressEntity?.foreignPostalCode,
      })

      setSelectedState(aboutYouAddressEntity?.state)
    }, [])
  )

  const { t } = useTranslation()

  const updateQuestionnaireAddress: SubmitHandler<
    Record<string, string>
  > = async formData => {
    const data = {
      businessId: aboutYouAddressEntity?.businessId,
      street: formData?.street,
      city: formData?.city,
      state: formData?.state,
      zipCode: formData?.zipCode,
      foreignCountry: formData?.foreignCountry,
      foreignProvince: formData?.foreignProvince,
      foreignPostalCode: formData?.foreignPostalCode,
    }

    const request = {
      endPoints: 'Address',
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
      headerTitle: t('questionnaireBusiness:ADDRESS'),
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit(updateQuestionnaireAddress)}>
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

  const getMaxLength = value => {
    let maxLengh = 0
    if (value == 'street') {
      maxLengh = 45
    }
    if (value == 'city') {
      maxLengh = 40
    }
    if (value == 'zipCode') {
      maxLengh = 10
    }
    if (value == 'foreignProvince' || value == 'foreignCountry') {
      maxLengh = 17
    }
    if (value == 'foreignPostalCode') {
      maxLengh = 16
    }

    return maxLengh
  }
  const AddressTextFieldsUI = (item: questionnaireBusinessType) => {
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
          max={getMaxLength(item.APIkey)}
        />
      </View>
    )
  }

  const AddressDropDownFieldsUI = (item: questionnaireBusinessType) => {
    return (
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
    )
  }

  const renderQuestionnaireAddress = ({ item }) => {
    switch (item.APIkey) {
      case 'street':
      case 'city':
      case 'zipCode':
      case 'foreignProvince':
      case 'foreignCountry':
      case 'foreignPostalCode':
        return AddressTextFieldsUI(item)

      case 'state':
        return AddressDropDownFieldsUI(item)

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
          data={questionnaireAddressData}
          renderItem={renderQuestionnaireAddress}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default ViewUpdateAddress
