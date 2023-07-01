import React from 'react'
import { View, SafeAreaView, ScrollView } from 'react-native'
import { t } from 'i18next'
import Button from '../../../theme/common/Button'
import styles from './styles'
import {
  NumberField,
  TextField,
} from '../../../theme/common/TextInput/InputFormComponents'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
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
      begInventory: formdata.begInventory,
      costOfItem: formdata.costOfItem,
      sales: formdata.sales,
      endInventory: formdata.endInventory,
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
          required
          max={maxLengthOtherDescription}
        />
        <NumberField
          fieldType={'currency'}
          placeholder=""
          control={control}
          name="begInventory"
          label={t('income:BEGINNING_INVENTORY')}
          defaultValue={formatCurrency(item?.['Beginning Inventory'], true)}
        />

        <NumberField
          fieldType={'currency'}
          placeholder=""
          control={control}
          name="costOfItem"
          label={t('income:COST_OF_ITEMS_PURCHASED')}
          defaultValue={formatCurrency(item?.['Cost of items purchased'], true)}
        />
        <NumberField
          fieldType={'currency'}
          placeholder=""
          control={control}
          name="sales"
          label={t('income:SALES')}
          defaultValue={formatCurrency(item?.Sales, true)}
        />
        <NumberField
          fieldType={'currency'}
          placeholder=""
          control={control}
          name="endInventory"
          label={t('income:ENDING_INVENTORY')}
          defaultValue={formatCurrency(item?.['Ending Inventory'], true)}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default AddIncomeModal
