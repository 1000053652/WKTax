import React from 'react'

import { View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import { Header } from 'react-native-elements'
import { useTranslation } from 'react-i18next'

import { Colors } from '../../../theme/constants'
import loaderStyle from '../../Common/LoaderStyle'
import { glbCustomerHeaderOptions, glbStyles } from '../../../styles/global'
import { TextField } from '../../../theme/common/TextInput/InputFormComponents'
import YesNoButton from '../../../theme/common/YesNoButton'
import Text from '../../../theme/common/Text'
import { Divider, Switch } from 'react-native-paper'
import styles from './styles'
import { store } from '../../../store'

export type MovingUIType = {
  aList: {}
  isRefresh: boolean
  isFetching: boolean
  disableAll: boolean
  YesNoCallback: any
  submitMiscIncomeExpensesDetailsFinish: any
  submitMiscIncomeExpensesDetailsDone: any
  showTextInputFirst: boolean
  showTextInputSecond: boolean
  showTextInputThird: boolean
  showTextInputFour: boolean
  showTextInputFive: boolean
  switchFirst: boolean
  switchSecond: boolean
  switchThird: boolean
  switchFour: boolean
  switchFive: boolean
  control: any
  onValueChangeFirst: void
  onValueChangeSecond: void
  onValueChangeThird: void
  onValueChangeFour: void
  onValueChangeFive: void
}

const EventUI = ({
  aList,
  isRefresh,
  isFetching,
  disableAll,
  YesNoCallback,
  submitMiscIncomeExpensesDetailsFinish,
  submitMiscIncomeExpensesDetailsDone,
  showTextInputFirst,
  showTextInputSecond,
  showTextInputThird,
  showTextInputFour,
  showTextInputFive,
  switchFirst,
  switchSecond,
  switchThird,
  switchFour,
  switchFive,
  control,
  onValueChangeFirst,
  onValueChangeSecond,
  onValueChangeThird,
  onValueChangeFour,
  onValueChangeFive,
}: MovingUIType) => {
  const { t } = useTranslation()

  const singleServiceListData = store.getState()?.home?.singleServiceListData

  const renderQuestions = ({ item }) => {
    return baseQestionItem(item)
  }

  const addSpace = (margin: number) => {
    return <View style={{ margin: margin ? margin : 5 }}></View>
  }

  const showTextAreaSwitchFirst = item => {
    return (
      <View>
        {addSpace(10)}
        <TextField
          isTextArea={true}
          placeholder=""
          control={control}
          name="firstText"
          label={item?.noteBoxTitle}
          testID="firstText"
        />
        <View style={{ flexDirection: 'row' }}>
          <Switch
            trackColor={{
              false: Colors.backgroundUploadHome,
              true: Colors.testColorBlue,
            }}
            thumbColor={Colors.white}
            style={{ margin: 10 }}
            value={switchFirst}
            onValueChange={onValueChangeFirst}
          />

          <Text
            stylesContainerText={{ marginVertical: 15 }}
            children={t('questionnaire:I_WILL_ATTACHE')}
            testID={'heading'}
          />
        </View>
        {addSpace(10)}
        <Divider />
      </View>
    )
  }

  const showTextAreaSwitchSecond = item => {
    return (
      <View>
        {addSpace(10)}
        <TextField
          isTextArea={true}
          placeholder=""
          control={control}
          name="secondText"
          label={item?.noteBoxTitle}
          testID="secondText"
        />
        <View style={{ flexDirection: 'row' }}>
          <Switch
            trackColor={{
              false: Colors.backgroundUploadHome,
              true: Colors.testColorBlue,
            }}
            thumbColor={Colors.white}
            style={{ margin: 10 }}
            value={switchSecond}
            onValueChange={onValueChangeSecond}
          />

          <Text
            stylesContainerText={{ marginVertical: 15 }}
            children={t('questionnaire:I_WILL_ATTACHE')}
            testID={'heading'}
          />
        </View>
        {addSpace(10)}
        <Divider />
      </View>
    )
  }

  const showTextAreaSwitchThird = item => {
    return (
      <View>
        {addSpace(10)}
        <TextField
          isTextArea={true}
          placeholder=""
          control={control}
          name="thirdText"
          label={item?.noteBoxTitle}
          testID="thirdText"
        />
        <View style={{ flexDirection: 'row' }}>
          <Switch
            trackColor={{
              false: Colors.backgroundUploadHome,
              true: Colors.testColorBlue,
            }}
            thumbColor={Colors.white}
            style={{ margin: 10 }}
            value={switchThird}
            onValueChange={onValueChangeThird}
          />

          <Text
            stylesContainerText={{ marginVertical: 15 }}
            children={t('questionnaire:I_WILL_ATTACHE')}
            testID={'heading'}
          />
        </View>
        {addSpace(10)}
        <Divider />
      </View>
    )
  }
  const showTextAreaSwitchFourth = item => {
    return (
      <View>
        {addSpace(10)}
        <TextField
          isTextArea={true}
          placeholder=""
          control={control}
          name="fourText"
          label={item?.noteBoxTitle}
          testID="fourtText"
        />
        <View style={{ flexDirection: 'row' }}>
          <Switch
            trackColor={{
              false: Colors.backgroundUploadHome,
              true: Colors.testColorBlue,
            }}
            thumbColor={Colors.white}
            style={{ margin: 10 }}
            value={switchFour}
            onValueChange={onValueChangeFour}
          />

          <Text
            stylesContainerText={{ marginVertical: 15 }}
            children={t('questionnaire:I_WILL_ATTACHE')}
            testID={'heading'}
          />
        </View>
        {addSpace(10)}
        <Divider />
      </View>
    )
  }
  const showTextAreaSwitchFive = item => {
    return (
      <View>
        {addSpace(10)}
        <TextField
          isTextArea={true}
          placeholder=""
          control={control}
          name="fiveText"
          label={item?.noteBoxTitle}
          testID="fiveText"
        />
        <View style={{ flexDirection: 'row' }}>
          <Switch
            trackColor={{
              false: Colors.backgroundUploadHome,
              true: Colors.testColorBlue,
            }}
            thumbColor={Colors.white}
            style={{ margin: 10 }}
            value={switchFive}
            onValueChange={onValueChangeFive}
          />

          <Text
            stylesContainerText={{ marginVertical: 15 }}
            children={t('questionnaire:I_WILL_ATTACHE')}
            testID={'heading'}
          />
        </View>
        {addSpace(10)}
        <Divider />
      </View>
    )
  }

  const baseQestionItem = item => {
    return (
      <View>
        {item?.headerTitle != '' ? (
          <Text
            stylesContainerText={styles.header}
            children={item?.headerTitle}
            testID={'heading'}
          />
        ) : null}

        {isRefresh && (
          <YesNoButton
            callback={YesNoCallback}
            apiKey={item.id}
            title={item.title}
            defaultValue={item?.answer}
          />
        )}
        {isRefresh && showTextInputFirst && item.id == '25012'
          ? showTextAreaSwitchFirst(item)
          : null}

        {isRefresh && showTextInputSecond && item.id == '25015'
          ? showTextAreaSwitchSecond(item)
          : null}

        {isRefresh && showTextInputThird && item.id == '25016'
          ? showTextAreaSwitchThird(item)
          : null}

        {isRefresh && showTextInputFour && item.id == '25017'
          ? showTextAreaSwitchFourth(item)
          : null}

        {isRefresh && showTextInputFive && item.id == '25021'
          ? showTextAreaSwitchFive(item)
          : null}
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

        <Text
          stylesContainerText={styles.header}
          children={
            t('questionnaireBusiness:IN') +
            ' ' +
            singleServiceListData?.taxYear +
            ' ' +
            t('questionnaire:DID_THE_BUSINESS')
          }
          testID={'heading'}
        />

        <FlatList
          data={aList}
          keyExtractor={item => item.id}
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

export default EventUI
