import React from 'react'
import {
  View,
  ScrollView,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native'
import { useTheme } from '../../hooks'
import styles from './styles'
import { ApplicationScreenProps } from '../../../@types/navigation'
import { useTranslation } from 'react-i18next'
import PreviouslyCompletedScreen from './components/PreviouslyCompleted'
import { Spinner } from '../../theme/common/Spinner/Spinner'
import loaderStyle from '../../screens/Common/LoaderStyle'
import NiceJobView from './components/PreviouslyCompleted/NiceJobView'
import { imageConstant } from '../../../src/theme/Images'
import useTaskScreenHook from './hooks/useTaskScreenHook'
import {
  SignatoryStatus,
  showSpouseReviewAndSignStatus,
  showTaxPayerReviewAndSignStatus,
} from './Utils'
import { showErrorMessage } from '../Common/Utils'
import { Header } from 'react-native-elements'
import { glbCustomerHeaderOptions, glbStyles } from '../../../src/styles/global'

const TasksScreen = ({ navigation, route }: ApplicationScreenProps) => {
  const { Layout } = useTheme()
  const { t } = useTranslation()
  const {
    notifyAccountantAPICall,
    getEngLetterSigninURL,
    getReviewAndSigninURL,
    drlCompletedPercentage,
    questionnaireCompletedPercentage,
    engagementdueDate,
    dueDate,
    clientUserData,
    logo,
    isLoadingNotifyAccountant,
    isLoadingRequestDetails,
    isFetchingEngLetterURL,
    isFetchingESignURL,
    requestGuid,
    showEngLetterPending,
    showOrgniserPending,
    showNotifyAccountantPending,
    showNiceJob,
    showReviewAndSignPending,
    showPreviouslyCompletedItems,
    individualTaxReturnPackageDetail,
    isIndividualRequest,
  } = useTaskScreenHook(navigation)

  const showEngLetterAlertBeforeSigning = () => {
    const title = t('task:ASSURE_SIGN_ALERT_TITLE')
    const message = t('task:ASSURE_SIGN_ALERT_MESSAGE').replace(
      '{TYPE}',
      'engagement.'
    )
    Alert.alert(title, message, [
      {
        text: t('task:Go'),
        style: 'cancel',
      },
      {
        text: t('task:CONTINUE'),
        onPress: () => {
          getEngLetterSigninURL()
        },
      },
    ])
  }
  const showReviewAndSignAlertBeforeSigning = () => {
    const isDeclined =
      individualTaxReturnPackageDetail?.taxpayerStatus ===
        SignatoryStatus.Declined ||
      individualTaxReturnPackageDetail?.spouseStatus ===
        SignatoryStatus.Declined
    const isFailed =
      individualTaxReturnPackageDetail?.taxpayerStatus ===
        SignatoryStatus.Failed ||
      individualTaxReturnPackageDetail?.spouseStatus === SignatoryStatus.Failed
    if (isDeclined || isFailed) {
      showErrorMessage({
        title: t('task:SIGNING_NO_LONGER_TITLE'),
        message: t('task:SIGNING_NO_LONGER_MESSAGE'),
      })
    } else {
      const title = t('task:ASSURE_SIGN_ALERT_TITLE')
      const message = t('task:ASSURE_SIGN_ALERT_MESSAGE').replace(
        '{TYPE}',
        'return.'
      )
      Alert.alert(title, message, [
        {
          text: t('task:Go'),
          style: 'cancel',
        },
        {
          text: t('task:CONTINUE'),
          onPress: () => {
            getReviewAndSigninURL()
          },
        },
      ])
    }
  }
  const onPressReviewAndSign = () => {
    if (isIndividualRequest) {
      showReviewAndSignAlertBeforeSigning()
    } else {
      navigation.navigate('BusinessManualSign')
    }
  }
  const navigatieToQuestionaireAll = (index: number) => {
    if (isIndividualRequest) {
      navigation.navigate('QuestionnaireScreen', { selectedIndex: index })
    } else {
      navigation.navigate('QuestionnaireBusiness', { selectedIndex: index })
    }
  }
  const showAlertNotifyAccountant = () => {
    Alert.alert(
      t('task:NOTIFY_ACCOUNTANT_ALERT_TITLE'),
      t('task:NOTIFY_ACCOUNTANT_ALERT_MESSAGE'),
      [
        {
          text: t('common:NO'),
          style: 'destructive',
        },
        {
          text: t('common:YES'),
          onPress: () => {
            notifyAccountantAPICall()
          },
          style: 'default',
        },
      ]
    )
  }
  const notifiyOnpress = () => {
    showAlertNotifyAccountant()
  }

  const signEngagementTask = () => {
    return (
      <TouchableOpacity
        style={styles.mainView}
        onPress={showEngLetterAlertBeforeSigning}
      >
        <View style={styles.iconsView}>
          <Image style={styles.taskIcon} source={imageConstant.readImage} />
        </View>
        <View style={styles.taskItemCenterView}>
          <Text style={styles.boxTitle} children={t('task:SIGN_ENG_LETTER')} />
          <Text style={styles.boxSubTitle}> Due {engagementdueDate}</Text>
        </View>
        <View style={styles.rightIconsView}>
          <Image
            style={styles.rightArrowIcon}
            resizeMode="contain"
            source={imageConstant.rightArrowImage}
          />
        </View>
      </TouchableOpacity>
    )
  }
  const questionnaireTask = () => {
    return (
      <TouchableOpacity
        style={styles.mainView}
        onPress={() => navigatieToQuestionaireAll(0)}
      >
        <View style={styles.iconsView}>
          <Image
            style={styles.taskIcon}
            resizeMode="contain"
            source={imageConstant.menuImage}
          />
        </View>
        <View style={styles.taskItemCenterView}>
          <Text style={styles.boxTitle} children={t('task:ANS_QUE')} />
          <Text style={styles.boxSubTitle}>Due {dueDate}</Text>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.animatedView,
                {
                  width: `${questionnaireCompletedPercentage}%`,
                },
              ]}
            />
            <Text
              style={styles.completedCountText}
              children={`${
                requestGuid?.questionnaireStatus?.completedCount
              } of ${
                requestGuid?.questionnaireStatus?.completedCount +
                requestGuid?.questionnaireStatus?.notCompletedCount
              } complete`}
            />
          </View>
        </View>
        <View style={styles.rightIconsView}>
          <Image
            style={styles.rightArrowIcon}
            resizeMode="contain"
            source={imageConstant.rightArrowImage}
          />
        </View>
      </TouchableOpacity>
    )
  }
  const drlTask = () => {
    return (
      <TouchableOpacity
        style={styles.mainView}
        onPress={() => navigatieToQuestionaireAll(1)}
      >
        <View style={styles.iconsView}>
          <Image
            style={styles.taskIcon}
            resizeMode="contain"
            source={imageConstant.filesImage}
          />
        </View>
        <View style={styles.taskItemCenterView}>
          <Text style={styles.boxTitle} children={t('task:ATTACH_DOC')} />
          <Text style={styles.boxSubTitle}>Due {dueDate}</Text>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.animatedView,
                {
                  width: `${
                    drlCompletedPercentage > 100 ? 100 : drlCompletedPercentage
                  }%`,
                },
              ]}
            />
            <Text
              style={styles.completedCountText}
              children={`${
                requestGuid?.documentRequestListStatus?.completedCount
              } of ${
                requestGuid?.documentRequestListStatus?.completedCount +
                requestGuid?.documentRequestListStatus?.notCompletedCount
              } complete`}
            />
          </View>
        </View>
        <View style={styles.rightIconsView}>
          <Image
            style={styles.rightArrowIcon}
            resizeMode="contain"
            source={imageConstant.rightArrowImage}
          />
        </View>
      </TouchableOpacity>
    )
  }
  const organizerItems = () => {
    return (
      <View>
        {questionnaireTask()}
        {drlTask()}
      </View>
    )
  }
  const notifyAccountantTask = () => {
    return (
      <TouchableOpacity style={styles.mainView} onPress={notifiyOnpress}>
        <View style={styles.iconsView}>
          <Image
            style={styles.taskIcon}
            resizeMode="contain"
            source={imageConstant.belImage}
          />
        </View>
        <View style={styles.taskItemCenterView}>
          <Text style={styles.boxTitle} children={t('task:NOTIFY_ACC')} />
        </View>
        <View style={styles.rightIconsView}>
          <Image
            style={styles.rightArrowIcon}
            resizeMode="contain"
            source={imageConstant.rightArrowImage}
          />
        </View>
      </TouchableOpacity>
    )
  }

  const reviewAndSignTask = () => {
    return (
      <TouchableOpacity style={styles.mainView} onPress={onPressReviewAndSign}>
        <View style={styles.iconsView}>
          <Image style={styles.taskIcon} source={imageConstant.pencil} />
        </View>
        <View style={styles.taskItemCenterView}>
          <Text style={styles.boxTitle} children={t('task:REVIEW_SIGN')} />
          {isIndividualRequest && (
            <Text
              style={styles.boxReviewSignSubTitle}
              children={t('task:PLEASE_REVIEW_8879_RETURN')}
            />
          )}
          {showTaxPayerReviewAndSignStatus(individualTaxReturnPackageDetail)}
          {showSpouseReviewAndSignStatus(individualTaxReturnPackageDetail)}
        </View>
        <View style={styles.rightIconsView}>
          <Image
            style={styles.rightArrowIcon}
            resizeMode="contain"
            source={imageConstant.rightArrowImage}
          />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Spinner
        visible={
          isLoadingNotifyAccountant ||
          isLoadingRequestDetails ||
          isFetchingEngLetterURL ||
          isFetchingESignURL
        }
        textContent={t('common:LOADING')}
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <Header
        statusBarProps={glbCustomerHeaderOptions}
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
      <View style={styles.titleView}>
        <Text style={styles.textTitle}>{clientUserData[0]?.fullName}</Text>
      </View>
      <ScrollView>
        <Text style={styles.myTaskText}>{t('task:MY_TASKS')}</Text>
        {/* MY TASKS */}
        {showEngLetterPending && signEngagementTask()}
        {showOrgniserPending && organizerItems()}
        {showNotifyAccountantPending && notifyAccountantTask()}
        {showReviewAndSignPending && reviewAndSignTask()}
        {/* NICE JOB VIEW */}
        {showNiceJob && <NiceJobView navigation={navigation} />}
        {/* PREVIOUSLY COMPLETED */}
        {showPreviouslyCompletedItems && (
          <PreviouslyCompletedScreen navigation={navigation} />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default TasksScreen
