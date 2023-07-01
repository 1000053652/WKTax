import React from 'react'
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  FlatList,
  SafeAreaView,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native'
import { Header } from 'react-native-elements'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import Text from '../../../theme/common/Text'
import styles from './styles'
import {
  TextField,
} from '../../../theme/common/TextInput/InputFormComponents'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../../screens/Common/LoaderStyle'
import CommonDatePicker from '../../../../src/theme/common/CommonDatePicker'
import {
  dateFormat,
  financialRecordsDropdownData,
  ownerTypeDropdownData,
  rentalOwnerShipDetails,
  rentalVacationHomeQuestionDetails,
} from './Utils'
import { states } from '../../../../src/services/constants/ConstantsData'
import EmptyAreas from '../BusinessRental/EmptyAreas'
import ThreeColumnHeader from './ThreeColumnsHeader'
import ThreeColumnListItem from './ThreeColumnListItem'
import { glbCustomerHeaderOptions, glbStyles } from '../../../../src/styles/global'
import { Colors } from '../../../../src/theme/constants'
import useAddUpdateRentalGeneralHook from './hooks/useAddUpdateRentalGeneralHook'
import { YNOSegmentedControl } from '../../../../src/theme/common/index'
import { CustomDropdown } from '../../../../src/theme/common/CustomDropdown'

const AddUpdateRentalGeneralDetails = ({
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
    cancelClick,
    singleServiceListData,
    setYNo1099,
  } = useAddUpdateRentalGeneralHook(detailId, pageId, navigation)
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
              children={t('common:RENTAL-GENERAL')}
            />
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
            children={t('questionnaire:GENERAL_INFORMATION')}
          />
          <View style={styles.sepratorLine}></View>
          <TextField
            styleTextBox={styles.textField}
            placeholder=""
            error={errors.txtPropType?.message}
            control={control}
            name="txtPropType"
            label={t('questionnaire:TYPE_OF_PROPERTY')}
            max={76}
          />
          <CustomDropdown
            error={errors.cmbTSJ?.message}
            containerStyle={styles.dropDownContainer}
            control={control}
            name="cmbTSJ"
            label={t('questionnaire:OWNER')}
            data={ownerTypeDropdownData}
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
            name="datSold"
            containerStyle={styles.datePickerContrainer}
            maximumDate={new Date()}
            title={t('questionnaire:DISCONTINUED_SOLD')}
            placeholderText={t('questionnaire:DD_MM_YYYY')}
            dateFormat={dateFormat}
            testId="date_picker_general"
          />
          <EmptyAreas />
          <Text
            testID="gerenal_info_title"
            stylesContainerText={styles.generalInformationText}
            children={t('questionnaire:LOCATION_OF_PROPERTY')}
          />
          <View style={styles.sepratorLine}></View>
          <TextField
            required
            styleTextBox={styles.textField}
            error={errors.txtPropAddr?.message}
            placeholder=""
            control={control}
            name="txtPropAddr"
            label={t('questionnaire:STREET_ADDRESS')}
            max={35}
          />
          <TextField
            styleTextBox={styles.textField}
            error={errors.txtPropCity?.message}
            placeholder=""
            control={control}
            name="txtPropCity"
            label={t('questionnaire:CITY')}
            max={50}
          />
          <CustomDropdown
            error={errors.txtPropState?.message}
            containerStyle={styles.dropDownContainer}
            control={control}
            name="txtPropState"
            label={t('questionnaire:STATE')}
            data={states}
            dropdownKey={'key'}
            search={true}
          />
          <TextField
            styleTextBox={styles.textField}
            error={errors.txtPropZip?.message}
            placeholder=""
            control={control}
            name="txtPropZip"
            label={t('questionnaire:ZIP_CODE')}
            max={16}
          />
          <TextField
            styleTextBox={styles.textField}
            error={errors.txtFrgnInfo?.message}
            placeholder=""
            control={control}
            name="txtFrgnInfo"
            label={t('questionnaire:FOREIGN_INFO')}
            max={31}
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
          <ThreeColumnHeader
            title1={null}
            title2={`${singleServiceListData?.taxYear}`}
            title3={t('questionnaire:PRIOR_YEAR_AMOUNT')}
          />
          <FlatList
            data={rentalOwnerShipDetails}
            keyExtractor={item => item.questionTitle}
            renderItem={item => (
              <ThreeColumnListItem control={control} item={item.item} />
            )}
          />
          <ThreeColumnHeader
            title1={t('questionnaire:RENTAL_HEADER_QUESTIONS')}
            title2={`${singleServiceListData?.taxYear}`}
            title3={t('questionnaire:PRIOR_YEAR_AMOUNT')}
          />
          <FlatList
            data={rentalVacationHomeQuestionDetails}
            keyExtractor={item => item.questionTitle}
            renderItem={item => (
              <ThreeColumnListItem control={control} item={item.item} />
            )}
          />
          <TextField
            isTextArea={true}
            styleTextBox={styles.textField}
            error={errors.txtNotes?.message}
            placeholder=""
            control={control}
            name="txtNotes"
            label={t('questionnaire:DESC_RENTA_BUSINESS_ACTIVITY')}
            max={500}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default AddUpdateRentalGeneralDetails
