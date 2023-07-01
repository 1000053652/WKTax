import React, { useCallback, useMemo, useRef } from 'react'
import { FlatList, TouchableOpacity, View, Alert } from 'react-native'
import Text from '../../../theme/common/Text'
import styles from './styles'
import { AttachmentMenuData, attachmentStatusData } from './Utils'
import { useTranslation } from 'react-i18next'
import {
  useLazyDeletDRLAttachmentQuery,
  useLazyDeletDRLUnCategorizedAttachmentQuery,
  useLazyGetDRLAttachmentDownloadDetailsQuery,
  useLazyGetDRLUnCategorizedAttachmentDownloadDetailsQuery,
} from '../../../services/modules/questionnaire'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../../screens/Common/LoaderStyle'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import BottomSheet from '@gorhom/bottom-sheet'
import {
  ApplicationScreenProps,
  AttachmentsMenuProps,
} from '../../../../@types/navigation'
import { glbStyles } from '../../../styles/global'
import { refreshDRLCategory } from '../../../store/questionnaire'
import { useDispatch, useSelector } from 'react-redux'
import { DRLAttachmentDownloadDetailsResponse } from '../../../services/modules/questionnaire/responseTypes'
import { useFileDownloader } from '../../../hooks'
import FileViewer from 'react-native-file-viewer'
import { errorMessageToast } from '../../Error/utils'

const AttachmentsMenu = ({ navigation, route }: ApplicationScreenProps) => {
  const { lineItem, attachment }: AttachmentsMenuProps = route.params
  const singleServiceListData = useSelector(
    state => state?.home?.singleServiceListData
  )
  const { downloadFile, status } = useFileDownloader()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [deleteDRLLineItemAttachment, { isFetching: isFetchingDeleteDRLItem }] =
    useLazyDeletDRLAttachmentQuery()
  const [
    deleteDRLUncategorizedAttachment,
    { isFetching: isFetchingDeleteDRLUncategories },
  ] = useLazyDeletDRLUnCategorizedAttachmentQuery()
  const [
    getDRLAttachmentDetailsToDownloadAPI,
    { isFetching: isFetchingFileDetailsToDownload },
  ] = useLazyGetDRLAttachmentDownloadDetailsQuery()
  const [
    getDRLUnCategoriesDownloadDetailsAPI,
    { isFetching: isFetchingUnCategoriesDetails },
  ] = useLazyGetDRLUnCategorizedAttachmentDownloadDetailsQuery()

  const bottomSheetRef = useRef<BottomSheeet>(null)

  const BackdropElement = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        opacity={0.5}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  )
  // variables
  const snapPoints = useMemo(() => [155], [])

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index == -1) {
      navigation.goBack()
    }
  }, [])

  const downloadFileWith = (response: DRLAttachmentDownloadDetailsResponse) => {
    downloadFile({
      fromUrl: response.fileUrl,
      fileName: response.fileName,
    })
      .then(res => {
        setTimeout(() => {
          navigation.goBack()
          FileViewer.open(res)
        }, 100)
      })
      .catch(err => {
        errorMessageToast(err)
      })
  }

  const showDeleteConfirmationAlert = () => {
    Alert.alert(
      t('questionnaire:CONFIRM_DELETE_FILE'),
      t('questionnaire:CONFIRM_DELETE_FILE_MESSAGE'),
      [
        {
          text: t('common:GO_BACK'),
          onPress: () => {
            navigation.goBack()
          },
          style: 'cancel',
        },
        {
          text: t('common:DELETE'),
          style: 'destructive',
          onPress: () => {
            if (lineItem != null && attachment != null) {
              deleteLineItemAttachment(
                lineItem.requestListId,
                attachment.fileId
              )
            } else if (lineItem != null) {
              deleteUnCategorizedAttachment(lineItem.requestListId)
            }
          },
        },
      ]
    )
  }
  const deleteLineItemAttachment = (requestId: number, fileId: number) => {
    deleteDRLLineItemAttachment({
      requestListId: requestId,
      attachemtId: fileId,
    })
      .unwrap()
      .then(res => {
        dispatch(refreshDRLCategory(`${new Date()}`))
        navigation.goBack()
      })
      .catch(err => {
        console.error(err)
        errorMessageToast(err)
      })
  }
  const deleteUnCategorizedAttachment = (requestId: number) => {
    deleteDRLUncategorizedAttachment(requestId)
      .unwrap()
      .then(res => {
        dispatch(refreshDRLCategory(`${new Date()}`))
        navigation.goBack()
      })
      .catch(err => {
        console.error(err)
        errorMessageToast(err)
      })
  }
  const getLineItemAttachmentDetails = () => {
    getDRLAttachmentDetailsToDownloadAPI({
      requestGuid: singleServiceListData?.requestGuid,
      fileId: attachment?.fileId,
    })
      .unwrap()
      .then(res => {
        downloadFileWith(res)
      })
      .catch(err => {
        errorMessageToast(err)
      })
  }
  const getUnCategorizedAttachmentDetails = () => {
    getDRLUnCategoriesDownloadDetailsAPI({
      clientGuid: singleServiceListData?.clientGuid,
      requestGuid: singleServiceListData?.requestGuid,
      fileId: lineItem?.requestListId,
    })
      .unwrap()
      .then(res => {
        downloadFileWith(res)
      })
      .catch(err => {
        errorMessageToast(err)
      })
  }
  const onItemPress = (item: AttachmentMenuData) => {
    if (item.id == 0 && lineItem != null && attachment != null) {
      getLineItemAttachmentDetails()
    } else if (item.id == 0 && lineItem != null) {
      getUnCategorizedAttachmentDetails()
    } else if (item.id == 1) {
      showDeleteConfirmationAlert()
    }
  }
  const renderStatusItems = (item: AttachmentMenuData) => {
    return (
      <TouchableOpacity
        style={styles.statusMenuItem}
        onPress={() => onItemPress(item)}
      >
        <Text
          stylesContainerText={styles.addNewDocumentItemTitle}
          children={item.title}
        />
      </TouchableOpacity>
    )
  }
  return (
    <BottomSheet
      handleIndicatorStyle={glbStyles.bottomSheetIndicator}
      backgroundStyle={glbStyles.bottomSheetContainer}
      backdropComponent={BackdropElement}
      index={0}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <Spinner
        visible={
          isFetchingDeleteDRLItem ||
          isFetchingDeleteDRLUncategories ||
          isFetchingFileDetailsToDownload ||
          isFetchingUnCategoriesDetails ||
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
      <View style={styles.mainView}>
        <View style={styles.topView}>
          <Text
            stylesContainerText={styles.addNewDocumentTitle}
            children={
              attachment != null ? attachment.fileName : lineItem?.description
            }
          />
        </View>
        <View style={styles.addNewDocumentLineSeprator} />
        <FlatList
          data={attachmentStatusData}
          keyExtractor={item => `${item.id}`}
          renderItem={item => renderStatusItems(item.item)}
        />
      </View>
    </BottomSheet>
  )
}
export default AttachmentsMenu
