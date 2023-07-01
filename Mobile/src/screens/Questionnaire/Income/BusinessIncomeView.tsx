import React, { useEffect, useState } from 'react'
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import styles from './styles'
import Text from '../../../theme/common/Text'
import ListItem from '../../../theme/common/ListItem'
import { imageConstant } from '../../../theme/Images'
import { Header } from 'react-native-elements'
import { glbCustomerHeaderOptions, glbStyles } from '../../../../src/styles/global'

import {
  numberOfLineInDescription,
} from '../../../theme/constants'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import { PageCode } from '../../../services/constants/PageCode'
import loaderStyle from '../../Common/LoaderStyle'
import AddIncomeOtherModalBusiness from './AddIncomeOtherModalBusiness'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RenderTheeColumView } from '../../../theme/common/RowWithTwoTextfieldOneText'
import { useForm, SubmitHandler } from 'react-hook-form'

import {
  useLazyGetDetailedDependentDisplayDataQuery,
  useLazyGetGridAPICallQuery,
  useLazyAddGridAPICallQuery,
  useLazyAddDependentPageIntityQuery,
  useLazyAddDetailsDependentPageIntityQuery,
  useLazyEditDependentPageIntityAPIQuery,
} from '../../../services/modules/questionnaire'
import { GridCode } from '../../../services/constants/GridCode'
import { IndividualTileRequest } from 'Mobile/src/services/modules/questionnaire/requestType'
import EmptyAreas from '../BusinessRental/EmptyAreas'
import { formatCurrency } from '../../../../src/theme/common/TextInput/utils'
import { showErrorMessage } from '../../Common/Utils'
import {
  costOfGoldHeading,
  incomeHeading,
  utilBusinessArray,
  utilBusinessArrayBegAll,
  utilBusinessArrayLess,
} from './utilsBusiness'
import WKSwipeListView from "../../../theme/common/SwipeList/WKSwipeListView";

