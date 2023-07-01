import React, { useCallback, useMemo, useRef } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import Text from '../../../theme/common/Text'
import styles from './styles'
import { AddAdditionalMenuData, addAdditionalDocumentData } from './Utils'
import { useTranslation } from 'react-i18next'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import BottomSheet from '@gorhom/bottom-sheet'
import {
  AddAdditionalDocumentProps,
  ApplicationScreenProps,
} from '../../../../@types/navigation'
import { glbStyles } from '../../../styles/global'
import { AttachmentFileData } from '../../../types/commonTypes'
import { useDispatch } from 'react-redux'
import useDRLFileUploader from './hooks/useDRLFileUploader'
import { refreshDRLCategory } from '../../../../src/store/questionnaire'
import { Spinner } from '../../../theme/common/Spinner/Spinner'
import loaderStyle from '../../../screens/Common/LoaderStyle'
import { errorMessageToast } from '../../Error/utils'

const AddingAdditionalDocument = ({
  navigation,
  route,
}: ApplicationScreenProps) => {
  const { lineItem }: AddAdditionalDocumentProps = route.params
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { uploadDRLFile, drlAttachmentUploadStatus } = useDRLFileUploader()
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
  const snapPoints = useMemo(() => [110], [])

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index == -1) {
      navigation.goBack()
    }
  }, [])
  const uploadAttachement = (data: AttachmentFileData) => {
    uploadDRLFile({
      localFileData: data,
      requestListId: lineItem?.requestListId,
    })
      .then(res => {
        dispatch(refreshDRLCategory(`${new Date()}`))
        navigation.goBack()
      })
      .catch(err => {
        errorMessageToast(error)
      })
  }
  const addClick = () => {
    if (lineItem) {
      navigation.navigate('AddNewDocument', {
        isSupplimental: true,
        selectedFiles: data => {
          if (data.type == 0 || data.type == 1) {
            navigation.navigate('PDFConversion', {
              selectedImages: data.files,
              fileName: lineItem.description,
              onSave: localFile => {
                uploadAttachement(localFile)
              },
              onCancel: () => {},
            })
          } else if (data.type == 2) {
            uploadAttachement(data.files[0])
          }
        },
      })
    } else {
      console.error(
        '❌ ~ file: AddingAdditionalDocument.tsx ~ addClick ~ lineItem is missing'
      )
    }
  }

  const onItemPress = (selecteStatus: AddAdditionalMenuData) => {
    if (selecteStatus.id == 0) {
      addClick()
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
        visible={drlAttachmentUploadStatus.isUploading}
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
            testID="line_item_description"
            stylesContainerText={styles.addNewDocumentTitle}
            children={lineItem?.description}
          />
        </View>
        <View style={styles.addNewDocumentLineSeprator} />
        <FlatList
          horizontal
          data={addAdditionalDocumentData}
          ItemSeparatorComponent={() => (
            <View style={styles.addNewDocumentListSeprator} />
          )}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => (
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
          )}
        />
      </View>
    </BottomSheet>
  )
}
export default AddingAdditionalDocument
