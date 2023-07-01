import React, { useEffect, useState } from 'react'
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import Text from '../../../theme/common/Text'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

//***************************************** Image White Area
import DeductionsImage from '../../../Assets/DeductionsImage.png'
import GiftImage from '../../../Assets/GiftImageBlue.png'
import ForeignImage from '../../../Assets/ForeignImageBlue.png'
import HealthCareImage from '../../../Assets/HealthCareImage.png'
import RequirementImage from '../../../Assets/RequirementImage.png'
import MovingImage from '../../../Assets/MovingImageBlue.png'
import AdditionalImage from '../../../Assets/AdditionalImage.png'
import BussinessImage from '../../../Assets/BusinessRental.png'
import EducationImage from '../../../Assets/EducationImage.png'
import InvestmanetImage from '../../../Assets/InvestmanetImage.png'
import PersonalImage from '../../../Assets/PersonalImage.png'
import MisclImage from '../../../Assets/MiscImage.png'
import RetirementImage from '../../../Assets/RetirementImage.png'
import TaxPaymentImage from '../../../Assets/TaxPaymentImage.png'

//***************************************** Image Gray Area
import DeductionsImageGray from '../../../Assets/DeductionsImageGray.png'
import GiftImageGray from '../../../Assets/GiftImage.png'
import ForeignImageGray from '../../../Assets/ForeignImage.png'
import HealthCareImageGray from '../../../Assets/HealthCareImageGray.png'
import RequirementImageGray from '../../../Assets/RequirementImage.png'
import MovingImageGray from '../../../Assets/MovingImage.png'
import AdditionalImageGray from '../../../Assets/AdditionalImageGray.png'
import BussinessImageGray from '../../../Assets/BusinessRentalGray.png'
import EducationImageGray from '../../../Assets/EducationImageGray.png'
import InvestmanetImageGray from '../../../Assets/InvestmanetImageGray.png'
import MisclImageGray from '../../../Assets/MiscImageGray.png'
import RetirementImageGray from '../../../Assets/RetirementImageGray.png'
import TaxPaymentImageGray from '../../../Assets/TaxPaymentImageGray.png'
import { useFocusEffect } from '@react-navigation/native'
import { useLazyGetHomeIndividualTilesDataQuery } from '../../../../src/services/modules/questionnaire'
import { getIndividualTiles } from '../../../../src/store/questionnaire'
import DynamicQuestions from './DynamicQuestions'

let STATIC_DATA_WHITE_P = []
let STATIC_DATA_WHITE = []
let STATIC_DATA_GRAY = []

