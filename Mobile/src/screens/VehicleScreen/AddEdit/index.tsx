import React, { useState, useEffect } from 'react'
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
} from 'react-native'
import Text from '../../../theme/common/Text'
import styles from './styles'
import { TextField } from '../../../theme/common/TextInput/InputFormComponents'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import {
  useLazyGetHomeIndividualAssetsQuery,
  useLazyGetAsstesDeleteTilesQuery,
} from '../../../services/modules/Assets'
import CommonDatePicker, {
  dateFormatPlaceFolder,
} from '../../../theme/common/CommonDatePicker'
import {
  dateFormat,
  questionArray,
  removeChar,
  replaceZeroAfterDecimal,
  textfieldArray,
} from './utils'
import { useTranslation } from 'react-i18next'
import YesNoButton from '../../../theme/common/YesNoButton'
import {
  YesNoButtonProps,
  YesNoResult,
} from '../../../theme/common/YesNoButton/types'
import { Divider } from 'react-native-paper'

import ListItem from '../../../theme/common/ListItem'
import { useSelector, useDispatch } from 'react-redux'
import { RenderTheeColumView } from '../../../theme/common/RowWithTwoTextfieldOneText'
import WKSwipeListView from '../../../theme/common/SwipeList/WKSwipeListView'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { GridCode } from '../../../services/constants/GridCode'
import { PageCode } from '../../../services/constants/PageCode'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../../screens/Common/LoaderStyle'
import {formatCurrency} from "../../../theme/common/TextInput/utils";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { numberOfLineInDescription } from '../../../theme/constants'
import { imageConstant } from '../../../theme/Images'
import { glbStyles } from '../../../../src/styles/global'

