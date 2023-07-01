import React, { useEffect } from 'react'
import {
  View,
  ScrollView,
  Image,
  SafeAreaView,
  ImageBackground,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native'
import styles from './styles'
import ForwardIconBlack from '../../Assets/ForwardIconBlack.png'
import HomeBackImage from '../../Assets/HomeBackImage.png'
import ForwardArrow from '../../Assets/ForwardArrow.png'
import BackArrow from '../../Assets/BackArrow.png'
import { ApplicationScreenProps } from '../../../@types/navigation'
import Button from '../../theme/common/Button'
import { showErrorMessage, showSuccessMessage } from '../Common/Utils'
import { ReopenRequestStatus } from '../Tasks/Utils'
import useHomeScreenHook from './hooks/useHomeScreenHook'
import { Spinner } from '../../theme/common/Spinner/Spinner'
import loaderStyle from '../../screens/Common/LoaderStyle'
import StyledText from 'react-native-styled-text'
import { imageConstant } from '../../../src/theme/Images'
import { TaskMessageDescType } from './Utils'
import { Header } from 'react-native-elements'
import { glbCustomerHeaderOptions, glbStyles } from '../../../src/styles/global'
import { t } from 'i18next'

const HomeScreen = ({ navigation }: ApplicationScreenProps) => {
  const {
    taskDescriptionType,
    showUploadButton,
    warningCount,
    clientUserData,
    clientUserFirmDetailsData,
    clientUserRequestListData,
    singleServiceListData,
    logo,
    markReopenComment,
    Layout,
    isFetchingGuidQuery,
    isLoadingRequestDetails,
    hideDocumentTab,
    canGoToTaskScreen,
  } = useHomeScreenHook()
  const isIndividualRequest =
    singleServiceListData?.clientServiceTypeIntId === 1
  useEffect(() => {
    checkReOpenRequest()
  }, [])

  const checkReOpenRequest = () => {
    if (singleServiceListData?.reopenStatus === ReopenRequestStatus.Reopened) {
      showSuccessMessage({
        message: t('homeModule:REQUEST_REOPEN_MESSAGE'),
        autoHide: false,
        onPress: () => {
          markReopenComment()
        },
      })
    }
    if (
      singleServiceListData?.reopenStatus === ReopenRequestStatus.RequestRejcted
    ) {
      showErrorMessage({
        title: t('task:REQUEST_REOPEN_REJECT_TITLE'),
        message: t('task:REQUEST_REOPEN_REJECT_MESSAGE'),
        autoHide: false,
        onPress: () => {
          markReopenComment()
        },
      })
    }
  }
  const navigatieToQuestionaire = (index: number) => {
    if (isIndividualRequest) {
      navigation.navigate('QuestionnaireScreen', {
        selectedIndex: index,
        showMissingDocs: hideDocumentTab,
      })
    } else {
      navigation.navigate('QuestionnaireBusiness', {
        selectedIndex: index,
        showMissingDocs: hideDocumentTab,
      })
    }
  }

  const contactUS = () => {
    navigation?.navigate('ContactScreen')
  }
  const showTaskMessageDescription = () => {
    switch (taskDescriptionType) {
      case TaskMessageDescType.NO_TASK:
        return (
          <Text
            style={styles.taskLabelStyleDescNoTask}
            children={t('homeModule:NO_TASK_TO_COMPLETE')}
          />
        )
      case TaskMessageDescType.WE_ARE_READY_TO_RETURN:
        return (
          <StyledText
            style={styles.taskLabelStyleDesc1}
            children={t('homeModule:WE_ARE_READY_TO').replace(
              '{YEAR}',
              singleServiceListData?.clientServiceTypeWithYearStr
            )}
          />
        )
      case TaskMessageDescType.TASK_CONGRATS_MESSAGE:
        return (
          <View style={styles.congratView}>
            <Image
              style={styles.fillCheckIcon}
              source={imageConstant.filledCheckCircle}
            />
            <StyledText
              style={[styles.taskLabelStyleDesc1, { width: 277 }]}
              children={updateMessageWithClientType(
                t('homeModule:TASK_CONGRATS_MESSAGE')
              )}
            />
          </View>
        )
      case TaskMessageDescType.TAX_RETURN_COMPLETED:
        return (
          <StyledText
            style={styles.taskLabelStyleDesc1}
            children={updateMessageWithClientType(
              t('homeModule:TAX_RETURN_COMPLETED')
            )}
          />
        )
      default:
        return <Text style={styles.taskLabelStyleDesc1} children={''} />
    }
  }
  const updateMessageWithClientType = (message: string) => {
    return message.replace(
      '{CLIENT_TYPE}',
      singleServiceListData?.clientServiceTypeIntId === 1
        ? 'Individual'
        : 'Business'
    )
  }

  const taskCountAndMessage = () => {
    return (
      <View style={styles.mainWarningViewStyle}>
        <View style={styles.warningViewStyle}>
          <Text
            style={styles.taskLabelStyleDescWarning}
            children={warningCount}
          />
        </View>
        <Text
          style={styles.taskLabelStyleDesc}
          children={t('homeModule:TASK_REQUIRE')}
        />
      </View>
    )
  }

  const taskAttentionRequiredView = () => {
    const showTaskCount =
      taskDescriptionType === TaskMessageDescType.WE_ARE_READY_TO_RETURN ||
      taskDescriptionType === TaskMessageDescType.TAX_RETURN_COMPLETED
    const showMyTaskTitle =
      taskDescriptionType != TaskMessageDescType.TASK_CONGRATS_MESSAGE
    return (
      <TouchableOpacity
        style={styles.viewMyTaskStyle}
        onPress={() => navigation.navigate('Tasks')}
        disabled={!canGoToTaskScreen}
      >
        <View style={styles.myTaskTitleArrowStyle}>
          <View>
            {showMyTaskTitle && (
              <Text style={styles.taskLabelStyle}>
                {t('homeModule:MY_TASK')}
              </Text>
            )}
            {showTaskMessageDescription()}
            {showTaskCount && taskCountAndMessage()}
          </View>
          {canGoToTaskScreen && (
            <Image
              style={styles.forwardrrowStyleArrow}
              source={ForwardIconBlack}
            />
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Spinner
        visible={isFetchingGuidQuery || isLoadingRequestDetails}
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <Header
        statusBarProps={glbCustomerHeaderOptions}
        leftComponent={
          <View style={styles.backArrowContainer}>
            {clientUserRequestListData?.length > 1 && (
              <TouchableOpacity
                onPress={() => navigation.navigate('ServiceRequestList')}
              >
                <Image
                  source={BackArrow}
                  style={styles.backArrowStyle}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>
        }
        centerComponent={
          <Image
            style={styles.logoStyleCenterMain}
            source={
              logo != null && logo != '' && logo != undefined
                ? { uri: logo }
                : ''
            }
            resizeMode="contain"
          />
        }
        rightComponent={
          <TouchableOpacity
            onPress={navigation.toggleDrawer}
            style={styles.rightIconContainer}
          >
            <Image
              style={styles.logoStyle}
              source={imageConstant.ProfileImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        }
        containerStyle={glbStyles.headerContainer}
      />
      <ScrollView style={styles.scrollView}>
        <ImageBackground
          source={HomeBackImage}
          resizeMode="cover"
          style={{
            width: Layout.fullWidth.width,
            height: Layout.fullHeight.height,
          }}
        >
          <View style={styles.mainViewStyle}>
            <View>
              <Text style={styles.mainViewStyleHeading}>
                {clientUserFirmDetailsData?.name}
              </Text>
              <Text style={styles.mainViewStyleDesc}>
                {singleServiceListData?.clientDisplayName}
              </Text>
              <Text style={styles.mainViewStyleDesc}>
                {singleServiceListData?.clientServiceTypeWithYearStr}
              </Text>
            </View>
          </View>

          <View style={Layout.center}>
            <Text
              testID="text_id_home_welcome_name"
              style={styles.welcomeLabelStyle}
            >
              {`${t('homeModule:WELCOME')} ${clientUserData[0]?.firstName}!`}
            </Text>
          </View>
          <Button
            disable={!showUploadButton}
            title={
              showUploadButton
                ? t('homeModule:UPLOAD_DOCUMENT')
                : t('homeModule:NO_FILES_AVAILABLE')
            }
            onPress={() => navigatieToQuestionaire(1)}
            stylesContainer={
              !showUploadButton
                ? styles.buttonUploadStyleDisable
                : styles.buttonUploadStyle
            }
            stylesContainerText={
              !showUploadButton
                ? styles.buttonUploadTextStyleDisable
                : styles.buttonUploadContactTextStyle
            }
            testID="home_upload"
          />
          <Button
            title={t('homeModule:CONTACT_US')}
            onPress={contactUS}
            stylesContainer={styles.buttonContactStyle}
            stylesContainerText={styles.buttonUploadContactTextStyle}
            testID="home_contact_us"
          />
          {taskAttentionRequiredView()}
          <View style={styles.helpfulLinkStyle}>
            <Text style={styles.taskLabelStyleHelpful}>
              {t('homeModule:HELPFUL_LINK')}
            </Text>
            <TouchableOpacity
              style={styles.rowViewHelpOne}
              onPress={() => Linking.openURL('https://www.irs.gov/payments')}
            >
              <Text style={styles.taskLabelStyleDescText}>
                {t('homeModule:NEED_TO_MAKE')}
              </Text>
              <View style={styles.flexTwo}>
                <Image style={styles.forwardrrowStyle} source={ForwardArrow} />
              </View>
            </TouchableOpacity>
            <View style={styles.horizontalLine} />
            <TouchableOpacity
              style={styles.rowViewHelpOne}
              onPress={() => Linking.openURL('https://www.irs.gov/refunds')}
            >
              <Text style={styles.taskLabelStyleDescText}>
                {t('homeModule:EXPECTING_FEDERAL')}
              </Text>
              <View style={styles.flexTwo}>
                <Image style={styles.forwardrrowStyle} source={ForwardArrow} />
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  )
}
export default HomeScreen
