import React, { useEffect, useState } from 'react'
import {
  View,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { Colors } from '../../theme/constants'
import { Divider } from 'react-native-paper'
import Text from '../../theme/common/Text'
import { imageConstant } from '../../theme/Images'
import { styles } from './styles'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import {
  useLazyGetFillingDetailsQuery,
  useLazyGetFillingDetailsDeleteQuery,
  useLazyGetFillingDetailsDoneQuery,
} from '../../../src/services/modules/fillingdetails'
import { ApplicationScreenProps } from '../../../@types/navigation'
import {
  dropdownData,
  pageCode,
  convertStringToNumber,
  marriedStatusMapping,
} from './utils'
import { Spinner } from '../../theme/common/Spinner/Spinner'
import { t } from 'i18next'
import loaderStyle from '../Common/LoaderStyle'
import {
  ZipCodeField,
} from '../../theme/common/TextInput/InputFormComponents'
import YesNoButton from '../../theme/common/YesNoButton/index'
import {
  YesNoButtonProps,
  YesNoResult,
} from '../../theme/common/YesNoButton/types'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import ListItem from '../../theme/common/ListItem'
import WKSwipeListView from '../../theme/common/SwipeList/WKSwipeListView'
import { errorMessageToast } from '../Error/utils'
import { CustomDropdown } from '../../../src/theme/common/CustomDropdown'
import { glbStyles } from '../../../src/styles/global'

const FilingDetails = ({ navigation }: ApplicationScreenProps) => {
  const [value, setValue] = useState('')
  const [isFetching, setFetching] = useState(false)
  const [isynobuttonStatus, setYnobuttonStatus] = useState('')
  const [tableData, setTableData] = useState([])
  const [autoFillData, setAUtoFillData] = useState([])
  const [entityPageID, setEntityPageID] = useState([])
  const [refreshPage, setRefreshPage] = useState(false)
  const [errorTPPin, setErrorTPPin] = useState(false)
  const [errorSPPin, setErrorSPPin] = useState(false)

  const isFocused = useIsFocused()
  //API
  const [getFillingDetails] = useLazyGetFillingDetailsQuery()
  const [getFillingDetailsDelete] = useLazyGetFillingDetailsDeleteQuery()
  const [getFillingDetailsDone] = useLazyGetFillingDetailsDoneQuery()
  const singleServiceListData = useSelector(
    state => state?.home?.singleServiceListData
  )
  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      SPPin: '',
      numTPPin: '',
    },
  })

  const finishLaterDonButtonAction = (postdata: {}) => {
    getFillingDetailsDone(postdata)
      .unwrap()
      .then(response => {
        navigation.goBack()
      })
      .catch(error => {
        console.error('getFillingDetailsDone Error=', error)
        errorMessageToast(error)
      })
  }
  useFocusEffect(
    React.useCallback(() => {
      fecthData()
    }, [isFocused])
  )

  const onSubmit = (formdata: Record<string, string>, isDone: boolean) => {
    if (
      (formdata?.TPPin === undefined ||
        formdata?.TPPin?.length === 0 ||
        formdata?.TPPin?.length == 6) &&
      (formdata?.SPPin === undefined ||
        formdata?.SPPin?.length === 0 ||
        formdata?.SPPin?.length == 6)
    ) {
      finishLaterDoneButtonAction(formdata, isDone)
      setErrorSPPin(false)
      setErrorTPPin(false)
    } else {
      if (
        formdata?.TPPin?.length > 0 &&
        formdata?.TPPin?.length < 6 &&
        formdata?.SPPin?.length > 0 &&
        formdata?.SPPin?.length < 6
      ) {
        setErrorSPPin(true)
        setErrorTPPin(true)
      } else if (formdata?.SPPin?.length > 0 && formdata?.SPPin?.length < 6) {
        setErrorSPPin(true)
        setErrorTPPin(false)
      } else {
        setErrorTPPin(true)
        setErrorSPPin(false)
      }
    }
  }
  const finishLaterDoneButtonAction = (formdata: {}, isDone: boolean) => {
    const data = {
      data: {
        cmbMarriedStatus: autoFillData?.cmbMarriedStatus ?? 'O',
        ynoIDTheft: autoFillData?.ynoIDTheft ?? '',
        numTPPin: isynobuttonStatus === '1' ? formdata?.TPPin : '' ?? '',
        numSPPin: isynobuttonStatus === '1' ? formdata?.SPPin : '' ?? '',
        ynoCheck: isDone ? '1' : '0',
        code: '6006',
      },
      grids: null,
    }
    finishLaterDonButtonAction(data)
  }
  const onError: SubmitErrorHandler<Record<string, string>> = errors => {
    if (isynobuttonStatus !== '1') {
      finishLaterDoneButtonAction({})
    }
  }
  // fetch API call
  const fecthData = () => {
    setFetching(true)
    const postData = {
      id: pageCode,
      data: {},
      headers: JSON.stringify({ data: null, grid: null }),
    }
    getFillingDetails(postData)
      .unwrap()
      .then(response => {
        mapServerData(response)
      })
      .catch(error => {
        console.error('response error===', error)
        setFetching(false)
        errorMessageToast(error)
      })
  }
  useEffect(() => {
    setYnobuttonStatus(
      autoFillData?.ynoIDTheft === 'Y'
        ? '1'
        : autoFillData?.ynoIDTheft === 'N'
        ? '0'
        : ''
    )
  }, [autoFillData, isynobuttonStatus])

  const mapServerData = (response: {}) => {
    setFetching(false)
    const jsonData = JSON.parse(response?.payload)
    const dropdownDefaultValue = marriedStatusMapping(
      jsonData?.miDataModel?.data?.cmbMarriedStatus
    )
    setValue(dropdownDefaultValue)
    const data = jsonData?.navHelper?.pageListItems[0]?.Entities
    setYnobuttonStatus(
      jsonData?.miDataModel?.data?.ynoIDTheft === 'Y'
        ? '1'
        : jsonData?.miDataModel?.data?.ynoIDTheft === 'N'
        ? '0'
        : ''
    )
    setEntityPageID(
      jsonData?.navHelper?.pageListItems[0]?.EntityHelper?.entityPageID ?? ''
    )
    setAUtoFillData(jsonData?.miDataModel?.data)
    reset({ numTPPin: autoFillData?.numTPPin, SPPin: autoFillData?.SPPin })
    addingNameField(data)
    setRefreshPage(true)
  }
  const addingNameField = data => {
    const newData = data
    for (let i = 0; i < data.length; i++) {
      newData[i].name = newData[i].processedFieldValue
    }
    setTableData(newData)
  }
  //Delete
  const deleteRowAPICall = async (item: {}) => {
    setFetching(true)
    const id = pageCode + '/0/' + item.item.entityID + '/' + entityPageID
    const postData = {
      id: id,
      data: {},
      headers: JSON.stringify(getModelJson()),
    }
    getFillingDetailsDelete(postData)
      .unwrap()
      .then(response => {
        setFetching(false)
        fecthData()
      })
      .catch(error => {
        console.error('getFillingDetailsDone Error=', error)
        setFetching(false)
        errorMessageToast(error)
      })
  }

  const getModelJson = () => {
    return {
      data: {
        cmbMarriedStatus: autoFillData?.cmbMarriedStatus ?? 'O',
        ynoIDTheft: autoFillData?.ynoIDTheft ?? '',
        numTPPin: autoFillData?.numTPPin ?? '',
        numSPPin: autoFillData?.numSPPin ?? '',
        ynoCheck: '0',
        code: '6006',
      },
      grids: null,
    }
  }

  function getQuestionaries() {
    return t('fillingdetails:IRS-QUESTION').replace(
      '${YEAR}',
      singleServiceListData?.taxYear
    )
  }
  const rowClick = (data: {}) => {
    const x = entityPageID
    navigation.navigate('AddFinancialScreen', {
      isEdit: true,
      data: data,
      entityPageID: x,
    })
  }
  const dropdownValueChange = (value: string) => {
    const data = autoFillData
    data.cmbMarriedStatus = dropdownData[convertStringToNumber(value)].status
    setValue(dropdownData[convertStringToNumber(value)].value)
    setAUtoFillData(data)
  }
  const YesNoCallback = (state: YesNoResult, data1: YesNoButtonProps) => {
    const data = autoFillData
    if (state === '1') {
      setYnobuttonStatus('1')
      data.ynoIDTheft = 'Y'
    } else if (state === '0') {
      setYnobuttonStatus('0')
      data.ynoIDTheft = 'N'
      reset({ TPPin: '', SPPin: '' })
    } else {
      setYnobuttonStatus('')
      data.ynoIDTheft = ''
    }
    setAUtoFillData(data)
    setRefreshPage(true)
  }
  const deleteRow = item => {
    Alert.alert(
      t('common:DELETE'),
      t('questionnaire:DELETE_ALERT_MESSAGES').replace(
        '${NAME}',
        item?.item?.fieldValue
      ),
      [
        {
          text: t('common:CANCEL'),
          style: 'cancel',
        },
        {
          text: t('common:DELETE'),
          onPress: () => {
            deleteRowAPICall(item)
          },
          style: 'default',
        },
      ]
    )
  }

  const renderDoneButton = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.finishLaterButtonContainer,
            {
              backgroundColor: Colors.white,
            },
          ]}
          onPress={handleSubmit(
            data => onSubmit(data, false),
            errors => onError(errors)
          )}
        >
          <Text
            stylesContainerText={{
              color: Colors.black,
            }}
            testID="Finish_Later"
          >
            {t('common:FINISH_LATER')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.doneButtonContainer,
            {
              backgroundColor: Colors.testColorBlue,
            },
          ]}
          onPress={handleSubmit(
            data => onSubmit(data, true),
            errors => onError(errors)
          )}
        >
          <Text
            stylesContainerText={{
              color: Colors.white,
            }}
            testID="Done"
          >
            {t('common:DONE')}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <ScrollView>
        <View style={styles.container}>
          <Spinner
            visible={isFetching}
            textContent={t('common:LOADING')}
            size={'large'}
            textStyle={loaderStyle.spinnerTextStyle}
          />
          <View style={styles.dropdownStyle}>
            <CustomDropdown
              testID="Marital_Status"
              label={t('fillingdetails:MARITAL_STATUS')}
              control={control}
              name="Marital_Status"
              data={dropdownData}
              dropdownValueChange={value => dropdownValueChange(value)}
              placeholder={value}
            />
          </View>
          {refreshPage && (
            <YesNoButton
              callback={YesNoCallback}
              apiKey="ABCD1_KEY"
              title={getQuestionaries()}
              defaultValue={
                isynobuttonStatus === '1'
                  ? YesNoResult.YES
                  : isynobuttonStatus === '0'
                  ? YesNoResult.NO
                  : YesNoResult.NONE
              }
            />
          )}
          {isynobuttonStatus === '1' && (
            <View style={styles.textfieldViewContainer}>
              <ZipCodeField
                placeholder=""
                control={control}
                max={6}
                min={6}
                name="SPPin"
                label={t('fillingdetails:SPPIN')}
                defaultValue={autoFillData?.numSPPin}
                testID="Taxpayer_issued_PIN"
                error={
                  errorSPPin ? t('fillingdetails:SP_PIN_VALIDATION') : null
                }
                keyboardType="number-pad"
              />
              <View style={{ margin: 5 }} />
              <ZipCodeField
                placeholder=""
                name="TPPin"
                label={t('fillingdetails:TPPIN')}
                defaultValue={autoFillData?.numTPPin}
                control={control}
                max={6}
                min={6}
                error={
                  errorTPPin ? t('fillingdetails:TP_PIN_VALIDATION') : null
                }
                testID="Spouse_issued_PIN"
                keyboardType="number-pad"
              />
            </View>
          )}
          <Text
            stylesContainerText={styles.addFinancialText}
            testID="FINANCIAL_INSTITUTIONS"
          >
            {t('fillingdetails:FINANCIAL-INSTITUTIONS')}
          </Text>
          <Divider />

            <WKSwipeListView
              listData={tableData}
              leftOpenValue={0}
              keyExtractor={item => item?.entityID}
              refreshPage={refreshPage}
              rowClick={data => rowClick(data)}
              deleteRow={data => deleteRow(data)}
              rightOpenValue={-75}
              previewRowKey={'0'}
              previewOpenValue={-40}
            />
            <Divider />
            <TouchableOpacity
              style={styles.addFinancial}
              onPress={() =>
                navigation.navigate('AddFinancialScreen', {
                  isEdit: false,
                  entityPageID: entityPageID,
                })
              }
            >
              <ListItem
                leftSlot={
                  <View>
                    <Text
                      testID={'Add_Financial_Institution'}
                      stylesContainerText={{
                        color: Colors.testColorBlue,
                        fontSize: 16,
                      }}
                    >
                      {t('fillingdetails:ADD-FINANCIAL')}
                    </Text>
                  </View>
                }
                title=""
                rightSlot={
                  <Image
                    style={styles.arrowImage}
                    source={imageConstant.rightArrow}
                  />
                }
              />
            </TouchableOpacity>
            <Divider />
          </View>
      </ScrollView>
      {renderDoneButton()}
    </SafeAreaView>
  )
}

export default FilingDetails
