import React, { useState, useEffect } from "react"
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native"
import { Colors } from "../../../../theme/constants"
import { listData } from "./utils"
import { useSelector } from "react-redux"
import { ApplicationScreenProps } from "../../../../../@types/navigation"
import { useLazyGetHomeIndividualTilesDataQuery } from "../../../../services/modules/taxableEvent"
import styles from "./styles"
import { t } from "i18next"
import { Divider } from "react-native-paper"
import YNOSegmentedControl from "../../../../../src/theme/common/YNOSegmentedControl"
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form"
const Taxable = ({ navigation }: ApplicationScreenProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isSelected] = useState(true)
  const [isYesSelected] = useState(false)
  const [listData1, setListData1] = useState(listData)
  const [getHomeIndividualTilesData] = useLazyGetHomeIndividualTilesDataQuery()
  const [error, setError] = useState(false)
  const getIndividualData = useSelector(
    (state) => state?.questionnaire?.getIndividualData
  )
  const { control, handleSubmit, reset } = useForm({
    mode: "onBlur",
  })

  const checkStatus = getIndividualData
    ? JSON.parse(getIndividualData?.payload)?.miDataModel?.data
    : null
  const singleServiceListData = useSelector(
    (state) => state?.home?.singleServiceListData
  )

  const submitProfile = async (
    formdata: Record<string, string>,
    isDone: boolean
  ) => {
 
    const questionndata = {
      ynoCheck: isDone ? "1" : "0",
      ynoCheckDependents: checkStatus?.ynoCheckDependents,
      ynoCheckDirDep: checkStatus?.ynoCheckDirDep,
      ynoCheckAboutYou: checkStatus?.ynoCheckAboutYou,
      NavInvestments: formdata?.NavInvestments ?? "",
      NavBusiness: formdata?.NavBusiness ?? "",
      NavDeductions: formdata?.NavDeductions ?? "",
      NavEducation: formdata?.NavEducation ?? "",
      NavRetirement: formdata?.NavRetirement ?? "",
      NavHealthcare: formdata?.NavHealthcare ?? "",
      NavTaxpayment: formdata?.NavTaxpayment ?? "",
      NavGifts: formdata?.NavGifts ?? "",
      NavForeignMatters: formdata?.NavForeignMatters ?? "",
      NavMoving: formdata?.NavMoving ?? "",
      NavMiscellaneous: formdata?.NavMiscellaneous ?? "",
      code: "6008",
    }
    
    getHomeIndividualTilesData(questionndata)
      .unwrap()
      .then(() => {
        navigation.goBack()
      })
      .catch((error) => {
        console.error("getFillingDetailsDone Error=", error)
      })
  }
  const onError: SubmitErrorHandler<Record<string, string>> = (errors) => {
    console.error("Error on form submit", errors)
    setError(true)
  }
  const displayDependent = useSelector(
    (state) => state?.taxableEvent?.getIndividualData?.payload
  )

  const createTwoButtonAlert = () =>
    Alert.alert(
      "",
      "You need to go to the Investments tile in order to remove any data and change your response.",
      [
        {
          text: "OK",
          onPress: () => {},
        },
      ]
    )

  useEffect(() => {
    getHomeIndividualTilesData({})
      .unwrap()
      .then((response) => {
        const answerData = response
          ? JSON.parse(response?.payload)?.miDataModel?.data
          : null
        const answeValue = [
          answerData?.NavInvestments,
          answerData?.NavBusiness,
          answerData?.NavDeductions,
          answerData?.NavEducation,
          answerData?.NavRetirement,
          answerData?.NavHealthcare,
          answerData?.NavTaxpayment,
          answerData?.NavGifts,
          answerData?.NavForeignMatters,
          answerData?.NavMoving,
          answerData?.NavMiscellaneous,
        ]
        listData.map((value, index) => {
          value.status = answeValue[index]
          value.severStatus = answeValue[index]
        })
        reset(answerData)
        setListData1(listData)
      })
      .catch((error) => {
        console.error("getFillingDetailsDone Error=", error)
      })
  }, [displayDependent, listData1])

  const renderItemFlatlist = ({ item }) => {
    const onChangeYN = (onChange, value) => {
      if (item?.severStatus === "1") {
        createTwoButtonAlert()
      } else {
        onChange(value)
      }
    }

    return (
      <Controller
        control={control}
        name={item?.answerKey}
        render={({ field: { onChange, value } }) => {
          return (
            <YNOSegmentedControl
              title={item?.questionText}
              value={value}
              yesValue={"1"}
              noValue={"0"}
              onValueChange={(value) => onChangeYN(onChange, value)}
            />
          )
        }}
      />
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>
          {t("taxable:NAV_HEADER").replace(
            "${YEAR}",
            singleServiceListData?.taxYear
          )}
        </Text>
        <Divider />
        <FlatList
          data={listData1}
          renderItem={renderItemFlatlist}
          refreshing={isYesSelected}
        />
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.finishLaterButtonContainer,
            {
              backgroundColor: isSelected ? Colors.white : Colors.testColorBlue,
            },
          ]}
          onPress={handleSubmit(
            (data) => submitProfile(data, false),
            (errors) => onError(errors)
          )}
        >
          <Text style={{ color: isSelected ? Colors.black : Colors.white }}>
            Finish Later
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.doneButtonContainer,
            {
              backgroundColor: isSelected ? Colors.testColorBlue : Colors.white,
            },
          ]}
          onPress={handleSubmit(
            (data) => submitProfile(data, true),
            (errors) => onError(errors)
          )}
        >
          <Text style={{ color: isSelected ? Colors.white : Colors.black }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Taxable
