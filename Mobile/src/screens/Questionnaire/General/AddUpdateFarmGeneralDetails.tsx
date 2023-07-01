import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView, Switch, TouchableOpacity, View } from 'react-native'
import { Header } from 'react-native-elements'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import Text from '../../../theme/common/Text'
import styles from './styles'
import {
  TextField,
  NumberField,
} from '../../../theme/common/TextInput/InputFormComponents'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../../screens/Common/LoaderStyle'
import CommonDatePicker from '../../../../src/theme/common/CommonDatePicker'
import {
  dateFormat,
  financialRecordsDropdownData,
  ownerTypeDropdownData,
} from './Utils'
import EmptyAreas from '../BusinessRental/EmptyAreas'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { glbCustomerHeaderOptions, glbStyles } from '../../../../src/styles/global'
import { Colors } from '../../../../src/theme/constants'
import useAddUpdateFarmGeneralHook from './hooks/useAddUpdateFarmGeneralHook'
import { YNOSegmentedControl } from '../../../../src/theme/common/index'
import { CustomDropdown } from '../../../../src/theme/common/CustomDropdown'

const AddUpdateFarmGeneralDetails = ({
  navigation,
  route,
}: ApplicationScreenProps) => {
  const detailId: string = route?.params?.entityID
  const pageId: string = route?.params?.entityPageID
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    onError,
    errors,
    saveDetails,
    attachToggleSwitch,
    isFetchingDetails,
    isFetchingEdit,
    isFetchingAdd,
    chkAttachDoc,
    yno1099,
    setYNo1099,
    cancelClick,
  } = useAddUpdateFarmGeneralHook(detailId, pageId, navigation)

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Header
        statusBarProps={glbCustomerHeaderOptions}
        leftComponent={
          <TouchableOpacity onPress={cancelClick}>
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
              {t('common:FARM-GENERAL')}
            </Text>
            <Text
              testID="header_screen_title"
              stylesContainerText={glbStyles.headerSubTitle}
              children={route?.params?.selectedItemName}
            />
          </View>
        }
        rightComponent={
          <TouchableOpacity onPress={handleSubmit(saveDetails, onError)}>
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
      <KeyboardAwareScrollView style={styles.container}>
        <Spinner
          visible={isFetchingDetails || isFetchingEdit || isFetchingAdd}
          textContent={t('common:LOADING')}
          size={'large'}
          textStyle={loaderStyle.spinnerTextStyle}
        />
        <View>
          <EmptyAreas />
          <View style={styles.switchContainer}>
            <Switch
              trackColor={{
                false: Colors.backgroundUploadHome,
                true: Colors.testColorBlue,
              }}
              onValueChange={attachToggleSwitch}
              thumbColor={Colors.white}
              value={chkAttachDoc}
            />
            <Text
              stylesContainerText={styles.switchTxt}
              children={t('businessRental:switchTxt')}
              testID="dependent_list_item"
            />
          </View>
          {chkAttachDoc ? (
            <Text
              stylesContainerText={styles.switchSubTxt}
              children={t('businessRental:ON_UPLOAD_SELECTION')}
              testID="dependent_list_item"
            />
          ) : null}
          <EmptyAreas />
          <Text
            testID="gerenal_info_title"
            stylesContainerText={styles.generalInformationText}
            children={t('questionnaire:GEN_INFO')}
          />
          <View style={styles.sepratorLine}></View>
          <TextField
            styleTextBox={styles.textField}
            required
            placeholder=""
            error={errors.txtCrop?.message}
            control={control}
            name="txtCrop"
            label={t('questionnaire:PRIN_CROP_ACTIVITY')}
            max={50}
          />
          <CustomDropdown
            error={errors.cmbTSJ?.message}
            containerStyle={styles.dropDownContainer}
            control={control}
            name="cmbTSJ"
            label={t('questionnaire:OWNER')}
            data={ownerTypeDropdownData}
          />
          <NumberField
            styleTextBox={styles.textField}
            error={errors.idnEmpNumber?.message}
            placeholder=""
            control={control}
            name="idnEmpNumber"
            label={t('questionnaire:EMP_ID_NUMBER')}
            max={10}
            fieldType={'pattern'}
            pattern={'xx-xxxxxxx'}
          />
          <CustomDropdown
            error={errors.cmbStatus?.message}
            containerStyle={styles.dropDownContainer}
            control={control}
            name="cmbStatus"
            label={t('questionnaire:STATUS_OF_FIN_RECORDS')}
            data={financialRecordsDropdownData}
          />
          <CommonDatePicker
            control={control}
            name="datDispose"
            containerStyle={styles.datePickerContrainer}
            maximumDate={new Date()}
            title={t('questionnaire:DISCONTINUED_SOLD')}
            placeholderText={t('questionnaire:DD_MM_YYYY')}
            dateFormat={dateFormat}
            testId="date_picker_general"
          />
          <EmptyAreas />
          <YNOSegmentedControl
            title={t('questionnaire:QUE_PREPARE_FORMS')}
            value={yno1099}
            yesValue={'X'}
            noValue={'N'}
            onValueChange={value => setYNo1099(value)}
          />
          <EmptyAreas />
          <NumberField
            styleTextBox={styles.textField}
            error={errors.curHealthIns?.message}
            placeholder=""
            control={control}
            name="curHealthIns"
            label={t('questionnaire:HEALTH_INS_PAID')}
            fieldType={'currency'}
          />
          <TextField
            isTextArea={true}
            styleTextBox={styles.textField}
            error={errors.txtNotes?.message}
            placeholder=""
            control={control}
            name="txtNotes"
            label={t('questionnaire:DESC_BUSINESS_ACTIVITY')}
            max={500}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default AddUpdateFarmGeneralDetails
