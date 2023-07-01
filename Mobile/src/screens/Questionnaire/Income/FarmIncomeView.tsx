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
import { Header } from 'react-native-elements'
import { glbCustomerHeaderOptions, glbStyles } from '../../../../src/styles/global'
import ListItem from '../../../theme/common/ListItem'
import { SwipeListView } from 'react-native-swipe-list-view'
import { imageConstant } from '../../../theme/Images'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import { PageCode } from '../../../services/constants/PageCode'
import loaderStyle from '../../Common/LoaderStyle'
import AddIncomeModalBusiness from './AddIncomeOtherModalBusiness'
import AddIncomeAccrualModal from './AddIncomeAccrualModal'
import AddIncomeLiveStockModal from './AddIncomeLiveStockModal'
import { useForm, SubmitHandler } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  useLazyGetDetailedDependentDisplayDataQuery,
  useLazyGetGridAPICallQuery,
  useLazyAddGridAPICallQuery,
  useLazyEditDependentPageIntityAPIQuery,
} from '../../../services/modules/questionnaire'
import { GridCode } from '../../../services/constants/GridCode'
import { IndividualTileRequest } from '../../../../src/services/modules/questionnaire/requestTypes'
import EmptyAreas from '../BusinessRental/EmptyAreas'
import { formatCurrency } from '../../../../src/theme/common/TextInput/utils'
import { numberOfLineInDescription } from '../../../../src/theme/constants'
import { showErrorMessage } from '../../Common/Utils'
import { utilsFarmArray } from './utilsFarms'
import { RenderTheeColumView } from '../../../theme/common/RowWithTwoTextfieldOneText'
import { incomeHeading } from './utilsBusiness'
import WKSwipeListView from '../../../theme/common/SwipeList/WKSwipeListView'

