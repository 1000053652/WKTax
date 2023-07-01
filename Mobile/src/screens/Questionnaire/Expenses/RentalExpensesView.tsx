import React, { useEffect, useState } from 'react'
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native'
import { Header } from 'react-native-elements'
import { glbCustomerHeaderOptions, glbStyles } from '../../../../src/styles/global'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import styles from './styles'
import Text from '../../../theme/common/Text'
import ListItem from '../../../theme/common/ListItem'
import { SwipeListView } from 'react-native-swipe-list-view'
import { imageConstant } from '../../../theme/Images'
import { numberOfLineInDescription } from '../../../theme/constants'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import { PageCode } from '../../../services/constants/PageCode'
import loaderStyle from '../../Common/LoaderStyle'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AddIncomeModal from '../Income/AddIncomeOtherModal'
import { formatCurrency } from '../../../../src/theme/common/TextInput/utils'
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
import { IndividualTileRequest } from '../../../../src/services/modules/questionnaire/requestType'
import EmptyAreas from '../BusinessRental/EmptyAreas'
import { RenderTheeColumView } from '../../../../src/theme/common/RowWithTwoTextfieldOneText'
import { utilsExpensesRentalAll } from './utilsRental'
import { expensesdHeading } from '../Income/utilsBusiness'
import { errorMessageToast } from '../../Error/utils'

import WKSwipeListView from '../../../theme/common/SwipeList/WKSwipeListView'

