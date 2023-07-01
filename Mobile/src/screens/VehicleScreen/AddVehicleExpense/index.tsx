import React, { useEffect, useState } from "react"
import {SafeAreaView, View, ScrollView, Button, TouchableOpacity} from "react-native"
import styles from "./styles"
import { Colors } from "../../../theme/constants"
import { t } from "i18next"
import {
  NumberField,
  TextField,
} from "../../../theme/common/TextInput/InputFormComponents"
import { SubmitHandler, useForm } from "react-hook-form"
import { useLazyGetVehiclesDeleteTilesQuery } from "../../../services/modules/Vehicles"
import {Spinner} from "../../../theme/common/Spinner/Spinner"
import loaderStyle from "../../Common/LoaderStyle";
import {removeChar, replaceZeroAfterDecimal} from "../AddEdit/utils";
import {formatCurrency, formateAmount} from "../../../theme/common/TextInput/utils";
import Text from "../../../theme/common/Text";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { glbStyles } from "../../../../src/styles/global"

const AddVehicleExpense = ({ navigation, route }) => {
  const [getVehiclesDeleteTiles] = useLazyGetVehiclesDeleteTilesQuery()
  const isEdit: boolean = route?.params?.dataPayload?.item
  const [autoFillData, setAUtoFillData] = useState(
    isEdit ? route?.params?.dataPayload?.item : {}
  )
  const [isFetching, setFetching] = useState(false)
  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      Description: autoFillData['Description'],
      Amount: formatCurrency(autoFillData['Amount'],true),
      'Prior Year': formatCurrency(autoFillData['Prior Year'],true),
    },
  })
  const submitProfile: SubmitHandler<
    Record<string, string>
  > = async formdata => {
    const payloadData = {
      data: {
        pageCode: route?.params?.dataPayload?.pageCode,
        isDirty: 'true',
        gridCode: route?.params?.dataPayload?.gridCode,
        entityid: route?.params?.dataPayload?.entityID,
      },
      grids: [
        {
          data: [
            {
              Description: formdata['Description'],
              Amount: removeChar(formdata['Amount']),
              'Prior Year': removeChar(formdata['Prior Year']),
              VehicleParentID: route?.params?.dataPayload?.Vid,
              id: isEdit ? autoFillData['id'] : 'new',
            },
          ],
        },
      ],
    }
    setFetching(true)
    getVehiclesDeleteTiles(payloadData)
      .unwrap()
      .then(response => {
        setFetching(false)
        navigation.goBack()
      })
      .catch(() => {
        setFetching(false)
      })
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: isEdit ? t('vehicle:EDIT_VEHICLE_EXPENSE') : t('vehicle:ADD_VEHICLE_EXPENSE'),
      headerRight: () => (
        <TouchableOpacity
          onPress={handleSubmit(submitProfile)}
          testID={'SAVE_BUTTON'}
        >
          <Text stylesContainerText={styles.saveButton} testID={'Save_Text'}>{t("common:SAVE")}</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          testID={'CANCEL_BUTTON'}
        >
          <Text stylesContainerText={styles.cancelButton} testID={'Cancel_Text'}>{t("common:CANCEL")}</Text>
        </TouchableOpacity>
      ),
    })
  }, [navigation])

  const addSpace = (margin: number) => {
    return <View style={{ margin: margin ? margin : 5 }}></View>
  }
  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Spinner
        visible={isFetching}
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <KeyboardAwareScrollView>
        <View style={styles.mainViewStyle}>
          {addSpace(5)}
          <View style={styles.horizontalLine}>
            <TextField
              placeholder={t('vehicle:EXPENSE_DESC')}
              control={control}
              name="Description"
              fieldType={'currency'}
              label={t('vehicle:EXPENSE_DESC')}
              max={76}
            />
          </View>
          <View style={styles.horizontalLine}>
            <NumberField
              placeholder={t('vehicle:CURRENT_AMOUNT')}
              styleTextBox={styles.currentAmount}
              control={control}
              name="Amount"
              fieldType={'currency'}
              label={t('vehicle:CURRENT_AMOUNT')}
            />
          </View>
          <View style={styles.horizontalLine}>
            <NumberField
              styleTextBox={styles.priorAmount}
              control={control}
              placeholder={t('vehicle:PRIOR_AMOUNT')}
              name="Prior Year"
              label={t('vehicle:PRIOR_AMOUNT')}
              disabled={true}
              editable={false}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default AddVehicleExpense
