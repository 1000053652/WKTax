import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Image,
  TouchableOpacity,
  View,
  Animated,
  ListRenderItemInfo,
  ActivityIndicator,
} from 'react-native'
import Text from '../../../theme/common/Text'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { Header } from 'react-native-elements'
import { glbCustomerHeaderOptions, glbStyles } from '../../../styles/global'
import { imageConstant } from '../../../theme/Images'
import { ScalingDot } from 'react-native-animated-pagination-dots'
import { TextInput } from 'react-native-paper'
import { Colors } from '../../../theme/constants'
import {
  PDFConversionProps,
  ApplicationScreenProps,
} from '../../../../@types/navigation'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import BottomSheet from '@gorhom/bottom-sheet'
import { usePDFConverter } from '../../../hooks'
import { AttachmentFileData } from '../../../types/commonTypes'
import moment from 'moment'
import { errorMessageToast } from '../../Error/utils'

const PDFConversion = ({ navigation, route }: ApplicationScreenProps) => {
  const { selectedImages, fileName, onSave, onCancel }: PDFConversionProps =
    route.params

  const scrollX = React.useRef(new Animated.Value(0)).current
  const [isConvertingPDF, setIsConvertingPDF] = useState(false)
  const [isRenderFlatList, setIsRenderFlatList] = useState(false)
  const [imageData, setImagesData] = useState<AttachmentFileData[] | null>(null)
  const [fileNameValue, setFileNameValue] = useState(
    `${fileName.replace(/ +/g, '-')}_${moment(new Date()).format(
      'YYYY-MM-DD_HH:mm'
    )}`
  )
  const bottomSheetRef = useRef<BottomSheeet>(null)
  const fileNameTextRef = useRef()

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
  const snapPoints = useMemo(() => ['100%'], [])
  const { convertPDF } = usePDFConverter()

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index == -1) {
      navigation.goBack()
    }
  }, [])
  useEffect(() => {
    setImagesData(selectedImages)
  }, [])
  const { t } = useTranslation()
  const onChangeText = (value: string) => {
    setFileNameValue(value)
  }
  const onPressCancelButton = () => {
    navigation.goBack()
    onCancel()
  }
  const onPressAddMoreButton = () => {
    navigation.navigate('AddNewDocument', {
      onlyPhotos: true,
      selectedFiles: data => {
        setImagesData(searches => searches.concat(data.files ?? []))
        setIsRenderFlatList(!isRenderFlatList)
      },
    })
  }
  const onPressSaveButton = () => {
    if (imageData != null && imageData?.length > 0) {
      setIsConvertingPDF(true)
      convertPDF(imageData, fileNameValue)
        .then((pdfData: AttachmentFileData) => {
          setIsConvertingPDF(false)
          onSave(pdfData)
          navigation.goBack()
        })
        .catch(e => {
          setIsConvertingPDF(false)
          console.error(
            '❌ ~ file: PDFConversion.tsx:103 ~ onPressSaveButton ~ Could not convert PDF :',
            e
          )
          errorMessageToast(e)
        })
    } else {
      console.error(
        '❌ ~ file: PDFConversion.tsx ~ onPressSaveButton ~ imageData is null'
      )
      errorMessageToast(e)
    }
  }
  const onPressRemoveImage = (index: number) => {
    if (imageData != null && imageData?.length > 0) {
      const copyImageData = imageData.filter((i, indexx) => indexx != index)
      setImagesData(copyImageData)
      setIsRenderFlatList(!isRenderFlatList)
    }
  }
  const renderItem = (item: ListRenderItemInfo<AttachmentFileData>) => {
    return (
      <View style={styles.photosContainerView}>
        <View style={styles.photoView}>
          <TouchableOpacity
            style={styles.removeImageButton}
            onPress={() => onPressRemoveImage(item.index)}
          >
            <Image
              source={imageConstant.closeCircle}
              style={styles.removeButtonImage}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <Image
            source={{ uri: item.item.uri }}
            style={styles.previewImage}
            resizeMode={'contain'}
          />
        </View>
        <Text
          children={`Page ${item.index + 1} of ${imageData?.length}`}
          stylesContainerText={styles.pageIndex}
        />
      </View>
    )
  }
  return (
    <BottomSheet
      handleIndicatorStyle={{ height: 0 }}
      handleStyle={{ height: 0 }}
      backgroundStyle={glbStyles.bottomSheetContainer}
      backdropComponent={BackdropElement}
      index={0}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enableOverDrag={false}
    >
      <Header
        statusBarProps={glbCustomerHeaderOptions}
        leftComponent={
          <TouchableOpacity
            onPress={onPressAddMoreButton}
            style={glbStyles.headerLeftComponent}
          >
            <Image
              source={imageConstant.plusCircle}
              style={glbStyles.headerLeftComponentImage}
              resizeMode={'contain'}
            />
            <Text
              children={t('common:ADD_MORE_PHOTOS')}
              testID="header_add_more_photos"
              stylesContainerText={glbStyles.headerButtonText}
            />
          </TouchableOpacity>
        }
        rightComponent={
          <View style={{ flexDirection: 'row' }}>
            {isConvertingPDF && <ActivityIndicator />}
            {!isConvertingPDF && (
              <TouchableOpacity onPress={onPressSaveButton}>
                <Text
                  children={t('common:UPLOAD')}
                  testID="header_save"
                  stylesContainerText={styles.saveButtonText}
                />
              </TouchableOpacity>
            )}
          </View>
        }
        containerStyle={glbStyles.headerContainer}
      />
      <View style={styles.textInputContainer}>
        <TextInput
          ref={fileNameTextRef}
          placeholder="Type here"
          textColor={Colors.greenShade}
          defaultValue={fileNameValue}
          underlineColor="transparent"
          cursorColor={Colors.systemBlue}
          underlineStyle={{
            borderStyle: 'dashed',
            borderWidth: 1,
            borderColor: Colors.greenShade,
          }}
          style={styles.previewFileInput}
          onChangeText={value => onChangeText(value)}
        />
        <TouchableOpacity
          onPress={() => {
            fileNameTextRef.current?.focus()
          }}
        >
          <Image
            source={imageConstant.pencil}
            style={styles.pencilImage}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
      <BottomSheetScrollView alwaysBounceVertical={false}>
        <BottomSheetFlatList
          extraData={isRenderFlatList}
          showsHorizontalScrollIndicator={false}
          style={styles.photosHorizontalList}
          horizontal
          pagingEnabled
          data={imageData ?? []}
          keyExtractor={item => `${item.fileSize}`}
          renderItem={item => renderItem(item)}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          decelerationRate={'normal'}
          scrollEventThrottle={16}
        />
        <View style={styles.bottomItemsView}>
          <TouchableOpacity
            onPress={onPressCancelButton}
            style={styles.cancelButton}
          >
            <Text
              children={t('common:CANCEL')}
              testID="cancel_button"
              stylesContainerText={glbStyles.headerButtonText}
            />
          </TouchableOpacity>
          <View style={styles.pagingDotCon}>
            <ScalingDot
              data={imageData?.slice(0, 10) ?? []}
              scrollX={scrollX}
              inActiveDotOpacity={0.9}
              activeDotScale={1.1}
              activeDotColor={Colors.drlActiveDot}
              inActiveDotColor={Colors.drlInactiveDot}
              dotStyle={styles.pagingDot}
              containerStyle={styles.pagingDotContainer}
            />
          </View>
        </View>
        <View style={styles.bottomGuideContainer}>
          <Text
            stylesContainerText={styles.bottomGuideText}
            testID="user_guide_text"
            children={t('common:USER_SWIPE_GUIDE')}
          />
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}
export default PDFConversion