const FarmIncomeScreen = (props: ApplicationScreenProps) => {
  const { navigation, route } = props
  const params = route?.params

  const entityID = params?.entityID

  const [isFetching, setFetching] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showModalAccrual, setShowModalAccrual] = useState(false)
  const [showModalLiveStock, setShowModalLiveStock] = useState(false)

  const [gridDataLiveStock, setGridDataLiveStock] = useState([])
  const [gridDataAccrual, setGridDataAccrual] = useState([])
  const [gridDataOtherStock, setGridDataOtherStock] = useState([])
  const [itemData, setItemData] = useState({})

  const [editDependentPageIntityAPI] = useLazyEditDependentPageIntityAPIQuery()

  const [getDetailedDependentDisplayData] =
    useLazyGetDetailedDependentDisplayDataQuery()

  const [getGridLiveStock] = useLazyGetGridAPICallQuery()
  const [getGridAccural] = useLazyGetGridAPICallQuery()
  const [getGridOtherIncome] = useLazyGetGridAPICallQuery()

  const [addGridAPICall] = useLazyAddGridAPICallQuery()

  const singleServiceListData = useSelector(
    state => state?.home?.singleServiceListData
  )

  const { t } = useTranslation()
  const { control, reset, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      curGovPayments: '',
      curProGovPayments: '',
      curMiscIncome: '',
      curProMiscIncome: '',
      curPaymentCard: '',
      curProPaymentCard: '',
      curRaisedSales: '',
      curProRaisedSales: '',
      curTotalCoop: '',
      curProTotalCoop: '',
      curTotalAgPaymt: '',
      curProTotalAgPaymt: '',
      curTotalCropIns: '',
      curProTotalCropIns: '',
      curDeferralCropIns: '',
      curProDeferralCropIns: '',
      curCustomHire: '',
      curProCustomHire: '',
      curFedGasTax: '',
      curProFedGasTax: '',
      curStateGasTax: '',
      curProStateGasTax: '',
      curCCCLoan: '',
      curProCCCLoan: '',

      isDirty: 'true',
      code: PageCode.BusinessIncomeDetail,
      entityid: entityID,
    },
  })

  useEffect(() => {
    const endPoitns = `code=${PageCode.BusinessFarmIncomeDetail}&entityId=${entityID}`
    getDetailedDependentDisplayData(endPoitns)
      .unwrap()
      .then(res => {
        const farmData = JSON.parse(res?.payload).miDataModel?.data

        farmData.curGovPayments = formatCurrency(farmData.curGovPayments, true)
        farmData.curProGovPayments = formatCurrency(
          farmData.curProGovPayments,
          true
        )
        farmData.curMiscIncome = formatCurrency(farmData.curMiscIncome, true)
        farmData.curProMiscIncome = formatCurrency(
          farmData.curProMiscIncome,
          true
        )
        farmData.curPaymentCard = formatCurrency(farmData.curPaymentCard, true)
        farmData.curProPaymentCard = formatCurrency(
          farmData.curProPaymentCard,
          true
        )
        farmData.curRaisedSales = formatCurrency(farmData.curRaisedSales, true)
        farmData.curProRaisedSales = formatCurrency(
          farmData.curProRaisedSales,
          true
        )
        farmData.curTotalCoop = formatCurrency(farmData.curTotalCoop, true)
        farmData.curProTotalCoop = formatCurrency(
          farmData.curProTotalCoop,
          true
        )
        farmData.curTotalAgPaymt = formatCurrency(
          farmData.curTotalAgPaymt,
          true
        )
        farmData.curProTotalAgPaymt = formatCurrency(
          farmData.curProTotalAgPaymt,
          true
        )
        farmData.curTotalCropIns = formatCurrency(
          farmData.curTotalCropIns,
          true
        )
        farmData.curProTotalCropIns = formatCurrency(
          farmData.curProTotalCropIns,
          true
        )
        farmData.curDeferralCropIns = formatCurrency(
          farmData.curDeferralCropIns,
          true
        )
        farmData.curProDeferralCropIns = formatCurrency(
          farmData.curProDeferralCropIns,
          true
        )
        farmData.curCustomHire = formatCurrency(farmData.curCustomHire, true)
        farmData.curProCustomHire = formatCurrency(
          farmData.curProCustomHire,
          true
        )
        farmData.curFedGasTax = formatCurrency(farmData.curFedGasTax, true)
        farmData.curProFedGasTax = formatCurrency(
          farmData.curProFedGasTax,
          true
        )
        farmData.curStateGasTax = formatCurrency(farmData.curStateGasTax, true)
        farmData.curProStateGasTax = formatCurrency(
          farmData.curProStateGasTax,
          true
        )
        farmData.curCCCLoan = formatCurrency(farmData.curCCCLoan, true)
        farmData.curProCCCLoan = formatCurrency(farmData.curProCCCLoan, true)

        reset(farmData)

        setFetching(false)
      })
      .catch(error => {
        setFetching(false)
      })
  }, [])

  //******************************************************************* Grid Information

  const getGridAllDataLiveStock = (PageCode, GridCode) => {
    const dataPayload: IndividualTileRequest = {
      pageCode: PageCode,
      gridCode: GridCode,
      entityID: entityID,
    }

    getGridLiveStock(dataPayload)
      .unwrap()
      .then(res => {
        setFetching(false)
        setGridDataLiveStock(
          JSON.parse(res?.payload).miDataModel?.grids[0]?.data
        )
      })
      .catch(error => {
        setFetching(false)
      })
  }

  const getGridAllDataAccural = (PageCode, GridCode) => {
    const dataPayload: IndividualTileRequest = {
      pageCode: PageCode,
      gridCode: GridCode,
      entityID: entityID,
    }

    getGridAccural(dataPayload)
      .unwrap()
      .then(res => {
        setFetching(false)
        setGridDataAccrual(JSON.parse(res?.payload).miDataModel?.grids[0]?.data)
      })
      .catch(error => {
        setFetching(false)
      })
  }

  const getGridAllDataOtherIncome = (PageCode, GridCode) => {
    const dataPayload: IndividualTileRequest = {
      pageCode: PageCode,
      gridCode: GridCode,
      entityID: entityID,
    }

    getGridOtherIncome(dataPayload)
      .unwrap()
      .then(res => {
        setFetching(false)
        setGridDataOtherStock(
          JSON.parse(res?.payload).miDataModel?.grids[0]?.data
        )
      })
      .catch(error => {
        setFetching(false)
      })
  }

  useEffect(() => {
    getGridAllDataLiveStock(
      PageCode.BusinessFarmCashIncomeDetail,
      GridCode.BusinessFarmCashIncome
    )
    getGridAllDataAccural(
      PageCode.BusinessFarmAccrualIncomeDetail,
      GridCode.BusinessFarmAccrualIncome
    )
    getGridAllDataOtherIncome(
      PageCode.BusinessFarmOtherIncomeDetail,
      GridCode.BusinessFarmOtherIncome
    )
  }, [])

  const onPressSaveGrid = data => {
    setShowModal(false)
    const payload = {
      data: {
        isDirty: 'true',
        code: PageCode.BusinessFarmOtherIncomeDetail,
        entityid: entityID,
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
      endPoint: GridCode.BusinessFarmOtherIncome,
      payload: payload,
    }
    addGridDataAPIOther(finalPayload)
  }

  const onPressSaveGridAccrual = data => {
    setShowModalAccrual(false)
    const payload = {
      data: {
        isDirty: 'true',
        code: PageCode.BusinessFarmOtherIncomeDetail,
        entityid: entityID,
      },
      grids: [
        {
          data: [
            {
              Description: data?.incomeDescription,
              'Beginning Inventory': data?.begInventory,
              'Cost of items purchased': data?.costOfItem,
              Sales: data?.sales,
              'Ending Inventory': data?.endInventory,
              id: data?.id == '' ? 'new' : data?.id,
            },
          ],
        },
      ],
    }

    const finalPayload = {
      endPoint: GridCode.BusinessFarmAccrualIncome,
      payload: payload,
    }
    addGridDataAPIAccrual(finalPayload)
  }

  const onPressSaveGridLiveStock = data => {
    setShowModalLiveStock(false)
    const payload = {
      data: {
        isDirty: 'true',
        code: PageCode.BusinessFarmCashIncomeDetail,
        entityid: entityID,
      },
      grids: [
        {
          data: [
            {
              Description: data?.incomeDescription,
              Amount: data?.amount,
              'Cost of other basis': data?.costOfOtherBasic,
              'Prior Year': data?.prior,
              'Prior Year2': data?.prior2,
              id: data?.id == '' ? 'new' : data?.id,
            },
          ],
        },
      ],
    }

    const finalPayload = {
      endPoint: GridCode.BusinessFarmCashIncome,
      payload: payload,
    }
    addGridDataAPILiveStock(finalPayload)
  }

  const addGridDataAPIAccrual = finalPayload => {
    setFetching(true)
    addGridAPICall(finalPayload)
      .unwrap()
      .then(res => {
        setShowModalAccrual(false)
        setFetching(false)
        getGridAllDataAccural(
          PageCode.BusinessFarmAccrualIncomeDetail,
          GridCode.BusinessFarmAccrualIncome
        )
      })
      .catch(error => {
        setFetching(false)
        setShowModalAccrual(false)
        showErrorMessage(error)
      })
  }

  const addGridDataAPILiveStock = finalPayload => {
    setFetching(true)
    addGridAPICall(finalPayload)
      .unwrap()
      .then(res => {
        setShowModalLiveStock(false)
        setFetching(false)
        getGridAllDataLiveStock(
          PageCode.BusinessFarmCashIncomeDetail,
          GridCode.BusinessFarmCashIncome
        )
      })
      .catch(error => {
        setFetching(false)
        showErrorMessage(error)
        setShowModalLiveStock(false)
      })
  }

  const addGridDataAPIOther = finalPayload => {
    setFetching(true)
    addGridAPICall(finalPayload)
      .unwrap()
      .then(res => {
        setShowModal(false)
        setFetching(false)
        getGridAllDataOtherIncome(
          PageCode.BusinessFarmOtherIncomeDetail,
          GridCode.BusinessFarmOtherIncome
        )
      })
      .catch(error => {
        setFetching(false)
        setShowModal(false)
        showErrorMessage(error)
      })
  }

  const deleteIncomeGridAPIOther = id => {
    const payload = {
      data: {
        code: PageCode.BusinessFarmOtherIncomeDetail,
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
      endPoint: GridCode.BusinessFarmOtherIncome,
      payload: payload,
    }
    addGridDataAPIOther(finalPayload)
  }

  const deleteIncomeGridLiveStock = id => {
    const payload = {
      data: {
        code: PageCode.BusinessFarmCashIncomeDetail,
        entityid: entityID,
      },
      grids: [
        {
          data: [
            {
              Description: '',
              Amount: '',
              'Cost of other basis': '',
              'Prior Year': '',
              'Prior Year2': '',
              id: id,
            },
          ],
        },
      ],
    }

    const finalPayload = {
      endPoint: GridCode.BusinessFarmCashIncome,
      payload: payload,
    }
    addGridDataAPILiveStock(finalPayload)
  }

  const deleteIncomeGridAccrual = id => {
    const payload = {
      data: {
        code: PageCode.BusinessFarmOtherIncomeDetail,
        entityid: entityID,
      },
      grids: [
        {
          data: [
            {
              Description: '',
              'Beginning Inventory': '',
              'Cost of items purchased': '',
              Sales: '',
              'Ending Inventory': '',
              id: id,
            },
          ],
        },
      ],
    }

    const finalPayload = {
      endPoint: GridCode.BusinessFarmAccrualIncome,
      payload: payload,
    }
    addGridDataAPIAccrual(finalPayload)
  }

  const saveEditAddUpdateData = finalPayload => {
    editDependentPageIntityAPI(finalPayload)
      .unwrap()
      .then(payload => {
        navigation.goBack()
      })
      .catch(error => {})
  }

  const renderItemLiveStock = ({ item }) => {
    return (
      <View>
        {item?.id != 'new' ? (
          <TouchableOpacity
            onPress={() => {
              setItemData(item), setShowModalLiveStock(true)
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
                  children={t('income:AMOUNT_RECEIVED')}
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
                  children={t('income:COST_OR_OTHER_BASIS')}
                  testID="dependent_list_item"
                />
                <Text
                  stylesContainerText={styles.dependentItemDetailsRight}
                  children={formatCurrency(item?.['Cost of other basis'], true)}
                  testID="dependent_list_item"
                />
              </View>
            </View>

            <View style={styles.item}>
              <View style={styles.flatListItemLeft}>
                <Text
                  stylesContainerText={styles.dependentItemDetails}
                  children={`${t('income:PRIOR_YEAR_(AMOUNT)')}`}
                  testID="dependent_list_item"
                />
                <Text
                  stylesContainerText={styles.dependentItemDetailsRight}
                  children={formatCurrency(item?.['Prior Year'], true)}
                  testID="dependent_list_item"
                />
              </View>

              <View style={styles.flatListItemRight}>
                <Text
                  stylesContainerText={styles.dependentItemDetailsRight}
                  children={t('income:PRIOR_YEAR_(COST)')}
                  testID="dependent_list_item"
                />
                <Text
                  stylesContainerText={styles.dependentItemDetailsRight}
                  children={formatCurrency(item?.['Prior Year2'], true)}
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

  const renderItemAccrualMethod = ({ item }) => {
    return (
      <View>
        {item?.id != 'new' ? (
          <TouchableOpacity
            onPress={() => {
              setItemData(item), setShowModalAccrual(true)
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
                  children={`${t('income:BEGINNING_INVENTORY')}`}
                  testID="dependent_list_item"
                />
                <Text
                  stylesContainerText={styles.dependentItemDetailsRight}
                  children={formatCurrency(item?.['Beginning Inventory'], true)}
                  testID="dependent_list_item"
                />
              </View>

              <View style={styles.flatListItemRight}>
                <Text
                  stylesContainerText={styles.dependentItemDetailsRight}
                  children={`${t('income:COST_OF_ITEMS_PURCHASED')}`}
                  testID="dependent_list_item"
                />
                <Text
                  stylesContainerText={styles.dependentItemDetailsRight}
                  children={formatCurrency(
                    item?.['Cost of items purchased'],
                    true
                  )}
                  testID="dependent_list_item"
                />
              </View>
            </View>

            <View style={styles.item}>
              <View style={styles.flatListItemLeft}>
                <Text
                  stylesContainerText={styles.dependentItemDetails}
                  children={`${t('income:SALES')}`}
                  testID="dependent_list_item"
                />
                <Text
                  stylesContainerText={styles.dependentItemDetailsRight}
                  children={formatCurrency(item?.Sales, true)}
                  testID="dependent_list_item"
                />
              </View>

              <View style={styles.flatListItemRight}>
                <Text
                  stylesContainerText={styles.dependentItemDetailsRight}
                  children={t('income:ENDING_INVENTORY')}
                  testID="dependent_list_item"
                />
                <Text
                  stylesContainerText={styles.dependentItemDetailsRight}
                  children={formatCurrency(item?.['Ending Inventory'], true)}
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
  const renderItemOther = ({ item }) => {
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
                  stylesContainerText={styles.dependentItemDetailsRight}
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
            <View style={styles.horizontalLine2} />
          </TouchableOpacity>
        ) : null}
      </View>
    )
  }

  const renderHiddenItemAccrual = data => {
    return (
      <View style={styles.rowBack}>
        <View />
        <TouchableOpacity
          style={styles.stylesSwipeViewStyle}
          onPress={() => deleteIncomeGridAccrual(data?.item?.id)}
        >
          <Text
            children={t('common:DELETE')}
            stylesContainerText={styles.stylesSwipeTextStyle}
            testID="dependent_list_item"
          />
        </TouchableOpacity>
      </View>
    )
  }

  const renderHiddenItemOther = data => {
    return (
      <View style={styles.rowBack}>
        <View />
        <TouchableOpacity
          style={styles.stylesSwipeViewStyle}
          onPress={() => deleteIncomeGridAPIOther(data?.item?.id)}
        >
          <Text
            children={t('common:DELETE')}
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

  const renderHiddenItemStock = data => {
    return (
      <View style={styles.rowBack}>
        <View />
        <TouchableOpacity
          style={styles.stylesSwipeViewStyle}
          onPress={() => deleteIncomeGridLiveStock(data?.item?.id)}
        >
          <Text
            children={t('common:DELETE')}
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
        data={utilsFarmArray}
      />
    )
  }

  const submitIncome: SubmitHandler<
    Record<string, string>
  > = async formdata => {
    if (!params?.isAdd) {
      const editEndpoint = `/${entityID}/${PageCode.BusinessFarmIncomeDetail}/${entityID}`
      const payload = {
        data: {
          curGovPayments: formdata?.curGovPayments,
          curProGovPayments: formdata?.curProGovPayments,
          curMiscIncome: formdata?.curMiscIncome,
          curProMiscIncome: formdata?.curProMiscIncome,
          curPaymentCard: formdata?.curPaymentCard,
          curProPaymentCard: formdata?.curProPaymentCard,
          curRaisedSales: formdata?.curRaisedSales,
          curProRaisedSales: formdata?.curProRaisedSales,
          curTotalCoop: formdata?.curTotalCoop,
          curProTotalCoop: formdata?.curProTotalCoop,
          curTotalAgPaymt: formdata?.curTotalAgPaymt,
          curProTotalAgPaymt: formdata?.curProTotalAgPaymt,
          curTotalCropIns: formdata?.curTotalCropIns,
          curProTotalCropIns: formdata?.curProTotalCropIns,
          curDeferralCropIns: formdata?.curDeferralCropIns,
          curProDeferralCropIns: formdata?.curProDeferralCropIns,
          curCustomHire: formdata?.curCustomHire,
          curProCustomHire: formdata?.curProCustomHire,
          curFedGasTax: formdata?.curFedGasTax,
          curProFedGasTax: formdata?.curProFedGasTax,
          curStateGasTax: formdata?.curStateGasTax,
          curProStateGasTax: formdata?.curProStateGasTax,
          curCCCLoan: formdata?.curCCCLoan,
          curProCCCLoan: formdata?.curProCCCLoan,

          isDirty: 'true',
          code: PageCode.BusinessFarmIncomeDetail,
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
              children={t('common:CANCEL')}
            />
          </TouchableOpacity>
        }
        centerComponent={
          <View>
            <Text
              testID="header_title"
              stylesContainerText={glbStyles.headerTitle}
              children={t('income:INCOME_(SCHEDULE_F)')}
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
        <EmptyAreas />
        <Spinner
          visible={isFetching}
          textContent={t('common:LOADING')}
          size={'large'}
          textStyle={loaderStyle.spinnerTextStyle}
        />

        <View style={styles.incomeMainViewWhite}>
          <Text
            stylesContainerText={styles.textStyleOtherFirst}
            testID="question_answer_text_id"
            children={t('income:SALES_OF_LIVE_STOCK')}
          />

          <WKSwipeListView
            keyExtractor={item => item?.id}
            listData={gridDataLiveStock}
            refreshPage={isFetching}
            renderItem={renderItemLiveStock}
            keyExtractor={item => item?.id}
            renderHiddenItem={renderHiddenItemStock}
            leftOpenValue={0}
            rightOpenValue={-100}
          />
          <View style={styles.item}>
            <Text
              stylesContainerText={styles.dependentItem2}
              children={t('income:ADD_SALE_LIVESTOCK')}
              testID="add_dependent"
              onPress={() => {
                setItemData({
                  Amount: '',
                  'Cost of other basis': '',
                  Description: '',
                  'Prior Year': '',
                  'Prior Year2': '',
                  id: '',
                }),
                  setShowModalLiveStock(true)
              }}
              disable={false}
            />
          </View>
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
                  stylesContainerText={[
                    styles.leftText,
                    styles.textStyleOtherTitle,
                  ]}
                  testID="question_answer_text_id"
                  children={t('income:INCOME_(ACCRUAL_METHOD)')}
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
          listData={gridDataAccrual}
          refreshPage={isFetching}
          renderItem={renderItemAccrualMethod}
          renderHiddenItem={renderHiddenItemAccrual}
          leftOpenValue={0}
          rightOpenValue={-100}
        />
        <View style={styles.item}>
          <Text
            stylesContainerText={styles.dependentItem2}
            children={t('income:ADD_INCOME')}
            testID="add_dependent"
            onPress={() => {
              setItemData({
                'Beginning Inventory': '',
                'Cost of items purchased': '',
                Description: '',
                'Ending Inventory': '',
                Sales: '',
                id: '',
              }),
                setShowModalAccrual(true)
            }}
            disable={false}
          />
        </View>

        <EmptyAreas />

        <RenderTheeColumView
          control={control}
          index={'1'}
          disablePriorYearTextField
          data={incomeHeading}
          isHeader={true}
        />

        {utilsFarmArray.map(person => {
          return renderTheeColumView(person.id)
        })}
        <EmptyAreas />

        <WKSwipeListView
          keyExtractor={item => item?.id}
          listData={gridDataOtherStock}
          refreshPage={isFetching}
          renderItem={renderItemOther}
          renderHiddenItem={renderHiddenItemOther}
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
        <View style={styles.horizontalLine2} />

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
            title={t('income:ADD_OTHER_INCOME_Caps')}
            taxYear={singleServiceListData?.taxYear}
            item={itemData}
          />
        </Modal>

        <Modal
          visible={showModalAccrual}
          animationType="slide"
          transparent={false}
          presentationStyle="overFullScreen"
          supportedOrientations={['portrait', 'landscape']}
        >
          <AddIncomeAccrualModal
            onPressCancel={() => setShowModalAccrual(false)}
            onPressSave={onPressSaveGridAccrual}
            title={t('income:ADD_OTHER_INCOME_Caps')}
            taxYear={singleServiceListData?.taxYear}
            item={itemData}
          />
        </Modal>
        <Modal
          visible={showModalLiveStock}
          animationType="slide"
          transparent={false}
          presentationStyle="overFullScreen"
          supportedOrientations={['portrait', 'landscape']}
        >
          <AddIncomeLiveStockModal
            onPressCancel={() => setShowModalLiveStock(false)}
            onPressSave={onPressSaveGridLiveStock}
            title={t('income:ADD_SALE_LIVESTOCK')}
            taxYear={singleServiceListData?.taxYear}
            item={itemData}
          />
        </Modal>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default FarmIncomeScreen
