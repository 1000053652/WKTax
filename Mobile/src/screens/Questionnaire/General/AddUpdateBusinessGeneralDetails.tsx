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
import { states } from '../../../../src/services/constants/ConstantsData'
import EmptyAreas from '../BusinessRental/EmptyAreas'
import { glbCustomerHeaderOptions, glbStyles } from '../../../styles/global'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Colors } from '../../../../src/theme/constants'
import useAddUpdateBusinessGeneralHook from './hooks/useAddUpdateBusinessGeneralHook'
import { YNOSegmentedControl } from '../../../../src/theme/common/index'
import { CustomDropdown } from '../../../../src/theme/common/CustomDropdown'

const AddUpdateBusinessGeneralDetails = ({
  navigation,
  route,
}: ApplicationScreenProps) => {
  const detailId: string = route?.params?.entityID
  const pageId: string = route?.params?.entityPageID
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
  } = useAddUpdateBusinessGeneralHook(detailId, pageId, navigation)
  const { t } = useTranslation()

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Header
        statusBarProps={glbCustomerHeaderOptions}
        leftComponent={
          <TouchableOpacity onPress={cancelClick}>
            <Text
              testID="header_cancel"
              stylesContainerText={glbStyles.headerButtonText}
            >
              {t('common:CANCEL')}
            </Text>
          </TouchableOpacity>
        }
        centerComponent={
          <View>
            <Text
              testID="header_screen_title"
              stylesContainerText={glbStyles.headerTitle}
            >
              {t('common:BUSINESS-GENERAL')}
            </Text>
            <Text
              testID="header_screen_title"
              stylesContainerText={glbStyles.headerSubTitle}
            >
              {route?.params?.selectedItemName}
            </Text>
          </View>
        }
        rightComponent={
          <TouchableOpacity onPress={handleSubmit(saveDetails, onError)}>
            <Text
              testID="header_save"
              stylesContainerText={glbStyles.headerButtonText}
            >
              {t('common:SAVE')}
            </Text>
          </TouchableOpacity>
        }
        containerStyle={glbStyles.headerContainer}
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
            children={'GENERAL INFORMATION'}
          />
          <View style={styles.sepratorLine}></View>
          <TextField
            styleTextBox={styles.textField}
            required
            placeholder=""
            error={errors.txtBusinessName?.message}
            control={control}
            name="txtBusinessName"
            label={t('questionnaire:NAME_OF_BUSINESS')}
            max={60}
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
            error={errors.idnEmployer?.message}
            placeholder=""
            control={control}
            name="idnEmployer"
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
          <TextField
            styleTextBox={styles.textField}
            error={errors.txtProfession?.message}
            placeholder=""
            control={control}
            name="txtProfession"
            label={t('questionnaire:PRINCIPAL_BUSINESS')}
            max={55}
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
          <TextField
            styleTextBox={styles.textField}
            error={errors.txtAddress?.message}
            placeholder=""
            control={control}
            name="txtAddress"
            label={t('questionnaire:STREET_ADDRESS')}
            max={49}
          />
          <TextField
            styleTextBox={styles.textField}
            error={errors.txtCity?.message}
            placeholder=""
            control={control}
            name="txtCity"
            label={t('questionnaire:CITY')}
            max={34}
          />
          <CustomDropdown
            error={errors.cmbState?.message}
            containerStyle={styles.dropDownContainer}
            control={control}
            name="cmbState"
            label={t('questionnaire:STATE')}
            data={states}
            dropdownKey={'key'}
            search={true}
          />
          <TextField
            styleTextBox={styles.textField}
            error={errors.txtZIP?.message}
            placeholder=""
            control={control}
            name="txtZIP"
            label={t('questionnaire:ZIP_CODE')}
            max={50}
          />
          <TextField
            styleTextBox={styles.textField}
            error={errors.txtFrgnPostalInfo?.message}
            placeholder=""
            control={control}
            name="txtFrgnPostalInfo"
            label={t('questionnaire:FOREIGN_INFO')}
            max={50}
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
            error={errors.txtMoreInfo?.message}
            placeholder=""
            control={control}
            name="txtMoreInfo"
            label={t('questionnaire:DESC_BUSINESS_ACTIVITY')}
            max={500}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default AddUpdateBusinessGeneralDetails
