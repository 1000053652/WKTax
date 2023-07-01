import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import { Platform } from 'react-native'
import uuid from 'react-native-uuid'
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging'
import { errorMessageToast } from '../Error/utils'

const checkPermission = async (pushNotificationAPI: any) => {
  messaging()
    .hasPermission()
    .then(async enabled => {
      if (enabled) {
        await getFcmToken(pushNotificationAPI)
      } else {
        await requestUserPermission(pushNotificationAPI)
      }
    })
    .catch(error => {
      console.error('error checking permisions ' + error)
      errorMessageToast(error)
    })
}
export const requestUserPermission = async (pushNotificationAPI: any) => {
  const authStatus = await messaging().requestPermission()
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  if (enabled) {
    await getFcmToken(pushNotificationAPI)
  }
}
export const getFcmToken = async (pushNotificationAPI: any) => {
  try {
    await messaging().registerDeviceForRemoteMessages()
    messaging().setBackgroundMessageHandler(async remoteMessage => {})
    const token = await messaging().getToken()
    //Register the Token to server
    await pushNotificationAPICall(pushNotificationAPI, token)
  } catch (error) {
    console.error('FCM error:', error)
  }
}

const notificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {})
  // Quiet and Background State -> Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
      }
    })
    .catch(error => {
      console.error('failed', error)
      errorMessageToast(error)
    })
  // Foreground State
  messaging().onMessage(async remoteMessage => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: remoteMessage?.notification?.title,
      text2: remoteMessage?.notification?.body ?? '',
      onPress: () => {
        Toast.hide()
      },
    })
  })
}
export const notificationData = async (pushNotificationAPI: any) => {
  //FCM for Android
  if (Platform.OS != 'ios') {
    await checkPermission(pushNotificationAPI)
    await notificationListener()
    return
  }
  //For iOS
  PushNotification.configure({
    onRegister: async function (token) {
      //Register the Token to server
      await pushNotificationAPICall(pushNotificationAPI, token.token)
    },
    onNotification: function (notification) {
      if (Platform.OS == 'ios') {
        notification.finish(PushNotificationIOS.FetchResult.NoData)
      }
    },
    onAction: function (notification) {},
    onRegistrationError: function (err) {
      console.error(err.message, err)
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  })
}

const pushNotificationAPICall = async (
  pushNotificationAPI: any,
  token: string
) => {
  const postData = {
    id: null,
    data: {
      deviceId: `${token}`,
      installationId: uuid.v4(),
      deviceType: Platform.OS == 'ios' ? 'apns' : 'fcm',
    },
    headers: null,
  }
  pushNotificationAPI(postData)
    .unwrap()
    .then(() => {})
    .catch((error: any) => {
      console.error('PushNotification register error=', error)
      errorMessageToast(error)
    })
}
