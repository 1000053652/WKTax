import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from './store'
import ApplicationNavigator from './navigators/Application'
import './translations'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Linking, Platform } from 'react-native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { toastConfig } from './config/toastConfig'
import messaging, { firebase } from '@react-native-firebase/messaging'
import checkConnection from './theme/common/CheckConnection/CheckConnection'
const App = ({ initialURL }) => {
  checkConnection() //start Network Listener

  if (Platform.OS != 'ios') {
    if (firebase?.apps?.length !== 0) {
      // Foreground State
      messaging()?.onMessage(async remoteMessage => {
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
  }
  useEffect(() => {
    if (!initialURL) {
      return
    }
    Linking.openURL(initialURL)
  }, [initialURL])
  return (
    <Provider store={store}>
      {/**
       * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
       * and saved to redux.
       * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
       * for example `loading={<SplashScreen />}`.
       * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
       */}
      <PersistGate loading={null} persistor={persistor}>
        <BottomSheetModalProvider>
          <ApplicationNavigator />
        </BottomSheetModalProvider>
      </PersistGate>
      <Toast config={toastConfig} />
    </Provider>
  )
}

export default App
