import React, { useState, useCallback } from "react"
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
import { imageConstant } from "../../theme/Images"
import {
  useLazyGetHomeBankQuery,
  useLazyGetHomeBankDeleteQuery,
  useLazyGetHomeBankDoneQuery,
} from "../../services/modules/ElectronicFundsScreen"
import { SwipeListView } from "react-native-swipe-list-view"
import styles from "./styles"
import { Spinner } from "../../theme/common/Spinner/Spinner"
import loaderStyle from "../Common/LoaderStyle"
import { useFocusEffect, useIsFocused } from "@react-navigation/native"
import { ApplicationScreenProps } from "Mobile/@types/navigation"
import { Colors } from "../../theme/constants"
import { BusinessTiles } from "../../services/constants/BusinessTiles"
import { errorMessageToast } from "../Error/utils"
import WKSwipeListView from "../../theme/common/SwipeList/WKSwipeListView";
import { glbStyles } from "../../../src/styles/global"
const ElectronicFundsScreen = (props: ApplicationScreenProps) => {
  const [getHomeBank] = useLazyGetHomeBankQuery()
  const [getHomeBankDelete] = useLazyGetHomeBankDeleteQuery()
  const [getHomeBankDone] = useLazyGetHomeBankDoneQuery()
  const [isAsstesData, setAsstesData] = useState(false)
  const [isSelected, setSelected] = useState(true)
  const { t } = useTranslation()
  const displayDependent = useSelector(
    (state) => state?.electronicFunds?.getBankData
  )
  const isFocused = useIsFocused()

  useFocusEffect(
    useCallback(() => {
      fetchAssetsList()
    }, [isFocused])
  )

  const fetchAssetsList = () => {
    setAsstesData(true)
    getHomeBank()
      .unwrap()
      .then((response) => {
        setAsstesData(false)
      })
      .catch((err) => {
        setAsstesData(false)
        errorMessageToast(err)
      })
  }

  const deleteDependent = (item: string) => {
    Alert.alert(
      t("common:DELETE"),
      t("vehicle:DELETE_MESSAGE").replace("{NAME}",item?.name),
      [
        {
          text: t("common:CANCEL"),
          onPress: () => {},
          style: "cancel",
        },
        {
          text: t("common:OK"),
          onPress: () => deleteDependentAPI(item),
          style: "default",
        },
      ]
    )
  }

  const deleteDependentAPI = (item: string) => {
    const payloadID = {
      id: item?.bankId,
    }

    getHomeBankDelete(payloadID)
      .unwrap()
      .then((response) => {
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
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            const dataPayload = {
              pageCode: props?.route?.params?.code,
              gridCode: props?.route?.params?.gridCode,
              entityID: props?.route?.params?.entityID,
              data: item,
              isEdit: true,
            }

            props.navigation.navigate("AddElectronicFundsScreen", {
              dataPayload,
            })
          }}
        >
          <View style={styles.equipmentView}>
            <Text
              stylesContainerText={styles.equipmentText}
              children={item?.name}
              testID="dependent_list_item"
            />
            <Image style={styles.img} source={imageConstant.rightArrow} />
          </View>
        </TouchableOpacity>
        <View style={styles.horizontalLine2} />
      </View>
    )
  }
  const toggleBottomButton = (data) => {
    const item1 = {
      tileId: BusinessTiles.BusinessInfoBank,
      complete: 0,
    }
    const item2 = {
      tileId: BusinessTiles.BusinessInfoBank,
      complete: 1,
    }
    const payloadData = data ? item2 : item1

    getHomeBankDone(payloadData)
      .unwrap()
      .then(() => {
        props.navigation.goBack()
      })
      .catch((error) => {
        console.error("error", error)
        errorMessageToast(error)
      })
  }
  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Spinner
        visible={isAsstesData}
        textContent={t("common:LOADING")}
        size={"large"}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <ScrollView style={styles.scrollMainView}>
      <View style={styles.assetsView}>
        <View style={styles.swipeListViewStyle}>
          <Text
            stylesContainerText={styles.dependentItem}
            children={t("electronicFunds:Financial_institutions")}
            testID="dependent_list_item"
          />
          <View style={styles.horizontalLine2} />
          <SwipeListView
            data={displayDependent}
            renderItem={renderItem}
            
            refreshing={isAsstesData}
            keyExtractor={(item) => item?.id}
            renderHiddenItem={(data) => (
              <View style={styles.rowBack}>
                <TouchableOpacity
                  style={styles.stylesSwipeViewStyle}
                  onPress={() => deleteDependent(data?.item)}
                >
                  <Text
                    children={t("common:DELETE")}
                    stylesContainerText={styles.stylesSwipeTextStyle}
                    testID="dependent_list_item"
                  />
                </TouchableOpacity>
              </View>
            )}
            leftOpenValue={0}
            rightOpenValue={-100}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            const dataPayload = {
              pageCode: props?.route?.params?.code,
              gridCode: props?.route?.params?.gridCode,
              entityID: props?.route?.params?.entityID,
              isEdit: false,
            }
            props.navigation.navigate("AddElectronicFundsScreen", {
              dataPayload,
            })
          }}
        >
          <Text
            stylesContainerText={styles.addTo}
            children={t("electronicFunds:ELECTRONIC_TITTLE")}
            testID="dependent_list_item"
          />
        </TouchableOpacity>
        <View style={styles.horizontalLine2} />
      </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.finishLaterButtonContainer,
            {
              backgroundColor: isSelected ? Colors.white : Colors.testColorBlue,
            },
          ]}
          onPress={() => {
            toggleBottomButton(false)
          }}
        >
          <Text
            stylesContainerText={{
              color: isSelected ? Colors.black : Colors.white,
            }}
            children={"Finish Later"}
            testID="dependent_list_item"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.doneButtonContainer,
            {
              backgroundColor: isSelected ? Colors.testColorBlue : Colors.white,
            },
          ]}
          onPress={() => {
            toggleBottomButton(true)
          }}
        >
          <Text
            stylesContainerText={{
              color: isSelected ? Colors.white : Colors.black,
            }}
            children={"Done"}
            testID="dependent_list_item"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
export default ElectronicFundsScreen