const RentalExpensesScreen = (props: ApplicationScreenProps) => {
  const { navigation, route } = props
  const params = route?.params

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
  const { control, reset, handleSubmit } = useForm({
    mode: 'onBlur',

    defaultValues: {
      curAdvertising: '',
      curProAdvertising: '',
      curAuto: '',
      curProAuto: '',
      curMaint: '',
      curProMaint: '',
      curComm: '',
      curProComm: '',
      curMortIntBank: '',
      curProMortIntBank: '',
      curLegalFees: '',
      curProLegalFees: '',
      curMortIntInd: '',
      curProMortIntInd: '',
      curOtherInt: '',
      curProOtherInt: '',
      curManageFees: '',
      curProManageFees: '',
      curRepairs: '',
      curProRepairs: '',
      curSupplies: '',
      curProSupplies: '',
      curTaxes: '',
      curProTaxes: '',
      curUtilities: '',
      curProUtilities: '',
      curEmpBenefits: '',
      curProEmpBenefits: '',
      curDepCareBen: '',
      curProDepCareBen: '',
      curInsurance: '',
      curProInsurance: '',
    },
  })

  useEffect(() => {
    const endPoitns = `code=${PageCode.BusinessRentalExpenseDetails}&entityId=${entityID}`
    getDetailedDependentDisplayData(endPoitns)
      .unwrap()
      .then(res => {
        const expensesData = JSON.parse(res?.payload).miDataModel?.data
        expensesData.curAdvertising = formatCurrency(
          expensesData.curAdvertising,
          true
        )
        expensesData.curProAdvertising = formatCurrency(
          expensesData.curProAdvertising,
          true
        )
        expensesData.curAuto = formatCurrency(expensesData.curAuto, true)
        expensesData.curProAuto = formatCurrency(expensesData.curProAuto, true)
        expensesData.curMaint = formatCurrency(expensesData.curMaint, true)
        expensesData.curProMaint = formatCurrency(
          expensesData.curProMaint,
          true
        )
        expensesData.curComm = formatCurrency(expensesData.curComm, true)
        expensesData.curProComm = formatCurrency(expensesData.curProComm, true)
        expensesData.curMortIntBank = formatCurrency(
          expensesData.curMortIntBank,
          true
        )
        expensesData.curProMortIntBank = formatCurrency(
          expensesData.curProMortIntBank,
          true
        )
        expensesData.curLegalFees = formatCurrency(
          expensesData.curLegalFees,
          true
        )
        expensesData.curProLegalFees = formatCurrency(
          expensesData.curProLegalFees,
          true
        )
        expensesData.curMortIntInd = formatCurrency(
          expensesData.curMortIntInd,
          true
        )
        expensesData.curProMortIntInd = formatCurrency(
          expensesData.curProMortIntInd,
          true
        )
        expensesData.curOtherInt = formatCurrency(
          expensesData.curOtherInt,
          true
        )
        expensesData.curProOtherInt = formatCurrency(
          expensesData.curProOtherInt,
          true
        )
        expensesData.curManageFees = formatCurrency(
          expensesData.curManageFees,
          true
        )
        expensesData.curProManageFees = formatCurrency(
          expensesData.curProManageFees,
          true
        )
        expensesData.curRepairs = formatCurrency(expensesData.curRepairs, true)
        expensesData.curProRepairs = formatCurrency(
          expensesData.curProRepairs,
          true
        )
        expensesData.curSupplies = formatCurrency(
          expensesData.curSupplies,
          true
        )
        expensesData.curProSupplies = formatCurrency(
          expensesData.curProSupplies,
          true
        )
        expensesData.curTaxes = formatCurrency(expensesData.curTaxes, true)
        expensesData.curProTaxes = formatCurrency(
          expensesData.curProTaxes,
          true
        )
        expensesData.curUtilities = formatCurrency(
          expensesData.curUtilities,
          true
        )
        expensesData.curProUtilities = formatCurrency(
          expensesData.curProUtilities,
          true
        )
        expensesData.curEmpBenefits = formatCurrency(
          expensesData.curEmpBenefits,
          true
        )
        expensesData.curProEmpBenefits = formatCurrency(
          expensesData.curProEmpBenefits,
          true
        )
        expensesData.curDepCareBen = formatCurrency(
          expensesData.curDepCareBen,
          true
        )
        expensesData.curProDepCareBen = formatCurrency(
          expensesData.curProDepCareBen,
          true
        )
        expensesData.curInsurance = formatCurrency(
          expensesData.curInsurance,
          true
        )
        expensesData.curProInsurance = formatCurrency(
          expensesData.curProInsurance,
          true
        )

        reset(expensesData)

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
      pageCode: PageCode.BusinessRentalOtherExpenses,
      gridCode: GridCode.OtherRentalExpenses,
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
    console.log('Ddddddd33333333')

    setShowModal(false)
    const payload = {
      data: {
        code: PageCode.BusinessRentalOtherExpenses,
        entityid: entityID,
        isDirty: 'true',
      },
      grids: [
        {
          data: [
            {
              Description: data?.incomeDescription,
              Amount: data?.incomeAmount,
              Prior: data?.prior,
              id: data?.id == '' ? 'new' : data?.id,
            },
          ],
        },
      ],
    }

    const finalPayload = {
      endPoint: GridCode.OtherRentalExpenses,
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
        code: PageCode.BusinessRentalOtherExpenses,
      },
      grids: [
        {
          data: [
            {
              Description: '',
              Amount: '',
              Prior: '',
              id: id,
            },
          ],
        },
      ],
    }

    const finalPayload = {
      endPoint: GridCode.OtherRentalExpenses,
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
                  children={formatCurrency(item?.['Prior'], true)}
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

  const cancelClick = () => {
    navigation.goBack()
  }

  const submitRentalExpensess: SubmitHandler<
    Record<string, string>
  > = async formdata => {
    if (!params?.isAdd) {
      //********************************* Edit Income
      setFetching(true)
      const editEndpoint = `/${entityID}/${PageCode.BusinessRentalOtherExpenses}/${entityID}`
      const payload = {
        data: {
          curAdvertising: formdata?.curAdvertising,
          curProAdvertising: formdata?.curProAdvertising,
          curAuto: formdata?.curAuto,
          curProAuto: formdata?.curProAuto,
          curMaint: formdata?.curMaint,
          curProMaint: formdata?.curProMaint,
          curComm: formdata?.curComm,
          curProComm: formdata?.curProComm,
          curLegalFees: formdata?.curLegalFees,
          curProLegalFees: formdata?.curProLegalFees,
          curMortIntBank: formdata?.curMortIntBank,
          curProMortIntBank: formdata?.curProMortIntBank,
          curMortIntInd: formdata?.curMortIntInd,
          curProMortIntInd: formdata?.curProMortIntInd,
          curOtherInt: formdata?.curOtherInt,
          curProOtherInt: formdata?.curProOtherInt,
          curManageFees: formdata?.curManageFees,
          curProManageFees: formdata?.curProManageFees,
          curRepairs: formdata?.curRepairs,
          curProRepairs: formdata?.curProRepairs,
          curSupplies: formdata?.curSupplies,
          curProSupplies: formdata?.curProSupplies,
          curTaxes: formdata?.curTaxes,
          curProTaxes: formdata?.curProTaxes,
          curUtilities: formdata?.curUtilities,
          curProUtilities: formdata?.curProUtilities,
          curEmpBenefits: formdata?.curEmpBenefits,
          curProEmpBenefits: formdata?.curProEmpBenefits,
          curDepCareBen: formdata?.curDepCareBen,
          curProDepCareBen: formdata?.curProDepCareBen,
          curInsurance: formdata?.curInsurance,
          curProInsurance: formdata?.curProInsurance,

          isDirty: 'true',
          code: PageCode.BusinessRentalExpenseDetails,
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
        data={utilsExpensesRentalAll}
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
              {t('expenses:EXPENSES_(SCHEDULE_E)')}
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
          <TouchableOpacity onPress={handleSubmit(submitRentalExpensess)}>
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
            data={expensesdHeading}
            isHeader={true}
          />
        </View>

        {utilsExpensesRentalAll.map(person => {
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
            children={t('expenses:ADD_OTHER_EXPENSES')}
            testID="add_dependent"
            onPress={() => {
              setItemData({
                IncomeParentId: '',
                Description: '',
                Amount: '',
                Prior: '',
                id: '',
              }),
                setShowModal(true)
            }}
            disable={false}
          />
        </View>
        <EmptyAreas />
      </KeyboardAwareScrollView>
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={false}
        presentationStyle="overFullScreen"
        supportedOrientations={['portrait', 'landscape']}
      >
        <AddIncomeModal
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
export default RentalExpensesScreen