const QuestionTabScreen = ({ navigation }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const [getHomeIndividualTilesData] = useLazyGetHomeIndividualTilesDataQuery()

  useFocusEffect(
    React.useCallback(() => {
      getHomeIndividualTilesData()
        .unwrap()
        .then(res => {
          dispatch(getIndividualTiles(res))
        })
        .catch(err => {})
    }, [])
  )

  const [STATIC_DATA_WHITE_ARRAY, SET_STATIC_DATA_WHITE_ARRAY] = useState([])
  const [STATIC_DATA_WHITE_ARRAY_P, SET_STATIC_DATA_WHITE_ARRAY_P] = useState(
    []
  )
  const [STATIC_DATA_GRAY_ARRAY, SET_STATIC_DATA_GRAY_ARRAY] = useState([])

  const getIndividualData = useSelector(
    state => state?.questionnaire?.getIndividualData
  )
  const isfirstloginData: boolean = useSelector(
    state => state?.questionnaire?.isfirstlogin
  )

  useEffect(() => {
    STATIC_DATA_GRAY = []
    STATIC_DATA_WHITE_P = []
    STATIC_DATA_WHITE = []
    SET_STATIC_DATA_WHITE_ARRAY([])
    SET_STATIC_DATA_WHITE_ARRAY_P([])
    SET_STATIC_DATA_GRAY_ARRAY([])
    let miDataModel
    if (getIndividualData?.payload) {
      miDataModel = JSON.parse(getIndividualData?.payload).miDataModel?.data

      STATIC_DATA_WHITE_P.push({
        id: '1',
        title: 'Personal',
        image: PersonalImage,
        status:
          miDataModel?.ynoCheck == 1 &&
          miDataModel?.ynoCheckDependents == 1 &&
          miDataModel?.ynoCheckDirDep == 1 &&
          miDataModel?.ynoCheckAboutYou == 1
            ? 'Completed'
            : '',
      })

      if (miDataModel?.NavInvestments == 1) {
        STATIC_DATA_WHITE.push({
          id: '2',
          title: 'Investments',
          image: InvestmanetImage,
          status: miDataModel?.NavInvestmentsComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      } else {
        STATIC_DATA_GRAY.push({
          id: '2',
          title: 'Investments',
          image: InvestmanetImageGray,
          status: miDataModel?.NavInvestmentsComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      }

      if (miDataModel?.NavEducation == 1) {
        STATIC_DATA_WHITE.push({
          id: '3',
          title: 'Education',
          image: EducationImage,
          status: miDataModel?.NavEducationComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      } else {
        STATIC_DATA_GRAY.push({
          id: '3',
          title: 'Education',
          image: EducationImageGray,
          status: miDataModel?.NavEducationComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      }

      if (miDataModel?.NavBusiness == 1) {
        STATIC_DATA_WHITE.push({
          id: '4',
          title: 'Business, Rental/Royalty or Farm',
          image: BussinessImage,
          status: miDataModel?.NavBusinessComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      } else {
        STATIC_DATA_GRAY.push({
          id: '4',
          title: 'Business, Rental/Royalty or Farm',
          image: BussinessImageGray,
          status: miDataModel?.NavBusinessComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      }

      if (miDataModel?.NavAddlInfo == 1) {
        STATIC_DATA_WHITE_P.push({
          id: '5',
          title: 'Additional Information',
          image: AdditionalImage,
          status: miDataModel?.NavAddlInfoComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      }

      // else {
      //   STATIC_DATA_GRAY.push({
      //     id: '5',
      //     title: 'Additional Information',
      //     image: AdditionalImageGray,
      //     status: miDataModel?.NavAddlInfoComplete == 1 ? 'Completed' : '',
      //   })
      // }

      if (miDataModel?.NavDeductions == 1) {
        STATIC_DATA_WHITE.push({
          id: '6',
          title: 'Deductions & Credits ',
          image: DeductionsImage,
          status: miDataModel?.NavDeductionsComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      } else {
        STATIC_DATA_GRAY.push({
          id: '6',
          title: 'Deductions & Credits ',
          image: DeductionsImageGray,
          status: miDataModel?.NavDeductionsComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      }

      if (miDataModel?.NavForeignMatters == 1) {
        STATIC_DATA_WHITE.push({
          id: '7',
          title: 'Foreign Matters',
          image: ForeignImage,
          status:
            miDataModel?.NavForeignMattersComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      } else {
        STATIC_DATA_GRAY.push({
          id: '7',
          title: 'Foreign Matters',
          image: ForeignImageGray,
          status:
            miDataModel?.NavForeignMattersComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      }

      if (miDataModel?.NavGifts == 1) {
        STATIC_DATA_WHITE.push({
          id: '8',
          title: 'Gifts',
          image: GiftImage,
          status: miDataModel?.NavGiftsComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      } else {
        STATIC_DATA_GRAY.push({
          id: '8',
          title: 'Gifts',
          image: GiftImageGray,
          status: miDataModel?.NavGiftsComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      }

      if (miDataModel?.NavHealthcare == 1) {
        STATIC_DATA_WHITE.push({
          id: '9',
          title: 'Healthcare',
          image: HealthCareImage,
          status: miDataModel?.NavHealthcareComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      } else {
        STATIC_DATA_GRAY.push({
          id: '9',
          title: 'Healthcare',
          image: HealthCareImageGray,
          status: miDataModel?.NavHealthcareComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      }

      if (miDataModel?.NavMiscellaneous == 1) {
        STATIC_DATA_WHITE.push({
          id: '10',
          title: 'Misc. Income or Expense',
          image: MisclImage,
          status: miDataModel?.NavMiscellaneousComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      } else {
        STATIC_DATA_GRAY.push({
          id: '10',
          title: 'Misc. Income or Expense',
          image: MisclImageGray,
          status: miDataModel?.NavMiscellaneousComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      }

      if (miDataModel?.NavMoving == 1) {
        STATIC_DATA_WHITE.push({
          id: '11',
          title: 'Moving',
          image: MovingImage,
          status: miDataModel?.NavMovingComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      } else {
        STATIC_DATA_GRAY.push({
          id: '11',
          title: 'Moving',
          image: MovingImageGray,
          status: miDataModel?.NavMovingComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      }

      if (miDataModel?.NavRetirement == 1) {
        STATIC_DATA_WHITE.push({
          id: '12',
          title: 'Retirement',
          image: RetirementImage,
          status: miDataModel?.NavRetirementComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      } else {
        STATIC_DATA_GRAY.push({
          id: '12',
          title: 'Retirement',
          image: RetirementImageGray,
          status: miDataModel?.NavRetirementComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      }

      if (miDataModel?.NavTaxpayment == 1) {
        STATIC_DATA_WHITE.push({
          id: '13',
          title: 'Tax Payments',
          image: TaxPaymentImage,
          status: miDataModel?.NavTaxpaymentComplete == 1 ? t('questionnaire:COMPLETED'): '',
        })
      } else {
        STATIC_DATA_GRAY.push({
          id: '13',
          title: 'Tax Payments',
          image: TaxPaymentImageGray,
          status: miDataModel?.NavTaxpaymentComplete == 1 ? t('questionnaire:COMPLETED') : '',
        })
      }
      SET_STATIC_DATA_WHITE_ARRAY(STATIC_DATA_WHITE)
      SET_STATIC_DATA_WHITE_ARRAY_P(STATIC_DATA_WHITE_P)
      SET_STATIC_DATA_GRAY_ARRAY(STATIC_DATA_GRAY)
    }
  }, [getIndividualData])

  useEffect(() => {
    if (isfirstloginData) {
      navigation.navigate('PersonalScreen')
    }
  }, [isfirstloginData])

  const navigateToScreen = data => {
    switch (data.id) {
      case '1':
        navigation.navigate('PersonalScreen')
        break
      case '2':
        navigation.navigate('DynamicQuestions', { pageCode: 7011 })
        break
      case '3':
        navigation.navigate('DynamicQuestions', { pageCode: 7020 })
        break
      case '4':
        navigation.navigate('BusinessRentalHomeScreen')
        break
      case '5':
        navigation.navigate('AdditionalInformation')
        break
      case '6':
        navigation.navigate('DynamicQuestions', { pageCode: 7009 })
        break
      case '7':
        navigation.navigate('DynamicQuestions', { pageCode: 7010 })
        break
      case '8':
        navigation.navigate('Gifts')
        break
      case '9':
        navigation.navigate('DynamicQuestions', { pageCode: 7018 })
        break
      case '10':
        navigation.navigate('MiscIncomeExpenses')
        break
      case '11':
        navigation.navigate('Moving')
        break
      case '12':
        navigation.navigate('Retirement')
        break
      case '13':
        navigation.navigate('TaxPayment')
        break
    }
  }
  const renderItemWhite = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigateToScreen(item)}
        style={styles.boxItemWhite}
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

  const renderItemGray = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigateToScreen(item)}
        style={styles.boxItemGray}
      >
        <View style={styles.item}>
          <Image style={styles.img} source={item.image} />
          <Text
            children={item.title}
            stylesContainerText={styles.stylesContainerText}
            testID={'questionarie_personal_item_id'}
          />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <ScrollView>
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
      <View style={styles.horizontalLine} />
      <Text
        children={t('questionnaire:YOUT_DIDNOT_INDICATE')}
        stylesContainerText={styles.stylestextAditional}
        testID={'questionarie_personal_addional_information'}
      />
      <FlatList
        data={STATIC_DATA_GRAY_ARRAY.sort((a, b) =>
          a.title > b.title ? 1 : -1
        )}
        renderItem={renderItemGray}
        numColumns={2}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  )
}
export default QuestionTabScreen
