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
import ListItem from '../../../theme/common/ListItem'
import Text from '../../../theme/common/Text'
import { imageConstant } from '../../../theme/Images'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import { PageCode } from '../../../services/constants/PageCode'
import loaderStyle from '../../Common/LoaderStyle'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AddIncomeModalBusiness from '../Income/AddIncomeOtherModalBusiness'
import { Header } from 'react-native-elements'
import { glbCustomerHeaderOptions, glbStyles } from '../../../../src/styles/global'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  useLazyGetDetailedDependentDisplayDataQuery,
  useLazyGetGridAPICallQuery,
  useLazyAddGridAPICallQuery,
  useLazyEditDependentPageIntityAPIQuery,
} from '../../../services/modules/questionnaire'
import { GridCode } from '../../../services/constants/GridCode'
import { IndividualTileRequest } from 'Mobile/src/services/modules/questionnaire/requestType'
import { formatCurrency } from '../../../../src/theme/common/TextInput/utils'
import {
  numberOfLineInDescription,
} from '../../../../src/theme/constants'
import EmptyAreas from '../BusinessRental/EmptyAreas'
import { RenderTheeColumView } from '../../../theme/common/RowWithTwoTextfieldOneText'
import { utilsFarmsAll } from './utilsFarms'
import { incomeHeading } from '../Income/utilsBusiness'
import { errorMessageToast } from '../../Error/utils'

