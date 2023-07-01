import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Alert,
  Platform,
  ActionSheetIOS,
  PermissionsAndroid,
} from 'react-native'
import styles from './style'
import { useTheme } from '../../../hooks'
import { useTranslation } from 'react-i18next'
import FooterScreen from '../../../theme/common/Footer'
import {
  FirmLocalConnectionsState,
  addValidateFirmData,
  removeFirmConnection,
} from '../../../store/auth/firmConnection'
import { useLazyGetValidateFirmDataApiQuery } from '../../../services/modules/auth'
import { SwipeListView } from 'react-native-swipe-list-view'
import ContactModal from '../../../theme/common/Modal'
import CommonText from '../../../theme/common/Text'
import { imageConstant } from '../../../theme/Images'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../../screens/Common/LoaderStyle'
import { moderateScale } from '../../../theme/constants'
import { glbStyles } from '../../../styles/global'
import { setLoggedInFirmData } from '../../../store/auth/login'
import { errorMessageToast } from '../../Error/utils'

const FirmConnections = ({ navigation, route }: ApplicationScreenProps) => {
  const { Layout } = useTheme()
  const [modalVisible, setModalVisible] = useState(false)
  const [firmToRemove, setFirmToRemove] =
    useState<FirmLocalConnectionsState | null>(null)
  const connections: FirmLocalConnectionsState[] = useSelector(
    state => state.firmConnection?.connections
  )
  const dispatch = useDispatch()
  const [getValidateFirmDataApi, { isFetching, isSuccess }] =
    useLazyGetValidateFirmDataApiQuery()
  const { t } = useTranslation()
  //Push Notification
  if (Platform.OS != 'ios') {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    )
  }
  const validateFirmDetails = (item: FirmLocalConnectionsState) => {
    getValidateFirmDataApi(item.id)
      .unwrap()
      .then(res => {
        if (res.success === false) {
          showInValidFirmConnectionRemoveAlert(item.id)
        } else {
          dispatch(addValidateFirmData(res))
          dispatch(setLoggedInFirmData(item))
          navigation.navigate('Login')
        }
      })
      .catch(err => {
        errorMessageToast(err)
      })
  }
  const renderItem = (item: FirmLocalConnectionsState) => {
    return (
      <View style={glbStyles.cutout}>
        <TouchableOpacity
          onPress={() => {
            validateFirmDetails(item)
          }}
        >
          <View style={styles.item}>
            <Text style={styles.reqitem2} ellipsizeMode="tail">
              {item.data?.firmName}
            </Text>
            <Image style={styles.img} source={imageConstant.rightArrow} />
          </View>
          <View style={styles.horizontalLine2} />
        </TouchableOpacity>
      </View>
    )
  }
  const showInValidFirmConnectionRemoveAlert = (firmId: string) => {
    Alert.alert('', t('auth:FIRM_NO_LONGER_VALID'), [
      {
        text: 'Close',
        onPress: () => {
          dispatch(removeFirmConnection(firmId))
        },
        style: 'cancel',
      },
    ])
  }
  const showIOSActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [t('common:CANCEL'), t('common:REMOVE')],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'light',
        message: t('auth:FIRM_TO_BE_REMOVE') + firmToRemove?.data.firmName,
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          removeFromLocalStorage()
        }
        setFirmToRemove(null)
      }
    )
  }
  const removeFromLocalStorage = () => {
    dispatch(removeFirmConnection(firmToRemove?.id))
    setModalVisible(false)
    setFirmToRemove(null)
  }
  useEffect(() => {
    if (connections.length == 0) {
      navigation.goBack()
    }
  }, [connections])
  useEffect(() => {
    if (firmToRemove != null) {
      if (Platform.OS == 'ios') {
        showIOSActionSheet()
      } else if (Platform.OS == 'android') {
        setModalVisible(true)
      }
    }
  }, [firmToRemove])
  const renderHiddenItems = (item: FirmLocalConnectionsState) => {
    return (
      <View style={styles.rowBack}>
        <Text>{}</Text>
        <TouchableOpacity
          style={styles.stylesSwipeViewStyle}
          onPress={() => setFirmToRemove(item)}
        >
          <CommonText
            testID="firm_connections_remove_text"
            children={t('common:REMOVE')}
            stylesContainerText={styles.stylesSwipeTextStyle}
          />
        </TouchableOpacity>
      </View>
    )
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
          source={imageConstant.auth_bg}
          resizeMode="cover"
          style={[Layout.fullWidth, Layout.fullHeight, styles.bg]}
        >
          <ScrollView style={[Layout.fullWidth]}>
            <View style={styles.imageViewStyle}>
              <Image
                style={styles.image}
                source={imageConstant.auth_screen_img}
              />

              <CommonText
                testID="firm_connections_welcome_text"
                children={t('auth:welcome')}
                stylesContainerText={styles.stylesContainerName}
              />
              <View style={styles.empltyView} />

              <CommonText
                testID="firm_connections_subtitle_text"
                children={t('auth:subTitle')}
                stylesContainerText={styles.stylesContainerDesc}
              />
              <View style={styles.empltyView} />

              <CommonText
                testID="firm_connections_subtitle2_text"
                children={t('auth:accountanting')}
                stylesContainerText={styles.stylesAccountingText}
              />
            </View>

            <View style={styles.containerFirmList}>
              <SwipeListView
                data={connections}
                renderItem={item => renderItem(item.item)}
                keyExtractor={item => item.id}
                renderHiddenItem={data => renderHiddenItems(data.item)}
                leftOpenValue={0}
                rightOpenValue={-100}
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('AddFirm')}>
              <View style={styles.containerFirmList2}>
                <View style={styles.item}>
                  <Text style={styles.reqitem}>
                    {t('auth:CONNECT_OTHER_FIRM')}
                  </Text>
                  <Image style={styles.img} source={imageConstant.rightArrow} />
                </View>
                <View style={styles.horizontalLine2} />
              </View>
            </TouchableOpacity>
          </ScrollView>
          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
          >
            <ContactModal
              onPress={() => {
                setModalVisible(false)
                setFirmToRemove(null)
              }}
              onPressText={removeFromLocalStorage}
              title={
                t('auth:FIRM_TO_BE_REMOVE') +
                firmToRemove?.data.firmName +
                ' ? '
              }
              description={'Remove'}
              buttonText="Cancel"
              cancelTextStyle={styles.cancelButtonTitle}
              descTextStyle={styles.removeButtonTitle}
            />
          </Modal>
          <FooterScreen />
        </ImageBackground>
      </View>
    </SafeAreaView>
  )
}

export default FirmConnections
