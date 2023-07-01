import React, { useEffect, useState } from 'react'
import {
    View,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView, SafeAreaView,
} from 'react-native'
import Text from '../../../theme/common/Text'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Colors } from '../../../theme/constants'
//***************************************** Image White Area
import Spinner from 'react-native-loading-spinner-overlay/lib'
import AdditionalImage from '../../../Assets/AdditionalImage.png'
import BussinessImage from '../../../Assets/BusinessRental.png'
import AssetsImage from '../../../Assets/AssetsImage.png'
import TaxPaymentImage from '../../../Assets/TaxPaymentImage.png'

import { useFocusEffect } from '@react-navigation/native'
import { useLazyGetQuestionnaireBusinessTileStatusQuery } from '../../../services/modules/questionnaire'
import loaderStyle from '../../../screens/Common/LoaderStyle'
import { glbStyles } from '../../../../src/styles/global'

let STATIC_DATA_WHITE_P = []
let STATIC_DATA_WHITE = []
let STATIC_DATA_GRAY = []

const QuestionTabScreen = ({ navigation }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const [getQuestionnaireBusinessTileStatus, { isFetching }] =
    useLazyGetQuestionnaireBusinessTileStatusQuery()

  useFocusEffect(
    React.useCallback(() => {
      STATIC_DATA_GRAY = []
      STATIC_DATA_WHITE_P = []
      STATIC_DATA_WHITE = []
      SET_STATIC_DATA_WHITE_ARRAY([])
      SET_STATIC_DATA_WHITE_ARRAY_P([])

      getQuestionnaireBusinessTileStatus()
        .unwrap()
        .then(res => {
          STATIC_DATA_WHITE_P.push({
            id: '1',
            title: t('questionnaireBusiness:BUSINESS_INFORMATION'),
            image: BussinessImage,
            status: res[0]?.complete == true ? t('questionnaire:COMPLETED')  : '',
          })

          if (res[6]?.enabled && res[6]?.tileId == 7) {
            STATIC_DATA_WHITE_P.push({
              id: '2',
              title: t('questionnaireBusiness:ADDITIONAL_INFORMATION'),
              image: AdditionalImage,
              status: res[6]?.complete == 1 ? t('questionnaire:COMPLETED')  : '',
            })
          }

          STATIC_DATA_WHITE.push({
            id: '3',
            title: t('questionnaireBusiness:ASSETS'),
            image: AssetsImage,
            status: res[4]?.complete == 1 ? t('questionnaire:COMPLETED')  : '',
          })

          STATIC_DATA_WHITE.push({
            id: '4',
            title: t('questionnaireBusiness:TAX_PAYMENTS'),
            image: TaxPaymentImage,
            status: res[5]?.complete == 1 ? t('questionnaire:COMPLETED')  : '',
          })

          SET_STATIC_DATA_WHITE_ARRAY(STATIC_DATA_WHITE)
          SET_STATIC_DATA_WHITE_ARRAY_P(STATIC_DATA_WHITE_P)
        })
        .catch(err => {})
    }, [])
  )

  const [STATIC_DATA_WHITE_ARRAY, SET_STATIC_DATA_WHITE_ARRAY] = useState([])
  const [STATIC_DATA_WHITE_ARRAY_P, SET_STATIC_DATA_WHITE_ARRAY_P] = useState(
    []
  )

  const isfirstloginData: boolean = useSelector(
    state => state?.questionnaire?.isfirstlogin
  )

  useEffect(() => {
    if (isfirstloginData) {
      navigation.navigate('BusinessInformation')
    }
  }, [isfirstloginData])

  const navigateToScreen = data => {
    switch (data.id) {
      case '1':
        navigation.navigate('BusinessInformation')
        break
      case '2':
        navigation.navigate('BusinessAdditionalInformation')
        break
      case '3':
        navigation.navigate('AssetsBusiness')
        break
      case '4':
        navigation.navigate('TaxPaymentBusiness')
        break
    }
  }
  const renderItemWhite = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigateToScreen(item)}
        style={[
          styles.boxItemWhite,
          { backgroundColor: item.status ? Colors.borderColor : null },
        ]}
      >
        <View style={styles.item}>
          <Image style={styles.img} source={item.image} />
          <Text
            children={item.title}
            stylesContainerText={styles.stylesContainerText}
            testID={'questionarie_personal_item_label'}
          />
        </View>
        <Text
          children={item.status}
          stylesContainerText={styles.stylesContainerTextStatus}
          testID={'questionarie_personal_item_Status'}
        />
      </TouchableOpacity>
    )
  }

  return (
      <SafeAreaView style={glbStyles.safeAreaView}>
    <ScrollView>
      <Spinner
        visible={isFetching}
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <FlatList
        data={[
          ...STATIC_DATA_WHITE_ARRAY_P,
          ...STATIC_DATA_WHITE_ARRAY.sort((a, b) =>
            a.title > b.title ? 1 : -1
          ),
        ]}
        renderItem={renderItemWhite}
        numColumns={2}
        keyExtractor={item => item.id}
      />
    </ScrollView>
      </SafeAreaView>
  )
}
export default QuestionTabScreen
