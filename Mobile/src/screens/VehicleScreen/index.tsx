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
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { imageConstant } from "../../../src/theme/Images"
import {
  useLazyGetHomeVehiclesQuery,
  useLazyGetVehiclesDeleteTilesQuery,
} from "../../services/modules/Vehicles"
import styles from "./styles"
import loaderStyle from "../../screens/Common/LoaderStyle"
import { useFocusEffect, useIsFocused } from "@react-navigation/native"
import { ApplicationScreenProps } from "../../../@types/navigation"
import { PageCode } from "../../services/constants/PageCode"
import { Spinner } from "../../theme/common/Spinner/Spinner"
import { Header } from "react-native-elements"
import { glbCustomerHeaderOptions, glbStyles } from "../../../src/styles/global"
import BackArrow from "../../Assets/blueBack.png"
import WKSwipeListView from "../../theme/common/SwipeList/WKSwipeListView";
const VehiclesScreen = (props: ApplicationScreenProps) => {
  const pageCode1 = props?.route?.params?.code
  const [getHomeVehicles] = useLazyGetHomeVehiclesQuery()
  const [getVehiclesDeleteTiles] = useLazyGetVehiclesDeleteTilesQuery()
  const [isAsstesData, setAsstesData] = useState(false)
  const { t } = useTranslation()
  const displayDependent = useSelector(
    (state) => state?.assetsEvent?.getAssetsData
  )
  const isFocused = useIsFocused()
  let dataModel =
    displayDependent &&
    JSON.parse(displayDependent?.payload)?.miDataModel?.grids[0]?.data
  if (dataModel) {
    dataModel = dataModel.filter((data) => data["id"].toLowerCase() != "new")
  }
  useFocusEffect(
    useCallback(() => {
      fetchAssetsList()
    }, [isFocused])
  )

  const setHeaderTitle = () => {
    if (pageCode1 == PageCode.BusinessVehicleDetail) {
      return t("vehicle:VEHICLE_TITLE")
    } else if (pageCode1 == PageCode.BusinessRentalVehicles) {
      return t("vehicle:VEHICLE_TITLE_E")
    } else {
      return t("vehicle:VEHICLE_TITLE_F")
    }
  }
  
  const fetchAssetsList = () => {
    setAsstesData(true)
    const dataPayload = {
      pageCode: props?.route?.params?.code,
      gridCode: props?.route?.params?.gridCode,
      entityID: props?.route?.params?.entityID,
    }
    getHomeVehicles(dataPayload)
      .unwrap()
      .then(() => {
        setAsstesData(false)
      })
      .catch(() => setAsstesData(false))
  }

  const deleteDependent = (entityID: string, name: string) => {
    Alert.alert(
      t("common:DELETE"),
      t("vehicle:DELETE_MESSAGE").replace("{NAME}", name),
      [
        {
          text: t("common:CANCEL"),
          onPress: () => {},
          style: "cancel",
        },
        {
          text: t("common:OK"),
          onPress: () => deleteDependentAPI(entityID),
          style: "default",
        },
      ]
    )
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
              'Another vehicle available': '',
              'Vehicle rentals or leases - P': '',
              Taxes: '',
              'Insurance - P': '',
              'Repairs - P': '',
              'Date Sold': '',
              'Date In Service': '',
              Repairs: '',
              'Vehicle rentals or leases': '',
              'Interest - P': '',
              'Do you have evidence': '',
              'Total Business Miles': '',
              Interest: '',
              'Employer-provided vehicle available': '',
              'Total Business Miles - P': '',
              Insurance: '',
              'Gasoline and oil - P': '',
              'Total Miles': '',
              'Total Commuting Miles - P': '',
              'Total Miles - P': '',
              'Vehicle Description': '',
              Status: '',
              'Total Commuting Miles': '',
              'Taxes - P': '',
              'Gasoline and oil': '',
              id: entityID,
            },
          ],
        },
      ],
    }

    getVehiclesDeleteTiles(payloadID)
      .unwrap()
      .then(response => {
        dataModel = JSON.parse(response?.payload).miDataModel?.grids[0]
        fetchAssetsList()
      })
      .catch(error => {
        console.error('error', error)
      })
  }

  const renderItem = ({ item,index }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            const dataPayload = {
              pageCode: props?.route?.params?.code,
              gridCode: props?.route?.params?.gridCode,
              entityID: props?.route?.params?.entityID,
              item: item,
              index: index+1
            }

            props.navigation.navigate('AddEditVehicleScreen', { dataPayload })
          }}
        >
          <View style={styles.equipmentView}>
            <Text
              stylesContainerText={styles.equipmentText}
              children={item?.['Vehicle Description']?.length > 0 ? item?.['Vehicle Description'] : `Office ${index+1}`}
              testID="dependent_list_item"
            />
            <Image style={styles.img} source={imageConstant.rightArrow} />
          </View>
        </TouchableOpacity>
        <View style={styles.horizontalLine2} />
      </View>
    )
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <ScrollView>
        <Spinner
          visible={isAsstesData}
          textContent={t('common:LOADING')}
          size={'large'}
          textStyle={loaderStyle.spinnerTextStyle}
        />
        <Header
          statusBarProps={glbCustomerHeaderOptions}
          leftComponent={
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
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
                testID="header_title"
                stylesContainerText={glbStyles.headerTitle}
                children={setHeaderTitle()}
              />

              <Text
                testID="header_titile"
                stylesContainerText={glbStyles.headerSubTitle}
                children={props?.route?.params?.selectedItemName}
              />
            </View>
          }
          containerStyle={glbStyles.headerContainer}
        />
        <View style={styles.assetsView}>
          <Text
            stylesContainerText={styles.dependentItem}
            children={t('vehicle:VEHICLE')}
            testID="dependent_list_item"
          />
          <View style={styles.horizontalLine2} />
          <WKSwipeListView
            listData={dataModel}
            renderItem={renderItem}
            refreshPage={isAsstesData}
            keyExtractor={item => item?.id}
            renderHiddenItem={data => (
              <View style={styles.rowBack}>
                <TouchableOpacity
                  style={styles.stylesSwipeViewStyle}
                  onPress={() =>
                    deleteDependent(
                      data?.item.id,
                      data?.item['Vehicle Description']
                    )
                  }
                >
                  <Text
                    children={t('common:DELETE')}
                    stylesContainerText={styles.stylesSwipeTextStyle}
                    testID="dependent_list_item"
                  />
                </TouchableOpacity>
              </View>
            )}
            leftOpenValue={0}
            rightOpenValue={-100}
          />
          <TouchableOpacity
            onPress={() => {
              const dataPayload = {
                pageCode: props?.route?.params?.code,
                gridCode: props?.route?.params?.gridCode,
                entityID: props?.route?.params?.entityID,
                index: null,
              }
              props.navigation.navigate('AddEditVehicleScreen', { dataPayload })
            }}
          >
            <Text
              stylesContainerText={styles.addTo}
              children={t('vehicle:ADD_VEHICLE')}
              testID="dependent_list_item"
            />
          </TouchableOpacity>
          <View style={styles.horizontalLine2} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default VehiclesScreen
