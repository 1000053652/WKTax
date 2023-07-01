import React from 'react'
import { View, Image } from 'react-native'
import styles from './styles'
import { useSelector } from 'react-redux'
import Button from '../../../../theme/common/Button'
import Text from '../../../../theme/common/Text'
import thumbImage from '../../../../Assets/thumb.png'
import { useTranslation } from 'react-i18next'
import { RequestStatus } from '../../Utils'
import { RequestDetailsResponse } from '../../../../../src/services/modules/task/responseTypes'

const NiceJobView = ({ navigation }) => {
  const { t } = useTranslation()
  const clientUserFirmDetailsData = useSelector(
    state => state?.home?.clientUserFirmDetailsData
  )
  const requestdetails: RequestDetailsResponse = useSelector(
    state => state?.TaskScreen?.selectedRequestDetails
  )
  const requestGuid = useSelector(
    state => state?.TaskScreen?.organizerRequestGuid
  )
  const singleServiceListData = useSelector(
    state => state?.home?.singleServiceListData
  )
  const missingDocCount =
    requestGuid?.documentRequestListStatus?.notCompletedCount
  const showMissingDocs =
    requestdetails?.organizerModuleEnabled === true &&
    requestdetails?.requestStatus < RequestStatus.TaxReturnSignatureAwaited &&
    missingDocCount > 0
  const showUploadMoreDocument =
    requestdetails?.organizerModuleEnabled === true &&
    requestdetails?.requestStatus < RequestStatus.TaxReturnSignatureAwaited &&
    missingDocCount == 0
  const isIndividualRequest =
    singleServiceListData?.clientServiceTypeIntId === 1
  const hideDocumentTab =
    requestdetails?.requestStatus === RequestStatus.Complete ||
    requestdetails?.requestStatus === RequestStatus.ReturnInProgress
  const uploadDocuments = () => {
    if (isIndividualRequest) {
      navigation.navigate('QuestionnaireScreen', {
        selectedIndex: 1,
        showMissingDocs: hideDocumentTab,
      })
    } else {
      navigation.navigate('QuestionnaireBusiness', {
        selectedIndex: 1,
        showMissingDocs: hideDocumentTab,
      })
    }
  }

  return (
    <View>
      <View style={styles.niceJobView}>
        <View style={styles.thumbImageContainer}>
          <Image style={styles.thumbImageIcon} source={thumbImage} />
        </View>
        <View style={styles.niceJobTitlesContainer}>
          <Text
            testID="text_NICE_JOB"
            stylesContainerText={styles.niceJobTitle}
            children={t('task:NICE_JOB')}
          />
        </View>
      </View>
      <View style={styles.tasksCompletedSubTitlesContainer}>
        {showUploadMoreDocument && (
          <Text
            testID="text_YOUR_RETURN_BEING_PREPARED"
            stylesContainerText={styles.accountSubText}
            children={t('task:YOUR_RETURN_BEING_PREPARED_UPLOAD_MORE').replace(
              '<Firm Name>',
              clientUserFirmDetailsData?.name
            )}
          />
        )}
        {showMissingDocs && (
          <Text
            testID="text_YOUR_RETURN_BEING_PREPARED"
            stylesContainerText={styles.accountSubText}
            children={t('task:YOUR_RETURN_BEING_PREPARED_MISSING_DOCS').replace(
              '<Firm Name>',
              clientUserFirmDetailsData?.name
            )}
          />
        )}
      </View>
      {showUploadMoreDocument && (
        <Button
          testID="upload_more"
          title={t('task:UPLOAD_MORE_DOCUMENTS')}
          onPress={uploadDocuments}
          stylesContainer={styles.buttonUploadContactStyle}
          stylesContainerText={styles.buttonUploadtyle}
        />
      )}
      {showMissingDocs && (
        <>
          <View style={styles.missingView}>
            <View style={styles.missingMainView}>
              <Text
                testID="missingNumber"
                children={missingDocCount}
                stylesContainerText={styles.missingText}
              />
            </View>
            <Text
              testID="missingDocuments"
              children={t('task:MISSING_DOCUMENT')}
              stylesContainerText={styles.missingMessage}
            />
          </View>
          <Button
            testID="upload_missing"
            title={t('task:UPLOAD_MISSING_DOCUMENT')}
            onPress={uploadDocuments}
            stylesContainer={styles.buttonUploadContactStyle}
            stylesContainerText={styles.buttonUploadtyle}
          />
        </>
      )}
    </View>
  )
}
export default NiceJobView
