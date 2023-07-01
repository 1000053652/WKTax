import React from 'react'
import { View, SafeAreaView } from 'react-native'
import { t } from 'i18next'
import Button from '../../../theme/common/Button'
import styles from './styles'
import {
  NumberField,
  TextField,
} from '../../../theme/common/TextInput/InputFormComponents'
import { SubmitHandler, useForm } from 'react-hook-form'
import { formatCurrency } from '../../../../src/theme/common/TextInput/utils'
import { maxLengthOtherDescription } from '../../../../src/theme/constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Text from '../../../theme/common/Text'
import { glbStyles } from '../../../../src/styles/global'

const AddIncomeModal = ({
  onPressCancel,
  onPressSave,
  title,
  taxYear,
  item,
}) => {
  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
  })

  const submitProfile: SubmitHandler<
    Record<string, string>
  > = async formdata => {
    const inputData = {
      incomeDescription: formdata.incomeDescription,
      amount: formdata.amount,
      costOfOtherBasic: formdata.costOfOtherBasic,
      prior: item?.['Prior Year'],
      prior2: item?.['Prior Year2'],
      id: item?.id,
    }

    onPressSave(inputData)
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <View style={styles.headerViewStyle}>
        <View style={styles.headerViewStyleRow}>
          <Button
            title={t('common:CANCEL')}
            onPress={onPressCancel}
            stylesContainer={styles.buttonCancelSaveStyle}
            stylesContainerText={styles.buttonCancelSaveTextStyle}
            testID="income_cancel"
          />
        </View>

        <Text
          children={title}
          stylesContainerText={styles.buttonCancelSaveStyle2}
          testID="income_schedule_c"
          numberOfLines={1}
        />

        <View style={styles.headerViewStyleRow}>
          <Button
            title={t('common:SAVE')}
            onPress={handleSubmit(submitProfile)}
            stylesContainer={styles.buttonCancelSaveStyleRight}
            stylesContainerText={styles.buttonCancelSaveTextStyleRight}
            testID="income_save"
          />
        </View>
      </View>

      <KeyboardAwareScrollView>
        <View style={styles.horizontalLine} />
        <TextField
          placeholder=""
          control={control}
          name="incomeDescription"
          label={t('income:DESCRIPTION')}
          defaultValue={item?.Description}
          max={maxLengthOtherDescription}
        />
        <NumberField
          fieldType={'currency'}
          placeholder=""
          control={control}
          name="amount"
          label={t('income:AMOUNT_RECEIVED')}
          defaultValue={formatCurrency(item?.['Amount'], true)}
        />

        <NumberField
          fieldType={'currency'}
          placeholder=""
          control={control}
          name="costOfOtherBasic"
          label={t('income:COST_OR_OTHER_BASIS')}
          defaultValue={formatCurrency(item?.['Cost of other basis'], true)}
        />

        <NumberField
          fieldType={'currency'}
          placeholder=""
          control={control}
          name="Prior Year"
          label={t('income:PRIOR_YEAR_(AMOUNT)')}
          defaultValue={formatCurrency(item?.['Prior Year'], true)}
          disabled={true}
          editable={false}
        />

        <NumberField
          fieldType={'currency'}
          placeholder=""
          control={control}
          name="Prior Year2"
          label={t('income:PRIOR_YEAR_(COST)')}
          defaultValue={formatCurrency(item?.['Prior Year2'], true)}
          disabled={true}
          editable={false}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default AddIncomeModal
