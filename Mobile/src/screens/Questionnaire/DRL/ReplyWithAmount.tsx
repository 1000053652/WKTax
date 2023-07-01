import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import Text from '../../../theme/common/Text'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { useLazyUpdateDRLItemStatusQuery } from '../../../services/modules/questionnaire'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../../screens/Common/LoaderStyle'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import BottomSheet from '@gorhom/bottom-sheet'
import {
  ApplicationScreenProps,
  DRLReplyWithAmoutProps,
} from '../../../../@types/navigation'
import { glbCustomerHeaderOptions, glbStyles } from '../../../styles/global'
import { useDispatch } from 'react-redux'
import { Header } from 'react-native-elements'
import {
  NumberField,
  TextField,
} from '../../../../src/theme/common/TextInput/InputFormComponents'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { refreshDRLCategory } from '../../../../src/store/questionnaire'
import {
  formatCurrency,
  removeDollarAndComma,
} from '../../../../src/theme/common/TextInput/utils'
import { errorMessageToast } from '../../Error/utils'

const ReplyWithAmount = ({ navigation, route }: ApplicationScreenProps) => {
  const { item }: DRLReplyWithAmoutProps = route.params
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [updateDRLItemStatus, { isFetching: isFetchingUpdateStatus }] =
    useLazyUpdateDRLItemStatusQuery()

  const bottomSheetRef = useRef<BottomSheeet>(null)

  const BackdropElement = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        opacity={0.5}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  )
  // variables
  const snapPoints = useMemo(() => [443], [])

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index == -1) {
      navigation.goBack()
    }
  }, [])

  const updateDRLLineItemStatusAPI = (amount: string) => {
    if (item != null) {
      let newItem = item
      newItem = {
        ...newItem,
        status: 6,
        amount: Number(amount),
        completed: true,
      }
      updateDRLItemStatus(newItem)
        .unwrap()
        .then(res => {
          dispatch(refreshDRLCategory(`${new Date()}`))
          navigation.goBack()
        })
        .catch(err => {
          errorMessageToast(err)
        })
    }
  }

  const cancelClick = () => {
    navigation.goBack()
  }
  const onError: SubmitErrorHandler<Record<string, string>> = errors => {}
  const saveDetails: SubmitHandler<Record<string, string>> = async formdata => {
    updateDRLLineItemStatusAPI(removeDollarAndComma(formdata.amount))
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({})
  useEffect(() => {
    if (item) {
      reset({ amount: formatCurrency(`${item.amount ?? 0}`, true) })
    }
  }, [])
  return (
    <BottomSheet
      handleIndicatorStyle={glbStyles.bottomSheetIndicator}
      backgroundStyle={glbStyles.bottomSheetContainer}
      backdropComponent={BackdropElement}
      index={0}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <Spinner
        visible={isFetchingUpdateStatus}
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <Header
        statusBarProps={glbCustomerHeaderOptions}
        leftComponent={
          <TouchableOpacity
            onPress={cancelClick}
            style={glbStyles.headerBackButton}
          >
            <Text
              children={t('common:CANCEL')}
              testID="header_cancel"
              stylesContainerText={glbStyles.headerButtonText}
            />
          </TouchableOpacity>
        }
        centerComponent={
          <View>
            <Text
              children={t('questionnaire:REPLY_WITH_AMOUNT')}
              testID="header_screen_title"
              stylesContainerText={glbStyles.headerTitle}
            />
          </View>
        }
        rightComponent={
          <TouchableOpacity onPress={handleSubmit(saveDetails)}>
            <Text
              children={t('common:SAVE')}
              testID="header_save"
              stylesContainerText={glbStyles.headerButtonText}
            />
          </TouchableOpacity>
        }
        containerStyle={glbStyles.headerContainer}
      />
      <ScrollView style={styles.container}>
        <View style={styles.containerView}>
          <Text
            testID="decription"
            stylesContainerText={styles.drlItemDescription}
            children={item?.description}
          />
          <NumberField
            styleTextBox={styles.textField}
            required
            placeholder=""
            error={errors.amount?.message}
            control={control}
            name="amount"
            label={t('questionnaire:ENTER_AMOUNT')}
            fieldType={'currency'}
          />
        </View>
      </ScrollView>
    </BottomSheet>
  )
}
export default ReplyWithAmount
