import { useSelector } from 'react-redux'
import { useFileDownloader } from '../../../../../src/hooks'
import {
  IndividualTaxReturnPackageDetailViewModel,
  RequestDetailsResponse,
  ReturnDetailsAPIResponse,
} from '../../../../../src/services/modules/task/responseTypes'
import {
  OrgWorkflowStatus,
  OrganizerPdfStatus,
  RequestStatus,
} from '../../Utils'
import {
  useLazyReturnDownloadPackageAPIQuery,
  useLazyTaskDownloadLetterReducersQuery,
  useLazyTaskdownloadApiQuery,
} from '../../../../../src/services/modules/task'
import moment from 'moment'
import FileViewer from 'react-native-file-viewer'

export default function () {
  const { downloadFile, status } = useFileDownloader()
  const singleServiceListData = useSelector(
    state => state?.home?.singleServiceListData
  )
  const isIndividualRequest =
    singleServiceListData?.clientServiceTypeIntId === 1
  const requestdetails: RequestDetailsResponse = useSelector(
    state => state?.TaskScreen?.selectedRequestDetails
  )
  const returnDetails: ReturnDetailsAPIResponse = useSelector(
    state => state.TaskScreen?.returnDetails
  )
  const individualTaxReturnPackageDetail: IndividualTaxReturnPackageDetailViewModel =
    returnDetails?.taxReturnPackageDetails[0]
      .individualTaxReturnPackageDetailViewModel

  const [taskdownloadApi, { isFetching: isFetchingtaskDownload }] =
    useLazyTaskdownloadApiQuery()
  const [taskDownloadLetterReducers, { isFetching: isFetchingDownloadLetter }] =
    useLazyTaskDownloadLetterReducersQuery()
  const [
    returnDownloadPackageAPI,
    { isFetching: isFetchingReturnDownloadPackage },
  ] = useLazyReturnDownloadPackageAPIQuery()
  const engLetterCompletedDate = moment(
    requestdetails.engagementSignedDate
  ).format('MM/DD/YYYY')

  const completedDate = moment(requestdetails.requestCompletedDate).format(
    'MM/DD/YYYY'
  )

  const showDownloadReturnButton =
    returnDetails?.isAnyIndividualPackageCompleted === true &&
    (requestdetails?.requestStatus ===
      RequestStatus.TaxReturnSignatureReceived ||
      requestdetails?.requestStatus === RequestStatus.Finalized)

  const showEngLetterCompleted =
    requestdetails?.isLoggedInUserSigner === true &&
    ((requestdetails?.requestStatus === RequestStatus.Open &&
      requestdetails?.hasLoggedInUserSigned === true) ||
      requestdetails?.requestStatus >= RequestStatus.Complete)

  const showOrgCompleted =
    requestdetails?.organizerModuleEnabled === true &&
    requestdetails?.organizerWorkflowStatus === OrgWorkflowStatus.Complete

  const showNotifyAccountantCompleted =
    requestdetails?.requestStatus >= RequestStatus.Complete &&
    (requestdetails?.organizerModuleEnabled === true ||
      requestdetails?.engagementModuleEnabled === true)

  const showReviewAndSignCompleted =
    requestdetails?.isReturnExist === true &&
    (requestdetails.requestStatus ===
      RequestStatus.TaxReturnSignatureReceived ||
      requestdetails.requestStatus === RequestStatus.Finalized ||
      (requestdetails?.requestStatus ===
        RequestStatus.TaxReturnSignatureAwaited &&
        (requestdetails?.isLoggedInUserSignerForTaxReturn === false ||
          requestdetails?.hasLoggedInUserSignedTaxReturn === true)))

  const showPreviouslyCompletedTitle =
    showReviewAndSignCompleted ||
    requestdetails?.organizerModuleEnabled === true ||
    requestdetails?.engagementModuleEnabled === true

  const showDownloadAllView =
    requestdetails?.requestStatus >= RequestStatus.Complete &&
    (requestdetails?.organizerPdfStatus === OrganizerPdfStatus.Created ||
      requestdetails?.organizerModuleEnabled === false) &&
    (requestdetails?.organizerModuleEnabled === true ||
      requestdetails?.engagementModuleEnabled === true)

  const downloadReturnAPI = async () => {
    try {
      const response = await returnDownloadPackageAPI({}).unwrap()
      const res = await downloadFile({
        fromUrl: response.fileDownloadUrl,
        fileName: response.fileName,
      })
      setTimeout(() => {
        FileViewer.open(res)
      }, 100)
    } catch (error) {}
  }
  const downloadAllURLAPICall = () => {
    taskdownloadApi()
      .unwrap()
      .then(data => {
        downloadFile({ fromUrl: data.url, fileName: data.fileName }).then(
          res => {
            setTimeout(() => {
              FileViewer.open(res)
            }, 100)
          }
        )
      })
      .catch(error => {
        console.error('downloadAllfiles', error)
      })
  }

  const downloadEngAPICall = () => {
    taskDownloadLetterReducers()
      .unwrap()
      .then(data => {
        downloadFile({ fromUrl: data.url, fileName: data.fileName }).then(
          res => {
            setTimeout(() => {
              FileViewer.open(res)
            }, 100)
          }
        )
      })
      .catch(error => {
        console.error('downloadfiles', error)
      })
  }
  return {
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
  }
}
