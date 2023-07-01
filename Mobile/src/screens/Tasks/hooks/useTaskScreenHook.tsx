import { useCallback, useState } from 'react'
import {
  useLazyReturnDetailsAPIQuery,
  useLazyGetRequestDetailsApiQuery,
  useLazyTaskGetOrganizerPdfStatusQuery,
  useLazyTaskGetSigningUrlQuery,
  useLazyTaskOrganizerRequestGuidQuery,
  useLazyTaskUpdateOrganizerStatusQuery,
  useLazyTaxReturnPackageGetsigningurlAPIQuery,
} from '../../../../src/services/modules/task'
import { useDispatch, useSelector } from 'react-redux'
import {
  IndividualTaxReturnPackageDetailViewModel,
  RequestDetailsResponse,
  ReturnDetailsAPIResponse,
} from '../../../../src/services/modules/task/responseTypes'
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/native'
import { showErrorMessage } from '../../Common/Utils'
import { CommonErrorResponse } from '../../../../src/services/types/common'
import { EngWorkflowStatus, OrgWorkflowStatus, RequestStatus } from '../Utils'
import { returnDetailsReducer } from '../../../../src/store/task'

export default function (navigation) {
  const dispatch = useDispatch()
  const [getRequestDetailsApi, { isFetching: isLoadingRequestDetails }] =
  useLazyGetRequestDetailsApiQuery()
  const [taskUpdateOrganizerStatus, { isFetching: isLoadingNotifyAccountant }] =
    useLazyTaskUpdateOrganizerStatusQuery()
  const [taskGetOrganizerPdfStatus] = useLazyTaskGetOrganizerPdfStatusQuery()
  const [taskOrganizerRequestGuid] = useLazyTaskOrganizerRequestGuidQuery()
  const [returnDetailsAPI] = useLazyReturnDetailsAPIQuery()
  const [taskGetSigningUrl, { isFetching: isFetchingEngLetterURL }] =
    useLazyTaskGetSigningUrlQuery()
  const [taxReturnPackageGetsigningurlAPI, { isFetching: isFetchingESignURL }] =
    useLazyTaxReturnPackageGetsigningurlAPIQuery()

  const requestdetails: RequestDetailsResponse = useSelector(
    state => state.TaskScreen?.selectedRequestDetails
  )
  const returnDetails: ReturnDetailsAPIResponse = useSelector(
    state => state.TaskScreen?.returnDetails
  )
  const individualTaxReturnPackageDetail: IndividualTaxReturnPackageDetailViewModel =
    returnDetails?.taxReturnPackageDetails[0]
      .individualTaxReturnPackageDetailViewModel

  const singleServiceListData = useSelector(
    state => state?.home?.singleServiceListData
  )
  const requestGuid = useSelector(
    state => state.TaskScreen?.organizerRequestGuid
  )
  const isIndividualRequest =
    singleServiceListData?.clientServiceTypeIntId === 1
  const clientUserData = useSelector(state => state?.home?.clientUser)
  const dueDate = moment(requestdetails?.organizerDueDate).format('MM/DD/YYYY')
  const engagementdueDate = moment(requestdetails?.engagementDueDate).format(
    'MM/DD/YYYY'
  )
  const questionnaireCompletedPercentage =
    (requestGuid?.questionnaireStatus?.completedCount /
      (requestGuid?.questionnaireStatus?.completedCount +
        requestGuid?.questionnaireStatus?.notCompletedCount)) *
    100
  const drlCompletedPercentage =
    (requestGuid?.documentRequestListStatus?.completedCount /
      (requestGuid?.documentRequestListStatus?.completedCount +
        requestGuid?.documentRequestListStatus?.notCompletedCount)) *
    100
  const requestStatus = requestdetails?.requestStatus
  const showEngLetterPending =
    requestdetails?.engWorkflowStatus === EngWorkflowStatus.Open &&
    requestdetails?.isLoggedInUserSigner === true &&
    requestdetails?.hasLoggedInUserSigned === false

  const showOrgniserPending =
    requestdetails?.organizerWorkflowStatus === OrgWorkflowStatus.Open &&
    requestdetails?.organizerModuleEnabled === true

  const showNotifyAccountantPending = requestStatus === RequestStatus.Open

  const showReviewAndSignPending =
    requestdetails?.isReturnExist &&
    requestStatus === RequestStatus.TaxReturnSignatureAwaited &&
    requestdetails?.isLoggedInUserSignerForTaxReturn === true &&
    requestdetails?.hasLoggedInUserSignedTaxReturn === false

  const showNiceJob =
    !showEngLetterPending &&
    !showOrgniserPending &&
    !showNotifyAccountantPending &&
    !showReviewAndSignPending

  const showPreviouslyCompletedItems =
    (requestdetails?.isLoggedInUserSigner === true &&
      requestdetails?.hasLoggedInUserSigned === true) ||
    requestdetails?.requestStatus >= RequestStatus.Complete

  useFocusEffect(
    useCallback(() => {
      callWSToGetRequestDetailsAPI()
    }, [])
  )
  const callWSToGetRequestDetailsAPI = async () => {
    try {
      const requestDetails = await getRequestDetailsApi().unwrap()
      await taskOrganizerRequestGuid()
      if (requestDetails.isReturnExist) {
        await getReturnDetails()
      }
    } catch (error) {}
  }
  const getReturnDetails = async () => {
    try {
      const returnData = await returnDetailsAPI().unwrap()
      dispatch(returnDetailsReducer(returnData))
    } catch (error) {}
  }

  const getGetOrganizerPdfStatus = async () => {
    try {
      const status = await taskGetOrganizerPdfStatus().unwrap()
      if (status !== 2) {
        setTimeout(() => {
          getGetOrganizerPdfStatus()
        }, 5000)
      } else {
        callWSToGetRequestDetailsAPI()
      }
    } catch (error) {}
  }

  const logo = useSelector(state => state?.profile?.logo)
  const notifyAccountantAPICall = async () => {
    try {
      await taskUpdateOrganizerStatus('5').unwrap()
      if (requestdetails?.organizerModuleEnabled === true) {
        getGetOrganizerPdfStatus()
      }
      callWSToGetRequestDetailsAPI()
    } catch (error) {
      const errData: CommonErrorResponse = error?.data
      showErrorMessage({ message: errData?.errorMessages[0].message })
    }
  }
  const getEngLetterSigninURL = async () => {
    try {
      const res = await taskGetSigningUrl().unwrap()
      navigation.navigate('WebComponentScreen', { url: res.value })
    } catch (error) {
      const errData: CommonErrorResponse = error?.data
      showErrorMessage({ message: errData?.errorMessages[0].message })
    }
  }
  const getReviewAndSigninURL = async () => {
    try {
      const res = await taxReturnPackageGetsigningurlAPI().unwrap()
      navigation.navigate('WebComponentScreen', { url: res.value })
    } catch (error) {
      const errData: CommonErrorResponse = error?.data
      showErrorMessage({ message: errData?.errorMessages[0].message })
    }
  }
  return {
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
  }
}
