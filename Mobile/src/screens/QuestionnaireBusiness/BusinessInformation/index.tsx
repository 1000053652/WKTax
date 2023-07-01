import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native'
import { Header } from 'react-native-elements'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import { imageConstant } from '../../../../src/theme/Images'
import { glbCustomerHeaderOptions, glbStyles } from '../../../../src/styles/global'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import { Divider } from 'react-native-paper'
import styles from './styles'
import Text from '../../../theme/common/Text'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import ListItem from '../../../theme/common/ListItem'
import { useFocusEffect } from '@react-navigation/native'
import { useLazyGetQuestionnaireBusinessTileStatusQuery } from '../../../services/modules/questionnaire'
import loaderStyle from '../../../screens/Common/LoaderStyle'
import {Colors} from "../../../theme/constants";

const BusinessInformationScreen = ({
  navigation,
  route,
}: ApplicationScreenProps) => {
  let DATA_ABOUT = []

  const clientUserData = useSelector(state => state?.home?.clientUser)
  const { t } = useTranslation()
  const [getQuestionnaireBusinessTileStatus, { isFetching }] =
    useLazyGetQuestionnaireBusinessTileStatusQuery()

  const [ABOUT_DATA_ARRAY, SET_ABOUT_DATA_ARRAY] = useState([])

  const isfirstloginData: boolean = useSelector(
    state => state?.questionnaire?.isfirstlogin
  )

  useEffect(() => {
    console.log(isfirstloginData,"isfirstloginDataisfirstloginDataisfirstloginData");
    
    if (isfirstloginData) {
      navigation.navigate('AboutYouBusiness')
    }
  }, [isfirstloginData])


  useFocusEffect(
    React.useCallback(() => {
      DATA_ABOUT = []
      SET_ABOUT_DATA_ARRAY([])

      getQuestionnaireBusinessTileStatus()
        .unwrap()
        .then(res => {
          //  dispatch(getTileStatus(res))

          if (res[1]?.complete) {
            DATA_ABOUT.push({
              title: t('questionnaireBusiness:ABOUT'),
              status: 'Complete',
              type: 1,
            })
          } else {
            DATA_ABOUT.push({
              title: t('questionnaireBusiness:ABOUT'),
              status: '',
              type: 1,
            })
          }

          if (res[2]?.complete) {
            DATA_ABOUT.push({
              title: t('questionnaireBusiness:ELECTONIC_FUND'),
              status: 'Complete',
              type: 2,
            })
          } else {
            DATA_ABOUT.push({
              title: t('questionnaireBusiness:ELECTONIC_FUND'),
              status: '',
              type: 2,
            })
          }

          if (res[3]?.complete) {
            DATA_ABOUT.push({
              title: t('questionnaireBusiness:EVENTS'),
              status: 'Complete',
              type: 3,
            })
          } else {
            DATA_ABOUT.push({
              title: t('questionnaireBusiness:EVENTS'),
              status: '',
              type: 3,
            })
          }

          SET_ABOUT_DATA_ARRAY(DATA_ABOUT)
        })
        .catch(err => {})
    }, [])
  )

  const cancelClick = () => {
    navigation.goBack()
  }

  const rowClick = (item: listType) => {
    switch (item.type) {
      case 1:
        navigation.navigate('AboutYouBusiness')
        break
      case 2:
        navigation.navigate('ElectronicFundsScreen')
        break
      case 3:
        navigation.navigate('Event')
        break
    }
  }

  const renderItem = data => {
      console.log(data.item)
    return (
      <TouchableOpacity
          style={[
              {
                  backgroundColor:
                      data?.item?.status === 'Complete'
                          ? Colors.backgroundFooterColor
                          : Colors.white,
              },
          ]}
        onPress={() => rowClick(data.item)}
      >
        <ListItem
          title=""
          leftSlot={
            <View style={styles.leftView}>
              <Text
                stylesContainerText={styles.leftText}
                children={data?.item?.title}
                testID="personal_item"
              />
            </View>
          }
          rightSlot={
            <View style={styles.rightViewContainer}>
              <Text
                stylesContainerText={styles.completedText}
                children={data?.item?.status}
                testID="personal_item"
              />

              <Image
                style={styles.arrowImage}
                source={imageConstant.rightArrow}
              />
            </View>
          }
        />
        <Divider />
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Header
        statusBarProps={glbCustomerHeaderOptions}      
        leftComponent={
          <TouchableOpacity
            onPress={cancelClick}
            style={glbStyles.headerBackButton}
          >
            <Image
              source={imageConstant.blueBack}
              style={glbStyles.headerBackArrowImage}
            />
          </TouchableOpacity>
        }
        centerComponent={
          <View>
            <Text
              children={t('questionnaireBusiness:BUSINESS_INFORMATION')}
              testID="header_screen_title"
              stylesContainerText={glbStyles.headerTitle}
            />
            <Text
              children={clientUserData[0]?.fullName}
              stylesContainerText={styles.stylesContainerText}
              testID="questionnaire_main_name"
            />
          </View>
        }
        containerStyle={glbStyles.headerContainer}
      />
      <Spinner
        visible={isFetching}
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <FlatList
        data={ABOUT_DATA_ARRAY}
        renderItem={renderItem}
        keyExtractor={item => item.type.toString()}
      />
    </SafeAreaView>
  )
}
export default BusinessInformationScreen
