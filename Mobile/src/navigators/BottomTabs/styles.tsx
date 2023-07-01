import { StyleSheet } from 'react-native'
import { Colors, horizontalScale, verticalScale } from '../../theme/constants'

const styles = StyleSheet.create({
  activeStylesContainerText: {
    color: Colors.testColorBlue,
  },
  bottomTabImageStyle: {
    width: horizontalScale(16),
    height: verticalScale(16),
  },
})

export default styles
