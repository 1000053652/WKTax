import React, { useEffect } from 'react'
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  Alert,
  Linking,
} from 'react-native'
import {
  setIsLogin,
  addTokenData,
  setSessionData,
} from '../../store/auth/login'
import { addValidateFirmData } from '../../store/auth/firmConnection'
import CommonText from '../../theme/common/Text'
import styles from './styles'
import LogoutImage from '../../Assets/Logout.png'
import FeedbackImage from '../../Assets/Feedback.png'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useLazyGetProfileDataAPIQuery } from '../../../src/services/modules/profile'
import {
  useLazyGetValidateFirmDataApiQuery,
  useLazyLogoutAPIQuery,
} from '../../../src/services/modules/auth'
import { glbStyles } from '../../../src/styles/global'
import { ApplicationScreenProps } from '../../../@types/navigation'

const MenuScreen = ({ navigation }: ApplicationScreenProps) => {
  const { t } = useTranslation()
  const [getProfileDataAPI] = useLazyGetProfileDataAPIQuery()
  const [logoutAPI, { isSuccess }] = useLazyLogoutAPIQuery()
  const [
    getValidateFirmDataApi,
    { isLoading, data, isSuccess: isSuccessGetValidate },
  ] = useLazyGetValidateFirmDataApiQuery()

  const connections = useSelector(state => state?.firmConnection?.connections)
  const dispatch = useDispatch()

  if (isSuccessGetValidate && isSuccess) {
    dispatch(setIsLogin(false))
    dispatch(setSessionData(false))
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    })
  }
  const profileData = useSelector(state => state?.profile?.profileData)

  useEffect(() => {
    getProfileDataAPI()
  }, [])

  const logout = () => {
    if (connections?.length == 1) {
      getValidateFirmDataApi(connections[0]?.id)
      logoutAPI()
    } else {
      logoutAPI()
      dispatch(setIsLogin(false))
      dispatch(setSessionData(false))
      dispatch(addTokenData(''))

      dispatch(addValidateFirmData(''))
      navigation.reset({
        index: 0,
        routes: [{ name: 'FirmConnections' }],
      })
    }
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaViewWithAndroidTopSpace}>
      <View style={styles.headingView}>
        <View style={styles.subHeadingView}>
          <CommonText
            children={
              profileData?.firstName?.charAt(0) +
              ' ' +
              profileData?.lastName?.charAt(0)
            }
            stylesContainerText={styles.stylesContainerNameShort}
            testID="menu_short_name"
          />
        </View>
        <View style={styles.styleNameEmail}>
          <CommonText
            children={profileData?.firstName + ' ' + profileData?.lastName}
            stylesContainerText={styles.stylesContainerName}
            testID="menu_fullname"
          />
          <CommonText
            children={profileData?.email}
            stylesContainerText={styles.stylesContainerEmail}
            testID="menu_emailID"
          />
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.emptyStyleVertical} />
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('ProfileScreen')}
      >
        <CommonText
          children={t('menu:USER_PROFILE')}
          stylesContainerText={styles.stylesContainerText}
          testID="menu_change_profile"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('ChangePasswordScreen')}
      >
        <CommonText
          children={t('menu:CHANGE_PASSWORD')}
          stylesContainerText={styles.stylesContainerText}
          testID="menu_change_password"
        />
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
      <View style={styles.emptyStyleVertical} />
      <TouchableOpacity
        style={styles.menuItemBottom}
        onPress={() =>
          Linking.openURL(
            'https://www.allcounted.com/s?did=3oamzz242moah&lang=en_US'
          )
        }
      >
        <Image
          style={styles.feedbackLogoutStyle}
          source={FeedbackImage}
          resizeMode="contain"
        />

        <CommonText
          children={t('menu:FEEDBACK')}
          stylesContainerText={styles.stylesContainerText}
          testID="menu_feedback"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItemBottom}
        onPress={() =>
          Alert.alert(t('common:CC_APP'), t('changePassword:ARE_YOU_SURE'), [
            {
              text: t('common:CANCEL'),
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: t('common:OK'),
              onPress: () => logout(),
              style: 'default',
            },
          ])
        }
      >
        <Image
          style={styles.feedbackLogoutStyle}
          source={LogoutImage}
          resizeMode="contain"
        />

        <CommonText
          children={t('menu:LOGOUT')}
          stylesContainerText={styles.stylesContainerText}
          testID="menu_logout"
        />
      </TouchableOpacity>
    </SafeAreaView>
  )
}
export default MenuScreen
