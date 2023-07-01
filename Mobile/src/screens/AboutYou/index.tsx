import React, { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'
import Text from '../../theme/common/Text'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { ApplicationScreenProps } from '../../../@types/navigation'
import {
  QueryParamAboutYou,
  useLazyAboutYouDataApiQuery,
} from '../../../src/services/modules/aboutYou'
import { useDispatch, useSelector } from 'react-redux'
import { aboutYouData, toggleSwitchAbout } from '../../../src/store/aboutyou'
import Button from '../../../src/theme/common/Button'
import { Colors, FontFamily, moderateScale } from '../../../src/theme/constants'
import { PageCode } from '../../../src/services/constants/PageCode'
import { QAndAModel } from '../../../src/store/aboutyou/types'
import { AboutYouRequestBody } from '../../../src/services/modules/aboutYou/AboutYouRequestBody'
import { Spinner } from '../../theme/common/Spinner/Spinner'
import loaderStyle from '../../screens/Common/LoaderStyle'
import { imageConstant } from '../../../src/theme/Images'
import { useFocusEffect } from '@react-navigation/native'
import { YNOSegmentedControl } from '../../../src/theme/common/index'
import { errorMessageToast } from '../Error/utils'
import { glbStyles } from '../../../src/styles/global'

const AboutYou = ({ navigation }: ApplicationScreenProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [aboutYouDataApi, { isFetching }] = useLazyAboutYouDataApiQuery()
  const getTaxPayerData = useSelector(state => state?.aboutyou?.taxPayer)
  const getspouseTaxPayerData = useSelector(
    state => state?.aboutyou?.spouseTaxPayer
  )
  const getaddressData = useSelector(state => state?.aboutyou?.address)
  const arrayListQandA: Array<QAndAModel> = useSelector(
    state => state?.aboutyou?.qAndA
  )
  const [isRender, setisRender] = useState(false)

  const taxListingArray: Array<any> = [
    getTaxPayerData,
    getspouseTaxPayerData,
    getaddressData,
  ]
  const paramsAboutYou = {
    pageCode: PageCode.AboutYou,
    bodyParam: {},
  } as QueryParamAboutYou

  useEffect(() => {
    getAboutYouData()
  }, [])

  useFocusEffect(
    useCallback(() => {
      getAboutYouData()
    }, [])
  )

  const getAboutYouData = () => {
    aboutYouDataApi(paramsAboutYou)
      .unwrap()
      .then(res => {
        dispatch(aboutYouData(JSON.parse(res?.payload)?.miDataModel?.data))
      })
      .catch(err => {
        console.error('APIEror:- ', err)
        errorMessageToast(err)
      })
  }

  const aboutYouDataListing = ({ item }) => {
    return (
      <View style={styles.container}>
        {item.id == 1 ? taxPayerListing(item) : null}
        {item.id == 2 ? taxPayerListing(item) : null}
        {item.id == 3 ? addressListing(item) : null}
      </View>
    )
  }

  const qAndaListing = (item: ListRenderItemInfo<QAndAModel>) => {
    return (
      <View style={styles.container}>
        {item.item.title == 'qAndn' ? qAndn(item.item) : null}
      </View>
    )
  }

  const empltyView = () => {
    return (
      <View>
        <View style={styles.horizontalLine} />
        <View style={styles.empltyView} />
        <View style={styles.horizontalLine} />
      </View>
    )
  }

  const taxPayerListing = item => {
    return (
      <View>
        {empltyView()}
        <TouchableOpacity
          style={styles.subContainer}
          onPress={() => {
            if (item.id == 1) {
              navigation.navigate('TaxPayerEditScreen')
            } else if (item.id == 2) {
              navigation.navigate('SpouseEditScreen')
            }
          }}
        >
          <View style={styles.titleItem}>
            <Text
              stylesContainerText={styles.titleStyle}
              children={item.title}
              testID="about.lable.title.taxpayer"
            />
            <Image style={styles.img} source={imageConstant.leftArow} />
          </View>
          <View>
            <Text
              stylesContainerText={styles.fieldStyle}
              children={t('aboutYou:NAME')}
              testID="about.lable.name"
            />
            <Text
              stylesContainerText={styles.valueStyle}
              children={item.txtTPFullName}
              testID="about.value.name"
            />
            <View style={styles.multiRowItem}>
              <View style={styles.multiItemOne}>
                <Text
                  stylesContainerText={styles.fieldStyle}
                  children={t('aboutYou:daytime')}
                  testID="about.lable.dphone"
                />
                <Text
                  stylesContainerText={styles.valueStyleBlue}
                  children={item.txtTPWorkPH}
                  testID="about.value.dphone"
                />
              </View>
              <View>
                <Text
                  stylesContainerText={styles.fieldStyle}
                  children={t('aboutYou:EP')}
                  testID="about.lable.dphone"
                />
                <Text
                  stylesContainerText={styles.valueStyleBlue}
                  children={item.txtTPEveningPH}
                  testID="about.value.dphone"
                />
              </View>
            </View>

            <Text
              stylesContainerText={styles.fieldStyle}
              children={t('aboutYou:MOBILEPHONE')}
              testID="about.lable.mobile"
            />
            <Text
              stylesContainerText={styles.valueStyleBlue}
              children={item.txtTPCellPH}
              testID="about.value.dphone"
            />
            <Text
              stylesContainerText={styles.fieldStyle}
              children={t('aboutYou:OCCUPATION')}
              testID="about.lable.occupation"
            />
            <Text
              stylesContainerText={styles.valueStyle}
              children={item.txtTPOccupation}
              testID="about.value.occupation"
            />
            <Text
              stylesContainerText={styles.fieldStyle}
              children={t('aboutYou:EMAIL_U')}
              testID="about.lable.email"
            />
            <Text
              stylesContainerText={styles.valueStyleBlue}
              children={item.txtTPEmail}
              testID="about.value.email"
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const addressListing = item => {
    return (
      <View>
        {empltyView()}
        <TouchableOpacity
          style={styles.subContainer}
          onPress={() => {
            if (item.title == 'Address') {
              navigation.navigate('AddressEditScreen')
            }
          }}
        >
          <View style={styles.titleItem}>
            <Text
              stylesContainerText={styles.titleStyle}
              children={item.title}
              testID="about.lable.title.address"
            />
            <Image style={styles.img} source={imageConstant.leftArow} />
          </View>
          <View style={styles.multiRowItem}>
            <View style={styles.multiItemOne}>
              <Text
                stylesContainerText={styles.fieldStyle}
                children={t('aboutYou:STREETADDRESS')}
                testID="about.lable.address"
              />
              <Text
                stylesContainerText={styles.valueStyle}
                children={item.txtStreet}
                testID="about.value.address"
                numberOfLines={1}
                ellipsize={'tail'}
              />
              <Text
                stylesContainerText={styles.fieldStyle}
                children={t('aboutYou:CITY_LOWER')}
                testID="about.lable.city"
              />
              <Text
                stylesContainerText={styles.valueStyle}
                children={item.txtCity}
                testID="about.value.city"
              />
              <Text
                stylesContainerText={styles.fieldStyle}
                children={t('aboutYou:STATE')}
                testID="about.lable.state"
              />
              <Text
                stylesContainerText={styles.valueStyle}
                children={item.txtState}
                testID="about.value.state"
              />
              <Text
                stylesContainerText={styles.fieldStyle}
                children={t('aboutYou:ZIPCODE')}
                testID="about.lable.zip.code"
              />
              <Text
                stylesContainerText={styles.valueStyle}
                children={item.txtZIP}
                testID="about.value.zip.code"
              />
            </View>

            <View>
              <Text
                stylesContainerText={styles.fieldStyle}
                children={t('aboutYou:APT')}
                testID="about.lable.APT"
              />
              <Text
                stylesContainerText={styles.valueStyle}
                children={item.txtApt}
                testID="about.value.APT"
              />
              <Text
                stylesContainerText={styles.fieldStyle}
                children={t('aboutYou:FSC')}
                testID="about.lable.FSC"
              />
              <Text
                stylesContainerText={styles.valueStyle}
                children={item.txtForeignCounty}
                testID="about.value.FSC"
              />
              <Text
                stylesContainerText={styles.fieldStyle}
                children={t('aboutYou:FC')}
                testID="about.lable.fc"
              />
              <Text
                stylesContainerText={styles.valueStyle}
                children={item.txtForeignCountry}
                testID="about.value.fc"
              />
              <Text
                stylesContainerText={styles.fieldStyle}
                children={t('aboutYou:FPC')}
                testID="about.lable.fpc"
              />
              <Text
                stylesContainerText={styles.valueStyle}
                children={item.txtForeignPostalCode}
                testID="about.value.fpc"
              />
            </View>
          </View>
        </TouchableOpacity>
        {empltyView()}
      </View>
    )
  }

  const qAndn = (item: QAndAModel) => {
    return (
      <View>
        <View style={styles.horizontalLine} />
        <View style={styles.subContainer}>
          <View style={styles.qAndNTitleItem}>
            <Text
              stylesContainerText={styles.qAndNTitleStyle}
              children={t(item.questions)}
              testID="aAndN.title"
            />
          </View>
          <View style={styles.switchTopContainer}>
            {switchTaxPayer(item)}
            {switchSpouse(item)}
          </View>
        </View>
      </View>
    )
  }

  const submitAboutYou = (aboutDone: string) => {
    const updateAboutYouBody = {
      cmbSPState: getspouseTaxPayerData.cmbTPState as string,
      cmbTPState: getTaxPayerData.cmbTPState as string,
      code: PageCode.AboutYou as string,
      datSPDOB: getspouseTaxPayerData.datTPDOB as string,
      datSPDeceased: getspouseTaxPayerData.datTPDeceased as string,
      datSPExpiration: getspouseTaxPayerData.datTPExpiration as string,
      datSPIssue: getspouseTaxPayerData.datTPIssue as string,
      datTPDOB: getTaxPayerData.datTPDOB as string,
      datTPDeceased: getTaxPayerData.datTPDeceased as string,
      datTPExpiration: getTaxPayerData.datTPExpiration as string,
      datTPIssue: getTaxPayerData.datTPIssue as string,
      ssnSP_X: getspouseTaxPayerData.ssnTP_X as string,
      ssnTP_X: getTaxPayerData.ssnTP_X as string,
      txtApt: getaddressData.txtApt as string,
      txtCity: getaddressData.txtCity as string,
      txtForeignCountry: getaddressData.txtForeignCountry as string,
      txtForeignCounty: getaddressData.txtForeignCounty as string,
      txtForeignPostalCode: getaddressData.txtForeignPostalCode as string,
      txtSPCellPH: getspouseTaxPayerData.txtTPCellPH as string,
      txtSPCellPref: getspouseTaxPayerData.txtTPCellPref as string,
      txtSPDL: getspouseTaxPayerData.txtTPDL as string,
      txtSPDTPref: getspouseTaxPayerData.txtTPDTPref as string,
      txtSPEPPref: getspouseTaxPayerData.txtTPEPPref as string,
      txtSPEmail: getspouseTaxPayerData.txtTPEmail as string,
      txtSPEveningPH: getspouseTaxPayerData.txtTPEveningPH as string,
      txtSPFirstName: getspouseTaxPayerData.txtTPFirstName as string,
      txtSPLastName: getspouseTaxPayerData.txtTPLastName as string,
      txtSPMiddleInitial: getspouseTaxPayerData.txtTPMiddleInitial as string,
      txtSPOccupation: getspouseTaxPayerData.txtTPOccupation as string,
      txtSPWorkPH: getspouseTaxPayerData.txtTPWorkPH as string,
      txtState: getaddressData.txtState as string,
      txtStreet: getaddressData.txtStreet as string,
      txtTPCellPH: getTaxPayerData.txtTPCellPH as string,
      txtTPCellPref: getTaxPayerData.txtTPCellPref as string,
      txtTPDL: getTaxPayerData.txtTPDL as string,
      txtTPDTPref: getTaxPayerData.txtTPDTPref as string,
      txtTPEPPref: getTaxPayerData.txtTPEPPref as string,
      txtTPEmail: getTaxPayerData.txtTPEmail as string,
      txtTPEveningPH: getTaxPayerData.txtTPEveningPH as string,
      txtTPFirstName: getTaxPayerData.txtTPFirstName as string,
      txtTPLastName: getTaxPayerData.txtTPLastName as string,
      txtTPMiddleInitial: getTaxPayerData.txtTPMiddleInitial as string,
      txtTPOccupation: getTaxPayerData.txtTPOccupation as string,
      txtTPWorkPH: getTaxPayerData.txtTPWorkPH as string,
      txtZIP: getaddressData.txtZIP as string,
      ynoCheck: aboutDone,
      ynoSPCitizen: arrayListQandA[3].spYOrN as string,
      ynoSPClaimed: arrayListQandA[0].spYOrN as string,
      ynoSPLegallyBlind: arrayListQandA[1].spYOrN as string,
      ynoSPMilitary: arrayListQandA[4].spYOrN as string,
      ynoSPPECF: arrayListQandA[2].spYOrN as string,
      ynoTPCitizen: arrayListQandA[3].taxYOrN as string,
      ynoTPClaimed: arrayListQandA[0].taxYOrN as string,
      ynoTPLegallyBlind: arrayListQandA[1].taxYOrN as string,
      ynoTPMilitary: arrayListQandA[4].taxYOrN as string,
      ynoTPPECF: arrayListQandA[2].taxYOrN as string,
    } as AboutYouRequestBody
    const paramsSaveAboutYou = {
      pageCode: PageCode.AboutYou,
      bodyParam: updateAboutYouBody,
    } as QueryParamAboutYou

    aboutYouDataApi(paramsSaveAboutYou)
      .unwrap()
      .then(res => {
        navigation.goBack()
      })
      .catch(err => {
        console.error('APIEror:- ', err)
        errorMessageToast(err)
      })
  }

  const switchTaxPayer = (item: QAndAModel) => {
    return (
      <YNOSegmentedControl
        value={item.taxYOrN}
        yesValue={item.id == 0 || item.id == 1 ? 'X' : 'Y'}
        noValue={'N'}
        onValueChange={value => toggleYNTaxPayer(item, value)}
        textAboveSegment={t('aboutYou:TAXPAYER')}
      />
    )
  }

  const switchSpouse = (item: QAndAModel) => {
    return (
      <YNOSegmentedControl
        value={item.spYOrN}
        yesValue={item.id == 0 || item.id == 1 ? 'X' : 'Y'}
        noValue={'N'}
        onValueChange={value => toggleYNSpouse(item, value)}
        textAboveSegment={t('aboutYou:SPOUSE')}
      />
    )
  }

  const toggleYNSpouse = (item: QAndAModel, state: string) => {
    const newItem: QAndAModel = { ...item, spYOrN: state }
    dispatch(toggleSwitchAbout({ index: item.id, item: newItem }))
    setisRender(!isRender)
  }

  const toggleYNTaxPayer = async (item: QAndAModel, state: string) => {
    const newItem: QAndAModel = { ...item, taxYOrN: state }
    dispatch(toggleSwitchAbout({ index: item.id, item: newItem }))
    setisRender(!isRender)
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Spinner
        visible={isFetching}
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <ScrollView style={styles.container}>
        {getTaxPayerData != null ? (
          <View style={{ flex: 1 }}>
            <FlatList
              data={taxListingArray}
              renderItem={aboutYouDataListing}
              keyExtractor={item => item.id}
            />

            <FlatList
              extraData={isRender}
              data={arrayListQandA}
              renderItem={qAndaListing}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.horizontalLine} />

      <View style={styles.buttonConatinerStyle}>
        <Button
          testID="aboutYou.btn.finishlater"
          disable={false}
          title={t('aboutYou:FINISHLATER')}
          onPress={() => {
            submitAboutYou('0')
          }}
          stylesContainer={styles.buttonFinishContactStyle}
          stylesContainerText={{
            fontSize: moderateScale(14),
            justifyContent: 'center',
            textAlign: 'center',
            color: Colors.black,
            fontFamily: FontFamily.FiraSansRegular,
          }}
        />

        <Button
          testID="aboutYou.btn.done"
          disable={false}
          title={t('aboutYou:DONE')}
          onPress={() => {
            submitAboutYou('1')
          }}
          stylesContainer={styles.buttonContactStyle}
          stylesContainerText={styles.buttonDoneContactStyle}
        />
      </View>
      <View style={styles.horizontalLine} />
    </SafeAreaView>
  )
}

export default AboutYou
