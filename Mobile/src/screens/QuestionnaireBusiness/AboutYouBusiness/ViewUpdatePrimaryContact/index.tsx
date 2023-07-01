import React, { useState, useEffect, useCallback } from 'react'
import { SafeAreaView, FlatList, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Spinner } from '../../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../../../screens/Common/LoaderStyle'
import {
  questionnairePrimaryContactData,
  questionnairePrimayContactType,
} from './utils'
import { useTranslation } from 'react-i18next'
import { useFocusEffect } from '@react-navigation/native'
import Text from '../../../../theme/common/Text'
import { Switch } from 'react-native-paper'

import {
  NumberField,
  TextField,
} from '../../../../theme/common/TextInput/InputFormComponents'

import { useLazyUpdateQuestionnaireBussinessQuery } from '../../../../../src/services/modules/questionnaireBusiness'

import { useForm } from 'react-hook-form'
import { Colors } from '../../../../../src/theme/constants'
import { glbStyles } from '../../../../../src/styles/global'

let isBusinessPhoneToggle = false
let isMobilePhoneToggle = false

const ViewUpdateBusinessScreen = ({ navigation, route }) => {
  const aboutYouPrimaryContactEntity =
    route?.params?.aboutYouPrimaryContactEntity

  const [isBusinessPEnabled, setIsBusinessPEnabled] = useState(false)
  const [isMobilePEnabled, setIsMobilePEnabled] = useState(false)
  const [updateQuestionnaireBussiness] =
    useLazyUpdateQuestionnaireBussinessQuery()

  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      title: '',
      email: '',
      phone: '',
      mobile: '',
    },
  })

  useFocusEffect(
    useCallback(() => {
      reset({
        firstName: aboutYouPrimaryContactEntity?.firstName,
        lastName: aboutYouPrimaryContactEntity?.lastName,
        title: aboutYouPrimaryContactEntity?.title,
        email: aboutYouPrimaryContactEntity?.email,
        phone: aboutYouPrimaryContactEntity?.phone,
        mobile: aboutYouPrimaryContactEntity?.mobile,
      })

      if (aboutYouPrimaryContactEntity?.phonePreferred == '1') {
        setIsBusinessPEnabled(true)
      }

      if (aboutYouPrimaryContactEntity?.mobilePreferred == '1') {
        setIsMobilePEnabled(true)
      }
    }, [])
  )

  const { t } = useTranslation()

  const updateQuestionnairePrimaryContact = async (
    formdata: Record<string, string>,
    isBusinessPEnabled1: boolean,
    isMobilePEnabled1: boolean
  ) => {
    const data = {
      businessId: aboutYouPrimaryContactEntity?.businessId,
      firstName: formdata?.firstName,
      lastName: formdata?.lastName,
      title: formdata?.title,
      email: formdata?.email,
      phone: formdata?.phone,
      mobile: formdata?.mobile,
      phonePreferred: isBusinessPhoneToggle ? 1 : 0,
      mobilePreferred: isMobilePhoneToggle ? 1 : 0,
    }

    const request = {
      endPoints: 'Contact',
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
      headerTitle: t('questionnaireBusiness:PRIMARY_CONTACT'),
      headerRight: () => (
        <TouchableOpacity
          onPress={handleSubmit(data =>
            updateQuestionnairePrimaryContact(
              data,
              isBusinessPEnabled,
              isMobilePEnabled
            )
          )}
        >
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
    if (value == 'firstName' || value == 'lastName') {
      maxLengh = 25
    }
    if (value == 'title') {
      maxLengh = 23
    }
    if (value == 'email') {
      maxLengh = 50
    }
    if (value == 'phone' || value == 'mobile') {
      maxLengh = 12
    }

    return maxLengh
  }

  const PrimacyContactTextFieldsUI = (item: questionnairePrimayContactType) => {
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

  const CheckBoxBusinessPhoneUI = item => {
    return (
      <View>
        <Text
          children={t('questionnaireBusiness:PREFERREDPHONE')}
          stylesContainerText={styles.prefferedLabelStyle}
          testID="11"
        />

        <View style={styles.primaryContactCheckBoxUIStyle}>
          <NumberField
            placeholder=""
            control={control}
            name={item.APIkey}
            label={item.title}
            error={''}
            required={false}
            max={getMaxLength(item.APIkey)}
          />

          <Switch
            trackColor={{
              false: Colors.backgroundUploadHome,
              true: Colors.testColorBlue,
            }}
            thumbColor={Colors.white}
            onValueChange={businessToggleSwitch}
            value={isBusinessPEnabled}
            style={styles.radiobtnContainerStyle}
          />
        </View>
      </View>
    )
  }

  const CheckBoxMobilePhoneUI = item => {
    return (
      <View style={styles.primaryContactCheckBoxUIStyle}>
        <NumberField
          placeholder=""
          control={control}
          name={item.APIkey}
          label={item.title}
          error={''}
          required={false}
          max={getMaxLength(item.APIkey)}
        />

        <Switch
          trackColor={{
            false: Colors.backgroundUploadHome,
            true: Colors.testColorBlue,
          }}
          thumbColor={Colors.white}
          onValueChange={mobileToggleSwitch}
          value={isMobilePEnabled}
          style={styles.radiobtnContainerStyle}
        />
      </View>
    )
  }

  const businessToggleSwitch = () => {
    setIsBusinessPEnabled(!isBusinessPEnabled)

    setIsMobilePEnabled(false)
    isBusinessPhoneToggle = true
    isMobilePhoneToggle = false
  }

  const mobileToggleSwitch = () => {
    setIsMobilePEnabled(!isMobilePEnabled)
    isMobilePhoneToggle = true
    isBusinessPhoneToggle = false

    setIsBusinessPEnabled(false)
  }

  const renderQuestionnaireBusiness = ({ item }) => {
    switch (item.APIkey) {
      case 'firstName':
      case 'lastName':
      case 'title':
      case 'email':
        return PrimacyContactTextFieldsUI(item)
      case 'phone':
        return CheckBoxBusinessPhoneUI(item)
      case 'mobile':
        return CheckBoxMobilePhoneUI(item)
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
          data={questionnairePrimaryContactData}
          renderItem={renderQuestionnaireBusiness}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default ViewUpdateBusinessScreen
