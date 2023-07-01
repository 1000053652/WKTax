import React from 'react'
import { View } from 'react-native'
import Text from '../../../../theme/common/Text'
import styles from '../styles'
import { t } from 'i18next'
import { BusinessManualSignHeaderProps } from '../Utils'

const BusinessManualSignHeader = (props: BusinessManualSignHeaderProps) => {
  return (
    <View style={styles.headerView}>
      <View style={styles.nameIntialRoundedView}>
        <Text
          children={
            props.profileData?.firstName?.charAt(0) +
            ' ' +
            props.profileData?.lastName?.charAt(0)
          }
          stylesContainerText={styles.nameIntialsText}
          testID="menu_short_name"
        />
      </View>
      <Text
        children={
          props.profileData?.firstName + ' ' + props.profileData?.lastName
        }
        stylesContainerText={styles.fullNameText}
        testID="menu_fullname"
      />
      {props.isAnySignatureRequired && (
        <Text
          children={t('task:SIGNATURE_REQUIRED_DESC')}
          stylesContainerText={styles.signatureRequireText}
          testID="menu_fullname"
        />
      )}
      <View style={styles.headerDivider} />
    </View>
  )
}
export default BusinessManualSignHeader
