import { colors } from '../../../src/styles/global'
import { StyleSheet, Dimensions } from 'react-native'

import {
  Colors,
  FontFamily,
  MetricsSizes,
  FontSize,
  moderateScale,
} from '../../theme/constants'

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  headerViewStyle: {
    flexDirection: 'row',
  },
  headerViewStyleRow: {
    flex: 1,
    width: '100%',
  },
  buttonCancelSaveStyle: {
    height: moderateScale(40),
    backgroundColor: Colors.white,
    marginHorizontal: 0,
    marginVertical: 0,
    minHeight: 0,
    minWidth: 0,
    width: '100%',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: moderateScale(10),
  },
  buttonCancelSaveStyleRight: {
    height: moderateScale(40),
    backgroundColor: Colors.white,
    marginHorizontal: 0,
    marginVertical: 0,
    minHeight: 0,
    minWidth: 0,
    width: '70%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: moderateScale(10),
  },
  buttonCancelSaveTextStyle: {
    color: Colors.testColorBlue,
    fontSize: FontSize.small,
  },
  buttonCancelSaveTextStyleChange: {
    color: Colors.black,
    fontSize: FontSize.small,
  },
  buttonCancelSaveTextStyleRight: {
    color: Colors.testColorBlue,
    textAlign: 'right',
    fontSize: FontSize.small,
  },
  inputBoxStyles: {
    width: '95%',
    borderWidth: 0,
  },

  inputBox: {
    height: moderateScale(40),
    marginVertical: moderateScale(5),
    fontSize: FontSize.small,
  },

  labelStyle: {
    fontWeight: '500',
    marginVertical: moderateScale(5),
  },
  iconStyles: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  textPasswordValidationStyle: {
    paddingHorizontal: moderateScale(15),
    color: Colors.grayTint1,
  },

  profileHeadingStyle: {
    height: moderateScale(40),
    backgroundColor: Colors.white,
    marginHorizontal: 0,
    marginVertical: 0,
    minHeight: 0,
    minWidth: 0,
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: moderateScale(10),
    marginTop: moderateScale(10),
    textAlign:'center',
    fontSize: moderateScale(18),
  },
})

export default styles