const AddEditVehicle = ({ navigation, route }: ApplicationScreenProps) => {
  let isEdit: boolean = route?.params?.dataPayload?.item ? true : false
  const [refreshPage, setRefreshPage] = useState(true)
  const [isFetching, setFetching] = useState(false)
  const [isAsstesData, setAsstesData] = useState(false)
  const [tableData, setTableData] = useState([])
  const [vehicleError, setVehicleError] = useState(false)
  const [autoFillData, setAUtoFillData] = useState(
    isEdit ? route?.params?.dataPayload?.item : {}
  )
  const isFocused = useIsFocused()
  const [vid, setVID] = useState('new')
  const [isEditV, setIsEditV] = useState(isEdit)
  const [getAsstesDeleteTiles] = useLazyGetAsstesDeleteTilesQuery()
  const [getHomeIndividualAssets] = useLazyGetHomeIndividualAssetsQuery()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const singleServiceListData = useSelector(
    state => state?.home?.singleServiceListData
  )

  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      "Vehicle Description": isEdit ? autoFillData["Vehicle Description"]?.length>0? autoFillData["Vehicle Description"]:`Office ${route?.params?.dataPayload?.index}`:'',
      "Another vehicle available": autoFillData["Another vehicle available"],
      "Date In Service": autoFillData["Date In Service"],
      "Date Sold": autoFillData["Date Sold"],
      "Do you have evidence": autoFillData["Do you have evidence"],
      "Employer-provided vehicle available":
        autoFillData["Employer-provided vehicle available"],
      "Gasoline and oil": formatCurrency(autoFillData["Gasoline and oil"],true),
      "Gasoline and oil - P": formatCurrency(autoFillData["Gasoline and oil - P"],true),
      Insurance: formatCurrency(autoFillData["Insurance"],true),
      "Insurance - P": formatCurrency(autoFillData["Insurance - P"],true),
      Interest: formatCurrency(autoFillData["Interest"],true),
      "Interest - P": formatCurrency(autoFillData["Interest - P"],true),
      Repairs: formatCurrency(autoFillData?.["Repairs"],true),
      "Repairs - P": formatCurrency(autoFillData?.["Repairs - P"],true),
      Status: formatCurrency(autoFillData?.["Status"],true),
      Taxes: formatCurrency(autoFillData?.["Taxes"],true),
      "Taxes - P": formatCurrency(autoFillData?.["Taxes - P"],true),
      "Total Business Miles": replaceZeroAfterDecimal(autoFillData?.["Total Business Miles"]),
      "Total Business Miles - P": replaceZeroAfterDecimal(autoFillData?.["Total Business Miles - P"]),
      "Total Commuting Miles": replaceZeroAfterDecimal(autoFillData?.["Total Commuting Miles"]),
      "Total Commuting Miles - P": replaceZeroAfterDecimal(autoFillData?.["Total Commuting Miles - P"]),
      "Total Miles": replaceZeroAfterDecimal(autoFillData?.["Total Miles"]),
      "Total Miles - P": replaceZeroAfterDecimal(autoFillData?.["Total Miles - P"]),
      "Vehicle rentals or leases": formatCurrency(autoFillData?.["Vehicle rentals or leases"],true),
      "Vehicle rentals or leases - P":
          formatCurrency( autoFillData?.["Vehicle rentals or leases - P"],true),
    },
  })

  useFocusEffect(
    React.useCallback(() => {
      setRefreshPage(false)
      setFetching(true)
      fetchAssetsList()
    }, [isFocused])
  )
  useEffect(() => {
    if (isEdit) reset(route?.params?.item)
  }, [])

  const submitProfile = async (
    formdata: Record<string, string>,
    isDone: boolean,
    isEditVehicle: boolean
  ) => {
    setVehicleError(false)
    setFetching(true)
    if (route?.params?.dataPayload?.item) {
      isEdit = true
    } else {
      isEdit = isEditVehicle
      setIsEditV(true)
    }

    const payload = {
      data: {
        isDirty: 'true',
        code: PageCode.BusinessVehicleDetail,
        gridCode: GridCode.BusinessVehicles,
        entityid: route?.params?.dataPayload?.entityID,
      },
      grids: [
        {
          data: [
            {
              'Vehicle Description': formdata['Vehicle Description'],
              'Another vehicle available':
                autoFillData['Another vehicle available'] ?? '',
              'Date In Service': formdata['Date In Service'] ?? '',
              'Date Sold': formdata['Date Sold'] ?? '',
              'Do you have evidence':
                autoFillData['Do you have evidence'] ?? '',
              'Employer-provided vehicle available':
                autoFillData['Employer-provided vehicle available'] ?? '',
              'Gasoline and oil':
                removeChar(formdata['Gasoline and oil']) ?? '',
              'Gasoline and oil - P':
                removeChar(formdata['Gasoline and oil - P']) ?? '',
              Insurance: removeChar(formdata['Insurance']) ?? '',
              'Insurance - P': removeChar(formdata['Insurance - P']) ?? '',
              Interest: formdata['Interest'],
              'Interest - P': removeChar(formdata['Interest - P']) ?? '',
              Repairs: removeChar(formdata['Repairs']) ?? '',
              'Repairs - P': removeChar(formdata['Repairs - P']) ?? '',
              Status: removeChar(formdata['Status']) ?? '',
              Taxes: removeChar(formdata['Taxes']) ?? '',
              'Taxes - P': removeChar(formdata['Taxes - P']) ?? '',
              'Total Business Miles':
                removeChar(formdata['Total Business Miles']) ?? '',
              'Total Business Miles - P':
                removeChar(formdata['Total Business Miles - P']) ?? '',
              'Total Commuting Miles':
                removeChar(formdata['Total Commuting Miles']) ?? '',
              'Total Commuting Miles - P':
                removeChar(formdata['Total Commuting Miles - P']) ?? '',
              'Total Miles': removeChar(formdata['Total Miles']) ?? '',
              'Total Miles - P': removeChar(formdata['Total Miles - P']) ?? '',
              'Vehicle rentals or leases':
                removeChar(formdata['Vehicle rentals or leases']) ?? '',
              'Vehicle rentals or leases - P':
                removeChar(formdata['Vehicle rentals or leases - P']) ?? '',
              id: autoFillData['id'] ?? vid,
            },
          ],
        },
      ],
    }
    getAsstesDeleteTiles(payload)
      .unwrap()
      .then(response => {
        const jsonData = JSON.parse(response?.payload)
        const vidArray = jsonData?.miDataModel?.grids[0].data.filter(data => {
          return (formdata['Vehicle Description'] = data['Vehicle Description'])
        })
        if (isDone) {
          navigation.goBack()
        } else {
          setVID(vidArray[vidArray.length - 1]['id'])
          const data = autoFillData
          data['id'] = vidArray[vidArray.length - 1]['id']
          setAUtoFillData(data)
        }
        setFetching(false)
      })
      .catch(error => {
        console.error('error', error)
        setFetching(false)
      })
  }

  const onError: SubmitErrorHandler<Record<string, string>> = errors => {
    setVehicleError(true)
    console.error(t('task:Error'), errors)
  }

  const YesNoCallback = (state: YesNoResult, data: YesNoButtonProps) => {
    switch (data.apiKey) {
      case 'Do you have evidence':
        autoFillData['Do you have evidence'] =
          state === '1' ? 'Y' : state === '0' ? 'N' : ''

        break
      case 'Another vehicle available':
        autoFillData['Another vehicle available'] =
          state === '1' ? 'Y' : state === '0' ? 'N' : ''
        break
      case 'Employer-provided vehicle available':
        autoFillData['Employer-provided vehicle available'] =
          state === '1' ? 'Y' : state === '0' ? 'N' : ''
        break
    }
  }

  const deleteRow = item => {
    Alert.alert(
      t('common:DELETE'),
      t('questionnaire:DELETE_ALERT_MESSAGES').replace(
        '${NAME}',
        item?.item?.name
      ),
      [
        {
          text: t('common:CANCEL'),
          style: 'cancel',
        },
        {
          text: t('common:DELETE'),
          onPress: () => {
            deleteDependentFiles(item?.item)
          },
          style: 'default',
        },
      ]
    )
  }
  const deleteDependentFiles = value => {
    const payload = {
      data: {
        isDirty: 'true',
        pageCode: route?.params?.dataPayload?.pageCode,
        gridCode: route?.params?.dataPayload?.gridCode,
        entityID: route?.params?.dataPayload?.entityID,
      },
      grids: [
        {
          data: [
            {
              VehicleParentID: '',
              Description: '',
              Amount: '',
              'Prior Year': '',
              id: value.id,
            },
          ],
        },
      ],
    }

    getAsstesDeleteTiles(payload)
      .unwrap()
      .then(() => {
        fetchAssetsList()
      })
      .catch(error => {
        console.error('error', error)
      })
  }

  const sectionTitle = () => {
    return (
      <ListItem
        layout="threeColumn"
        title=""
        leftSlotWidth={'30%'}
        description={''}
        leftSlot={
          <View style={styles.leftSlotViewStyle}>
            <Text
              stylesContainerText={styles.textStyleOther3}
              testID="question_answer_text_id"
              children={t('income:INCOME')}
            />
          </View>
        }
        centerSlot={
          <View style={styles.centerSlotViewStyle}>
            <Text
              stylesContainerText={[styles.textStyleOther1]}
              testID="question_answer_text_id"
              children={singleServiceListData?.taxYear}
            />
          </View>
        }
        rightSlot={
          <Text
            stylesContainerText={[styles.textStyleOther]}
            testID="question_answer_text_id"
            children={t('income:PRIOR_YEAR')}
          />
        }
      />
    )
  }
  const renderTheeColumView = num => {
    return (
      <RenderTheeColumView
        control={control}
        index={num}
        disablePriorYearTextField
        data={textfieldArray}
      />
    )
  }
  const addSpace = (margin: number) => {
    return <View style={{ margin: margin ? margin : 5 }}></View>
  }
  const addingNameField = data => {
    const newData = data
    for (let i = 0; i < data?.length; i++) {
      newData[i].name = newData[i].Description
    }
    const editableData = newData.filter(object => {
      return object['VehicleParentID'] === autoFillData['id']
    })
    setTableData(editableData)
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: isEdit
        ? t('vehicle:EDIT_VEHICLE')
        : t('vehicle:ADD_VEHICLE'),
      headerRight: () => (
        <TouchableOpacity
          onPress={handleSubmit(
            data => submitProfile(data, true, false),
            errors => onErrorNew(errors)
          )}
        >
          <Text testID="Cancel_Button" stylesContainerText={styles.saveButton1}>
            {t('common:SAVE')}
          </Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            testID="Cancel_Button"
            stylesContainerText={styles.cancelButton}
          >
            {t('common:CANCEL')}
          </Text>
        </TouchableOpacity>
      ),
      headerTitleAlign: 'center',
    })
  }, [navigation])

  const fetchAssetsList = () => {
    const dataPayload = {
      pageCode: PageCode.BusinessRentalVehicleOtherExpenses,
      gridCode: GridCode.OtherBusinessVehicles,
      entityID: route?.params?.dataPayload?.entityID,
    }

    getHomeIndividualAssets(dataPayload)
      .unwrap()
      .then(response => {
        const otherVehicleData =
          response && JSON.parse(response?.payload)?.miDataModel?.grids[0]?.data
        addingNameField(
          otherVehicleData?.filter(
            data => data['id'].toLowerCase() != 'new' && autoFillData['id']
          )
        )
        setAsstesData(false)
        setRefreshPage(true)
        setFetching(false)
      })
      .catch(() => {
        setAsstesData(false)
        setFetching(false)
      })
  }

  const onErrorNew: SubmitErrorHandler<Record<string, string>> = errors => {
    onError(errors)
  }
  const renderItem = ({ item }) => {
    return (
      <View>
        {item?.id != 'new' ? (
          <TouchableOpacity
            onPress={() => {
              const dataPayload = {
                pageCode: PageCode.OtherBusinessVehicles,
                gridCode: GridCode.OtherBusinessVehicles,
                entityID: route?.params?.dataPayload?.entityID,
                Vid: autoFillData?.['id'],
                item: item,
              }
              navigation.navigate('AddVehicleExpenseScreen', { dataPayload })
            }}
            style={styles.renderItemBackground}
          >
            <View style={styles.itemView}>
              <Text
                stylesContainerText={styles.dependentMainItem}
                children={item?.Description}
                testID="dependent_list_item"
                numberOfLines={numberOfLineInDescription}
              />
              <Image style={styles.img} source={imageConstant.rightArrow} />
            </View>
            <View style={styles.itemView}>
              <View style={styles.flatListItemLeft}>
                <Text
                  stylesContainerText={styles.dependentItemDetails}
                  children={`${singleServiceListData?.taxYear} ${t(
                    'income:AMOUNT'
                  )}`}
                  testID="dependent_list_item"
                />
                <Text
                  stylesContainerText={styles.dependentItemDetailsRight}
                  children={formatCurrency(item?.Amount, true)}
                  testID="dependent_list_item"
                />
              </View>

              <View style={styles.flatListItemRight}>
                <Text
                  stylesContainerText={styles.dependentItemDetailsRight}
                  children={t('income:PRIOR_YEAR') + ' ' + t('income:AMOUNT')}
                  testID="dependent_list_item"
                />
                <Text
                  stylesContainerText={styles.dependentItemDetailsRight}
                  children={formatCurrency(item?.['Prior Year'], true)}
                  testID="dependent_list_item"
                />
              </View>
            </View>
            {addSpace(10)}
            <View style={styles.horizontalLine2} />
          </TouchableOpacity>
        ) : null}
      </View>
    )
  }

  const renderHiddenItem = data => {
    return (
      <View style={styles.rowBack}>
        <View />
        <TouchableOpacity
          style={styles.stylesSwipeViewStyle}
          onPress={() => deleteRow(data)}
        >
          <Text
            children="Delete"
            stylesContainerText={styles.stylesSwipeTextStyle}
            testID="dependent_list_item"
          />
        </TouchableOpacity>
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
      <KeyboardAwareScrollView style={styles.scrollView}>
        <Spinner
          visible={isAsstesData}
          textContent={t('common:LOADING')}
          size={'large'}
          textStyle={loaderStyle.spinnerTextStyle}
        />
        <View style={styles.mainViewStyle}>
          <View style={styles.horizontalLine2} />
          {addSpace(10)}
          <View style={[styles.vehicleDecContainer]}>
            <View style={styles.vehicleDec}>
              <TextField
                placeholder={t('vehicle:VEHICLE_DESC')}
                control={control}
                name="Vehicle Description"
                label={t('vehicle:VEHICLE_DESC')}
                error={vehicleError ? 'Vehicle description is invalid.' : ''}
                max={76}
                required
              />
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSubmit(
                data => submitProfile(data, false, true),
                errors => onErrorNew(errors)
              )}
            >
              <Text
                stylesContainerText={styles.saveButtonText}
                testID="save_button"
              >
                {t('common:SAVE')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.horizontalLine}>
            <CommonDatePicker
              control={control}
              name={'Date In Service'}
              containerStyle={styles.datePickerContrainer}
              maximumDate={new Date()}
              title={t('vehicle:DATE_SERVICE')}
              dateFormat={dateFormat}
              placeholderText={dateFormatPlaceFolder}
              testId="date_picker_general"
            />
          </View>
          <View style={styles.horizontalLine}>
            <CommonDatePicker
              control={control}
              name={'Date Sold'}
              containerStyle={styles.datePickerContrainer}
              maximumDate={new Date()}
              title={t('vehicle:DATE_DISPOSITION')}
              dateFormat={dateFormat}
              placeholderText={dateFormatPlaceFolder}
              testId="date_picker_general"
            />
          </View>

          {addSpace(10)}
          <Divider />
          <YesNoButton
            callback={YesNoCallback}
            apiKey={questionArray[0].name}
            title={questionArray[0].title}
            defaultValue={
              autoFillData['Do you have evidence'] === 'Y'
                ? '1'
                : autoFillData['Do you have evidence'] === 'N'
                ? '0'
                : ''
            }
          />
          <YesNoButton
            callback={YesNoCallback}
            apiKey={questionArray[1].name}
            title={questionArray[1].title}
            defaultValue={
              autoFillData['Another vehicle available'] === 'Y'
                ? '1'
                : autoFillData['Another vehicle available'] === 'N'
                ? '0'
                : ''
            }
          />
          <YesNoButton
            callback={YesNoCallback}
            apiKey={questionArray[2].name}
            title={questionArray[2].title}
            defaultValue={
              autoFillData['Employer-provided vehicle available'] === 'Y'
                ? '1'
                : autoFillData['Employer-provided vehicle available'] === 'N'
                ? '0'
                : ''
            }
          />
          {addSpace(5)}
          <Text stylesContainerText={styles.AllExpense} testID="Title">
            {t('vehicle:ALL_EXPENSE').toUpperCase()}
          </Text>
          {addSpace(5)}
          <Divider />
          {sectionTitle()}
          <Divider />
          {textfieldArray.map(person => {
            return person.id < 3 ? renderTheeColumView(person.id) : null
          })}
          <Divider />
          <Text stylesContainerText={styles.IRSTitle} testID="Title">
            {t('vehicle:IRS_TITLE')}
          </Text>
          <Divider />
          {textfieldArray.map(person => {
            return person.id > 2 ? renderTheeColumView(person.id) : null
          })}
          {addSpace(5)}
          <Text stylesContainerText={styles.OtherExpense} testID="Title">
            {t('vehicle:OTHER_EXPENSE')}
          </Text>
          {addSpace(5)}
          <Divider />

          <WKSwipeListView
            listData={tableData}
            refreshPage={refreshPage}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-75}
            previewRowKey={'0'}
            previewOpenValue={-40}
          />
          <TouchableOpacity
            onPress={() => {
              if (isEditV) {
                const dataPayload = {
                  pageCode: PageCode.OtherBusinessVehicles,
                  gridCode: GridCode.OtherBusinessVehicles,
                  entityID: route?.params?.dataPayload?.entityID,
                  Vid: autoFillData['id'] ?? vid,
                }
                navigation.navigate('AddVehicleExpenseScreen', { dataPayload })
              } else {
                Alert.alert(
                  '',
                  'The vehicle needs to be saved before you can add vehicle expenses. ',
                  [
                    {
                      text: t('Ok'),
                      style: 'cancel',
                    },
                  ]
                )
              }
            }}
          >
            <Text
              stylesContainerText={[styles.addTo]}
              children={t('vehicle:ADD_VEHICLE_EXPENSE')}
              testID="dependent_list_item"
            />
          </TouchableOpacity>

          <Divider />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default AddEditVehicle
