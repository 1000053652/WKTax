import React, { useEffect, useState } from 'react'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import {
  View,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native'
import styles from './style'
import Button from '../../../theme/common/Button'
import { useTheme } from '../../../hooks'
import Input from '../../../theme/common/Input'
import { useTranslation } from 'react-i18next'
import CommonText from '../../../theme/common/Text'
import { useLazyGetFirmNameApiQuery } from '../../../services/modules/auth'
import BackArrow from '../../../Assets/BackArrow.png'
import { useDispatch, useSelector } from 'react-redux'
import {
  FirmLocalConnectionsState,
  addFirmConnection,
} from '../../../store/auth/firmConnection'
import { imageConstant } from '../../../theme/Images'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../../screens/Common/LoaderStyle'
import { FirmNameResponse } from '../../../services/modules/auth/responseTypes'
import { errorMessageToast } from '../../Error/utils'
import { glbStyles } from '../../../../src/styles/global'

const AddFirmScreen = ({ navigation, route }: ApplicationScreenProps) => {
  const params = route.params || {}
  const { firmcodeFromQuery } = params
  const connections: [FirmLocalConnectionsState] = useSelector(
    state => state?.firmConnection?.connections
  )
  const { Layout } = useTheme()
  const [firmCode, onChangeText] = React.useState('')
  const [firmCodeError, setShowFirmCodeError] = useState('')
  const [getFirmNameApi, { isFetching }] = useLazyGetFirmNameApiQuery()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const cancelClick = () => {
    navigation.goBack()
  }
  useEffect(() => {
    if (firmcodeFromQuery) {
      onChangeText(firmcodeFromQuery)
    }
  }, [firmcodeFromQuery])

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
    <SafeAreaView style={glbStyles.safeAreaViewWithAndroidTopSpace}>
      <View style={styles.container}>
        <ImageBackground
          source={imageConstant.auth_bg}
          resizeMode="cover"
          style={[Layout.fullWidth, Layout.fullHeight, styles.bg]}
        >
          <ScrollView style={[Layout.fullWidth]}>
            <View style={styles.headerViewStyle}>
              <Spinner
                visible={isFetching}
                textContent={t('common:LOADING')}
                size={'large'}
                textStyle={loaderStyle.spinnerTextStyle}
              />
              <View style={styles.headerViewStyleRow}>
                <TouchableOpacity
                  style={styles.backArrowTouchableStyle}
                  onPress={() => navigation.goBack()}
                >
                  <Image
                    source={BackArrow}
                    style={styles.backArrowStyle}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.headerViewStyleRow}>
                <Button
                  testID="add_firm_connect_button"
                  title={t('common:CONNECT')}
                  onPress={cancelClick}
                  stylesContainer={styles.buttonCancelSaveStyle}
                  stylesContainerText={styles.buttonCancelSaveTextStyleChange}
                />
              </View>
              <View style={styles.headerViewStyleRow}>
                <Button
                  testID="add_firm_continue_button"
                  title={t('common:CONTINUE')}
                  onPress={() => getFirmNameAPI()}
                  stylesContainer={styles.buttonCancelSaveStyleRight}
                  stylesContainerText={styles.buttonCancelSaveTextStyleRight}
                />
              </View>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.containerKey}>
              <CommonText
                testID="add_firm_connect_other_firm_text"
                children={t('auth:CONNECT_OTHER_FIRM')}
                stylesContainerText={styles.subtxt}
              />
              <Input
                testID="add_firm_connect_firm_code_input"
                placeholder={t('auth:FIRM_CODE')}
                value={firmCode}
                error={firmCodeError}
                showError={firmCodeError}
                onChangeText={onChangeText}
                inputBoxStyles={styles.inputBoxStyles}
              />
              {!firmCodeError ? (
                <CommonText
                  testID="add_firm_connection_firmkey_text"
                  children={t('auth:firmCodeError')}
                  stylesContainerText={styles.stylesTextInstrcution}
                  onPress={() => {}}
                />
              ) : null}
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  )
}

export default AddFirmScreen
