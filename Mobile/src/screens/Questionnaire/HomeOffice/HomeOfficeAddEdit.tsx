import { ApplicationScreenProps } from '../../../../@types/navigation'
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'
import styles from '../styles'
import { Header } from 'react-native-elements'
import React, { useEffect, useState } from 'react'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import loaderStyle from '../../Common/LoaderStyle'
import Text from '../../../../src/theme/common/Text'
import EmptyAreas from '../BusinessRental/EmptyAreas'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import TextWithBtn from './TextWithBtn'
import {
  NumberField,
} from '../../../../src/theme/common/TextInput/InputFormComponents'
import { autoDataType, dropdownData } from './Utils'
import ListItem from '../../../../src/theme/common/ListItem'
import {
  YesNoButtonProps,
  YesNoResult,
} from '../../../../src/theme/common/YesNoButton/types'
import YesNoButton from '../../../../src/theme/common/YesNoButton'
import {
  useLazyGetHomeOfficeAddEditQuery,
  useLazyGetHomeOfficeDataQuery,
} from '../../../../src/services/modules/homeOffice'
import { PageCode } from '../../../../src/services/constants/PageCode'
import { convertStringToNumber } from '../../FilingDetails/utils'
import { HomeOfficeRequest } from '../../../../src/store/questionnaire/homeOffice/types'
import { getBusinessHOExp } from '../../../../src/store/questionnaire/homeOffice'
import { imageConstant } from '../../../../src/theme/Images'
import { useFocusEffect } from '@react-navigation/native'
import { glbCustomerHeaderOptions, glbStyles } from '../../../../src/styles/global'
import { CustomDropdown } from '../../../../src/theme/common/CustomDropdown'
import WKSwipeListView from "../../../theme/common/SwipeList/WKSwipeListView";
import {formatCurrency} from "../../../theme/common/TextInput/utils";
import {getUniqueValue} from "../../../theme/Common";

