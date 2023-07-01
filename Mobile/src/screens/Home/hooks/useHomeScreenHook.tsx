import {
  RequestDetailsResponse,
  StatusByRequestguidResponse,
} from '../../../services/modules/task/responseTypes'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  EngWorkflowStatus,
  OrgWorkflowStatus,
  RequestStatus,
} from '../../Tasks/Utils'
import { useFocusEffect } from '@react-navigation/native'
import {
  useLazyMarkReopenCommentReadAPIQuery,
  useLazyTaskOrganizerRequestGuidQuery,
} from '../../../services/modules/task'
import { useLazyGetLogoQuery } from '../../../services/modules/logo'
import {
  useLazyClientUserDataApiQuery,
  useLazyFirmDetailsApiQuery,
  useLazyUserClickBillAPIQuery,
} from '../../../services/modules/home'
import { useLazyGetDependentDisplayDataQuery } from '../../../services/modules/questionnaire'
import { updateReopenStatus } from '../../../store/home'
import { useLazyCountryCodeDataApiQuery } from '../../../services/modules/profile'
import { useTheme } from '../../../hooks'
import { TaskMessageDescType } from '../Utils'

export default function () {
  const dispatch = useDispatch()
  const { Layout } = useTheme()
  const [taskDescriptionType, setTaskDescriptionType] =
    useState<TaskMessageDescType>(TaskMessageDescType.NONE)
  const [showUploadButton, setShowUploadButton] = useState(false)
  const [warningCount, setWarningCount] = useState<number>(0)
  const [taskOrganizerRequestGuid, { isFetching: isFetchingGuidQuery }] =
    useLazyTaskOrganizerRequestGuidQuery()
  const [getLogo] = useLazyGetLogoQuery()
  const [clientUserDataApi] = useLazyClientUserDataApiQuery()
  const [firmDetailsApi] = useLazyFirmDetailsApiQuery()
  const [getDependentDisplayData] = useLazyGetDependentDisplayDataQuery()
  const [markReopenCommentReadAPI] = useLazyMarkReopenCommentReadAPIQuery()
  const [userClickBillAPI] = useLazyUserClickBillAPIQuery()
  const [countryCodeDataApi] = useLazyCountryCodeDataApiQuery()
  //******************************************** Get the value form Redux Store
  const clientUserData = useSelector(state => state?.home?.clientUser)

  const clientUserFirmDetailsData = useSelector(
    state => state?.home?.clientUserFirmDetailsData
  )
  const clientUserRequestListData = useSelector(
    state => state?.home?.clientUserRequestListData
  )
  const singleServiceListData = useSelector(
    state => state?.home?.singleServiceListData
  )
  const logo = useSelector(state => state?.profile?.logo)

  const selectedRequest: RequestDetailsResponse = useSelector(
    state => state?.TaskScreen?.selectedRequestDetails
  )
  const requestdetails: RequestDetailsResponse = useSelector(
    state => state?.TaskScreen?.selectedRequestDetails
  )
  const canGoToTaskScreen =
    requestdetails?.engagementModuleEnabled === true ||
    requestdetails?.organizerModuleEnabled === true
  const hideDocumentTab =
    requestdetails?.requestStatus === RequestStatus.Complete ||
    requestdetails?.requestStatus === RequestStatus.ReturnInProgress

  const checkWarningCount = (
    organiserStatusDetails?: StatusByRequestguidResponse
  ) => {
    setWarningCount(0)
    const requestStatus = selectedRequest?.requestStatus
    if (
      selectedRequest?.engagementModuleEnabled === true &&
      selectedRequest?.engWorkflowStatus === EngWorkflowStatus.Open &&
      selectedRequest?.isLoggedInUserSigner === true &&
      selectedRequest?.hasLoggedInUserSigned === false
    ) {
      setWarningCount(preStatus => preStatus + 1)
    }
    if (
      selectedRequest?.organizerModuleEnabled === true &&
      selectedRequest?.organizerWorkflowStatus === OrgWorkflowStatus.Open &&
      organiserStatusDetails &&
      organiserStatusDetails.questionnaireStatus.notCompletedCount > 0
    ) {
      setWarningCount(preStatus => preStatus + 1)
    }
    if (
      selectedRequest?.organizerModuleEnabled === true &&
      selectedRequest?.organizerWorkflowStatus === OrgWorkflowStatus.Open &&
      organiserStatusDetails &&
      organiserStatusDetails.documentRequestListStatus.notCompletedCount > 0
    ) {
      setWarningCount(preStatus => preStatus + 1)
    }
    if (
      requestStatus == RequestStatus.TaxReturnSignatureAwaited &&
      selectedRequest?.isLoggedInUserSignerForTaxReturn === true &&
      selectedRequest?.hasLoggedInUserSignedTaxReturn === false
    ) {
      setWarningCount(preStatus => preStatus + 1)
    }
    if (
      requestStatus === RequestStatus.Complete ||
      requestStatus === RequestStatus.ReturnInProgress
    ) {
      setWarningCount(0)
    }
  }
  const checkTaskDescriptionAndWarningCountVisibility = () => {
    const requestStatus = selectedRequest?.requestStatus
    if (
      (selectedRequest?.organizerModuleEnabled === false &&
        selectedRequest?.engagementModuleEnabled === false &&
        requestdetails?.isReturnExist === false) ||
      (requestStatus === RequestStatus.Finalized &&
        selectedRequest?.isReturnExist === false) ||
      requestStatus === RequestStatus.Complete ||
      requestStatus === RequestStatus.ReturnInProgress
    ) {
      setTaskDescriptionType(TaskMessageDescType.NO_TASK)
    } else if (requestStatus === RequestStatus.Open) {
      setTaskDescriptionType(TaskMessageDescType.WE_ARE_READY_TO_RETURN)
    } else if (
      requestStatus === RequestStatus.TaxReturnSignatureReceived ||
      (requestStatus === RequestStatus.Finalized &&
        selectedRequest?.isReturnExist === true) ||
      (requestStatus === RequestStatus.TaxReturnSignatureAwaited &&
        selectedRequest?.isLoggedInUserSignerForTaxReturn === false) ||
      (requestStatus === RequestStatus.TaxReturnSignatureAwaited &&
        selectedRequest?.isLoggedInUserSignerForTaxReturn === true &&
        selectedRequest?.hasLoggedInUserSignedTaxReturn === true)
    ) {
      setTaskDescriptionType(TaskMessageDescType.TASK_CONGRATS_MESSAGE)
    } else if (
      requestStatus === RequestStatus.TaxReturnSignatureAwaited &&
      selectedRequest?.isLoggedInUserSignerForTaxReturn === true &&
      selectedRequest?.hasLoggedInUserSignedTaxReturn === false
    ) {
      setTaskDescriptionType(TaskMessageDescType.TAX_RETURN_COMPLETED)
    }
  }
  // CHECK FOR UPLOAD BUTTON
  const showUploadButtonStatus = () => {
    if (
      selectedRequest.organizerModuleEnabled === true &&
      (selectedRequest.requestStatus === RequestStatus.Open ||
        selectedRequest.requestStatus === RequestStatus.Complete ||
        selectedRequest.requestStatus === RequestStatus.ReturnInProgress)
    ) {
      setShowUploadButton(true)
    } else {
      setShowUploadButton(false)
    }
  }
  const markReopenComment = async () => {
    try {
      await markReopenCommentReadAPI().unwrap()
      dispatch(updateReopenStatus())
    } catch (error) {
      console.error(error)
    }
  }
  const organizerRequestGuidAPI = async () => {
    if (selectedRequest?.organizerModuleEnabled === true) {
      try {
        const data = await taskOrganizerRequestGuid().unwrap()
        checkTaskDescriptionAndWarningCountVisibility()
        showUploadButtonStatus()
        checkWarningCount(data)
      } catch (error) {
        console.error(error)
      }
    } else {
      checkTaskDescriptionAndWarningCountVisibility()
      showUploadButtonStatus()
      checkWarningCount()
    }
  }
  useEffect(() => {
    getLogo()
    clientUserDataApi()
    firmDetailsApi()
    getDependentDisplayData()
    countryCodeDataApi()
  }, [])
  useEffect(() => {
    if (!singleServiceListData?.isBilled) {
      userClickBillAPI()
    }
  }, [singleServiceListData])
  useFocusEffect(
    useCallback(() => {
      organizerRequestGuidAPI()
    }, [])
  )
  return {
    taskDescriptionType,
    showUploadButton,
    warningCount,
    clientUserData,
    clientUserFirmDetailsData,
    clientUserRequestListData,
    singleServiceListData,
    logo,
    selectedRequest,
    markReopenComment,
    Layout,
    isFetchingGuidQuery,
    hideDocumentTab,
    canGoToTaskScreen,
  }
}
