import React from 'react'
import { View, Image, TouchableOpacity, ScrollView } from 'react-native'
import checkImage from '../../../../Assets/check.png'
import downloadImage from '../../../../Assets/down.png'
import styles from './styles'
import Text from '../../../../theme/common/Text'
import { Spinner } from '../../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../../Common/LoaderStyle'
import {
  EngWorkflowStatus,
  RequestStatus,
  showSpouseReviewAndSignStatus,
  showTaxPayerReviewAndSignStatus,
} from '../../Utils'
import { Button } from 'react-native-paper'
import usePreviouslyCompletedHook from './usePreviouslyCompletedHook'
import { t } from 'i18next'
export type PreviouslyCompletedScreenProps = {
  navigation: any
}
const PreviouslyCompletedScreen = (props: PreviouslyCompletedScreenProps) => {
  const {
    showDownloadAllView,
    showReviewAndSignCompleted,
    showNotifyAccountantCompleted,
    showOrgCompleted,
    showEngLetterCompleted,
    showDownloadReturnButton,
    completedDate,
    engLetterCompletedDate,
    isFetchingReturnDownloadPackage,
    isFetchingDownloadLetter,
    isFetchingtaskDownload,
    individualTaxReturnPackageDetail,
    status,
    requestdetails,
    isIndividualRequest,
    showPreviouslyCompletedTitle,
    downloadEngAPICall,
    downloadAllURLAPICall,
    downloadReturnAPI,
  } = usePreviouslyCompletedHook()

  const engLetterTaskCompleted = () => {
    return (
      <View style={styles.previouslyItemContainer}>
        <View style={styles.previouslyIconsView}>
          <Image
            style={styles.previouslyUserIcons}
            source={checkImage}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.previouslyItemCenterViewEngLetter}>
          <View>
            <Text
              testID="text_SIGN_ENG_LETTER"
              stylesContainerText={styles.previouslyTitle}
              children={t('task:SIGN_ENG_LETTER')}
            />
            <Text
              testID="text_previouslySubTitle"
              stylesContainerText={styles.previouslySubTitle}
              children={`Completed ${engLetterCompletedDate}`}
            />
          </View>
          {requestdetails?.engWorkflowStatus === EngWorkflowStatus.Complete &&
            requestdetails?.requestStatus === RequestStatus.Open && (
              <TouchableOpacity
                style={styles.downloadView}
                onPress={downloadEngAPICall}
              >
                <Text
                  testID="text_DOWNLOAD"
                  stylesContainerText={styles.download}
                  children={t('task:DOWNLOAD')}
                />
              </TouchableOpacity>
            )}
        </View>
      </View>
    )
  }
  const organizerTasksCompleted = () => {
    return (
      <>
        {/* COMPLETED QUESTIONNARIE */}
        <View style={styles.previouslyItemContainer}>
          <View style={styles.previouslyIconsView}>
            <Image style={styles.previouslyUserIcons} source={checkImage} />
          </View>
          <View style={styles.previouslyItemCenterView}>
            <Text
              testID="text_ANS_QUE"
              stylesContainerText={styles.previouslyTitle}
              children={t('task:ANS_QUE')}
            />
            <Text
              testID="text_previouslySubTitle"
              stylesContainerText={styles.previouslySubTitle}
              children={`Completed ${completedDate}`}
            />
          </View>
        </View>
        {/* COMPLETED ATTACH DOCUMENT */}
        <View style={styles.previouslyItemContainer}>
          <View style={styles.previouslyIconsView}>
            <Image style={styles.previouslyUserIcons} source={checkImage} />
          </View>
          <View style={styles.previouslyItemCenterView}>
            <Text
              testID="text_ATTACH_DOC"
              stylesContainerText={styles.previouslyTitle}
              children={t('task:ATTACH_DOC')}
            />
            <Text
              testID="text_requestCompletedMessage"
              stylesContainerText={styles.previouslySubTitle}
              children={`${requestdetails.requestCompletedMessage}`}
            />
          </View>
        </View>
      </>
    )
  }
  const notifyAccountantTaskCompleted = () => {
    return (
      <View style={styles.previouslyItemContainer}>
        <View style={styles.previouslyIconsView}>
          <Image style={styles.previouslyUserIcons} source={checkImage} />
        </View>
        <View style={styles.previouslyItemCenterView}>
          <Text
            testID="text_notify_account"
            stylesContainerText={styles.previouslyTitle}
            children={t('task:NOTIFY_ACC')}
          />
          <Text
            testID="text_completed_date"
            stylesContainerText={styles.previouslySubTitle}
            children={`Completed ${completedDate}`}
          />
        </View>
      </View>
    )
  }
  const reviewAndSignCompletedTask = () => {
    return (
      <View style={styles.previouslyItemContainer}>
        <View style={styles.previouslyIconsView}>
          <Image style={styles.previouslyUserIcons} source={checkImage} />
        </View>
        <View style={styles.previouslyItemCenterView}>
          <Text
            testID="text_notify_account"
            stylesContainerText={styles.previouslyTitle}
            children={t('task:REVIEW_SIGN')}
          />
          {showTaxPayerReviewAndSignStatus(individualTaxReturnPackageDetail)}
          {showSpouseReviewAndSignStatus(individualTaxReturnPackageDetail)}
          {showDownloadReturnButton === false && (
            <Text
              testID="text_completed_date"
              stylesContainerText={styles.boxReviewSignSubTitle}
              children={t('task:ABLE_TO_DOWNLOAD_RETURN')}
            />
          )}
          {showDownloadReturnButton && (
            <Button
              icon={downloadImage}
              textColor={'white'}
              contentStyle={{ flexDirection: 'row-reverse' }}
              style={styles.reviewSignDownloadReturnButton}
              onPress={downloadReturnAPI}
            >
              <Text
                testID="DOWNLOAD_RETURN"
                children={t('task:DOWNLOAD_RETURN')}
                stylesContainerText={{ color: 'white' }}
              />
            </Button>
          )}
        </View>
      </View>
    )
  }
  const reviewAndSignBusinessCompletedTask = () => {
    return (
      <View style={styles.previouslyItemContainer}>
        <View style={styles.previouslyIconsView}>
          <Image style={styles.previouslyUserIcons} source={checkImage} />
        </View>
        <View style={styles.previouslyItemCenterView}>
          <Text
            testID="text_notify_account"
            stylesContainerText={styles.previouslyTitle}
            children={t('task:REVIEW_SIGN')}
          />
          <Button
            textColor={'white'}
            contentStyle={{ flexDirection: 'row-reverse' }}
            style={styles.reviewSignDownloadReturnButton}
            onPress={() => props.navigation.navigate('BusinessManualSign')}
          >
            <Text
              testID="GO_TO_RETURN"
              children={t('task:GO_TO_RETURN')}
              stylesContainerText={{ color: 'white' }}
            />
          </Button>
        </View>
      </View>
    )
  }
  const downloadAllSupportingDocView = () => {
    return (
      <View style={styles.buttonDownloadStyle}>
        <TouchableOpacity
          testID="Download_all"
          onPress={downloadAllURLAPICall}
          style={styles.buttonDownload}
        >
          <Text
            testID="download_all"
            stylesContainerText={styles.downloadTittle}
            children={t('task:DOWNLOAD_ALL_SUPPORTING_DOC')}
          />
          <Image style={styles.downloadUserIcons} source={downloadImage} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView>
      <Spinner
        visible={
          isFetchingtaskDownload ||
          isFetchingDownloadLetter ||
          isFetchingReturnDownloadPackage ||
          status.isDownloading
        }
        textContent={
          status.isDownloading
            ? `${status.downloadPercentage}% ${t('common:DOWNLOADING')}`
            : t('common:LOADING')
        }
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />

      {showPreviouslyCompletedTitle && (
        <View style={styles.previouslyViews}>
          <Text
            testID="text_PREVIOUSLY_COMPLETED"
            stylesContainerText={styles.previouslyText}
            children={t('task:PREVIOUSLY_COMPLETED')}
          />
        </View>
      )}

      {showEngLetterCompleted && engLetterTaskCompleted()}
      {showOrgCompleted && organizerTasksCompleted()}
      {showNotifyAccountantCompleted && notifyAccountantTaskCompleted()}
      {showReviewAndSignCompleted &&
        isIndividualRequest &&
        reviewAndSignCompletedTask()}
      {showReviewAndSignCompleted &&
        !isIndividualRequest &&
        reviewAndSignBusinessCompletedTask()}
      {showDownloadAllView && downloadAllSupportingDocView()}
    </ScrollView>
  )
}
export default PreviouslyCompletedScreen
