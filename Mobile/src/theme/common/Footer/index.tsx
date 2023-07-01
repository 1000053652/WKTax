import React from 'react'
import { Image, View } from 'react-native'
import styles from './style'
import Text from '../../../theme/common/Text'
const FooterScreen = () => {
  return (
    <View style={styles.container}>
      <Text
        children="powered by"
        stylesContainerText={styles.poweredStyle}
        testID="footer_poweredby"
      />

      <Image style={styles.img} source={require('../../../Assets/small.png')} />

      <Text
        children="Wolters Kluwer"
        stylesContainerText={styles.brandName}
        testID="footer_wolters_kluwer"
      />
    </View>
  )
}

FooterScreen.defaultProps = {
  height: 51,
  width: '100%',
  mode: 'stretch',
  style: {},
}

export default FooterScreen
