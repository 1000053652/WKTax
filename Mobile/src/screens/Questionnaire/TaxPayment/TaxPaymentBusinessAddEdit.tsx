import React from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import styles from '../styles'
import loaderStyle from '../../Common/LoaderStyle'
import { useTranslation } from 'react-i18next'
import CommonDatePicker, { dateFormatPlaceFolder } from '../../../theme/common/CommonDatePicker'
import { dateFormat } from '../../VehicleScreen/AddEdit/utils'
import { Header } from 'react-native-elements'
import Text from '../../../theme/common/Text'
import {
  NumberField,
  TextField,
} from '../../../theme/common/TextInput/InputFormComponents'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CheckBox from '@react-native-community/checkbox'
import { states } from '../../../services/constants/ConstantsData'
import { TaxPaymentType } from './utils'
import useTaxPaymentBusinessAddEditHook from './hooks/useTaxPaymentBusinessAddEditHook'
import { CustomDropdown } from '../../../../src/theme/common/CustomDropdown'
import { glbCustomerHeaderOptions, glbStyles } from '../../../../src/styles/global'
const TaxPaymentBusinessAddEdit = ({
  navigation,
  route,
}: ApplicationScreenProps) => {
  const { t } = useTranslation()
  const {
    taxPaymentType,
    errors,
    control,
    handleSubmit,
    isForEdit,
    checkboxListener,
    isSelectedOverPayment,
    isSelectedPayWithExt,
    isFetching,
    backClick,
    saveDetails,
    onError,
    refreshPage,
  } = useTaxPaymentBusinessAddEditHook(navigation, route)

  const checkError = (forAmt: boolean, forState: boolean, forCity: boolean) => {
    if (forAmt) {
      if (
        errors.curPaymentAmount?.message?.length != undefined ||
        errors.curStatePaymentAmount?.message?.length != undefined ||
        errors.curCityPaymentAmount?.message?.length != undefined
      ) {
        return t('error:AMOUNT_ERROR')
      } else {
        return ''
      }
    } else if (forState && errors.txtState?.message?.length != undefined) {
      return t('error:STATE_ERROR')
    }  else if (forCity && errors.txtState?.message?.length != undefined) {
      return t('error:CITY_ERROR')
    }else {
      return ''
    }
  }






  const renderContent = () => {
    return (
      <View>
        {taxPaymentType == TaxPaymentType.State && (
          <CustomDropdown
            error={checkError(false,true,false)}
            containerStyle={styles.dropDownContainer}
            control={control}
            name="txtState"
            label={t('questionnaire:STATE')}
            data={states}
            required
            dropdownKey={'key'}
          />
        )}

        {taxPaymentType == TaxPaymentType.City && (
          <TextField
            placeholder=""
            control={control}
            required
            max={10}
            name={'txtState'}
            label={t('taxpayment:CITY_STATE')}
            error={checkError(false,false,true)}
            styleTextBox={styles.containerStyle}
            
          />
        )}

        <CommonDatePicker
          control={control}
          name={taxPaymentType === TaxPaymentType.Federal
            ? 'datFedPaymentDate'
            : taxPaymentType === TaxPaymentType.State
            ? 'datStatePaymentDate'
            : taxPaymentType === TaxPaymentType.City
            ? 'datCityPaymentDate' : ''
          }
          containerStyle={styles.datePickerContrainer}
          maximumDate={new Date()}
          title={t('taxpayment:DATE_SMALL')}
          dateFormat={dateFormat}
          testId="date_picker_general"
          required
          placeholderText={dateFormatPlaceFolder}
        />

        <NumberField
          placeholder=""
          control={control}
          required
          name={ taxPaymentType === TaxPaymentType.Federal
              ? 'curPaymentAmount'
              : taxPaymentType === TaxPaymentType.State
              ? 'curStatePaymentAmount'
              : taxPaymentType === TaxPaymentType.City
              ? 'curCityPaymentAmount'
              : ''}
          label={t('taxpayment:AMOUNT_SMALL')}
          error={checkError(true,false,false)}
          styleTextBox={styles.containerStyle}
          fieldType={'currency'}
        />
        <Text
          stylesContainerText={styles.checkIfText}
          testID="question_answer_text_id"
          children={t('taxpayment:CHECK_IF')}
        />
        <View style={styles.horizontalLine} />

        <View style={styles.checkBoxViewStyle}>
          <TouchableOpacity onPress={() => checkboxListener(1)}>
            <Text
              children={t('taxpayment:CHECKBX1')}
              stylesContainerText={styles.checkboxTextStyle}
              testID="questionnaire_main_name"
            />
          </TouchableOpacity>

          <CheckBox
            value={isSelectedOverPayment}
            onValueChange={() => checkboxListener(1)}
            style={styles.checkboxStyle}
            boxType="square"
          />
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.checkBoxViewStyle}>
          <TouchableOpacity onPress={() => checkboxListener(2)}>
            <Text
              children={t('taxpayment:CHECKBX2')}
              stylesContainerText={styles.checkboxTextStyle}
              testID="questionnaire_main_name"
            />
          </TouchableOpacity>

          <CheckBox
            value={isSelectedPayWithExt}
            onValueChange={() => checkboxListener(2)}
            style={styles.checkboxStyle}
            boxType="square"
          />
        </View>

        <View style={styles.horizontalLine} />
      </View>
    )
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Spinner
        visible={isFetching}
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <Header
      statusBarProps={glbCustomerHeaderOptions}
        leftComponent={
          <TouchableOpacity onPress={backClick}>
            <Text
              testID="header_back_from_home_office_edit"
              stylesContainerText={styles.headerButtonText}
            >
              {t('common:CANCEL')}
            </Text>
          </TouchableOpacity>
        }
        centerComponent={
          <View>
            <Text
              testID="header_home_office_item"
              stylesContainerText={styles.headerSubTitle}
              numberOfLines={1}
              ellipsize={'tail'}
            >
              {!isForEdit
                ? taxPaymentType === TaxPaymentType.Federal
                  ? t('taxpayment:ADD_FEDERAL_TAX')
                  : taxPaymentType === TaxPaymentType.State
                  ? t('taxpayment:ADD_STATE_TAX')
                  : taxPaymentType === TaxPaymentType.City
                  ? t('taxpayment:ADD_CITY_TAX')
                  : ''
                : taxPaymentType === TaxPaymentType.Federal
                ? t('taxpayment:EDIT_FEDERAL_TAX')
                : taxPaymentType === TaxPaymentType.State
                ? t('taxpayment:EDIT_STATE_TAX')
                : taxPaymentType === TaxPaymentType.City
                ? t('taxpayment:EDIT_CITY_TAX')
                : ''}
            </Text>
          </View>
        }
        rightComponent={
          <TouchableOpacity onPress={handleSubmit(saveDetails, onError)}>
            <Text
              testID="header_home_office_save"
              stylesContainerText={styles.headerButtonText}
            >
              {t('common:SAVE')}
            </Text>
          </TouchableOpacity>
        }
        containerStyle={styles.headerContainer}
      />
      <KeyboardAwareScrollView style={styles.container}>
        <View>
          {refreshPage && renderContent()}
          {!isForEdit && renderContent()}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default TaxPaymentBusinessAddEdit
