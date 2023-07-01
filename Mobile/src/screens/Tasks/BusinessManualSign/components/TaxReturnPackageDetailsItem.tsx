import React from 'react'
import { Image, View } from 'react-native'
import Text from '../../../../theme/common/Text'
import styles from '../styles'
import { t } from 'i18next'
import { Button } from 'react-native-paper'
import downloadImage from '../../../../Assets/down.png'
import moment from 'moment'
import { imageConstant } from '../../../../../src/theme/Images'
import { Dropdown } from 'react-native-element-dropdown'
import { TaxReturnPackageDetailsItemProps, dropDownData } from '../Utils'

const TaxReturnPackageDetailsItem = (
  props: TaxReturnPackageDetailsItemProps
) => {
  const isSignatureRequired = props.taxReturnData.isSignatureRequired
  const dueDate = props.taxReturnData.dueDate
    ? moment(props.taxReturnData.dueDate).format('MM/DD/YYYY').toString()
    : null
  const signedDate = props.taxReturnData.signedDate
    ? moment(props.taxReturnData.signedDate).format('MM/DD/YYYY').toString()
    : null

  const didSelectDropDownItem = (value: number) => {
    if (value === 0) {
      props.onPressDownload(props.taxReturnData)
    } else {
      props.onPressUpload(props.taxReturnData)
    }
  }
  const signatureRequiredView = () => {
    return (
      <View style={styles.signatureRequiredView}>
        <Image
          source={imageConstant.pencil}
          style={styles.pencilImage}
          resizeMode={'contain'}
        />
        <Text
          children={t('task:SIGNATURE_NEEDED')}
          stylesContainerText={styles.signatureNeededText}
          testID="SIGNATURE_NEEDED"
        />
        <Dropdown
          dropdownPosition={'bottom'}
          style={styles.dropdown}
          data={dropDownData}
          valueField={'value'}
          labelField={'label'}
          maxHeight={300}
          placeholder={t('task:DOWNLOAD_UPLOAD')}
          itemTextStyle={styles.dropDownText}
          selectedTextStyle={styles.dropDownPlaceHolderText}
          placeholderStyle={styles.dropDownPlaceHolderText}
          onChange={item => didSelectDropDownItem(item.value)}
        />
      </View>
    )
  }
  return (
    <View style={styles.taxReturnItemContainer}>
      <View style={styles.taxReturnItemSubContainer}>
        <Text
          children={'File Name:'}
          stylesContainerText={styles.fileNameTitleText}
          testID="fullname_title"
        />
        <Text
          children={props.taxReturnData.unsignedFileName}
          testID="file_name"
          stylesContainerText={styles.fileNameText}
        />
        {isSignatureRequired && dueDate && (
          <Text
            children={`Due ${dueDate}`}
            testID="file_name"
            stylesContainerText={styles.dueDateText}
          />
        )}
        {signedDate && (
          <View style={{ flexDirection: 'row' }}>
            <Image source={imageConstant.check} style={styles.checkImage} />
            <Text
              children={`SIGNED ${signedDate}`}
              testID="file_name"
              stylesContainerText={styles.dueDateText}
            />
          </View>
        )}
        {!isSignatureRequired && (
          <Button
            icon={downloadImage}
            textColor={'white'}
            contentStyle={{ flexDirection: 'row-reverse' }}
            style={styles.downloadReturnButton}
            onPress={() => props.onPressDownload(props.taxReturnData)}
          >
            <Text
              testID="DOWNLOAD_FILE"
              children={t('task:DOWNLOAD_FILE')}
              stylesContainerText={styles.downloadReturnButtonText}
            />
          </Button>
        )}
        {isSignatureRequired && signatureRequiredView()}
      </View>
      <View style={styles.headerDivider} />
    </View>
  )
}
export default TaxReturnPackageDetailsItem
