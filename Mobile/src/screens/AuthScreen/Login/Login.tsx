import React, { useRef, useState } from 'react'
import { View, TouchableOpacity, Image } from 'react-native'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import { WebView } from 'react-native-webview'
import queryString from 'query-string'
import { useLazyGetTokenApiQuery } from '../../../../src/services/modules/auth'
import { useSelector } from 'react-redux'
import { GetTokenRequest } from '../../../services/modules/auth/requestTypes'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../../screens/Common/LoaderStyle'
import { useTranslation } from 'react-i18next'
import { imageConstant } from '../../../theme/Images'
import styles from './styles'
import { apiServer } from '../../../services/Constant'
import { errorMessageToast } from '../../Error/utils'

const Login = ({ navigation }: ApplicationScreenProps) => {
  const webRef = useRef<WebView>(null)
  const { t } = useTranslation()
  const validateFirm = useSelector(state => state.firmConnection?.validateFirm)
  const [getTokenApi] = useLazyGetTokenApiQuery()
  const [isLoading, setLoading] = useState(false)
  const cancelClick = () => {
    navigation.navigate('FirmConnections')
  }
  const validateAuthCode = (url: string) => {
    const parsed = queryString.parseUrl(url)
    const parsedcode = parsed?.query?.code
    const request: GetTokenRequest = {
      authCode: parsedcode,
      authToken: validateFirm?.authToken,
    }
    getTokenApi(request)
      .unwrap()
      .then(response => {
        navigation.navigate('ServiceRequestList')
      })
      .catch(error => {
        errorMessageToast(error)
      })
  }
  return (
    <View style={styles.containermain}>
      <Spinner
        visible={isLoading}
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <View style={styles.headerViewStyle}>
        <View style={styles.headerViewStyleRow}>
          <TouchableOpacity
            style={styles.backArrowTouchableStyle}
            onPress={cancelClick}
          >
            <Image
              source={imageConstant.backArow}
              style={styles.backArrowStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerViewStyleRow}></View>
      </View>
      <View style={styles.horizontalLine} />
      <WebView
        incognito={true}
        ref={webRef}
        source={{
          uri: validateFirm?.loginUrl,
        }}
        scalesPageToFit={false}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={async navState => {
          const { url } = navState
          const urlWithAuthCode =
            apiServer.API_BASE_URL_CLIENT_WEBSITE + '/?code='
          if (url.includes(urlWithAuthCode)) {
            validateAuthCode(url)
          }
        }}
      />
    </View>
  )
}
export default Login
