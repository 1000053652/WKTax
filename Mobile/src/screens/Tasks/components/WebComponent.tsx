import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'
import loaderStyle from '../../Common/LoaderStyle'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import { t } from 'i18next'
import { ApplicationScreenProps } from '../../../../@types/navigation'

const WebComponentScreen = ({ navigation, route }: ApplicationScreenProps) => {
  const url = route?.params?.url
  const [isLoading, setLoading] = useState(false)
  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <WebView
        source={{
          uri: url,
        }}
        onNavigationStateChange={async navState => {
          const { url } = navState
          if (url.includes('/decline') || url.includes('/returns/wizard')) {
          } else if (url.includes('/error')) {
            navigation.goBack()
          }
        }}
        incognito={true}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        useWebKit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({ container: { flex: 1 } })

export default WebComponentScreen
