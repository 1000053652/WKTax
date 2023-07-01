import React from 'react'
import { IndividualTaxReturnPackageDetailViewModel } from '../../../src/services/modules/task/responseTypes'
import { Text } from '../../../src/theme/common/index'
import { View } from 'react-native'
import styles from './styles'
import { t } from 'i18next'
import moment from 'moment'
import { Colors } from '../../../src/theme/constants'

export enum RequestStatus {
  Draft = 0,
  Created = 1,
  InProgress = 2,
  InError = 3,
  Open = 4,
  Complete = 5,
  ReturnInProgress = 6,
  TaxReturnSignatureAwaited = 7,
  TaxReturnSignatureReceived = 8,
  Finalized = 9,
}

export enum EngWorkflowStatus {
  NotCreated = 0,
  Created = 1,
  InProgress = 2,
  InError = 3,
  Open = 4,
  Complete = 5,
}

export enum OrgWorkflowStatus {
  Created = 1,
  InProgress = 2,
  InError = 3,
  Open = 4,
  Complete = 5,
}
export enum OrganizerPdfStatus {
  NA = 0,
  InProgress = 1,
  Created = 2,
  Failed = 3,
}
export enum ReopenRequestStatus {
  ReopenRequested = 1,
  Reopened = 2,
  RequestRejcted = 3,
}
export enum TaxReturnPackageStatus {
  Open = 1,
  Complete = 2,
  Archived = 3,
  Declined = 4,
  KBAFailed = 5,
  PartiallySigned = 6,
}
export enum SignatoryStatus {
  NotSigned = 1,
  Signed = 2,
  Declined = 3,
  Failed = 4,
}
export const checkReviewSignUserStatus = (status: number, date: string) => {
  let statusTitle = ''
  let textColor = Colors.blueShade1
  switch (status) {
    case SignatoryStatus.NotSigned:
      statusTitle = t('task:SIGNATURE_NEEDED')
      break
    case SignatoryStatus.Signed:
      statusTitle = `${t('task:SIGNED')}${moment(date)
        .format('MM/DD/YYYY')
        .toString()}`
      textColor = Colors.grayTint1
      break
    case SignatoryStatus.Declined:
      statusTitle = `${t('task:DECLINED')}${moment(date)
        .format('MM/DD/YYYY')
        .toString()}`
      textColor = Colors.textColorRed
      break
    case SignatoryStatus.Failed:
      statusTitle = `${t('task:KBA_FAILED')}${moment(date)
        .format('MM/DD/YYYY')
        .toString()}`
      textColor = Colors.textColorRed
      break
  }
  return (
    <Text
      testID="STATUS"
      stylesContainerText={[
        styles.boxReviewSignClientTypeStatus,
        { color: textColor },
      ]}
      children={statusTitle}
    />
  )
}
export const showTaxPayerReviewAndSignStatus = (
  individualTaxReturnPackageDetail: IndividualTaxReturnPackageDetailViewModel
) => {
  const firstName = individualTaxReturnPackageDetail?.taxPayerFirstName
  return firstName ? (
    <View style={{ flexDirection: 'row' }}>
      <Text
        testID="TAXPAYER_TITLE"
        stylesContainerText={styles.boxReviewSignClientType}
        children={t('task:TAXPAYER_TITLE')}
      />
      {checkReviewSignUserStatus(
        individualTaxReturnPackageDetail?.taxpayerStatus,
        individualTaxReturnPackageDetail?.taxPayerSignatoryModifiedDate
      )}
    </View>
  ) : null
}
export const showSpouseReviewAndSignStatus = (
  individualTaxReturnPackageDetail: IndividualTaxReturnPackageDetailViewModel
) => {
  const firstName = individualTaxReturnPackageDetail?.spouseFirstName
  return firstName ? (
    <View style={{ flexDirection: 'row' }}>
      <Text
        testID="SPOUSE_TITLE"
        stylesContainerText={styles.boxReviewSignClientType}
        children={t('task:SPOUSE_TITLE')}
      />
      {checkReviewSignUserStatus(
        individualTaxReturnPackageDetail?.spouseStatus,
        individualTaxReturnPackageDetail?.spouseSignatoryModifiedDate
      )}
    </View>
  ) : null
}
