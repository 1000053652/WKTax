import { StyleSheet } from 'react-native'

import { Colors, FontSize, moderateScale } from '../../../../theme/constants'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '100%',
  },
  subContainer: {
    marginRight: moderateScale(20),
  },
  leftView: {
    fontSize: FontSize.small,
    width: '70%',
  },
  leftText: {
    fontSize: FontSize.small,
  },
  rightViewContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  arrowImage: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  completedText: {
    color: Colors.success,
    textAlign: 'left',
  },
})

export default styles
