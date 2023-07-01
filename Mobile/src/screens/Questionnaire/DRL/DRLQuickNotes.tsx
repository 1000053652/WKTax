import React, { useCallback, useMemo, useRef } from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import Text from '../../../theme/common/Text'
import styles from './styles'
import {
  FilePickerTypesData,
  QuickNotesDRLStatusDataType,
  addNewDocumentListData,
  quickNotesDRLStatusData,
} from './Utils'
import { useTranslation } from 'react-i18next'
import { useLazyUpdateDRLItemStatusQuery } from '../../../services/modules/questionnaire'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../../screens/Common/LoaderStyle'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import BottomSheet from '@gorhom/bottom-sheet'
import {
  DRLQuickNotesProps,
  ApplicationScreenProps,
} from '../../../../@types/navigation'
import { glbStyles } from '../../../styles/global'
import { useFilePicker } from '../../../hooks'
import { FilePickerTypes, AttachmentFileData } from '../../../types/commonTypes'
import { refreshDRLCategory } from '../../../store/questionnaire'
import { useDispatch } from 'react-redux'
import useDRLFileUploader from './hooks/useDRLFileUploader'
import { DRLLineItemStatus } from './Utils'
import { imageConstant } from '../../../../src/theme/Images'
import { formatCurrency } from '../../../../src/theme/common/TextInput/utils'
import { errorMessageToast } from '../../Error/utils'

const DRLQuickNotes = ({ navigation, route }: ApplicationScreenProps) => {
  const { lineItem }: DRLQuickNotesProps = route.params
  const dispatch = useDispatch()
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
  const snapPoints = useMemo(() => [455], [])
  const { uploadDRLFile, drlAttachmentUploadStatus } = useDRLFileUploader()

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index == -1) {
      navigation.goBack()
    }
  }, [])

  const { t } = useTranslation()
  const { pickFile } = useFilePicker()
  const [updateDRLItemStatus, { isFetching: isFetchingUpdateStatus }] =
    useLazyUpdateDRLItemStatusQuery()

  const updateDRLLineItemStatusAPI = (
    selecteStatus: QuickNotesDRLStatusDataType
  ) => {
    if (lineItem != null) {
      let newItem = lineItem
      newItem = {
        ...newItem,
        status: selecteStatus.statusCode,
        completed: true,
      }
      updateDRLItemStatus(newItem)
        .unwrap()
        .then(res => {
          dispatch(refreshDRLCategory(`${new Date()}`))
          navigation.goBack()
        })
        .catch(err => {
          errorMessageToast(err)
        })
    }
  }
  const updateDRLLineItemStatusInCompletedAPI = () => {
    if (lineItem != null) {
      let newItem = lineItem
      newItem = { ...newItem, status: 6, completed: false, amount: 0 }
      updateDRLItemStatus(newItem)
        .unwrap()
        .then(res => {
          dispatch(refreshDRLCategory(`${new Date()}`))
          navigation.goBack()
        })
        .catch(err => {
          errorMessageToast(err)
        })
    }
  }

  const onItemPress = (selecteStatus: QuickNotesDRLStatusDataType) => {
    if (selecteStatus.type === DRLLineItemStatus.ReplyWithAmount) {
      navigation.goBack()
      navigation.navigate('ReplyWithAmount', { item: lineItem })
    } else {
      updateDRLLineItemStatusAPI(selecteStatus)
    }
  }
  const uploadAttachment = (data: AttachmentFileData) => {
    uploadDRLFile({
      localFileData: data,
      requestListId: lineItem?.requestListId,
    })
      .then(res => {
        dispatch(refreshDRLCategory(`${new Date()}`))
        navigation.goBack()
      })
      .catch(err => {
        navigation.goBack()
        errorMessageToast(err)
      })
  }
  const convertPDF = (files: AttachmentFileData[]) => {
    if (lineItem) {
      navigation.navigate('PDFConversion', {
        selectedImages: files,
        fileName: lineItem.description,
        onSave: data => {
          uploadAttachment(data)
        },
        onCancel: () => {},
      })
    } else {
      console.error(
        '❌ ~ file: DRLQuickNotes.tsx ~ convertPDF ~ lineItem is missing'
      )
    }
  }
  const pickImageWithType = async (type: FilePickerTypes) => {
    try {
      const files = await pickFile(type)
      switch (type) {
        case FilePickerTypes.Camera:
        case FilePickerTypes.PhotoLibrary:
          convertPDF(files)
          break
        case FilePickerTypes.Upload:
          uploadAttachment(files[0])
          break
      }
    } catch (e) {
      console.error('❌ ~ file: DRLQuickNotes.tsx ~ pickImageWithType ~ e:', e)
    }
  }
  const renderFilePickerItems = (item: FilePickerTypesData) => {
    return (
      <TouchableOpacity
        style={styles.addNewDocumentItem}
        onPress={() => pickImageWithType(item.type)}
      >
        <Image
          source={item.icon}
          style={styles.addNewDocumentImage}
          resizeMode={'contain'}
        />
        <Text
          testID="filepicker_title"
          stylesContainerText={styles.addNewDocumentItemTitle}
          children={item.title}
        />
      </TouchableOpacity>
    )
  }
  function renderStatusItems(item: QuickNotesDRLStatusDataType) {
    if (item.statusCode === 6 && lineItem?.completed && lineItem.status == 6) {
      return (
        <TouchableOpacity style={styles.replyContainer} onPress={() => onItemPress(item)}>
          <Image
            source={imageConstant.check}
            style={styles.replyAmountCorrectImage}
          />
          <View style={styles.replyAmountCenterView}>
            <Text
              testID="reply_status"
              stylesContainerText={styles.addNewDocumentItemTitle}
              children={item.title}
            />
            <Text
              testID="reply_amount"
              stylesContainerText={styles.addNewDocumentItemTitle}
              children={formatCurrency(`${lineItem?.amount ?? 0}`)}
            />
          </View>
          <TouchableOpacity
            onPress={() => updateDRLLineItemStatusInCompletedAPI()}
          >
            <Image
              source={imageConstant.close}
              style={styles.replyAmountClose}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          style={styles.statusMenuItem}
          onPress={() => onItemPress(item)}
        >
          <Text
            testID="status_title"
            stylesContainerText={styles.addNewDocumentItemTitle}
            children={item.title}
          />
        </TouchableOpacity>
      )
    }
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
          isFetchingUpdateStatus || drlAttachmentUploadStatus.isUploading
        }
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
      <View style={styles.mainView}>
        <View style={styles.topView}>
          <Text
            testID="screen_header_title"
            stylesContainerText={styles.addNewDocumentTitle}
            children={lineItem?.description}
          />
        </View>
        <View style={styles.addNewDocumentLineSeprator} />
        <FlatList
          style={styles.itemsList}
          horizontal
          data={addNewDocumentListData}
          ItemSeparatorComponent={() => (
            <View style={styles.addNewDocumentListSeprator} />
          )}
          keyExtractor={item => `${item.id}`}
          renderItem={item => renderFilePickerItems(item.item)}
        />
        <View style={styles.addNewDocumentLineSeprator} />
        <FlatList
          data={quickNotesDRLStatusData}
          keyExtractor={item => `${item.statusCode}`}
          renderItem={item => renderStatusItems(item.item)}
        />
      </View>
    </BottomSheet>
  )
}
export default DRLQuickNotes
