import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import Text from '../../../../theme/common/Text'
import styles from '../styles'
import {
  NumberField,
  TextField,
} from '../../../../theme/common/TextInput/InputFormComponents'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { ApplicationScreenProps } from '../../../../../@types/navigation'
import { Header } from 'react-native-elements'
import CommonDatePicker from '../../../../theme/common/CommonDatePicker'
import { dateFormat, dateFormatPlaceHolder } from '../Utils'
import { useTranslation } from 'react-i18next'
import { useLazyGetHomeAssetQuery } from '../../../../services/modules/AssetsBusiness'
import {
  formatCurrency,
  removeDollarAndComma,
} from '../../../../theme/common/TextInput/utils'
import { glbCustomerHeaderOptions, glbStyles } from '../../../../../src/styles/global'

const AddViewAssetsBusiness = ({
  navigation,
  route,
}: ApplicationScreenProps) => {
  const [getHomeAsset] = useLazyGetHomeAssetQuery()
  const isEdit: boolean = route?.params?.item
  const [autoFillData, setAUtoFillData] = useState(
    isEdit ? route?.params?.item : {}
  )

  const { t } = useTranslation()

  const { control, handleSubmit, reset, getValues } = useForm({
    mode: 'onBlur',
    defaultValues: {
      assets: 0,
      attached: '',
      description: '',
      purchaseCost: 0,
      purchaseDate: '',
      saleCost: 0,
      saleDate: '',
    },
  })

  useEffect(() => {
    const value = route?.params?.item
    for (const key in value) {
      if (key == 'saleCost' || key == 'purchaseCost') {
        value[key] = formatCurrency(value[key]?.toString())
      } else {
        value[key] = value[key]?.toString()
      }
    }
    if (isEdit) reset(value)
  }, [])

  const submitProfile: SubmitHandler<
    Record<string, string>
  > = async formdata => {
    const payload = {
      assetId: autoFillData?.assetId,
      assets: autoFillData?.assets,
      attached: autoFillData?.attached,
      description: formdata?.description,
      purchaseDate: formdata?.purchaseDate,
      purchaseCost: removeDollarAndComma(formdata?.purchaseCost),
      saleDate: formdata?.saleDate,
      saleCost: removeDollarAndComma(formdata?.saleCost),
      entityId: autoFillData?.entityId,
      method: 'PUT',
      isDeleted: true,
      type: 'Asset',
    }

    const addPayload = {
      description: formdata?.description,
      purchaseDate: formdata?.purchaseDate,
      purchaseCost: removeDollarAndComma(formdata?.purchaseCost),
      saleDate: formdata?.saleDate,
      saleCost: removeDollarAndComma(formdata?.saleCost),
      method: 'POST',
      isDeleted: true,
      type: 'Asset',
    }
    const value = isEdit ? payload : addPayload
    getHomeAsset(value)
      .unwrap()
      .then(response => {
        navigation.goBack()
      })
      .catch(() => {})
  }

  const onError: SubmitErrorHandler<Record<string, string>> = errors => {
    console.error(t('task:Error'), errors)
    navigation.goBack()
  }
  const resetValue = (type: number) => {
    switch (type) {
      case 1:
        reset({
          description: getValues('description'),
          purchaseDate: '',
          purchaseCost: getValues('purchaseCost'),
          saleDate: getValues('saleDate'),
          saleCost: getValues('saleCost'),
        })
        break
      case 2:
        reset({
          description: getValues('description'),
          purchaseDate: getValues('purchaseDate'),
          purchaseCost: getValues('purchaseCost'),
          saleDate: '',
          saleCost: getValues('saleCost'),
        })
        break
    }
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
              {isEdit
                ? t('AssetsBusiness:EDITASSET')
                : t('AssetsBusiness:ADDASSET')}
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
  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      {headerView()}
      <ScrollView>
        <View style={styles.mainViewStyle}>
          <View style={styles.horizontalLine2} />
          <View style={styles.horizontalLine}>
            <TextField
              placeholder={t('task:Name')}
              control={control}
              name="description"
              label={t('task:Asset')}
              max={76}
            />
          </View>
          <View style={styles.horizontalLine}>
            <CommonDatePicker
              control={control}
              name={'purchaseDate'}
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
              name="purchaseCost"
              label={t('task:Cost')}
              fieldType={'currency'}
              styleTextBox={styles.containerStyle}
              max={17}
            />
          </View>
          <View style={styles.horizontalLine}>
            <CommonDatePicker
              control={control}
              name="saleDate"
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
              name="saleCost"
              label={t('task:PRICES')}
              styleTextBox={styles.containerStyle}
              fieldType={'currency'}
              max={17}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default AddViewAssetsBusiness
