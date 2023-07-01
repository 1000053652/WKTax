import React, { useEffect, useCallback } from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Spinner } from '../../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../../Common/LoaderStyle'

import { useTranslation } from 'react-i18next'
import { useFocusEffect } from '@react-navigation/native'
import Text from '../../../../theme/common/Text'

import { TextField } from '../../../../theme/common/TextInput/InputFormComponents'

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useLazyUpdateQuestionnaireBussinessQuery } from '../../../../../src/services/modules/questionnaireBusiness'
import { glbStyles } from '../../../../../src/styles/global'

const ViewUpdateBusinessScreen = ({ navigation, route }) => {
  const aboutYouUpdateNodeEntity = route?.params?.aboutYouUpdateNodeEntity

  const [updateQuestionnaireBussiness] =
    useLazyUpdateQuestionnaireBussinessQuery()

  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      notes: '',
    },
  })

  useFocusEffect(
    useCallback(() => {
      reset({
        notes: aboutYouUpdateNodeEntity?.notes,
      })
    }, [])
  )

  const { t } = useTranslation()

  const updateQuestionnaireAnnualUpdate: SubmitHandler<
    Record<string, string>
  > = async formdata => {
    const data = {
      notes: formdata?.notes,
    }

    const request = {
      endPoints: 'Notes',
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
      headerTitle: t('questionnaireBusiness:ANNUAL_UPDATE'),
      headerRight: () => (
        <TouchableOpacity
          onPress={handleSubmit(updateQuestionnaireAnnualUpdate)}
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

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <KeyboardAwareScrollView>
        <Spinner
          visible={false}
          textContent={t('common:LOADING')}
          size={'large'}
          textStyle={loaderStyle.spinnerTextStyle}
        />
        <View style={styles.emptyView} />
        <TextField
          isTextArea={true}
          control={control}
          styleTextBox={styles.textField}
          placeholder={''}
          name="notes"
          label={t(
            'questionnaireBusiness:PLEASE_LET_US_KNOW_OF_ANY_SIGNIFICANT_COMMA'
          )}
          max={500}
          defaultValue={aboutYouUpdateNodeEntity?.notes}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default ViewUpdateBusinessScreen
