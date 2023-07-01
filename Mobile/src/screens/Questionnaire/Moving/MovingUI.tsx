import React from 'react'

import { View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import { Header } from 'react-native-elements'
import { useTranslation } from 'react-i18next'

import { Colors } from '../../../theme/constants'
import loaderStyle from '../../Common/LoaderStyle'
import { glbCustomerHeaderOptions, glbStyles } from '../../../styles/global'
import {
  NumberField,
  TextField,
  ZipCodeField,
} from '../../../theme/common/TextInput/InputFormComponents'
import YesNoButton from '../../../theme/common/YesNoButton'
import Text from '../../../theme/common/Text'

import styles from './styles'

export type MovingUIType = {
  aList: {}
  isRefresh: boolean
  isFetching: boolean
  disableAll: boolean
  YesNoCallback: any
  submitMiscIncomeExpensesDetailsFinish: () => void
  submitMiscIncomeExpensesDetailsDone: () => void
  showTextInput: boolean
  control: any
}

const MovingUI = ({
  aList,
  isRefresh,
  isFetching,
  disableAll,
  YesNoCallback,
  submitMiscIncomeExpensesDetailsFinish,
  submitMiscIncomeExpensesDetailsDone,
  showTextInput,
  control,
}: MovingUIType) => {
  const { t } = useTranslation()

  const renderQuestions = ({ item }) => {
    switch (item.APIkey) {
      case 'IN_DID_YOU':
        return headerField(item)
        break
      case 'NavMoving':
      case 'ynoChangeAddress':
      case 'ynoTotalMortgage':
      case 'ynoMoveDiffHome':
      case 'ynoSellHome':
      case 'ynoHomeBuyerCredit':
      case 'ynoIRAPrincipalRes':
      case 'ynoEquityLoan':
      case 'ynoMortIntPdNo1098':
      case 'ynoRecMortAssistance':
        return baseQestionItem(item)
        break
    }
  }

  const headerField = item => {
    return (
      <View style={styles.headerFieldView}>
        <Text
          stylesContainerText={styles.headerField}
          children={item.title}
          testID={'misc_header'}
        />
      </View>
    )
  }

  const baseQestionItem = item => {
    return (
      <View
        pointerEvents={
          disableAll
            ? item.title == t('questionnaire:NAVMOVING')
              ? 'auto'
              : 'none'
            : 'auto'
        }
      >
        {isRefresh && (
          <YesNoButton
            callback={YesNoCallback}
            apiKey={item.APIkey}
            title={item.title}
            defaultValue={item?.value}
          />
        )}
        {isRefresh &&
        showTextInput &&
        item.title == t('questionnaire:YNOMOVEDIFFHOME') ? (
          <View>
            <Text
              children={t('questionnaire:MILAGE_BETWEEN_PREVIOUS_HOME')}
              testID="text_input_denied_not_to_seek"
              stylesContainerText={styles.textInputLabel}
            />
            <ZipCodeField
              placeholder=""
              control={control}
              name={'numNewWorkPlace'}
              label={t('questionnaire:NUMNEWWORKPLACE')}
              max={7}
            />
            <ZipCodeField
              placeholder=""
              control={control}
              name={'numoldWorkPlace'}
              label={t('questionnaire:MUMOLDWORKPLACE')}
              max={7}
            />
            <YesNoButton
              callback={YesNoCallback}
              apiKey={aList[11].APIkey}
              title={aList[11].title}
              defaultValue={aList[11].value}
            />
          </View>
        ) : null}
      </View>
    )
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
    
      <KeyboardAwareScrollView>
        <Spinner
          visible={isFetching}
          textContent={t('common:LOADING')}
          size={'large'}
          textStyle={loaderStyle.spinnerTextStyle}
        />

        <FlatList
          data={aList}
          keyExtractor={item => item.APIkey}
          renderItem={renderQuestions}
          refreshing={isRefresh}
        />
      </KeyboardAwareScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.finishLaterButtonContainer,
            {
              backgroundColor: Colors.white,
            },
          ]}
          onPress={submitMiscIncomeExpensesDetailsFinish}
        >
          <Text
            stylesContainerText={{
              color: Colors.black,
            }}
            testID="Finish_Later"
          >
            {t('common:FINISH_LATER')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.doneButtonContainer,
            {
              backgroundColor: Colors.testColorBlue,
            },
          ]}
          onPress={submitMiscIncomeExpensesDetailsDone}
        >
          <Text
            stylesContainerText={{
              color: Colors.white,
            }}
            testID="Done"
          >
            {t('common:DONE')}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default MovingUI
