import React, { useState, useEffect } from 'react'
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native'
import Text from '../../../theme/common/Text'
import styles from '../style'
import {
  NumberField,
  TextField,
} from '../../../theme/common/TextInput/InputFormComponents'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import { Header } from 'react-native-elements'
import { useLazyGetAsstesDeleteTilesQuery } from '../../../services/modules/Assets'
import CommonDatePicker from '../../../theme/common/CommonDatePicker'
import { dateFormat, dateFormatPlaceHolder } from '../Utils'
import { useTranslation } from 'react-i18next'
import { formatCurrency } from '../../../theme/common/TextInput/utils'
import { errorMessageToast } from '../../Error/utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { glbCustomerHeaderOptions, glbStyles } from '../../../../src/styles/global'

const AddViewAssets = ({ navigation, route }: ApplicationScreenProps) => {
  const [getAsstesDeleteTiles] = useLazyGetAsstesDeleteTilesQuery()
  const isEdit: boolean = route?.params?.item
  const [autoFillData, setAUtoFillData] = useState(
    isEdit ? route?.params?.item : {}
  )
  const [autoFillDataValue] = useState(route?.params?.dataValue)

  const { t } = useTranslation()

  const { control, handleSubmit, reset, getValues } = useForm({
    mode: 'onBlur',
    defaultValues: {
      Description: '',
      'Cost or Other Basis': '',
      'Date In Service': '',
      'Selling Price': '',
      'Date Sold': '',
    },
  })
  useEffect(() => {
    if (isEdit) {
      const dataValue = route?.params?.item
      dataValue['Selling Price'] = formatCurrency(
        dataValue['Selling Price'],
        true
      )
      dataValue['Cost or Other Basis'] = formatCurrency(
        dataValue['Cost or Other Basis'],
        true
      )
      setAUtoFillData(dataValue)
      reset(dataValue)
    }
  }, [])

  const submitProfile: SubmitHandler<
    Record<string, string>
  > = async formdata => {
    const payload = {
      data: {
        isDirty: 'true',
        pageCode: autoFillDataValue?.pageCode,
        entityid: autoFillDataValue?.entityid,
        gridCode: autoFillDataValue?.gridCode,
      },
      grids: [
        {
          data: [
            {
              Description: formdata.Description,
              'Cost or Other Basis': formdata['Cost or Other Basis'],
              'Date In Service': formdata['Date In Service'],
              'Selling Price': formdata['Selling Price'],
              'Date Sold': formdata['Date Sold'],
              'X If Not New': '',
              id: isEdit ? autoFillData.id : 'new',
            },
          ],
        },
      ],
    }

    getAsstesDeleteTiles(payload)
      .unwrap()
      .then(() => navigation.goBack())
      .catch(error => {
        console.error('error', error)
        errorMessageToast(error)
      })
  }

  const onError: SubmitErrorHandler<Record<string, string>> = errors => {
    console.error(t('task:Error'), errors)
    navigation.goBack()
  }

  const headerView = () => {
    return (
      <Header
        statusBarProps={glbCustomerHeaderOptions}
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              testID="header_cancel"
              stylesContainerText={styles.headerButtonText}
            >
              {t('common:CANCEL')}
            </Text>
          </TouchableOpacity>
        }
        centerComponent={
          <View>
            <Text
              testID="header_screen_title"
              stylesContainerText={styles.headerTitle}
            >
              {isEdit ? t('task:Edit_Asset') : t('task:Add')}
            </Text>
          </View>
        }
        rightComponent={
          <TouchableOpacity onPress={handleSubmit(submitProfile, onError)}>
            <Text
              testID="header_save"
              stylesContainerText={styles.headerButtonText}
            >
              {t('common:SAVE')}
            </Text>
          </TouchableOpacity>
        }
        containerStyle={styles.headerContainer}
      />
    )
  }
  const resetValue = (type: number) => {
    switch (type) {
      case 1:
        reset({
          'Date In Service': '',
          Description: getValues('Description'),
          'Cost or Other Basis': getValues('Cost or Other Basis'),
          'Selling Price': getValues('Selling Price'),
          'Date Sold': getValues('Date Sold'),
        })
        break
      case 2:
        reset({
          'Date In Service': getValues('Date In Service'),
          Description: getValues('Description'),
          'Cost or Other Basis': getValues('Cost or Other Basis'),
          'Selling Price': getValues('Selling Price'),
          'Date Sold': '',
        })
        break
    }
  }
  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      {headerView()}
      <KeyboardAwareScrollView>
        <View style={styles.mainViewStyle}>
          <View style={styles.horizontalLine2} />
          <View style={styles.horizontalLine}>
            <TextField
              placeholder={t('task:Name')}
              control={control}
              name="Description"
              label={t('task:Asset')}
              max={76}
            />
          </View>
          <View style={styles.horizontalLine}>
            <CommonDatePicker
              control={control}
              name={t('task:DateIn')}
              containerStyle={styles.datePickerContrainer}
              maximumDate={new Date()}
              title={t('task:Purchase')}
              dateFormat={dateFormat}
              placeholderText={dateFormatPlaceHolder}
              testId="date_picker_general"
            />
          </View>
          <View style={styles.horizontalLine}>
            <NumberField
              placeholder=""
              control={control}
              name={t('task:Costor')}
              label={t('task:Cost')}
              max={14}
              fieldType={'currency'}
              styleTextBox={styles.containerStyle}
            />
          </View>
          <View style={styles.horizontalLine}>
            <CommonDatePicker
              control={control}
              name={t('task:Date')}
              containerStyle={styles.datePickerContrainer}
              maximumDate={new Date()}
              title={t('task:Sale')}
              dateFormat={dateFormat}
              placeholderText={dateFormatPlaceHolder}
              testId="date_picker_general"
            />
          </View>
          <View style={styles.horizontalLine}>
            <NumberField
              placeholder=""
              control={control}
              name={t('task:Selling1')}
              label={t('task:Selling')}
              styleTextBox={styles.containerStyle}
              max={14}
              fieldType={'currency'}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default AddViewAssets
