import React, { useState, useCallback, useEffect } from "react"
import {
  View,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native"
import Text from "../../theme/common/Text"
import { useTheme } from "../../hooks"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { imageConstant } from "../../../src/theme/Images"
import BackArrow from "../../Assets/blueBack.png"
import {
  useLazyGetHomeIndividualAssetsQuery,
  useLazyGetAsstesDeleteTilesQuery,
} from "../../services/modules/Assets"
import { SwipeListView } from "react-native-swipe-list-view"
import styles from "./style"
import Spinner from "react-native-loading-spinner-overlay/lib"
import loaderStyle from "../../screens/Common/LoaderStyle"
import { useFocusEffect } from "@react-navigation/native"
import { ApplicationScreenProps } from "Mobile/@types/navigation"
import { Divider } from "react-native-paper"
import { Header } from "react-native-elements"
import { formatCurrency } from "../../theme/common/TextInput/utils"
import { errorMessageToast } from "../Error/utils"
import WKSwipeListView from "../../theme/common/SwipeList/WKSwipeListView";
import { glbCustomerHeaderOptions, glbStyles } from "../../../src/styles/global"

const AsstesScreen = (props: ApplicationScreenProps) => {
  const [getHomeIndividualAssets] = useLazyGetHomeIndividualAssetsQuery()
  const [getAsstesDeleteTiles] = useLazyGetAsstesDeleteTilesQuery()
  const [isAsstesData, setAsstesData] = useState(false)
  const { t } = useTranslation()
  const { Layout } = useTheme()
  const displayDependent = useSelector(
    (state) => state?.assetsEvent?.getAssetsData
  )
  let dataModel =
    displayDependent &&
    JSON.parse(displayDependent?.payload)?.miDataModel?.grids[0]?.data
  if (dataModel) {
    dataModel = dataModel.filter((data) => data["id"].toLowerCase() != "new")
  }

  const deleteDependentAPI = (entityID: string) => {
    const payloadID = {
      data: {
        pageCode: props?.route?.params?.code,
        gridCode: props?.route?.params?.gridCode,
        entityid: props?.route?.params?.entityID,
      },
      grids: [
        {
          data: [
            {
              "X If Not New": "",
              Description: "",
              "Cost or Other Basis": "",
              "Date In Service": "",
              "Date Sold": "",
              "Selling Price": "",
              id: entityID,
            },
          ],
        },
      ],
    }

    getAsstesDeleteTiles(payloadID)
      .unwrap()
      .then((response) => {
        dataModel = JSON.parse(response?.payload).miDataModel?.grids[0]
        fetchAssetsList()
      })
      .catch((error) => {
        console.error("error", error)
        errorMessageToast(error)
      })
  }
  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => {
              const dataValue = {
                pageCode: props?.route?.params?.code,
                gridCode: props?.route?.params?.gridCode,
                entityid: props?.route?.params?.entityID,
              }
              props.navigation.navigate("AddViewAssets", { item, dataValue })
            }}
          >
            <TouchableOpacity
              style={styles.equipmentView}
              onPress={() => {
                const dataValue = {
                  pageCode: props?.route?.params?.code,
                  gridCode: props?.route?.params?.gridCode,
                  entityid: props?.route?.params?.entityID,
                }
                props.navigation.navigate("AddViewAssets", { item, dataValue })
              }}
            >
              <Text
                stylesContainerText={styles.equipmentText}
                children={item.Description}
                testID="dependent_list_item"
              />
              <Image style={styles.img} source={imageConstant.rightArrow} />
            </TouchableOpacity>

            <View style={styles.equipmentView}>
              <Text
                stylesContainerText={styles.purchasesText}
                children={t("task:PURCHASESDATE")}
                testID="dependent_list_item"
              />
              <Text
                stylesContainerText={styles.purchasesText}
                children={t("task:COST1")}
                testID="dependent_list_item"
              />
            </View>
            <View style={styles.priceView}>
              <Text
                stylesContainerText={styles.purchasesText}
                children={item?.["Date In Service"]}
                testID="dependent_list_item"
              />
              <Text
                stylesContainerText={styles.purchasesText}
                children={formatCurrency(item?.["Cost or Other Basis"], true)}
                testID="dependent_list_item"
              />
            </View>
            <View style={styles.equipmentView}>
              <Text
                stylesContainerText={styles.purchasesText}
                children={t("task:SALEDATE")}
                testID="dependent_list_item"
              />
              <Text
                stylesContainerText={styles.purchasesText}
                children={t("task:PRICE")}
                testID="dependent_list_item"
              />
            </View>
            <View style={styles.priceView}>
              <Text
                stylesContainerText={styles.purchasesText}
                children={item?.["Date Sold"]}
                testID="dependent_list_item"
              />
              <Text
                stylesContainerText={styles.purchasesText}
                children={formatCurrency(item?.["Selling Price"], true)}
                testID="dependent_list_item"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.horizontalLine2} />
      </View>
    )
  }

  const fetchAssetsList = () => {
    setAsstesData(true)
    const dataPayload = {
      pageCode: props?.route?.params?.code,
      gridCode: props?.route?.params?.gridCode,
      entityID: props?.route?.params?.entityID,
    }
    getHomeIndividualAssets(dataPayload)
      .unwrap()
      .then((response) => {
        setAsstesData(false)
      })
      .catch((err) => {
        setAsstesData(false)
        errorMessageToast(err)
      })
  }
  useFocusEffect(
    useCallback(() => {
      fetchAssetsList()
    }, [])
  )
  useEffect(() => {
    fetchAssetsList()
  }, [])

  const addAssetButtonView = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          const dataValue = {
            pageCode: props?.route?.params?.code,
            gridCode: props?.route?.params?.gridCode,
            entityid: props?.route?.params?.entityID,
          }
          props.navigation.navigate("AddViewAssets", { dataValue })
        }}
      >
        <Text
          stylesContainerText={styles.addTo}
          children={t("task:Add")}
          testID="dependent_list_item"
        />
      </TouchableOpacity>
    )
  }
  const headerView = () => {
    return (
      <Header
        statusBarProps={glbCustomerHeaderOptions}
        leftComponent={
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => props.navigation.goBack()}
          >
            <Image
              source={BackArrow}
              style={styles.backArrowStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        }
        centerComponent={
          <View>
            <Text
              stylesContainerText={styles.headerTitle}
              children={props.route?.params?.pageName}
              testID="header_screen_title"
            />
            <Text
              stylesContainerText={styles.headerSubTitle}
              children={props.route?.params?.selectedItemName}
              testID="header_screen_title"
            />
          </View>
        }
        containerStyle={styles.headerContainer}
      />
    )
  }
  const renderHiddenItem = (data) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={styles.stylesSwipeViewStyle}
          onPress={() => deleteDependentAPI(data?.item.id)}
        >
          <Text
            children={t("common:DELETE")}
            stylesContainerText={styles.stylesSwipeTextStyle}
            testID="dependent_list_item"
          />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <ScrollView>
        <Spinner
          visible={isAsstesData}
          textContent={t("common:LOADING")}
          size={"large"}
          textStyle={loaderStyle.spinnerTextStyle}
        />
        {headerView()}
        <Divider />
        <View style={styles.assetsView}>
          <View style={styles.swipeListViewStyle}>
            <Text
              stylesContainerText={styles.dependentItem}
              children={t("task:ASSETS")}
              testID="dependent_list_item"
            />
            <View style={styles.horizontalLine2} />
            <SwipeListView
              data={dataModel}
              renderItem={renderItem}
              recalculateHiddenLayout={true}
              refreshing={isAsstesData}
              keyExtractor={(item) => item?.id}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={0}
              rightOpenValue={-100}
            />
            {addAssetButtonView()}
            <View style={styles.horizontalLine2} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default AsstesScreen
