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
import { Header } from 'react-native-elements'
import { imageConstant } from '../../../theme/Images'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import { PageCode } from '../../../services/constants/PageCode'
import loaderStyle from '../../Common/LoaderStyle'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AddIncomeModalBusiness from '../Income/AddIncomeOtherModalBusiness'
import { useForm, SubmitHandler } from 'react-hook-form'
import { formatCurrency } from '../../../../src/theme/common/TextInput/utils'
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
import { glbCustomerHeaderOptions, glbStyles } from '../../../../src/styles/global'
import EmptyAreas from '../BusinessRental/EmptyAreas'
import { RenderTheeColumView } from '../../../theme/common/RowWithTwoTextfieldOneText'
import { utilsExpensesAll } from './utilsBusiness'
import { expensesdHeading } from '../Income/utilsBusiness'
import { errorMessageToast } from '../../Error/utils'
import WKSwipeListView from '../../../../src/theme/common/SwipeList/WKSwipeListView'

const BusinessExpensesScreen = (props: ApplicationScreenProps) => {
  const { navigation, route } = props
  const params = route?.params
  const [isRefreshSwipe, setIsRefreshSwipe] = useState(true)
  const entityPageID = params?.entityPageID
  const entityID = params?.entityID

  const [isFetching, setFetching] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [gridData, setGridData] = useState([])
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
  const { control, reset, handleSubmit, getValues } = useForm({
    mode: 'onBlur',
  })

  useEffect(() => {
    const endPoitns = `code=${PageCode.BusinessExpensesDetail}&entityId=${entityID}`
    getDetailedDependentDisplayData(endPoitns)
      .unwrap()
      .then(res => {
        const expnsesData = JSON.parse(res?.payload).miDataModel?.data
        expnsesData.curAdvertising = formatCurrency(
          expnsesData.curAdvertising,
          true
        )
        expnsesData.curProAdvertising = formatCurrency(
          expnsesData.curProAdvertising,
          true
        )
        expnsesData.curCar = formatCurrency(expnsesData.curCar, true)
        expnsesData.curProCar = formatCurrency(expnsesData.curProCar, true)
        expnsesData.curTolls = formatCurrency(expnsesData.curTolls, true)
        expnsesData.curProTolls = formatCurrency(expnsesData.curProTolls, true)
        expnsesData.curFees = formatCurrency(expnsesData.curFees, true)
        expnsesData.curProFees = formatCurrency(expnsesData.curProFees, true)
        expnsesData.curLabor = formatCurrency(expnsesData.curLabor, true)
        expnsesData.curProLabor = formatCurrency(expnsesData.curProLabor, true)
        expnsesData.curEmployeeBen = formatCurrency(
          expnsesData.curEmployeeBen,
          true
        )
        expnsesData.curProEmployeeBen = formatCurrency(
          expnsesData.curProEmployeeBen,
          true
        )
        expnsesData.curInsurance = formatCurrency(
          expnsesData.curInsurance,
          true
        )
        expnsesData.curProInsurance = formatCurrency(
          expnsesData.curProInsurance,
          true
        )
        expnsesData.curMortInt = formatCurrency(expnsesData.curMortInt, true)
        expnsesData.curProMortInt = formatCurrency(
          expnsesData.curProMortInt,
          true
        )
        expnsesData.curOtherInt = formatCurrency(expnsesData.curOtherInt, true)
        expnsesData.curProOtherInt = formatCurrency(
          expnsesData.curProOtherInt,
          true
        )
        expnsesData.curLegalProf = formatCurrency(
          expnsesData.curLegalProf,
          true
        )
        expnsesData.curProLegalProf = formatCurrency(
          expnsesData.curProLegalProf,
          true
        )
        expnsesData.curOffice = formatCurrency(expnsesData.curOffice, true)
        expnsesData.curProOffice = formatCurrency(
          expnsesData.curProOffice,
          true
        )
        expnsesData.curProfitPlan = formatCurrency(
          expnsesData.curProfitPlan,
          true
        )
        expnsesData.curProProfitPlan = formatCurrency(
          expnsesData.curProProfitPlan,
          true
        )
        expnsesData.curRentEquipmt = formatCurrency(
          expnsesData.curRentEquipmt,
          true
        )
        expnsesData.curProRentEquipmt = formatCurrency(
          expnsesData.curProRentEquipmt,
          true
        )
        expnsesData.curRentOther = formatCurrency(
          expnsesData.curRentOther,
          true
        )

        expnsesData.curProRentOther = formatCurrency(
          expnsesData.curProRentOther,
          true
        )

        expnsesData.curRepairs = formatCurrency(expnsesData.curRepairs, true)
        expnsesData.curProRepairs = formatCurrency(
          expnsesData.curProRepairs,
          true
        )
        expnsesData.curSupplies = formatCurrency(expnsesData.curSupplies, true)
        expnsesData.curProSupplies = formatCurrency(
          expnsesData.curProSupplies,
          true
        )
        expnsesData.curTaxes = formatCurrency(expnsesData.curTaxes, true)
        expnsesData.curProTaxes = formatCurrency(expnsesData.curProTaxes, true)
        expnsesData.curTravel = formatCurrency(expnsesData.curTravel, true)
        expnsesData.curProTravel = formatCurrency(
          expnsesData.curProTravel,
          true
        )
        expnsesData.curMeals = formatCurrency(expnsesData.curMeals, true)
        expnsesData.curProMeals = formatCurrency(expnsesData.curProMeals, true)
        expnsesData.curUtilities = formatCurrency(
          expnsesData.curUtilities,
          true
        )
        expnsesData.curProUtilities = formatCurrency(
          expnsesData.curProUtilities,
          true
        )
        expnsesData.curWages = formatCurrency(expnsesData.curWages, true)
        expnsesData.curProWages = formatCurrency(expnsesData.curProWages, true)
        expnsesData.curDepBen = formatCurrency(expnsesData.curDepBen, true)
        expnsesData.curProDepBen = formatCurrency(
          expnsesData.curProDepBen,
          true
        )

        setFetching(false)
        reset(expnsesData)
      })
      .catch(error => {
        setFetching(false)
        errorMessageToast(error)
      })
  }, [])

  const getGridData = () => {
    setFetching(true)

    const dataPayload: IndividualTileRequest = {
      pageCode: PageCode.OtherBusinessIncome,
      gridCode: GridCode.OtherBusinessExpenses,
      entityID: entityID,
    }

    getGridAPICall(dataPayload)
      .unwrap()
      .then(res => {
        setFetching(false)
        setGridData(JSON.parse(res?.payload).miDataModel?.grids[0].data)
      })
      .catch(error => {
        setFetching(false)
        errorMessageToast(error)
      })
  }

  useEffect(() => {
    getGridData()
  }, [])

  const onPressSaveGrid = data => {
    setIsRefreshSwipe(false)
    setShowModal(false)
    const payload = {
      data: {
        code: PageCode.OtherBusinessExpenses,
        entityid: entityID,
        isDirty: 'true',
      },
      grids: [
        {
          data: [
            {
              Description: data?.incomeDescription,
              Amount: data?.incomeAmount,
              'Prior Year': data?.prior,
              id: data?.id == '' ? 'new' : data?.id,
            },
          ],
        },
      ],
    }

    const finalPayload = {
      endPoint: GridCode.OtherBusinessExpenses,
      payload: payload,
    }
    addGridDataAPI(finalPayload)
  }

  const addGridDataAPI = finalPayload => {
    addGridAPICall(finalPayload)
      .unwrap()
      .then(res => {
        setShowModal(false)
        setIsRefreshSwipe(true)
        getGridData()
      })
      .catch(error => {
        setShowModal(false)
        errorMessageToast(error)
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
      endPoint: GridCode.OtherBusinessExpenses,
      payload: payload,
    }
    addGridDataAPI(finalPayload)
  }

  const deleteIncomeGrid = (entityID: string) => {
    setIsRefreshSwipe(false)
    deleteIncomeGridAPI(entityID)
  }

  const saveEditAddUpdateData = finalPayload => {
    editDependentPageIntityAPI(finalPayload)
      .unwrap()
      .then(payload => {
        setFetching(false)
        navigation.goBack()
      })
      .catch(error => {
        setFetching(false)
        errorMessageToast(error)
      })
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
                numberOfLines={1}
                stylesContainerText={styles.dependentItem}
                children={item?.Description}
                testID="dependent_list_item"
              />
              <Image style={styles.img} source={imageConstant.rightArrow} />
            </View>
            <View style={styles.item}>
              <View style={styles.flatListItemLeft}>
                <Text
                  stylesContainerText={styles.dependentItemDetails}
                  children={`${singleServiceListData?.taxYear} ${t(
                    'expenses:AMOUNT'
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
                  children={
                    t('expenses:PRIOR_YEAR') + ' ' + t('expenses:AMOUNT')
                  }
                  testID="dependent_list_item"
                />
                <Text
                  stylesContainerText={styles.dependentItemDetailsRight}
                  children={formatCurrency(item?.['Prior Year'], true)}
                  testID="dependent_list_item"
                />
              </View>
            </View>
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

  const cancelClick = () => {
    navigation.goBack()
  }

  const renderTheeColumView = num => {
    return (
      <RenderTheeColumView
        control={control}
        index={num}
        disablePriorYearTextField
        data={utilsExpensesAll}
      />
    )
  }

  const submitIncome: SubmitHandler<
    Record<string, string>
  > = async formdata => {
    if (!params?.isAdd) {
      //********************************* Edit Income
      setFetching(true)
      const editEndpoint = `/${entityID}/${PageCode.BusinessDetail}/${entityID}`
      const payload = {
        data: {
          curAdvertising: formdata?.curAdvertising,
          curProAdvertising: formdata?.curProAdvertising,
          curCar: formdata?.curCar,
          curProCar: formdata?.curProCar,
          curTolls: formdata?.curTolls,
          curProTolls: formdata?.curProTolls,
          curFees: formdata?.curFees,
          curProFees: formdata?.curProFees,
          curLabor: formdata?.curLabor,
          curProLabor: formdata?.curProLabor,
          curEmployeeBen: formdata?.curEmployeeBen,
          curProEmployeeBen: formdata?.curProEmployeeBen,
          curInsurance: formdata?.curInsurance,
          curProInsurance: formdata?.curProInsurance,
          curMortInt: formdata?.curMortInt,
          curProMortInt: formdata?.curProMortInt,
          curOtherInt: formdata?.curOtherInt,
          curProOtherInt: formdata?.curProOtherInt,
          curLegalProf: formdata?.curLegalProf,
          curProLegalProf: formdata?.curProLegalProf,
          curOffice: formdata?.curOffice,
          curProOffice: formdata?.curProOffice,
          curProfitPlan: formdata?.curProfitPlan,
          curProProfitPlan: formdata?.curProProfitPlan,
          curRentEquipmt: formdata?.curRentEquipmt,
          curProRentEquipmt: formdata?.curProRentEquipmt,
          curRentOther: formdata?.curRentOther,
          curProRentOther: formdata?.curProRentOther,
          curRepairs: formdata?.curRepairs,
          curProRepairs: formdata?.curProRepairs,
          curSupplies: formdata?.curSupplies,
          curProSupplies: formdata?.curProSupplies,
          curTaxes: formdata?.curTaxes,
          curProTaxes: formdata?.curProTaxes,
          curTravel: formdata?.curTravel,
          curProTravel: formdata?.curProTravel,
          curMeals: formdata?.curMeals,
          curProMeals: formdata?.curProMeals,
          curUtilities: formdata?.curUtilities,
          curProUtilities: formdata?.curProUtilities,
          curWages: formdata?.curWages,
          curProWages: formdata?.curProWages,
          curDepBen: formdata?.curDepBen,
          curProDepBen: formdata?.curProDepBen,

          isDirty: 'true',
          code: PageCode.BusinessExpensesDetail,
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
              {t('expenses:EXPENSES_(SCHEDULE)')}
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
          <TouchableOpacity onPress={handleSubmit(submitIncome)}>
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

      <KeyboardAwareScrollView>
        <Spinner
          visible={isFetching}
          textContent={t('common:LOADING')}
          size={'large'}
          textStyle={loaderStyle.spinnerTextStyle}
        />
        <EmptyAreas />
        <View style={styles.incomeMainViewWhite}>
          <RenderTheeColumView
            control={control}
            index={'1'}
            disablePriorYearTextField
            data={expensesdHeading}
            isHeader={true}
          />
        </View>

        {utilsExpensesAll.map(person => {
          return renderTheeColumView(person.id)
        })}

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
                  children={t('expenses:OTHER_EXPENSES')}
                />
              </View>
            }
            centerSlot={null}
            rightSlot={null}
          />
          <View style={styles.horizontalLine2} />
        </View>

        <WKSwipeListView
          listData={gridData}
          keyExtractor={item => item?.id}
          refreshPage={isFetching}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-100}
        />

        <View style={styles.item}>
          <Text
            stylesContainerText={styles.dependentItem2}
            children={t('expenses:ADD_OTHER_EXPENSES')}
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
        <View style={styles.empty50} />
      </KeyboardAwareScrollView>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={false}
        presentationStyle="overFullScreen"
        supportedOrientations={['portrait', 'landscape']}
      >
        <AddIncomeModalBusiness
          onPressCancel={() => setShowModal(false)}
          onPressSave={onPressSaveGrid}
          title={t('expenses:ADD_OTHER_EXPENSES_C')}
          taxYear={singleServiceListData?.taxYear}
          item={itemData}
        />
      </Modal>
    </SafeAreaView>
  )
}
export default BusinessExpensesScreen
