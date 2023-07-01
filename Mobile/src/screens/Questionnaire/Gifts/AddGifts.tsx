import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import { addGift, addGiftType, receipientTypeData } from './utilsGifts'
import Text from '../../../theme/common/Text'
import {
  TextField,
  NumberField,
} from '../../../theme/common/TextInput/InputFormComponents'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { t } from 'i18next'
import styles from './styles'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import CommonDatePicker from '../../../theme/common/CommonDatePicker'
import { dateFormat } from '../General/Utils'
import loaderStyle from '../../../screens/Common/LoaderStyle'
import { useFocusEffect } from '@react-navigation/native'
import {
  useLazyGetDetailedDependentDisplayDataQuery,
  useLazyEditPageEntityQueryQuery,
  useLazyAddPageEntityQueryQuery,
} from '../../../../src/services/modules/questionnaire'
import { PageCode } from '../../../../src/services/constants/PageCode'
import {
  GiftData,
  BusinessGeneralData,
} from '../../../../src/services/modules/questionnaireBusiness/responseTypes'
import { DetailPageRequest } from '../../../../src/services/modules/questionnaire/requestType'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { dateFormatPlaceHolder } from '../../../../src/theme/constants'
import { formatCurrency } from '../../../../src/theme/common/TextInput/utils'
import { CustomDropdown } from '../../../../src/theme/common/CustomDropdown'
import { glbStyles } from '../../../../src/styles/global'
const AddGiftScreen = ({ navigation, route }: ApplicationScreenProps) => {
  const isEdit: boolean = route?.params?.isEdit
  const entityID: string = route?.params?.entityID
  const pageId: string = route?.params?.pageId
  const [isFetching, setFetching] = useState(true)
  const [getNavDetailsAPI] = useLazyGetDetailedDependentDisplayDataQuery()
  const [editPageAPI] = useLazyEditPageEntityQueryQuery()
  const [addPageAPI] = useLazyAddPageEntityQueryQuery()
  const [selectedRecipient, setSelectedRecipient] = useState('')

  const [error, setError] = useState(false)
  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      txtName: '',
      txtAddress: '',
      txtRelationship: '',
      txtGiftPurpose: '',
      curValue: '',
      txtNotes: '',
    },
  })

  const getMaxLength = value => {
    let maxLengh: number
    if (value == 'txtName') {
      maxLengh = 50
    }
    if (value == 'txtAddress') {
      maxLengh = 76
    }
    if (value == 'txtRelationship') {
      maxLengh = 30
    }
    if (value == 'txtGiftPurpose') {
      maxLengh = 76
    }
    if (value == 'txtNotes') {
      maxLengh = 500
    }

    return maxLengh
  }

  const GiftTextFieldsUI = (item: addGiftType) => {
    return (
      <TextField
        placeholder=""
        control={control}
        name={item.answerKey}
        label={item.title}
        error={
          item.title == t('questionnaire:NAME_OF_RECIPIENT_OR_TRUST')
            ? error
              ? t('questionnaire:NAME_IS_REQUIRED')
              : ''
            : ''
        }
        required={
          item.title == t('questionnaire:NAME_OF_RECIPIENT_OR_TRUST')
            ? true
            : false
        }
        keyboardType={
          item.title == t('questionnaire:AMOUNT_VALUE_OF_GIFT')
            ? 'number-pad'
            : 'default'
        }
        max={getMaxLength(item.answerKey)}
      />
    )
  }

  const GiftNumberUI = (item: addGiftType) => {
    return (
      <NumberField
        fieldType={'currency'}
        placeholder=""
        control={control}
        name={item.answerKey}
        label={item.title}
        error={''}
        required={false}
      />
    )
  }

  const GiftDropDownFieldsUI = item => {
    return (
      <CustomDropdown
        containerStyle={styles.dropDownContainer}
        control={control}
        name="recipientsType"
        label={t('questionnaire:RECIPIENT_TYPE')}
        data={receipientTypeData}
        placeholder={selectedRecipient}
      />
    )
  }

  const GiftDateFieldsUI = item => {
    return (
      <CommonDatePicker
        control={control}
        name={'datDateGift'}
        containerStyle={styles.datePickerContrainer}
        maximumDate={new Date()}
        title={t('questionnaire:DATE_OF_GIFT')}
        dateFormat={dateFormat}
        testId="date_picker_general"
        placeholderText={dateFormatPlaceHolder}
      />
    )
  }
  const renderAddGiftScreen = ({ item }) => {
    switch (item.id) {
      case 0:
      case 2:
      case 3:
      case 4:
      case 7:
        return GiftTextFieldsUI(item)
        break
      case 5:
        return GiftNumberUI(item)
        break

      case 1:
        return GiftDropDownFieldsUI(item)
        break

      case 6:
        return GiftDateFieldsUI(item)
        break

      default:
        break
    }
  }

  const onError: SubmitErrorHandler<Record<string, string>> = errors => {
    setError(true)
  }

  const addGeneralDetails = (item: GiftData) => {
    const response: DetailPageRequest<BusinessGeneralData> = {
      entityPageID: pageId,
      pagecode: PageCode.GiftsIndividualsTrusts,
      entityId: '0',
      modelJson: { data: null, grids: null },
    }
    addPageAPI(response)
      .unwrap()
      .then(res => {
        const payload = JSON.parse(res.payload)
        const entityID = payload?.selectedEntityId
        editGeneralDetails(item, entityID)
      })
      .catch(error => {})
  }

  const editGeneralDetails = (item: GiftData, entityIDUpdated: string) => {
    setFetching(true)
    item.code = PageCode.GiftsIndividualsTrustsDetails
    item.entityid = entityIDUpdated
    item.isDirty = 'true'

    const request: DetailPageRequest<BusinessGeneralData> = {
      pagecode: PageCode.GiftsIndividualsTrustsDetails,
      entityId: entityIDUpdated,
      modelJson: { data: item, grids: null },
    }
    editPageAPI(request)
      .unwrap()
      .then(res => {
        setFetching(false)
        navigation.goBack()
      })
      .catch(error => {
        setFetching(false)
      })
  }

  const submitGift: SubmitHandler<Record<string, string>> = async formdata => {
    const data: GiftData = {
      txtName: formdata.txtName,
      txtAddress: formdata.txtAddress,
      txtRelationship: formdata.txtRelationship,
      txtGiftPurpose: formdata.txtGiftPurpose,
      curValue: formdata.curValue,
      txtNotes: formdata.txtNotes,
      datDateGift: formdata.datDateGift,
      chkIndividual: formdata.recipientsType == 'I' ? 'Y' : 'N',
      chkTrust: formdata.recipientsType == 'T' ? 'Y' : 'N',
    }

    if (isEdit) {
      editGeneralDetails(data, entityID)
    } else {
      addGeneralDetails(data)
    }
  }

  const getScreenData = () => {
    const endPoitns = `code=${PageCode.GiftsIndividualsTrustsDetails}&entityId=${entityID}`

    getNavDetailsAPI(endPoitns)
      .unwrap()
      .then(res => {
        const dataMapData = JSON.parse(res?.payload).miDataModel?.data

        dataMapData.curValue = formatCurrency(dataMapData.curValue, true)
        if (dataMapData?.chkIndividual == 'Y') {
          setSelectedRecipient(t('questionnaire:INDIVIDUAL'))
        } else if (dataMapData?.chkTrust == 'Y') {
          setSelectedRecipient(t('questionnaire:TRUST'))
        } else {
          setSelectedRecipient('')
        }

        reset(dataMapData)
        setFetching(false)
      })
      .catch(error => {
        setFetching(false)
      })
  }

  useFocusEffect(
    useCallback(() => {
      getScreenData()
    }, [])
  )

  useEffect(() => {
    navigation.setOptions({
      headerTitle: isEdit
        ? t('questionnaire:EDIT_GIFT')
        : t('questionnaire:ADD_GIFT'),
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit(submitGift, onError)}>
          <Text
            testID="Save_Button"
            stylesContainerText={styles.saveButton}
            children={t('common:SAVE')}
          />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            testID="Cancel_Button"
            stylesContainerText={styles.cancelButton}
            children={t('common:CANCEL')}
          />
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <KeyboardAwareScrollView>
        <Spinner
          visible={isFetching}
          textContent={t('common:LOADING')}
          size={'large'}
          textStyle={loaderStyle.spinnerTextStyle}
        />
        <FlatList data={addGift} renderItem={renderAddGiftScreen} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default AddGiftScreen
