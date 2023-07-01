import React, { useCallback, useMemo, useRef } from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import Text from '../../../theme/common/Text'
import styles from './styles'
import { addNewDocumentListData } from './Utils'
import { useTranslation } from 'react-i18next'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import BottomSheet from '@gorhom/bottom-sheet'
import {
  AddNewDocumentProps,
  ApplicationScreenProps,
} from '../../../../@types/navigation'
import { glbStyles } from '../../../styles/global'
import { useFilePicker } from '../../../hooks'
import { FilePickerTypes } from '../../../types/commonTypes'

const AddNewDocument = ({ navigation, route }: ApplicationScreenProps) => {
  const { onlyPhotos, selectedFiles, isSupplimental }: AddNewDocumentProps =
    route.params
  const { t } = useTranslation()
  const { pickFile } = useFilePicker()
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
  const snapPoints = useMemo(() => [isSupplimental ? 184 : 155], [])

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index == -1) {
      navigation.goBack()
    }
  }, [])

  const pickImageWithType = async (type: FilePickerTypes) => {
    try {
      const files = await pickFile(type, onlyPhotos)
      navigation.goBack()
      selectedFiles({ files: files, type: type })
    } catch (e) {
      console.error('❌ ~ file: AddNewDocument.tsx ~ pickImageWithType ~ e:', e)
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
      <View style={styles.mainView}>
        <View style={styles.topView}>
          <Text
            stylesContainerText={styles.addNewDocumentTitle}
            children={
              isSupplimental
                ? t('questionnaire:ADD_SUPPLEMENTAL_DOC')
                : t('questionnaire:ADD_NEW_DOCUMENT')
            }
          />
          {isSupplimental && (
            <Text
              stylesContainerText={styles.addNewDocumentDescription}
              children={t('questionnaire:ADD_SUPPLEMENTAL_DESCRIPTION')}
            />
          )}
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
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.addNewDocumentItem}
              onPress={() => {
                pickImageWithType(item.type)
              }}
            >
              <Image
                source={item.icon}
                style={styles.addNewDocumentImage}
                resizeMode={'contain'}
              />
              <Text
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
export default AddNewDocument
