import React, { useEffect } from 'react'
import {
  View,
  FlatList,
  Image,
  SafeAreaView,
  ImageBackground,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native'
import { useTheme } from '../../hooks'
import styles from './styles'
import { imageConstant } from '../../theme/Images'
import BackgroudImageService from '../../Assets/BackgroudImageService.png'
import { ApplicationScreenProps } from '../../../@types/navigation'
import { Spinner } from '../../theme/common/Spinner/Spinner'
import loaderStyle from '../Common/LoaderStyle'
import { useTranslation } from 'react-i18next'
import {
  useLazyClientRequestListDataApiQuery,
  useLazyClientUserClickServiceApiQuery,
} from '../../../src/services/modules/home'
import { addSingleServiceList } from '../../store/home'
import { useSelector, useDispatch } from 'react-redux'
import { Colors } from '../../../src/theme/constants'
import { replceTokenData, setIsLogin } from '../../../src/store/auth/login'
import { useFocusEffect } from '@react-navigation/native'
import { FirmLocalConnectionsState } from '../../../src/store/auth/firmConnection'
import { notificationData } from '../PushNotification/PushNotificationutils'
import { useLazyRegisterPushNotificationQuery } from '../../services/modules/pushnotification'
import { useLazyGetRequestDetailsApiQuery } from '../../../src/services/modules/task'
import { useLazyLogoutAPIQuery } from '../../../src/services/modules/auth'
import { errorMessageToast } from '../Error/utils'
import { glbStyles } from '../../../src/styles/global'

const ServiceRequestListScreen = ({
  navigation,
  route,
}: ApplicationScreenProps) => {
  const params = route.params || {}
  const { firmcodeFromQuery } = params
  const { Layout } = useTheme()

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [clientRequestListDataApi, { isFetching, data }] =
    useLazyClientRequestListDataApiQuery()
  const [getRequestDetailsApi, { isFetching: isFetchingRequestdetails }] =
    useLazyGetRequestDetailsApiQuery()
  const [logoutAPI] = useLazyLogoutAPIQuery()
  const [
    clientUserClickServiceApi,
    { isSuccess, data: selectServiceData, isFetching: isFetchingSelectService },
  ] = useLazyClientUserClickServiceApiQuery()

  const userRequestListData = useSelector(
    state => state?.home?.clientUserRequestListData
  )
  const [pushNotificationAPI] = useLazyRegisterPushNotificationQuery()
  const loggedInFirmData: FirmLocalConnectionsState = useSelector(
    state => state?.auth?.loggedInFirmData
  )
  //Push Notification
  useEffect(() => {
    notificationData(pushNotificationAPI)
  }, [loggedInFirmData])

  useEffect(() => {
    if (firmcodeFromQuery) {
      showAlertForDiffrentFirmKey()
    }
  }, [firmcodeFromQuery])

  const showAlertForDiffrentFirmKey = () => {
    if (firmcodeFromQuery != loggedInFirmData?.id) {
      Alert.alert(t('auth:ALREADY_CONNECT_PLEASE_LOGOUT'), '', [
        {
          text: t('common:NO'),
          style: 'cancel',
        },
        {
          text: t('common:YES'),
          onPress: () => {
            logoutAPI('')
              .unwrap()
              .then(() => {
                dispatch(setIsLogin(false))
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                })
              })
              .catch(error => {
                errorMessageToast(error)
              })
          },
          style: 'default',
        },
      ])
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      clientRequestListDataApi()
        .unwrap()
        .then(data => {
          if (data?.length == 0) {
            navigation.navigate('AppDrawerNavigator')
          } else if (data?.length == 1) {
            callWSToGetRequestDetailsAPI(data[0])
          }
        })
        .catch(error => {
          errorMessageToast(error)
        })
    }, [data])
  )
  const callWSToGetRequestDetailsAPI = async item => {
    try {
      await getRequestDetailsApi().unwrap()
      navigation.navigate('AppDrawerNavigator')
    } catch (error) {}
  }
  const selectServiceDataAPI = async item => {
    const requestData = {
      tenantId: item.tenantId,
      clientGuid: item.clientGuid,
      userGuid: item.userGuid,
      clientDisplayName: item.clientDisplayName,
      taxYear: item.taxYear,
      requestGuid: item.requestGuid,
      clientServiceTypeIntId: item.clientServiceTypeIntId,
      clientType: item.clientType,
      serviceType: item.serviceType,
      isDefaultRequest: item.isDefaultRequest,
      isSelectedRequest: item.isSelectedRequest,
      userStatus: item.userStatus,
      reopenComment: item.reopenComment,
      reopenStatus: item.reopenStatus,
      activeModuleTypes: item.activeModuleTypes,
      clientCollabToken: item.clientCollabToken,
      isBilled: item.isBilled,
      canDisplayReopenMessage: item.canDisplayReopenMessage,
      isReturnExist: item.isReturnExist,
    }
    try {
      const response = await clientUserClickServiceApi(requestData).unwrap()
      dispatch(replceTokenData(response.clientCollaborationTokenString))
      dispatch(addSingleServiceList(item))
      callWSToGetRequestDetailsAPI(item)
    } catch (error) {}
  }
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          selectServiceDataAPI(item)
        }}
        style={styles.rowItemServiceListView}
      >
        <View style={styles.rowItemServiceList}>
          <Text style={styles.reqlistitem}>{item?.clientDisplayName}</Text>
          <Text style={styles.reqlistitemDesc}>
            {item?.clientServiceTypeWithYearStr}
          </Text>
          <View style={styles.statusView}>
            <Image
              source={
                item?.requestProgress == t('serviceListStatus:NOT_STARTED')
                  ? imageConstant.NotStartedImage
                  : item?.requestProgress == t('serviceListStatus:INPROGRESS')
                  ? imageConstant.InProgressStatus
                  : item?.requestProgress == t('serviceListStatus:NO_OPEN_TASK')
                  ? imageConstant.NoOpenTaskImage
                  : item?.requestProgress ==
                    t('serviceListStatus:RETURN_DELIVERED')
                  ? imageConstant.ReturnDeliveredImage
                  : null
              }
              style={styles.imageStyle}
            />
            <Text
              style={[
                styles.reqlistitemStatus,
                {
                  color:
                    item?.requestProgress ==
                      t('serviceListStatus:INPROGRESS') ||
                    item?.requestProgress == t('serviceListStatus:NO_OPEN_TASK')
                      ? Colors.testColorBlue
                      : item?.requestProgress ==
                        t('serviceListStatus:NOT_STARTED')
                      ? Colors.serviceListStatusColorBrown
                      : item?.requestProgress ==
                        t('serviceListStatus:RETURN_DELIVERED')
                      ? Colors.serviceListStatusColorGreen
                      : Colors.black,
                },
              ]}
            >
              {item?.requestProgress}
            </Text>
          </View>
        </View>
        <View style={styles.rowItemServiceListImage}>
          <Image
            style={styles.reqlistImage}
            source={require('../../Assets/ForwardArrowBlack.png')}
          />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Spinner
        visible={
          isFetching || isFetchingRequestdetails || isFetchingSelectService
        }
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <ImageBackground
        source={BackgroudImageService}
        resizeMode="cover"
        style={styles.imageBackground}
      >
        <ScrollView style={styles.scrollView}>
          <View style={Layout.center}>
            <View style={styles.emptyView} />
            <Text style={styles.welcomeLabelStyle}>Welcome!</Text>
          </View>
          <Text style={styles.taskLabelSelectServiceStyleStyle}>
            Please select a service to continue:
          </Text>
          <FlatList data={userRequestListData} renderItem={renderItem} />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}
export default ServiceRequestListScreen
