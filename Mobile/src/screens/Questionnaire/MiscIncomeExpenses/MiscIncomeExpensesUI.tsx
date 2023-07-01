import React from 'react'

import { View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import { Header } from 'react-native-elements'

import { Colors } from '../../../theme/constants'
import loaderStyle from '../../Common/LoaderStyle'
import { glbCustomerHeaderOptions, glbStyles } from '../../../styles/global'

import CommonDatePicker from '../../../../src/theme/common/CommonDatePicker'
import { NumberField, TextField } from '../../../theme/common/TextInput/InputFormComponents'
import { dateFormat } from '../General/Utils'
import { dateFormatPlaceHolder } from '../../AssetsScreen/Utils'
import YesNoButton from '../../../theme/common/YesNoButton'

import styles from './styles'
import Text from '../../../theme/common/Text'
import { useTranslation } from 'react-i18next'

export type MiscIncomeExpensesUIType = {
  aList: {}
  isRefresh: boolean
  isFetching: boolean
  disableAll: boolean
  YesNoCallback: any
  submitMiscIncomeExpensesDetailsFinish: any
  submitMiscIncomeExpensesDetailsDone: any
  showTextInput: boolean
  control: any
  isDone: string
}

const MiscIncomeExpensesUI = ({
  aList,
  isRefresh,
  isFetching,
  disableAll,
  YesNoCallback,
  submitMiscIncomeExpensesDetailsFinish,
  submitMiscIncomeExpensesDetailsDone,
  showTextInput,
  control,
  isDone,
}: MiscIncomeExpensesUIType) => {
  const { t } = useTranslation()

  const renderQuestions = ({ item }) => {
    switch (item.APIkey) {
      case 'IN_DID_YOU':
        return headerField(item)
        break
      case 'NavMiscellaneous':
      case 'ynoStateTaxRefund':
      case 'yno1099G':
      case 'ynoNewJob':
      case 'ynoTipIncome':
      case 'ynoDamageAward':
      case 'ynoBartering':
      case 'ynoMinisterialIncome':
      case 'ynoAlimony':
      case 'ynoGambling':
      case 'ynoInternetPurchases':
      case 'ynoHHEmployees':
      case 'ynoPYReturnChanges':
      case 'ynoSplitDollarLifeIns':
      case 'ynoTrustee':
      case 'ynoTrusteeDied':
      case 'ynoTaxShelter':
      case 'ynoloanForgiveness':
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
            ? item.title == t('questionnaire:NAVMISCELLANEOUS')
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
        item.title == t('questionnaire:YNOLOANFORGIVENESS') ? (
          <View>
            <Text
              children={t('questionnaire:LOAN_FORGIVENESS_DENIED_NOT_TO_SEEK')}
              testID="text_input_denied_not_to_seek"
              stylesContainerText={styles.textInputLabel}
            />
            <CommonDatePicker
              control={control}
              name={'datLoanDeniedDate'}
              containerStyle={styles.datePickerContrainer}
              maximumDate={new Date()}
              title={t('questionnaire:LOAN_RECEIVED')}
              dateFormat={dateFormat}
              testId="date_picker_general"
              placeholderText={dateFormatPlaceHolder}
            />
            <NumberField
              fieldType='currency'
              placeholder=""
              control={control}
              name={'curLoanDeniedAmt'}
              label={t('questionnaire:LOAN_AMOUNT')}
              keyboardType="number-pad"
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

export default MiscIncomeExpensesUI
