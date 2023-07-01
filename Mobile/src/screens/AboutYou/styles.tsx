import { StyleSheet } from 'react-native'
import { black } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors'

import {
  Colors,
  FontFamily,
  MetricsSizes,
  FontSize,
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../../theme/constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  safeAreaViewStyle: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  nputBoxView: {
    paddingVertical: moderateScale(7),
  },
  inputBoxView: {
    paddingVertical: moderateScale(10),
  },
  topSpaceScreen: {
    marginTop: moderateScale(15),
  },

  subContainer: {
    flex: 1,
    marginHorizontal: moderateScale(16),
    marginVertical: moderateScale(15),
    backgroundColor: Colors.white,
  },

  switchMainContainer: {
    flex: 1,
    marginHorizontal: moderateScale(16),
    backgroundColor: Colors.white,
    flexDirection: 'column',
    alignSelf: 'flex-end',
  },
  switchTopContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },

  switchContainer: {
    flex: 1,
    marginEnd: moderateScale(16),
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  leftYNO: {
    width: '40%',
  },

  switchBtnContainer: {
    flex: 1,
    marginHorizontal: moderateScale(16),
    backgroundColor: Colors.white,
    alignItems: 'flex-end',
    flexDirection: 'column',
    alignSelf: 'flex-end',
  },

  switchContainerTitle: {
    flex: 1,
    marginHorizontal: moderateScale(16),
    backgroundColor: Colors.white,
    alignItems: 'flex-start',
  },
  btnUnSelected: {
    backgroundColor: Colors.white,
    borderColor: Colors.borderColor,
    borderWidth: 2,
    width: moderateScale(64),
    padding: moderateScale(10),
    fontSize: moderateScale(14),
    fontStyle: 'normal',
    fontFamily: FontFamily.FiraSansRegular,
    fontWeight: '400',
    textAlign: 'center',
  },

  btnSelected: {
    backgroundColor: Colors.backgroundSelected,
    borderColor: Colors.testColorBlue,
    borderWidth: 2,
    padding: moderateScale(10),
    width: moderateScale(64),
    fontSize: moderateScale(14),
    fontStyle: 'normal',
    color: Colors.testColorBlue,
    fontFamily: FontFamily.FiraSansRegular,
    fontWeight: '400',
    textAlign: 'center',
  },

  empltyView: {
    height: moderateScale(10),
    backgroundColor: Colors.serviceListBackgroundColor,
    fontWeight: '300',
  },
  fieldStyle: {
    fontSize: moderateScale(12),
    fontStyle: 'normal',
    marginTop: moderateScale(5),
    fontFamily: FontFamily.FiraSansRegular,
    fontWeight: '500',
    color: Colors.grayTint1,
  },
  valueStyle: {
    fontSize: moderateScale(14),
    fontStyle: 'normal',
    fontFamily: FontFamily.FiraSansRegular,
    fontWeight: '400',
    color: Colors.warningTextColor,
    marginBottom: moderateScale(10),
  },
  valueStyleBlue: {
    fontSize: moderateScale(14),
    fontStyle: 'normal',
    fontFamily: FontFamily.FiraSansRegular,
    fontWeight: '400',
    color: Colors.black,
    marginBottom: moderateScale(10),
  },
  titleStyle: {
    fontSize: moderateScale(16),
    fontStyle: 'normal',
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
  },
  qAndNTitleStyle: {
    fontSize: moderateScale(14),
    fontStyle: 'normal',
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
  },
  buttonContinueStyle: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 0,
    marginTop: MetricsSizes.regular,
    height: moderateScale(44),
  },
  aboutYouSafeAreaView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  toolbar: {
    flex: 1,
    alignContent: 'space-between',
    backgroundColor: Colors.white,
  },
  headerViewStyle: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
  },
  headerViewStyleRow: {
    flex: 1,
    width: '100%',
  },
  horizontalLine: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.lineColorGray,
    height: moderateScale(1),
  },
  horizontalLine2: {
    width: '97%',
    alignSelf: 'center',
    backgroundColor: Colors.lineColorGray,
    height: moderateScale(1),
    marginTop: moderateScale(2),
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
  buttonTitleStyle: {
    height: moderateScale(40),
    backgroundColor: Colors.white,
    marginHorizontal: 0,
    marginVertical: 0,
    minHeight: 0,
    minWidth: 0,
    width: '100%',
    justifyContent: 'center',
    marginLeft: moderateScale(10),
  },
  buttonTaxPayerNameStyle: {
    height: moderateScale(20),
    marginHorizontal: 0,
    marginVertical: 0,
    minHeight: 0,
    minWidth: 0,
    backgroundColor: Colors.white,
    width: '100%',
    justifyContent: 'center',
    marginTop: -moderateScale(10),
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
    fontSize: moderateScale(16),
  },
  buttonCancelSaveTextStyleChange: {
    color: Colors.black,
    fontSize: moderateScale(16),
  },
  buttonTaxPayerNameTextStyle: {
    color: Colors.textColor,
    fontSize: moderateScale(12),
  },

  buttonCancelSaveTextStyleRight: {
    color: Colors.testColorBlue,
    textAlign: 'right',
    fontSize: moderateScale(16),
  },
  titleItem: {
    backgroundColor: Colors.white,
    height: moderateScale(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  multiRowItem: {
    backgroundColor: Colors.white,
    marginVertical: moderateScale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },
  multiItemOne: {
    marginEnd: moderateScale(10),
    width: '40%',
  },
  qAndNTitleItem: {
    backgroundColor: Colors.white,
    height: moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageViewStyle: {
    flex: 1,
    marginTop: moderateScale(20),
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },
  containerKey: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContactStyle: {
    flex: 1,
    alignSelf: 'center',
    height: moderateScale(44),
    borderRadius: 0,
    backgroundColor: Colors.testColorBlue,
  },
  buttonDoneContactStyle: {
    fontSize: moderateScale(14),
    justifyContent: 'center',
    textAlign: 'center',
    color: Colors.white,
    fontFamily: FontFamily.FiraSansRegular,
  },
  buttonFinishContactStyle: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderColor: Colors.borderColor,
    borderWidth: 0,
    borderRadius: 0,
    height: moderateScale(44),
  },
  buttonConatinerStyle: {
    height: moderateScale(44),
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: Colors.white,
  },

  img: {
    width: moderateScale(8),
    height: moderateScale(14),
    right: moderateScale(0),
    margin: moderateScale(10),
    alignContent: 'flex-end',
    alignItems: 'center',
  },

  inputBox: {
    height: moderateScale(40),
    marginVertical: moderateScale(5),
  },
  dtinputBox: {
    height: moderateScale(40),
    width: moderateScale(40),
    marginVertical: moderateScale(5),
  },

  inputBox1: {
    flex: 1,
    height: moderateScale(40),
    marginVertical: moderateScale(5),
    width: moderateScale(40),
  },
  labelStyle: {
    fontWeight: '500',
  },

  viewMiddleNameStyle: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(0),
  },
  textMiddleNameStyle: {
    width: '84%',
    fontFamily: FontFamily.FiraSansRegular,
  },
  textMiddleNameStyle2: {
    width: '30%',
    justifyContent: 'flex-start',
    fontSize: moderateScale(14),
  },
  tetUserIDStyle: {
    paddingHorizontal: moderateScale(15),
  },
  textPhoneStyle: {
    paddingHorizontal: moderateScale(15),
    fontFamily: FontFamily.FiraSansRegular,
    width: '70%',
  },
  viewPhoneStyle: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
  },
  inputBoxPhone: {
    height: moderateScale(40),
    width: moderateScale(140),
  },
  inputBoxPhoneRight: {
    height: moderateScale(40),
    width: moderateScale(70),
    marginVertical: moderateScale(5),
    marginLeft: moderateScale(15),
  },

  dropdownViewStyle: {
    width: '25%',
    marginLeft: moderateScale(15),
    marginEnd: moderateScale(5),
  },
  dropdownStateListLiewStyle: {
    marginStart: moderateScale(15),
    marginBottom: moderateScale(15),
  },

  dropdown: {
    height: moderateScale(45),
    width: '95%',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 0,
    color: Colors.black,
    paddingHorizontal: 8,
  },
  dropdownBoxViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.grayLight,
    borderWidth: 1,
    height: verticalScale(44),
    marginHorizontal: horizontalScale(16),
    width: '80%',
  },
  dropDownContainer: {
    marginBottom: verticalScale(16),
  },
  dropdownStateList: {
    height: moderateScale(45),
    borderColor: Colors.grayLight,
    borderWidth: 1,
    width: '100%',
  },
  dropDownIconStyle: {
    width: horizontalScale(20),
    height: verticalScale(20),
    marginHorizontal: horizontalScale(5),
  },

  phoneInputContainerStyle: {
    width: '40%',
    height: moderateScale(45),
    marginBottom: moderateScale(20),
  },
  radiobtnContainerStyle: {
    width: '20%',
    marginTop: 10,
    height: verticalScale(45),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: horizontalScale(40),
  },

  // icon: {
  //   marginRight: 5,
  // },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: moderateScale(22),
    top: 8,
    zIndex: 999,
    paddingHorizontal: moderateScale(7),
    fontSize: FontSize.tiny,
    fontFamily: FontFamily.FiraSansRegular,
  },
  placeholderStyle: {
    fontSize: FontSize.tiny,
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
  },
  selectedTextStyle: {
    fontSize: FontSize.tiny,
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
  },

  // placeholderStyle: {
  //   fontSize: 16,
  //   color:Colors.black
  // },

  // selectedTextStyle: {
  //   fontSize: 16,
  //   color:Colors.black
  // },

  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  extStyleDate: {
    paddingHorizontal: moderateScale(15),
  },
  textStyleDate: {
    paddingHorizontal: moderateScale(15),
  },
  inputBoxViewDatePicker: {
    paddingVertical: moderateScale(10),
    marginBottom: moderateScale(10),
  },

  datePickerStyleView: {
    width: moderateScale(200),
    height: moderateScale(40),
    borderWidth: 1,
    marginHorizontal: moderateScale(15),
    marginVertical: moderateScale(0),
    borderColor: Colors.grayLight,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  styleDatePickerText: {
    marginHorizontal: moderateScale(15),
    width: moderateScale(140),
  },

  datePickerImageStyle: {
    width: moderateScale(18),
    height: moderateScale(18),
  },
  // HEADER
  headerContainer: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    paddingHorizontal: horizontalScale(16),
  },
  headerTitle: {
    fontFamily: FontFamily.FiraSansRegular,
    fontSize: FontSize.smallx,
    textAlign: 'center',
  },
  headerSubTitle: {
    fontFamily: FontFamily.FiraSansRegular,
    fontSize: FontSize.tinyx,
    textAlign: 'center',
  },
  headerButtonText: {
    color: Colors.textAndBorderColor,
    fontSize: FontSize.small,
  },
  datePickerContrainer: {
    marginTop: verticalScale(5),
    marginBottom: verticalScale(1),
    width: '100%',
  },
})
export default styles
