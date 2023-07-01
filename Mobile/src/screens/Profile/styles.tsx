import { StyleSheet, Dimensions } from 'react-native'

import {
  Colors,
  FontFamily,
  MetricsSizes,
  FontSize,
  moderateScale,
  horizontalScale,
  verticalScale,
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
    width: horizontalScale(160),
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: horizontalScale(10),
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
    width: '100%',
  },
  buttonCancelSaveTextStyleRight: {
    color: Colors.testColorBlue,
    textAlign: 'right',
    fontSize: FontSize.small,
  },
  horizontalLine: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.lineColorGray,
    height: 1,
    marginTop: moderateScale(2),
  },
  emptyView: {
    height: moderateScale(15),
  },
  emptyView25: {
    height: verticalScale(55),
  },
  inputBox: {
    height: moderateScale(40),
    marginVertical: moderateScale(5),
    fontSize: FontSize.small,
  },

  inputBox1: {
    height: moderateScale(40),
    marginVertical: moderateScale(5),
    width: '100%',
    fontSize: FontSize.small,
  },
  labelStyle: {
    fontWeight: '500',
    fontSize: FontSize.small,
  },
  inputBoxView: {
    paddingVertical: moderateScale(7),
  },
  viewMiddleNameStyle: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(0),
  },
  textMiddleNameStyle: {
    width: '84%',
    fontFamily: FontFamily.FiraSansSemiBold,
  },
  textMiddleNameStyle2: {
    width: '16%',
  },
  tetUserIDStyle: {
    paddingHorizontal: moderateScale(15),
  },
  textPhoneStyle: {
    paddingHorizontal: moderateScale(15),
    fontFamily: FontFamily.FiraSansSemiBold,
    width: '81%',
  },
  viewPhoneStyle: {
    width: '100%',
    flexDirection: 'row',
    height: verticalScale(40),
  },
  inputBoxPhone: {
    height: moderateScale(40),
    width: moderateScale(140),
  },
  inputBoxPhoneRight: {
    height: moderateScale(40),
    width: moderateScale(70),
    marginVertical: moderateScale(5),
    fontSize: FontSize.small,
  },

  dropdownViewStyle: {
    width: '25%',
    marginLeft: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: moderateScale(45),
    borderColor: Colors.grayLight,
    borderWidth: 1,
    width: '100%',
    marginTop: verticalScale(20),
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: moderateScale(22),
    top: 8,
    zIndex: 999,
    paddingHorizontal: moderateScale(7),
    fontFamily: FontFamily.FiraSansRegular,
    fontSize: FontSize.small,
  },
  placeholderStyle: {
    fontFamily: FontFamily.FiraSansRegular,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: FontSize.small,
  },
  selectedTextStyle: {
    fontFamily: FontFamily.FiraSansRegular,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: FontSize.small,
  },
  phoneInputStyle: {
    width: '50%',
    borderWidth: 0,
  },
  phoneInputExtStyle: {
    width: '25%',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    marginLeft: -moderateScale(15),
    height: verticalScale(40),
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
