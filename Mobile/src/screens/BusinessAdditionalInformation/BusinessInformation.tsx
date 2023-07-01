import React from 'react'
import { View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import Text from '../../theme/common/Text'
import styles from './style'
import { Spinner } from '../../theme/common/Spinner/Spinner'
import loaderStyle from '../../screens/Common/LoaderStyle'
import { Divider } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import {
  NumberField,
  TextField,
} from '../../theme/common/TextInput/InputFormComponents'
import { Colors } from '../../theme/constants'
import { Controller } from 'react-hook-form'
import { YNOSegmentedControl } from '../../theme/common/index'
import { glbStyles } from '../../../src/styles/global'

const BusinessInformation = ({
  isAsstesData,
  control,
  autoFillData,
  isSelected,
  handleSubmit,
  submitProfile,
  onError,
}) => {
  const { t } = useTranslation()

  const renderItem = item => {
    switch (item?.item?.questionType) {
      case 'sectionHeader':
        return (
          <View style={styles.sectionView}>
            <Text
              stylesContainerText={styles.sectionText}
              children={item?.item?.text}
              testID="dependent_list_item"
            />
          </View>
        )
      case 'amount':
        return (
          <View style={styles.textInputView}>
            <Text
              stylesContainerText={styles.dependentTitleItem}
              children={item?.item?.text}
              testID="dependent_list_item"
            />
            <NumberField
              control={control}
              max={6}
              min={6}
              fieldType={'currency'}
              name={item?.item?.questionId}
              testID="Taxpayer_issued_PIN"
            />
          </View>
        )
      case 'text':
        return (
          <View style={styles.textInputView}>
            <Text
              stylesContainerText={styles.dependentTitleItem}
              children={item?.item?.text}
              testID="dependent_list_item"
            />
            <TextField control={control} name={item?.item?.questionId} />
          </View>
        )
      case 'yesNo':
        return (
          <View style={styles.yesNoBack}>
            <Controller
              control={control}
              name={`${item?.item?.questionId}`}
              render={({ field: { onChange, value } }) => {
                const ans = value as string
                return (
                  <YNOSegmentedControl
                    title={item?.item?.text}
                    value={ans}
                    yesValue={'Y'}
                    noValue={'N'}
                    onValueChange={value => onChange(value)}
                  />
                )
              }}
            />
          </View>
        )
    }
  }
  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Spinner
        visible={isAsstesData}
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <Divider />
      <FlatList
        data={autoFillData}
        renderItem={renderItem}
        extraData={isAsstesData}
        keyExtractor={item => item?.questionId}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.finishLaterButtonContainer,
            {
              backgroundColor: isSelected ? Colors.white : Colors.testColorBlue,
            },
          ]}
          onPress={handleSubmit(
            data => submitProfile(data, false),
            errors => onError(errors)
          )}
        >
          <Text
            stylesContainerText={{
              color: isSelected ? Colors.black : Colors.white,
            }}
            children={'Finish Later'}
            testID="dependent_list_item"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.doneButtonContainer,
            {
              backgroundColor: isSelected ? Colors.testColorBlue : Colors.white,
            },
          ]}
          onPress={handleSubmit(
            data => submitProfile(data, true),
            errors => onError(errors)
          )}
        >
          <Text
            stylesContainerText={{
              color: isSelected ? Colors.white : Colors.black,
            }}
            children={'Done'}
            testID="dependent_list_item"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
export default BusinessInformation