const IncomeScreen = (props: ApplicationScreenProps) => {
  const { navigation, route } = props
  const params = route?.params

  const entityPageID = params?.entityPageID
  const entityID = params?.entityID

  const [isFetching, setFetching] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [gridData, setGridData] = useState([])
  const [screenData, setScreenData] = useState({})
  const [itemData, setItemData] = useState({})

  const [addDependentPageIntity] = useLazyAddDependentPageIntityQuery()
  const [editDependentPageIntityAPI] = useLazyEditDependentPageIntityAPIQuery()
  const [addDetailsDependentPageIntity] =
    useLazyAddDetailsDependentPageIntityQuery()

  const [getDetailedDependentDisplayData] =
    useLazyGetDetailedDependentDisplayDataQuery()
  const [getGridAPICall] = useLazyGetGridAPICallQuery()
  const [addGridAPICall] = useLazyAddGridAPICallQuery()

  const singleServiceListData = useSelector(
    state => state?.home?.singleServiceListData
  )

  const { t } = useTranslation()
  const { control, reset, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      curSales: screenData?.curSales,
      curProSales: screenData?.curProSales,
      curReturns: screenData?.curReturns,
      curProReturns: screenData?.curProReturns,
      curBegInv: screenData?.curBegInv,
      curProBegInv: screenData?.curProBegInv,
      curPurchases: screenData?.curPurchases,
      curProPurchases: screenData?.curProPurchases,
      curLabor: screenData?.curLabor,
      curProLabor: screenData?.curProLabor,
      curMaterials: screenData?.curMaterials,
      curProMaterials: screenData?.curProMaterials,
      curEndInv: screenData?.curEndInv,
      curProEndInv: screenData?.curProEndInv,

      isDirty: 'true',
      code: PageCode.BusinessIncomeDetail,
      entityid: entityID,
    },
  })

  useEffect(() => {
    const endPoitns = `code=${PageCode.BusinessIncomeDetail}&entityId=${entityID}`
    getDetailedDependentDisplayData(endPoitns)
      .unwrap()
      .then(res => {
        const rentalData = JSON.parse(res?.payload).miDataModel?.data

        rentalData.curSales = formatCurrency(rentalData.curSales, true)
        rentalData.curProSales = formatCurrency(rentalData.curProSales, true)
        rentalData.curReturns = formatCurrency(rentalData.curReturns, true)
        rentalData.curProReturns = formatCurrency(
          rentalData.curProReturns,
          true
        )
        rentalData.curBegInv = formatCurrency(rentalData.curBegInv, true)
        rentalData.curProBegInv = formatCurrency(rentalData.curProBegInv, true)
        rentalData.curPurchases = formatCurrency(rentalData.curPurchases, true)
        rentalData.curProPurchases = formatCurrency(
          rentalData.curProPurchases,
          true
        )
        rentalData.curLabor = formatCurrency(rentalData.curLabor, true)
        rentalData.curProLabor = formatCurrency(rentalData.curProLabor, true)
        rentalData.curMaterials = formatCurrency(rentalData.curMaterials, true)
        rentalData.curProMaterials = formatCurrency(
          rentalData.curProMaterials,
          true
        )
        rentalData.curEndInv = formatCurrency(rentalData.curEndInv, true)
        rentalData.curProEndInv = formatCurrency(rentalData.curProEndInv, true)

        reset(rentalData)
        setFetching(false)
      })
      .catch(error => {
        setFetching(false)
      })
  }, [])

  const getGridData = () => {
    setFetching(true)

    const dataPayload: IndividualTileRequest = {
      pageCode: PageCode.OtherBusinessIncome,
      gridCode: GridCode.OtherBusinessIncome,
      entityID: entityID,
    }

    getGridAPICall(dataPayload)
      .unwrap()
      .then(res => {
        setFetching(false)
        setGridData(JSON.parse(res?.payload)?.miDataModel?.grids[0]?.data)
      })
      .catch(error => {
        setFetching(false)
      })
  }

  useEffect(() => {
    getGridData()
  }, [])

  const onPressSaveGrid = data => {
    setShowModal(false)
    const payload = {
      data: {
        code: PageCode.OtherBusinessIncome,
        entityid: entityID,
      },
      grids: [
        {
          data: [
            {
              Description: data?.incomeDescription,
              Amount: data?.incomeAmount,
              'Prior Year': data?.prior,
              IncomeParentId: '',
              id: data?.id == '' ? 'new' : data?.id,
            },
          ],
        },
      ],
    }

    const finalPayload = {
      endPoint: GridCode.OtherBusinessIncome,
      payload: payload,
    }

    addGridDataAPI(finalPayload)
  }

  const addGridDataAPI = finalPayload => {
    addGridAPICall(finalPayload)
      .unwrap()
      .then(res => {
        setShowModal(false)
        getGridData()
      })
      .catch(error => {
        setShowModal(false)
        showErrorMessage(error)
      })
  }

  const deleteIncomeGridAPI = id => {
    const payload = {
      data: {
        code: PageCode.OtherBusinessIncome,
        entityid: entityID,
      },
      grids: [
        {
          data: [
            {
              Description: '',
              Amount: '',
              'Prior Year': '',
              IncomeParentId: '',
              id: id,
            },
          ],
        },
      ],
    }

    const finalPayload = {
      endPoint: GridCode.OtherBusinessIncome,
      payload: payload,
    }
    addGridDataAPI(finalPayload)
  }

  const deleteIncomeGrid = (entityID: string) => {
    deleteIncomeGridAPI(entityID)
  }

  const saveEditAddUpdateData = finalPayload => {
    setFetching(true)
    editDependentPageIntityAPI(finalPayload)
      .unwrap()
      .then(payload => {
        setFetching(false)
        navigation.goBack()
      })
      .catch(error => {
        setFetching(false)
      })
  }
  const addSpace = (margin: number) => {
    return <View style={{ margin: margin ? margin : 5 }}></View>
  }
  const renderItem = ({ item }) => {
    return (
      <View>
        {item?.id != 'new' ? (
          <TouchableOpacity
            onPress={() => {
              setItemData(item), setShowModal(true)
            }}
            style={styles.renderItemBackground}
          >
            <View style={styles.item}>
              <Text
                stylesContainerText={styles.dependentItem}
                children={item?.Description}
                testID="dependent_list_item"
                numberOfLines={numberOfLineInDescription}
              />
              <Image style={styles.img} source={imageConstant.rightArrow} />
            </View>
            <View style={styles.item}>
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

  const cancelClick = () => {
    navigation.goBack()
  }

  const submitIncome: SubmitHandler<
    Record<string, string>
  > = async formdata => {
    if (params?.isAdd) {
      //********************************* Add Income

      addDependentPageIntity(
        JSON.parse(displayDependent?.payload).navHelper?.pageListItems[0]
          ?.EntityHelper?.entityPageID
      )

      const addPayload = {
        entityPageID: entityPageID,
        PageCode: PageCode.BusinessList,
      }

      addDependentPageIntity(addPayload)
        .unwrap()
        .then(res => {
          const SelectedEntityId = JSON.parse(res?.payload)?.selectedEntityId
          const pageCode = JSON.parse(res?.payload)?.navHelper?.pageCode

          const fullURL = `?code=${
            JSON.parse(res?.payload)?.navHelper?.pageCode
          }&entityId=${JSON.parse(res?.payload)?.selectedEntityId}`

          addDetailsDependentPageIntity(fullURL)
            .unwrap()
            .then(res => {
              const editEndpoint = `/${SelectedEntityId}/${PageCode.BusinessDetail}/${SelectedEntityId}`
              const payload = {
                data: {
                  curSales: formdata.curSales,
                  curProSales: formdata.curProSales,
                  curReturns: formdata.curReturns,
                  curProReturns: formdata.curProReturns,
                  curBegInv: formdata.curBegInv,
                  curProBegInv: formdata.curProBegInv,
                  curPurchases: formdata.curPurchases,
                  curProPurchases: formdata.curProPurchases,
                  curLabor: formdata.curLabor,
                  curProLabor: formdata.curProLabor,
                  curMaterials: formdata.curMaterials,
                  curProMaterials: formdata.curProMaterials,
                  curEndInv: formdata.curEndInv,
                  curProEndInv: formdata.curProEndInv,
                  isDirty: 'true',
                  code: PageCode.BusinessIncomeDetail,
                  entityid: SelectedEntityId,
                },
                grids: null,
              }

              const finalPayload = {
                endPoint: editEndpoint,
                headers: JSON.stringify(payload),
                data: {},
              }
              saveEditAddUpdateData(finalPayload)
            })
            .catch(err => {})
        })
        .catch(error => {})
    } else {
      //********************************* Edit Income

      const editEndpoint = `/${entityID}/${PageCode.BusinessDetail}/${entityID}`
      const payload = {
        data: {
          curSales: formdata.curSales,
          curProSales: '',
          curReturns: formdata.curReturns,
          curProReturns: '',
          curBegInv: formdata.curBegInv,
          curProBegInv: '',
          curPurchases: formdata.curPurchases,
          curProPurchases: '',
          curLabor: formdata.curLabor,
          curProLabor: '',
          curMaterials: formdata.curMaterials,
          curProMaterials: '',
          curEndInv: formdata.curEndInv,
          curProEndInv: '',
          isDirty: 'true',
          code: PageCode.BusinessIncomeDetail,
          entityid: entityID,
        },
        grids: null,
      }

      const finalPayload = {
        endPoint: editEndpoint,
        headers: JSON.stringify(payload),
        data: {},
      }
      saveEditAddUpdateData(finalPayload)
    }
  }

  const renderHiddenItem = data => {
    return (
      <View style={styles.rowBack}>
        <View />
        <TouchableOpacity
          style={styles.stylesSwipeViewStyle}
          onPress={() => deleteIncomeGrid(data?.item?.id)}
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

  const renderTheeColumView = num => {
    return (
      <RenderTheeColumView
        control={control}
        index={num}
        disablePriorYearTextField
        data={utilBusinessArrayBegAll}
        isHeader={false}
      />
    )
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Header
        statusBarProps={glbCustomerHeaderOptions}
        leftComponent={
          <TouchableOpacity onPress={cancelClick}>
            <Text
              testID="header_cancel"
              stylesContainerText={glbStyles.headerButtonText}
              children={t('common:CANCEL')}
            />
          </TouchableOpacity>
        }
        centerComponent={
          <View>
            <Text
              testID="header_title"
              stylesContainerText={glbStyles.headerTitle}
              children={t('income:INCOME_(SCHEDULE)')}
            />
            <Text
              testID="header_titile"
              stylesContainerText={glbStyles.headerSubTitle}
              children={route?.params?.selectedItemName}
            />
          </View>
        }
        rightComponent={
          <TouchableOpacity onPress={handleSubmit(submitIncome)}>
            <Text
              testID="header_save"
              stylesContainerText={glbStyles.headerButtonText}
              children={t('common:SAVE')}
            />
          </TouchableOpacity>
        }
        containerStyle={glbStyles.headerContainer}
      />
      <KeyboardAwareScrollView>
        <Spinner
          visible={isFetching}
          textContent={t('common:LOADING')}
          size={'large'}
          textStyle={loaderStyle.spinnerTextStyle}
        />

        <View style={styles.horizontalLine2} />

        <EmptyAreas />

        <View style={styles.incomeMainViewWhite}>
          <RenderTheeColumView
            control={control}
            index={'1'}
            disablePriorYearTextField
            data={incomeHeading}
            isHeader={true}
          />

          <RenderTheeColumView
            control={control}
            index={'1'}
            disablePriorYearTextField
            data={utilBusinessArray}
            isHeader={false}
          />
        </View>
        <EmptyAreas />
        <View style={styles.incomeMainViewWhite}>
          <ListItem
            layout="threeColumn"
            title=""
            description={''}
            leftSlot={
              <View style={styles.leftSlotViewStyle}>
                <Text
                  stylesContainerText={[styles.leftText, styles.textStyleOther]}
                  testID="question_answer_text_id"
                  children={t('income:OTHER_INCOME')}
                />
              </View>
            }
            centerSlot={null}
            rightSlot={null}
          />
          <View style={styles.horizontalLine2} />
        </View>
        <WKSwipeListView
        keyExtractor={item => item?.id}
          listData={gridData}
          refreshPage={isFetching}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-100}
        />
        <View style={styles.item}>
          <Text
            stylesContainerText={styles.dependentItem2}
            children={t('income:ADD_OTHER_INCOME')}
            testID="add_dependent"
            onPress={() => {
              setItemData({
                IncomeParentId: '',
                Description: '',
                Amount: '',
                'Prior Year': '',
                id: '',
              }),
                setShowModal(true)
            }}
            disable={false}
          />
        </View>
        <EmptyAreas />

        <RenderTheeColumView
          control={control}
          index={'1'}
          disablePriorYearTextField
          data={utilBusinessArrayLess}
          isHeader={false}
        />

        <RenderTheeColumView
          control={control}
          index={'1'}
          disablePriorYearTextField
          data={costOfGoldHeading}
          isHeader={true}
        />

        {utilBusinessArrayBegAll.map(person => {
          return renderTheeColumView(person.id)
        })}
      </KeyboardAwareScrollView>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={false}
        presentationStyle="overFullScreen"
        supportedOrientations={['portrait', 'landscape']}
      >
        <AddIncomeOtherModalBusiness
          onPressCancel={() => setShowModal(false)}
          onPressSave={onPressSaveGrid}
          title={t('income:ADD_OTHER_INCOME_Caps')}
          taxYear={singleServiceListData?.taxYear}
          item={itemData}
        />
      </Modal>
    </SafeAreaView>
  )
}
export default IncomeScreen
