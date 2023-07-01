import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, ScrollView, TouchableOpacity } from 'react-native'
import styles from './styles'
import { t } from 'i18next'
import loaderStyle from '../../../Common/LoaderStyle'
import {NumberField, TextField} from '../../../../theme/common/TextInput/InputFormComponents'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { ApplicationScreenProps } from '../../../../../@types/navigation'
import { Header } from 'react-native-elements'
import Text from '../../../../../src/theme/common/Text'
import { useLazyGetHomeOfficeAddEditQuery } from '../../../../../src/services/modules/homeOffice'
import { Spinner } from '../../../../theme/common/Spinner/Spinner'
import { useSelector } from 'react-redux'
import {formatCurrency, removeDollarAndComma} from "../../../../theme/common/TextInput/utils";
import { glbCustomerHeaderOptions, glbStyles } from '../../../../../src/styles/global'

const HomeOfficeExpense = ({ navigation, route }: ApplicationScreenProps) => {
  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
  })
  const [getHomeOfficeAddEdit] = useLazyGetHomeOfficeAddEditQuery()
  const entityid = route?.params?.entityID
  const expGridCode = route?.params?.expGridCode
  const expPageCode = route?.params?.expPageCode
  const OfficeParentId = route?.params?.OfficeParentId
  const expId = route?.params?.expId
  const hoExpCompleteArrayList = useSelector(
    state => state?.homeOffice?.businessHOExp?.miDataModel?.grids[0]?.data
  )
  const [isFetching, setIsFetching] = useState(false)
  const [hoExpData, setHOExpData] = useState('[]')
  const [isEdit, setIsEdit] = useState(route?.params?.isEdit)
  const [refreshPage, setRefreshPage] = useState(false)
  const submitExpens: SubmitHandler<
    Record<string, string>
  > = async formdata => {
    callSaveExpens(formdata)
  }
  useEffect(() => {
    if (expId != '0') {
      const expensFilteredItemsList = hoExpCompleteArrayList.filter(object => {
        return object.OfficeParentId === OfficeParentId && object.id === expId
      })
      setHOExpData(expensFilteredItemsList[0])
    }
  }, [])

  useEffect(() => {
    if (hoExpData != '[]') {
      setRefreshPage(true)
    }
  }, [hoExpData])

  const callSaveExpens = (formdata: Record<string, string>) => {
    const payloadID = {
      data: {
        code: expPageCode,
        entityid: entityid,
        isDirty: 'true',
        gridCode: expGridCode,
      },
      grids: [
        {
          data: [
            {
              Description: formdata.EXPENSE_DESC,
              OfficeParentId: OfficeParentId,
              'Direct Amount': formdata.CURRENT_AMOUNT,
              'Direct Amount - P': '0.00',
              'Indirect Amount': formdata.PRIOR_AMOUNT,
              'Indirect Amount - P': '0.00',
              id: isEdit ? expId : 'new',
            },
          ],
        },
      ],
    }
    setIsFetching(true)
    getHomeOfficeAddEdit(payloadID)
      .unwrap()
      .then(response => {
        setIsFetching(false)
        backClick()
      })
      .catch(() => {
        setIsFetching(false)
      })
  }

  const onError: SubmitErrorHandler<Record<string, string>> = errors => {
    console.error('in error', errors)
  }
  const addSpace = (margin: number) => {
    return <View style={{ margin: margin ? margin : 5 }}></View>
  }
  const backClick = () => {
    navigation.goBack()
  }

  const renderContent = () => {
    return (
      <View style={styles.mainViewStyle}>
        {addSpace(5)}
        <View style={styles.horizontalLine}>
          <TextField
            placeholder={t('vehicle:EXPENSE_DESC')}
            control={control}
            name="EXPENSE_DESC"
            label={t('homeOffice:Expense')}
            defaultValue={!isEdit ? '' : hoExpData['Description']}
            max={76}
          />
        </View>
        <View style={styles.horizontalLine}>
          <NumberField
            styleTextBox={styles.currentAmount}
            control={control}
            fieldType={'currency'}
            name="CURRENT_AMOUNT"
            label={t('homeOffice:Direct_expense')}
            defaultValue={!isEdit ? '' : formatCurrency(hoExpData['Direct Amount'],true)}
          />
        </View>
        <View style={styles.horizontalLine}>
          <NumberField
            styleTextBox={styles.priorAmount}
            control={control}
            fieldType={'currency'}
            name="PRIOR_AMOUNT"
            label={t('homeOffice:Indirect_expense')}
            defaultValue={!isEdit ? '' : formatCurrency(hoExpData['Indirect Amount'],true)}
          />
        </View>
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
            >
              {isEdit
                ? t('homeOffice:EDIT_OFFICE_EXP')
                : t('homeOffice:ADD_OFFICE_EXP')}
            </Text>
          </View>
        }
        rightComponent={
          <TouchableOpacity onPress={handleSubmit(submitExpens, onError)}>
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

      <ScrollView>
        {refreshPage && renderContent()}
        {!isEdit && renderContent()}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeOfficeExpense
