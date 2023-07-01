import { ApplicationScreenProps } from '../../../../@types/navigation'
import {
  View,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
import { useTheme } from '../../../hooks'
import Input from '../../../theme/common/Input'
import Button from '../../../theme/common/Button'
import CommonText from '../../../theme/common/Text'
import { useTranslation } from 'react-i18next'
import FooterScreen from '../../../theme/common/Footer'
import { useLazyGetFirmNameApiQuery } from '../../../services/modules/auth'
import {
  FirmLocalConnectionsState,
  addFirmConnection,
} from '../../../store/auth/firmConnection'
import { useDispatch, useSelector } from 'react-redux'
import AuthBg from '../../../Assets/auth_bg.png'
import AuthScreenBg from '../../../Assets/auth_screen_img.png'
import { FirmNameResponse } from '../../../services/modules/auth/responseTypes'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../../screens/Common/LoaderStyle'
import { imageConstant } from '../../../../src/theme/Images'
import { errorMessageToast } from '../../Error/utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { glbStyles } from '../../../../src/styles/global'

const AddFirmConnection = ({ navigation, route }: ApplicationScreenProps) => {
  const { Layout } = useTheme()
  const [firmCode, onChangeText] = React.useState('')
  const connections: FirmLocalConnectionsState[] = useSelector(
    state => state.firmConnection?.connections
  )
  const [getFirmNameApi, { isFetching }] = useLazyGetFirmNameApiQuery()
  const [firmCodeError, setShowFirmCodeError] = useState('')
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const params = route.params || {}
  const { firmcodeFromQuery } = params

  const showFirmConnectionAlert = (res: FirmNameResponse) => {
    Alert.alert(
      '',
      t('auth:AUTH_ALERT_TITLE').replace('${NAME}', res.firmName),
      [
        {
          text: t('common:NO'),
          style: 'cancel',
        },
        {
          text: t('common:YES'),
          onPress: () => {
            dispatch(addFirmConnection({ id: firmCode, data: res }))
            navigation.navigate('FirmConnections')
          },
          style: 'default',
        },
      ]
    )
  }
  useEffect(() => {
    if (connections?.length > 0) {
      navigation.navigate('FirmConnections')
    }
  }, [])
  useEffect(() => {
    if (firmcodeFromQuery) {
      onChangeText(firmcodeFromQuery)
    }
  }, [firmcodeFromQuery])

  const getFirmNameAPI = () => {
    setShowFirmCodeError('')
    if (firmCode.length > 1) {
      if (connections?.some(item => item.id === firmCode)) {
        setShowFirmCodeError(t('auth:FIRM_CODE_EXISTS'))
      } else {
        getFirmNameApi(firmCode)
          .unwrap()
          .then(res => {
            showFirmConnectionAlert(res)
          })
          .catch(err => {
            setShowFirmCodeError(err.data.errorMessages[0].message)
            errorMessageToast(err)
          })
      }
    } else {
      setShowFirmCodeError(t('auth:FIRM_CODE_REQUIRE'))
    }
  }
  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <View style={styles.container}>
        <Spinner
          visible={isFetching}
          textContent={t('common:LOADING')}
          size={'large'}
          textStyle={loaderStyle.spinnerTextStyle}
        />
        <ImageBackground
          source={AuthBg}
          resizeMode="cover"
          style={[Layout.fullWidth, Layout.fullHeight, styles.bg]}
        >
          <KeyboardAwareScrollView style={{ flex: 1 }}>
            <ScrollView style={[Layout.fullWidth]}>
              <View style={styles.imageViewStyle}>
                <Image style={styles.image} source={AuthScreenBg} />
                <CommonText
                  stylesContainerText={styles.welComeText}
                  testID="add_firm_connection_welcome_text"
                  children={t('auth:welcome')}
                />
                <View style={styles.empltyView} />
                <CommonText
                  testID="add_firm_connection_subtitle_text"
                  children={t('auth:subTitle')}
                  stylesContainerText={styles.stylesContainerDesc}
                  onPress={() => {}}
                />
              </View>
              <View style={styles.containerKey}>
                <View style={styles.empltyView} />
                <View style={styles.empltyView} />
                <CommonText
                  testID="add_firm_connection_firmkey_text"
                  children={t('auth:firmKeyText')}
                  stylesContainerText={styles.stylesContainerDesc}
                  onPress={() => {}}
                />
                <Input
                  testID="add_firm_connection_firmkey_input"
                  label={''}
                  placeholder={t('auth:FIRM_CODE')}
                  iconClick={false}
                  value={firmCode}
                  error={firmCodeError}
                  showError={firmCodeError}
                  onChangeText={text => {
                    onChangeText(text), setShowFirmCodeError('')
                  }}
                  inputBoxStyles={styles.inputBoxStyles}
                  container={styles.BoxStyles}
                  icon={firmCode === '' ? null : imageConstant.closeIcon}
                  onPressIcon={() => {
                    onChangeText('')
                    setShowFirmCodeError('')
                  }}
                />
              </View>

              {!firmCodeError ? (
                <CommonText
                  testID="add_firm_connection_firmkey_text"
                  children={t('auth:firmCodeError')}
                  stylesContainerText={styles.stylesTextInstrcution}
                  onPress={() => {}}
                />
              ) : null}
            </ScrollView>
          </KeyboardAwareScrollView>
          <Button
            testID="add_firm_connection_continue_button"
            title={t('common:CONTINUE')}
            onPress={() => {
              getFirmNameAPI()
            }}
            disable={false}
            stylesContainer={styles.buttonContinueStyle}
            stylesContainerText={''}
          />

          <FooterScreen />
        </ImageBackground>
      </View>
    </SafeAreaView>
  )
}

export default AddFirmConnection
