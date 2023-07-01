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
import { formatCurrency } from '../../../theme/common/TextInput/utils'
import { maxLengthOtherDescription } from '../../../theme/constants'
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
      incomeAmount: formdata.incomeAmount,
      prior: item?.['Prior Year'],
      id: item?.id,
    }

    onPressSave(inputData)
  }
  const addSpace = (margin: number) => {
    return <View style={{ margin: margin ? margin : 5 }}></View>
  }
  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <View>
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
          {addSpace(10)}
          <TextField
            placeholder=""
            control={control}
            name="incomeDescription"
            label={t('income:DESCRIPTION')}
            defaultValue={item?.Description}
            max={maxLengthOtherDescription}
          />
          <View style={styles.viewIconOther}>
            {addSpace(10)}
            <NumberField
              fieldType={'currency'}
              placeholder=""
              control={control}
              name="incomeAmount"
              label={taxYear + ' ' + t('income:AMOUNT_SMALL')}
              defaultValue={formatCurrency(item?.Amount, true)}
            />
          </View>

          <View style={styles.viewIconOther}>
            {addSpace(10)}
            <NumberField
              fieldType={'currency'}
              placeholder=""
              control={control}
              name="incomePriorAmount"
              label={t('income:PRIOR_YEAR_AMOUNT')}
              defaultValue={formatCurrency(item?.['Prior Year'], true)}
              disabled={true}
              editable={false}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  )
}
export default AddIncomeModal
