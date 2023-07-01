import React, { useCallback, useState } from 'react'
import {
  Image,
  SafeAreaView,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native'
import Text from '../../theme/common/Text'
import styles from './styles'
import { TabView, TabBar } from 'react-native-tab-view'
import { useTranslation } from 'react-i18next'
import QuestionTabScreen from './TabsBusiness/QuestionnaireBusinessTab'
import { ApplicationScreenProps } from '../../../@types/navigation'
import { Colors } from '../../theme/constants'
import {
  useLazyGetHomeIndividualTilesDataQuery,
  useLazyIsfirstloginQueryQuery,
} from '../../../src/services/modules/questionnaire'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from 'react-native-elements'
import { glbCustomerHeaderOptions, glbStyles } from '../../styles/global'
import { imageConstant } from '../../theme/Images'
import {
  getIsfirstloginData,
  refreshDRLCategory,
} from '../../../src/store/questionnaire'
import DRLLandingScreen from '../Questionnaire/DRL'
import useDRLFileUploader from '../Questionnaire/DRL/hooks/useDRLFileUploader'
import { AttachmentFileData } from '../../../src/types/commonTypes'
import Spinner from 'react-native-loading-spinner-overlay/lib'
import loaderStyle from '../../../src/screens/Common/LoaderStyle'
import { useFocusEffect } from '@react-navigation/native'

const QuestionnaireBusiness = ({
  navigation,
  route: navigationRoute,
}: ApplicationScreenProps) => {
  const showOnlyDocumentTab = navigationRoute.params?.showMissingDocs
  const [getHomeIndividualTilesData, data] =
    useLazyGetHomeIndividualTilesDataQuery()
  const [isfirstloginQuery] = useLazyIsfirstloginQueryQuery()
  const clientUserData = useSelector(state => state?.home?.clientUser)
  const dispatch = useDispatch()
  const { uploadDRLFile, drlAttachmentUploadStatus } = useDRLFileUploader()

  useFocusEffect(
    useCallback(() => {
      getHomeTilesData()
    }, [])
  )

  const getHomeTilesData = () => {
    getHomeIndividualTilesData('')
    isfirstloginQuery('')
      .unwrap()
      .then(isfirstlogin => dispatch(getIsfirstloginData(isfirstlogin)))
  }
  const layout = useWindowDimensions()
  const { t } = useTranslation()
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'QUESTIONNAIRE':
        return <QuestionTabScreen navigation={navigation} />
      case 'DOCUMENTS':
        return (
          <DRLLandingScreen navigation={navigation} route={navigationRoute} />
        )
      default:
        return null
    }
  }
  const [index, setIndex] = useState(
    showOnlyDocumentTab ? 0 : navigationRoute.params?.selectedIndex ?? 0
  )
  const routes = showOnlyDocumentTab
    ? [{ key: 'DOCUMENTS', title: t('questionnaire:DOCUMENTS') }]
    : [
        { key: 'QUESTIONNAIRE', title: t('questionnaire:QUESTIONNAIRE') },
        { key: 'DOCUMENTS', title: t('questionnaire:DOCUMENTS') },
      ]

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicatorStyle}
      style={styles.tarBarStyle}
      renderLabel={({ route, focused, color }) => (
        <Text
          children={route.title}
          stylesContainerText={{
            color: focused ? Colors.blueShade1 : Colors.textDullColor,
          }}
          testID="questionnaire_tat_bar"
        />
      )}
    />
  )
  const cancelClick = () => {
    navigation.goBack()
  }
  const uploadAttachement = (data: AttachmentFileData) => {
    uploadDRLFile({
      localFileData: data,
    })
      .then(res => {
        dispatch(refreshDRLCategory(`${new Date()}`))
      })
      .catch(err => {})
  }
  const addClick = () => {
    navigation.navigate('AddNewDocument', {
      selectedFiles: data => {
        if (data.type == 0 || data.type == 1) {
          navigation.navigate('PDFConversion', {
            selectedImages: data.files,
            fileName: 'Uncategorized',
            onSave: localFile => {
              uploadAttachement(localFile)
            },
            onCancel: () => {},
          })
        } else if (data.type == 2) {
          uploadAttachement(data.files[0])
        }
      },
    })
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Spinner
        visible={drlAttachmentUploadStatus.isUploading}
        textContent={
          drlAttachmentUploadStatus.isUploading
            ? `${drlAttachmentUploadStatus.percentage}% ${t(
                'common:UPLOADING'
              )}`
            : t('common:LOADING')
        }
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
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
              children={t('questionnaire:ORGANIZER')}
              testID="header_screen_title"
              stylesContainerText={glbStyles.headerTitle}
            />
            <Text
              children={clientUserData[0]?.fullName}
              stylesContainerText={styles.stylesContainerText}
              testID="questionnaire_main_name"
              numberOfLines={1}
            />
          </View>
        }
        rightComponent={
          index == 1 && (
            <TouchableOpacity onPress={addClick}>
              <Text
                children={t('common:ADD')}
                testID="header_add"
                stylesContainerText={glbStyles.headerButtonText}
              />
            </TouchableOpacity>
          )
        }
        containerStyle={glbStyles.headerContainer}
      />
      <TabView
        navigationState={{ index: index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={index => {
          if (index === 1) {
            dispatch(refreshDRLCategory(`${new Date()}`))
          }
          setIndex(index)
        }}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  )
}
export default QuestionnaireBusiness
