import { StyleSheet } from 'react-native'

import {
  Colors,
  FontSize,
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../../theme/constants'

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  stylesContainerText: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontWeight: '300',
    color: Colors.black,
    fontSize: moderateScale(14),
    marginTop: verticalScale(5),
  },
  subContainer: {
    backgroundColor: Colors.white,
  },
  container: {
    backgroundColor: Colors.white,
    width: '100%',
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
    width: horizontalScale(20),
    height: verticalScale(20),
    resizeMode: 'contain',
  },
  completedText: {
    color: Colors.success,
    textAlign: 'left',
  },
})

export default styles