const HomeOfficeAddEdit = ({ navigation, route }: ApplicationScreenProps) => {
  const [isEdit, setIsEdit] = useState(route?.params?.isEdit)
  const resetValue = {
    txtDescription: '',
    txtStatus: '',
    txtSquarefootage: '',
    txtTotalSquarefootage: '',
    txtTotalHours: '',
    ynoDayCare: '',
    ynoImprovment: '',
  }
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const gridCode = route?.params?.gridCode
  const expGridCode = route?.params?.expGridCode
  const expPageCode = route?.params?.expPageCode
  const entityid = route?.params?.entityid
  const entityPageID = route?.params?.entityPageID
  const [isFetching, setIsFetching] = useState(false)
  const selectedItemName = route?.params?.selectedItemName
  const [itemID, setItemId] = useState(route?.params?.itemID)
  const [autoFillData, setAutoFillData] = useState(resetValue)
  const [refreshPage, setRefreshPage] = useState(false)
  const [locationError, setLocationError] = useState(false)
  const [getHomeOfficeData] = useLazyGetHomeOfficeDataQuery()
  const homeOfficeListingData = useSelector(
    state => state?.homeOffice?.businessHomeOffice?.miDataModel?.grids[0]?.data
  )
  const [hoExpArrayList, setHOExpArrayList] = useState('[]')
  const [getHomeOfficeAddEdit] = useLazyGetHomeOfficeAddEditQuery()
  const taxYear = useSelector(state => state?.home?.singleServiceListData)
  const backClick = () => {
    navigation.goBack()
  }
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  })

  useEffect(() => {
    if (homeOfficeListingData.length > 0 && isEdit) {
      const editableData = homeOfficeListingData.filter(object => {
        return object.id === itemID
      })
      if (editableData.length > 0) {
        const autoFillEditValue: autoDataType = {
          txtDescription: editableData[0]['Description'],
          txtStatus: editableData[0]['Status'],
          txtSquarefootage:
            editableData[0]['Area Used Exclusively for Business'],
          txtTotalSquarefootage: editableData[0]['Total Area of Home'],
          txtTotalHours: editableData[0]['Total Hours Facility Used'],
          ynoDayCare: editableData[0]['Used For Daycare'],
          ynoImprovment: editableData[0]['Improvements Made'],
        }
        setAutoFillData(isEdit ? autoFillEditValue :resetValue)
      }
      setRefreshPage(true)
    }
    getExpancesData()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      getExpancesData()
    }, [])
  )

  const getExpancesData = () => {
    const homeOfficeParam = {
      entityPageID: entityPageID,
      pageCode: expPageCode,
      gridCode: expGridCode,
      entityID: entityid,
    } as HomeOfficeRequest
    setIsFetching(true)
    getHomeOfficeData(homeOfficeParam)
      .unwrap()
      .then(data => {
        dispatch(getBusinessHOExp(JSON.parse(data?.payload)))
        const expensItemsList = JSON.parse(data?.payload).miDataModel?.grids[0]
          ?.data
        const expensFilteredItemsList = expensItemsList.filter(object => {
          return object.OfficeParentId === itemID
        })
        setHOExpArrayList(getUniqueValue(expensFilteredItemsList))
        setIsFetching(false)
      })
      .catch(() => {
        setIsFetching(false)
      })
  }
  const YesNoCallback = (state: YesNoResult, data: YesNoButtonProps) => {
    const autoFillDataNew = autoFillData
    switch (data.apiKey) {
      case 'day_care':
        if (state === '1') {
          autoFillDataNew.ynoDayCare = 'Y'
        } else if (state === '0') {
          autoFillDataNew.ynoDayCare = 'N'
        } else {
          autoFillDataNew.ynoDayCare = ''
        }
        setAutoFillData(autoFillDataNew)
        break
      case 'improvment':
        if (state === '1') {
          autoFillDataNew.ynoImprovment = 'Y'
        } else if (state === '0') {
          autoFillDataNew.ynoImprovment = 'N'
        } else {
          autoFillDataNew.ynoImprovment = ''
        }
        setAutoFillData(autoFillDataNew)
        break
    }
  }
  const onError: SubmitErrorHandler<Record<string, string>> = errors => {
    console.error('in error', errors)
    setLocationError(true)
  }
  const saveDetails= async (
    formdata: Record<string, string>,
    isDone: boolean) => {
    callSave(isEdit,isDone, formdata)
  }

  const callSave = (isEdit: boolean,isDone: boolean, formdata: Record<string, string>) => {
    setLocationError(true)
    if(formdata.txtDescription.length>0)
    {
      setLocationError(false)
    }
    const payloadID = {
      data: {
        code: PageCode.BusinessOfficeDetail,
        gridCode: gridCode,
        entityid: entityid,
        isDirty: 'true',
      },
      grids: [
        {
          data: [
            {
              Description: formdata.txtDescription,
              Status: formdata.txtStatus != undefined ? formdata.txtStatus : '',
              'Total Area of Home': formdata.txtTotalSquarefootage,
              'Area Used Exclusively for Business': formdata.txtSquarefootage,
              'Total Hours Facility Used': formdata.txtTotalHours,
              'Used For Daycare':
                autoFillData.ynoDayCare != undefined
                  ? autoFillData.ynoDayCare
                  : '',
              'Improvements Made':
                autoFillData.ynoImprovment != undefined
                  ? autoFillData.ynoImprovment
                  : '',
              id: isEdit ? itemID : 'new',
            },
          ],
        },
      ],
    }
    setIsFetching(true)
    getHomeOfficeAddEdit(payloadID)
      .unwrap()
      .then(response => {
        setRefreshPage(true)
        setIsFetching(false)
        const homeOfficeAddEdit = JSON.parse(response?.payload)?.miDataModel
          ?.grids[0].data
        if (isDone) {
          navigation.goBack()
        } else {
          for (let index = 0; index < homeOfficeAddEdit.length; index++) {
            let isNewItem = false
            for (
              let oldIndex = 0;
              oldIndex < homeOfficeListingData.length;
              oldIndex++
            ) {
              if (
                homeOfficeAddEdit[index].id ===
                homeOfficeListingData[oldIndex].id
              ) {
                isNewItem = false
                break
              } else {
                isNewItem = true
              }
            }
            if (isNewItem) {
              setItemId(homeOfficeAddEdit[index].id)
              setIsEdit(true)
              break
            }
          }
        }
      })
      .catch(error => {
        console.error('error: ' + JSON.stringify(error))
        setIsFetching(false)
      })
  }

  const callDeleteHomeOfficeExpenses = (itemId: string) => {
    const payloadID = {
      data: {
        code: expPageCode,
        entityid: entityid,
        gridCode: expGridCode,
      },
      grids: [
        {
          data: [
            {
              Description: '',
              OfficeParentId: '',
              'Direct Amount': '',
              'Direct Amount - P': '',
              'Indirect Amount': '',
              'Indirect Amount - P': '',
              'Improvements Made': '',
              id: itemId,
            },
          ],
        },
      ],
    }
    setIsFetching(true)
    getHomeOfficeAddEdit(payloadID)
      .unwrap()
      .then(response => {
        setRefreshPage(true)
        getExpancesData()
      })
      .catch(() => {
        setIsFetching(false)
      })
  }
  const getdropdownValue = () => {
    if (autoFillData?.txtStatus.length > 0) {
      return dropdownData[convertStringToNumber(autoFillData?.txtStatus)].value
    }
    return ''
  }

  const dropdownValueChange = (value: string, type: number | null) => {
    const data = autoFillData
    if (type == 0) {
      data.txtStatus = value //accountTypeDropdownData[convertStringToNumber(value)-1].status
    } else {
      data.txtStatus = dropdownData[convertStringToNumber(value) - 1].status
    }
    setAutoFillData(data)
  }
  const callHomeOfficeExpensesAddEdit = () => {
    if (itemID == 0) {
      Alert.alert(t('homeOffice:save_first'), '', [
        {
          text: t('common:OK'),
          style: 'cancel',
        },
      ])
    } else {
      navigation.navigate('HomeOfficeExpense', {
        entityID: entityid,
        expPageCode: expPageCode,
        expGridCode: expGridCode,
        OfficeParentId: itemID,
        expId: '0',
        isEdit: false,
      })
    }
  }
  const expensRenderItem = ({ item }) => {
    return (
      <View style={glbStyles.cutout}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('HomeOfficeExpense', {
              entityID: entityid,
              expPageCode: expPageCode,
              expGridCode: expGridCode,
              OfficeParentId: itemID,
              expId: item.id,
              isEdit: true,
            })
          }}
        >
          <View
            style={item?.Description != '' ? styles.item : styles.blackItem}
          >
            <Text
              stylesContainerText={
                item?.Description != '' ? styles.listitem : styles.blackItem
              }
              children={item?.Description}
              testID="dependent_list_item"
            />
            <Image
              style={styles.img}
              source={
                item?.Description != ''
                  ? imageConstant.rightArrow
                  : styles.blackItem
              }
            />
          </View>
          <View style={styles.row}>
            <View style={styles.expItem}>
              <Text
                stylesContainerText={styles.expListitem}
                children={t('homeOffice:DIRECT_EXPENSE')}
                testID="dependent_list_item"
              />
              <Text
                stylesContainerText={styles.expListsubitem}
                children={formatCurrency(item['Direct Amount'],true)}
                testID="dependent_list_item"
              />
            </View>
            <View style={styles.expItem}>
              <Text
                stylesContainerText={styles.expListitem}
                children={t('homeOffice:INDIRECT_EXPENSE')}
                testID="dependent_list_item"
              />
              <Text
                stylesContainerText={styles.expListsubitem}
                children={formatCurrency(item['Indirect Amount'],true) }
                testID="dependent_list_item"
              />
            </View>
          </View>
          <View
            style={
              item?.Description != '' ? styles.horizontalLine : styles.blackItem
            }
          />
        </TouchableOpacity>
      </View>
    )
  }
  const renderHiddenItem = (data, rowMap) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={styles.stylesSwipeViewStyle}
          onPress={() => {
            confirmationDeleteBusiness(
              t('homeOffice:DELETE_ITEM') + data.item.Description + '?',
              data.item.id
            )
          }}
        >
          <Text
            children={t('common:REMOVE')}
            stylesContainerText={styles.stylesSwipeTextStyle}
            testID="dependent_list_item"
            disable={true}
          />
        </TouchableOpacity>
      </View>
    )
  }
  const confirmationDeleteBusiness = (message: string, itemId: string) => {
    Alert.alert(t('homeOffice:DELETE'), message, [
      {
        text: t('common:NO'),
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: t('common:YES'),
        onPress: () => {
          callDeleteHomeOfficeExpenses(itemId)
        },
        style: 'default',
      },
    ])
  }



  const renderContent = (data: autoDataType) => {
    return (
      <View>
        {EmptyAreas()}
        <TextWithBtn
          control={control}
          name={'txtDescription'}
          label={t('homeOffice:LOCATION')}
          required
          disable={true}
          btntext={'save'}
          maxlength={76}
          error={locationError?t('homeOffice:LOCATION_VALIDATION'):''}
          onPress={handleSubmit(
            data => saveDetails(data, false),
            errors => onError(errors)
          )}
          defaultValue={isEdit ?  data?.txtDescription?.length>0?data?.txtDescription:`Office ${route?.params?.index}` : ''}
        />
        <CustomDropdown
          containerStyle={styles.dropDownContainer}
          control={control}
          name="txtStatus"
          label={t('homeOffice:STATUS')}
          data={dropdownData}
          dropdownValueChange={(value: string | undefined) =>
            dropdownValueChange(value, 0)
          }
          defaultValue={'0'}
          placeholder={isEdit ? getdropdownValue() : ''}
        />
        {EmptyAreas()}
        <Text
          testID="header_home_office_item"
          stylesContainerText={styles.amountTxtStyle}
        >
          {taxYear.taxYear + ' AMOUNT'}
        </Text>
        <View style={styles.horizontalLine} />
        <ListItem
          title=""
          layout="twoColumn"
          leftSlot={
            <View style={styles.leftView}>
              <Text
                stylesContainerText={styles.leftText}
                testID="text_id_did_you_pay"
                children={t('homeOffice:input_text_one')}
              />
            </View>
          }
          rightSlot={
            <View style={styles.rightViewContainer}>
              <NumberField
                placeholder=""
                control={control}
                name="txtSquarefootage"
                label={''}
                max={6}
                defaultValue={isEdit ? data?.txtSquarefootage : ''}
              />
            </View>
          }
        />
        <View style={styles.horizontalLine} />
        <ListItem
          title=""
          layout="twoColumn"
          leftSlot={
            <View style={styles.leftView}>
              <Text
                stylesContainerText={styles.leftText}
                testID="text_id_did_you _pay"
                children={t('homeOffice:input_text_two')}
              />
            </View>
          }
          rightSlot={
            <View style={styles.rightViewContainer}>
              <NumberField
                placeholder=""
                control={control}
                name="txtTotalSquarefootage"
                label={''}
                disabled={false}
                editable={true}
                max={6}
                defaultValue={isEdit ? data?.txtTotalSquarefootage : ''}
              />
            </View>
          }
        />
        <View style={styles.horizontalLine} />
        <ListItem
          title=""
          layout="twoColumn"
          leftSlot={
            <View style={styles.leftView}>
              <Text
                stylesContainerText={styles.leftText}
                testID="text_id_did_you _pay"
                children={t('homeOffice:input_text_three')}
              />
            </View>
          }
          rightSlot={
            <View style={styles.rightViewContainer}>
              <NumberField
                placeholder=""
                control={control}
                name="txtTotalHours"
                label={''}
                max={4}
                disabled={false}
                editable={true}
                defaultValue={isEdit ? data?.txtTotalHours : ''}
              />
            </View>
          }
        />
        <View style={styles.horizontalLine} />
        <YesNoButton
          callback={YesNoCallback}
          apiKey="day_care"
          title={t('homeOffice:input_text_four')}
          defaultValue={
            data?.ynoDayCare === 'Y'
              ? YesNoResult.YES
              : data?.ynoDayCare === 'N'
              ? YesNoResult.NO
              : YesNoResult.NONE
          }
        />
        <View style={styles.horizontalLine} />
        <YesNoButton
          callback={YesNoCallback}
          apiKey="improvment"
          title={t('homeOffice:input_text_five')}
          defaultValue={
            data?.ynoImprovment === 'Y'
              ? YesNoResult.YES
              : data?.ynoImprovment === 'N'
              ? YesNoResult.NO
              : YesNoResult.NONE
          }
        />
        <View style={styles.horizontalLine} />
        <View style={styles.item}>
          <Text
            stylesContainerText={styles.headerText}
            children={t('homeOffice:HOME_OFFICE_EXPENSES')}
            testID="home_office"
            disable={false}
          />
        </View>
        <View style={styles.horizontalLine} />
          <WKSwipeListView
            listData={hoExpArrayList}
            renderItem={expensRenderItem}
            keyExtractor={item => item?.id}
            renderHiddenItem={(data, rowMap) => renderHiddenItem(data, rowMap)}
            leftOpenValue={0}
            rightOpenValue={-100}
          />
        <TouchableOpacity
          onPress={callHomeOfficeExpensesAddEdit}
          style={styles.item}
        >
          <Text
            stylesContainerText={styles.addItem}
            children={t('homeOffice:Add_home_office_expense')}
            testID="add_dependent"
            disable={true}
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
              {selectedItemName == undefined
                ? t('homeOffice:ADD_OFFICE')
                : selectedItemName}
            </Text>
          </View>
        }
        rightComponent={
          <TouchableOpacity onPress={handleSubmit(
            data => saveDetails(data, true),
            errors => onError(errors)
          )}>
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
      <ScrollView style={styles.scrolViewContainer}>
        {refreshPage && renderContent(autoFillData)}
        {!isEdit && renderContent(autoFillData)}
      </ScrollView>
    </SafeAreaView>
  )
}
export default HomeOfficeAddEdit