import WKSwipeListView from "../../../theme/common/SwipeList/WKSwipeListView";
const FarmExpensesScreen = (props: ApplicationScreenProps) => {
  const { navigation, route } = props
  const params = route?.params
  const entityID = params?.entityID

  const [isFetching, setFetching] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [gridData, setGridData] = useState([])
  const [itemData, setItemData] = useState({})

  const [editDependentPageIntityAPI] = useLazyEditDependentPageIntityAPIQuery()

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
      curChemicals: '',
      curProChemicals: '',
      curConservation: '',
      curProConservation: '',
      curHire: '',
      curProHire: '',
      curEmpBenefit: '',
      curProEmpBenefit: '',
      curFeed: '',
      curProFeed: '',
      curFertilizer: '',
      curProFertilizer: '',
      curFreight: '',
      curProFreight: '',
      curGas: '',
      curProGas: '',
      curIns: '',
      curProIns: '',
      curIntMort: '',
      curProIntMort: '',
      curIntOther: '',
      curProIntOther: '',
      curLabor: '',
      curProLabor: '',
      curPensionPlan: '',
      curProPensionPlan: '',
      curRentOther: '',
      curProRentOther: '',
      curRepairs: '',
      curProRepairs: '',
      curSeeds: '',
      curProSeeds: '',
      curStorage: '',
      curProStorage: '',
      curSupplies: '',
      curProSupplies: '',
      curMeals: '',
      curProMeals: '',
      curUtilities: '',
      curProUtilities: '',
      curTaxes: '',
      curProTaxes: '',
      curVet: '',
      curProVet: '',
      curCapExp: '',
      curProCapExp: '',
      curDepCareBen: '',
      curProDepCareBen: '',
      curCarExp: '',
      curProCarExp: '',
      curRentEquipment: '',
      curProRentEquipment: '',
    },
  })

  const renderTheeColumView = num => {
    return (
      <RenderTheeColumView
        control={control}
        index={num}
        disablePriorYearTextField
        data={utilsFarmsAll}
      />
    )
  }
  useEffect(() => {
    const endPoitns = `code=${PageCode.BusinessFarmExpenseDetails}&entityId=${entityID}`
    getDetailedDependentDisplayData(endPoitns)
      .unwrap()
      .then(res => {
        const farmExpenses = JSON.parse(res?.payload).miDataModel?.data
        farmExpenses.curChemicals = formatCurrency(
          farmExpenses.curChemicals,
          true
        )
        farmExpenses.curProChemicals = formatCurrency(
          farmExpenses.curProChemicals,
          true
        )
        farmExpenses.curConservation = formatCurrency(
          farmExpenses.curConservation,
          true
        )
        farmExpenses.curProConservation = formatCurrency(
          farmExpenses.curProConservation,
          true
        )
        farmExpenses.curHire = formatCurrency(farmExpenses.curHire, true)
        farmExpenses.curProHire = formatCurrency(farmExpenses.curProHire, true)
        farmExpenses.curEmpBenefit = formatCurrency(
          farmExpenses.curEmpBenefit,
          true
        )
        farmExpenses.curProEmpBenefit = formatCurrency(
          farmExpenses.curProEmpBenefit,
          true
        )
        farmExpenses.curFeed = formatCurrency(farmExpenses.curFeed, true)
        farmExpenses.curProFeed = formatCurrency(farmExpenses.curProFeed, true)
        farmExpenses.curFertilizer = formatCurrency(
          farmExpenses.curFertilizer,
          true
        )
        farmExpenses.curProFertilizer = formatCurrency(
          farmExpenses.curProFertilizer,
          true
        )
        farmExpenses.curFreight = formatCurrency(farmExpenses.curFreight, true)
        farmExpenses.curProFreight = formatCurrency(
          farmExpenses.curProFreight,
          true
        )
        farmExpenses.curGas = formatCurrency(farmExpenses.curGas, true)
        farmExpenses.curProGas = formatCurrency(farmExpenses.curProGas, true)
        farmExpenses.curIns = formatCurrency(farmExpenses.curIns, true)
        farmExpenses.curProIns = formatCurrency(farmExpenses.curProIns, true)
        farmExpenses.curIntMort = formatCurrency(farmExpenses.curIntMort, true)
        farmExpenses.curProIntMort = formatCurrency(
          farmExpenses.curProIntMort,
          true
        )
        farmExpenses.curIntOther = formatCurrency(
          farmExpenses.curIntOther,
          true
        )
        farmExpenses.curProIntOther = formatCurrency(
          farmExpenses.curProIntOther,
          true
        )
        farmExpenses.curLabor = formatCurrency(farmExpenses.curLabor, true)
        farmExpenses.curProLabor = formatCurrency(
          farmExpenses.curProLabor,
          true
        )
        farmExpenses.curPensionPlan = formatCurrency(
          farmExpenses.curPensionPlan,
          true
        )
        farmExpenses.curProPensionPlan = formatCurrency(
          farmExpenses.curProPensionPlan,
          true
        )
        farmExpenses.curRentOther = formatCurrency(
          farmExpenses.curRentOther,
          true
        )
        farmExpenses.curProRentOther = formatCurrency(
          farmExpenses.curProRentOther,
          true
        )
        farmExpenses.curRepairs = formatCurrency(farmExpenses.curRepairs, true)
        farmExpenses.curProRepairs = formatCurrency(
          farmExpenses.curProRepairs,
          true
        )
        farmExpenses.curSeeds = formatCurrency(farmExpenses.curSeeds, true)
        farmExpenses.curProSeeds = formatCurrency(
          farmExpenses.curProSeeds,
          true
        )
        farmExpenses.curStorage = formatCurrency(farmExpenses.curStorage, true)
        farmExpenses.curProStorage = formatCurrency(
          farmExpenses.curProStorage,
          true
        )
        farmExpenses.curSupplies = formatCurrency(
          farmExpenses.curSupplies,
          true
        )
        farmExpenses.curProSupplies = formatCurrency(
          farmExpenses.curProSupplies,
          true
        )
        farmExpenses.curMeals = formatCurrency(farmExpenses.curMeals, true)
        farmExpenses.curProMeals = formatCurrency(
          farmExpenses.curProMeals,
          true
        )
        farmExpenses.curUtilities = formatCurrency(
          farmExpenses.curUtilities,
          true
        )
        farmExpenses.curProUtilities = formatCurrency(
          farmExpenses.curProUtilities,
          true
        )
        farmExpenses.curTaxes = formatCurrency(farmExpenses.curTaxes, true)
        farmExpenses.curProTaxes = formatCurrency(
          farmExpenses.curProTaxes,
          true
        )
        farmExpenses.curVet = formatCurrency(farmExpenses.curVet, true)
        farmExpenses.curProVet = formatCurrency(farmExpenses.curProVet, true)
        farmExpenses.curCapExp = formatCurrency(farmExpenses.curCapExp, true)
        farmExpenses.curProCapExp = formatCurrency(
          farmExpenses.curProCapExp,
          true
        )
        farmExpenses.curDepCareBen = formatCurrency(
          farmExpenses.curDepCareBen,
          true
        )
        farmExpenses.curProDepCareBen = formatCurrency(
          farmExpenses.curProDepCareBen,
          true
        )
        farmExpenses.curCarExp = formatCurrency(farmExpenses.curCarExp, true)
        farmExpenses.curProCarExp = formatCurrency(
          farmExpenses.curProCarExp,
          true
        )
        farmExpenses.curRentEquipment = formatCurrency(
          farmExpenses.curRentEquipment,
          true
        )
        farmExpenses.curProRentEquipment = formatCurrency(
          farmExpenses.curProRentEquipment,
          true
        )

        reset(farmExpenses)

        setFetching(false)
      })
      .catch(error => {
        setFetching(false)
        errorMessageToast(error)
      })
  }, [])

  const getGridData = () => {
    setFetching(true)

    const dataPayload: IndividualTileRequest = {
      pageCode: PageCode.BusinessFarmOtherExpensesDetail,
      gridCode: GridCode.BusinessFarmOtherExpenses,
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
    setShowModal(false)
    const payload = {
      data: {
        code: PageCode.BusinessFarmOtherExpensesDetail,
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
      endPoint: GridCode.BusinessFarmOtherExpenses,
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
        errorMessageToast(error)
      })
  }

  const deleteIncomeGridAPI = id => {
    const payload = {
      data: {
        code: PageCode.BusinessFarmOtherExpensesDetail,
        entityid: entityID,
      },
      grids: [
        {
          data: [
            {
              Description: '',
              Amount: '',
              'Prior Year': '',
              id: id,
            },
          ],
        },
      ],
    }

    const finalPayload = {
      endPoint: GridCode.BusinessFarmOtherExpenses,
      payload: payload,
    }
    addGridDataAPI(finalPayload)
  }

  const deleteIncomeGrid = (entityID: string) => {
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

  const submitIncome: SubmitHandler<
    Record<string, string>
  > = async formdata => {
    if (!params?.isAdd) {
      //********************************* Edit Income
      setFetching(true)
      const editEndpoint = `/${entityID}/${PageCode.BusinessFarmOtherExpenses}/${entityID}`
      const payload = {
        data: {
          curChemicals: formdata?.curChemicals,
          curProChemicals: formdata?.curProChemicals,
          curConservation: formdata?.curConservation,
          curProConservation: formdata?.curProConservation,
          curHire: formdata?.curHire,
          curProHire: formdata?.curProHire,
          curEmpBenefit: formdata?.curEmpBenefit,
          curProEmpBenefit: formdata?.curProEmpBenefit,
          curFeed: formdata?.curFeed,
          curProFeed: formdata?.curProFeed,
          curFertilizer: formdata?.curFertilizer,
          curProFertilizer: formdata?.curProFertilizer,
          curFreight: formdata?.curFreight,
          curProFreight: formdata?.curProFreight,
          curGas: formdata?.curGas,
          curProGas: formdata?.curProGas,
          curIns: formdata?.curIns,
          curProIns: formdata?.curProIns,
          curIntMort: formdata?.curIntMort,
          curProIntMort: formdata?.curProIntMort,
          curIntOther: formdata?.curIntOther,
          curProIntOther: formdata?.curProIntOther,
          curLabor: formdata?.curLabor,
          curProLabor: formdata?.curProLabor,
          curPensionPlan: formdata?.curPensionPlan,
          curProPensionPlan: formdata?.curProPensionPlan,
          curRentOther: formdata?.curRentOther,
          curProRentOther: formdata?.curProRentOther,
          curRepairs: formdata?.curRepairs,
          curProRepairs: formdata?.curProRepairs,
          curSeeds: formdata?.curSeeds,
          curProSeeds: formdata?.curProSeeds,
          curStorage: formdata?.curStorage,
          curProStorage: formdata?.curProStorage,
          curSupplies: formdata?.curSupplies,
          curProSupplies: formdata?.curProSupplies,
          curMeals: formdata?.curMeals,
          curProMeals: formdata?.curProMeals,
          curUtilities: formdata?.curUtilities,
          curProUtilities: formdata?.curProUtilities,
          curTaxes: formdata?.curTaxes,
          curProTaxes: formdata?.curProTaxes,
          curVet: formdata?.curVet,
          curProVet: formdata?.curProVet,
          curCapExp: formdata?.curCapExp,
          curProCapExp: formdata?.curProCapExp,
          curDepCareBen: formdata?.curDepCareBen,
          curProDepCareBen: formdata?.curProDepCareBen,
          curCarExp: formdata?.curCarExp,
          curProCarExp: formdata?.curProCarExp,
          curRentEquipment: formdata?.curRentEquipment,
          curProRentEquipment: formdata?.curProRentEquipment,

          isDirty: 'true',
          code: PageCode.BusinessFarmExpenseDetails,
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
              {t('expenses:EXPENSES_(SCHEDULE_F)')}
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
        <EmptyAreas />
        <Spinner
          visible={isFetching}
          textContent={t('common:LOADING')}
          size={'large'}
          textStyle={loaderStyle.spinnerTextStyle}
        />
        <View style={styles.incomeMainViewWhite}>
          <RenderTheeColumView
            control={control}
            index={'1'}
            disablePriorYearTextField
            data={incomeHeading}
            isHeader={true}
          />
        </View>

        {utilsFarmsAll.map(person => {
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
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default FarmExpensesScreen
