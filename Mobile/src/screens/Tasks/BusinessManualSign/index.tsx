import React from 'react'
import { Image, SafeAreaView, View } from 'react-native'
import { ApplicationScreenProps } from '../../../../@types/navigation'
import styles from './styles'
import { ScrollView } from 'react-native'
import { FlatList } from 'react-native'
import useBusinessManualSignHook from './useBusinessManualSignHook'
import Text from '../../../../src/theme/common/Text'
import BusinessManualSignHeader from './components/BusinessManualSignHeader'
import { TaxReturnPackageDetails } from '../../../../src/services/modules/task/responseTypes'
import TaxReturnPackageDetailsItem from './components/TaxReturnPackageDetailsItem'
import { Header } from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import { glbCustomerHeaderOptions, glbStyles } from '../../../../src/styles/global'
import { t } from 'i18next'
import { imageConstant } from '../../../../src/theme/Images'
import Spinner from 'react-native-loading-spinner-overlay/lib'
import loaderStyle from '../../Common/LoaderStyle'

const BusinessManualSign = ({ navigation }: ApplicationScreenProps) => {
  const {
    profileData,
    isFetchingReturnDetails,
    isFetchingReturnDownloadPackage,
    isFetchingValidateSignedReturn,
    isFetchingUpdateValidateSigned,
    isAnySignatureRequired,
    returnData,
    downloadStatus,
    uploadStatus,
    downloadReturnAPI,
    validateAndUploadFile,
  } = useBusinessManualSignHook()
  const renderItem = (item: TaxReturnPackageDetails) => {
    return (
      <TaxReturnPackageDetailsItem
        taxReturnData={item}
        onPressDownload={selectedItem => downloadReturnAPI(selectedItem)}
        onPressUpload={selectedItem => addClick(selectedItem)}
      />
    )
  }
  const addClick = (selectedItem: TaxReturnPackageDetails) => {
    navigation.navigate('AddNewDocument', {
      selectedFiles: data => {
        if (data.type == 0 || data.type == 1) {
          navigation.navigate('PDFConversion', {
            selectedImages: data.files,
            fileName: 'Uncategorized',
            onSave: localFile => {
              validateAndUploadFile(selectedItem, localFile)
            },
            onCancel: () => {},
          })
        } else if (data.type == 2) {
        }
      },
    })
  }
  const backClick = () => {
    navigation.goBack()
  }
  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <Spinner
        visible={
          isFetchingReturnDetails ||
          isFetchingReturnDownloadPackage ||
          isFetchingValidateSignedReturn ||
          isFetchingUpdateValidateSigned ||
          downloadStatus.isDownloading ||
          uploadStatus.isUploading
        }
        textContent={
          downloadStatus.isDownloading
            ? `${downloadStatus.downloadPercentage}% ${t('common:DOWNLOADING')}`
            : uploadStatus.isUploading
            ? `${uploadStatus.percentage}% ${t('common:UPLOADING')}`
            : t('common:LOADING')
        }
        size={'large'}
        textStyle={loaderStyle.spinnerTextStyle}
      />
      <Header
        statusBarProps={glbCustomerHeaderOptions}
        leftComponent={
          <TouchableOpacity
            onPress={backClick}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Image
              source={imageConstant.blueBack}
              style={styles.pencilImage}
              resizeMode={'contain'}
            />
            <Text
              testID="header_cancel"
              stylesContainerText={glbStyles.headerButtonText}
            >
              {t('common:BACK')}
            </Text>
          </TouchableOpacity>
        }
        containerStyle={glbStyles.headerContainer}
      />
      <ScrollView>
        <BusinessManualSignHeader
          profileData={profileData}
          isAnySignatureRequired={isAnySignatureRequired}
        />
        <FlatList
          data={returnData?.taxReturnPackageDetails ?? []}
          keyExtractor={item => item.taxReturnPackageWorkflowGuid}
          renderItem={item => renderItem(item.item)}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
export default BusinessManualSign
