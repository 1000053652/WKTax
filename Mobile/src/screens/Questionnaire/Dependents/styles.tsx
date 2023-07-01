import { StyleSheet, Dimensions } from 'react-native'

import {
  Colors,
  FontFamily,
  FontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme/constants'

const styles = StyleSheet.create({
  dependentSafeAreaView: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    marginTop: 10,
    flex: 1,
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: moderateScale(10),
  },
  stylesSwipeViewStyle: {
    fontSize: FontSize.tiny,
    backgroundColor: Colors.swipeBackgroundTextColor,
    alignSelf: 'center',
    textAlign: 'center',
    minHeight: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(100),
    alignContent: 'center',
  },
  dependentItem: {
    fontSize: moderateScale(17),
    fontStyle: 'normal',
    marginLeft: moderateScale(16),
    marginVertical: moderateScale(8),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
    width: '30%',
  },
  dependentItem2: {
    fontSize: moderateScale(17),
    fontStyle: 'normal',
    marginHorizontal: moderateScale(16),
    marginVertical: moderateScale(8),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.testColorBlue,
    width: '85%',
    backgroundColor: Colors.white,
  },
  dependentItemDetails: {
    color: Colors.testColorBlue,
    width: '55%',
    marginHorizontal: moderateScale(10),
  },
  dependentItemDetails2: {
    color: Colors.testColorBlue,
    width: '55%',
    marginHorizontal: moderateScale(10),
    textAlign: 'right',
  },

  img: {
    width: moderateScale(10),
    height: moderateScale(15),
    right: moderateScale(5),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  item: {
    backgroundColor: Colors.white,
    marginStart: moderateScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    width: '100%',
  },

  horizontalLine2: {
    width: '97%',
    alignSelf: 'center',
    backgroundColor: Colors.lineColorGray,
    height: 1,
    marginTop: moderateScale(2),
  },
  stylesSwipeTextStyle: {
    color: '#ffffff',
  },
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
  inputBox: {
    height: moderateScale(40),
    marginVertical: moderateScale(5),
  },
  inputBoxView: {
    paddingVertical: moderateScale(0),
  },

  stylesContainerText: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontWeight: '300',
    fontSize: FontSize.tinyx,
    marginTop: moderateScale(5),
  },
  labelStyle: {
    fontWeight: '400',
  },
  rightViewContainer: {
    flexDirection: 'row',
    right: moderateScale(30),
  },
  yesButton: {
    width: moderateScale(65),
    height: moderateScale(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  leftText: {
    fontSize: moderateScale(14),
    textAlign: 'left',
    width: moderateScale(240),
  },

  textStyle: {
    fontSize: moderateScale(14),
  },
  leftView: {
    width: '70%',
  },
  grayArea: {
    width: '100%',
    height: moderateScale(15),
    backgroundColor: Colors.white,
  },
  textStyleDate: {
    paddingHorizontal: moderateScale(15),
  },
  inputBoxViewDatePicker: {
    paddingVertical: moderateScale(10),
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
  doneButton: {},
  finishLaterButtonContainer: {
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    marginLeft: 10,
    borderColor: Colors.grayBorder,
  },
  finishLaterButton: {},
  footer: {
    flexDirection: 'row',
    height: 50,
  },
  doneButtonContainer: {
    borderWidth: 0.5,
    width: '46%',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.grayBorder,
  },
  swipeListViewStyle: {
    maxHeight: Dimensions.get('window').height - moderateScale(390),
  },
  seprationYesNo: { width: 0.1 },
  checkboxStyle: {
    alignSelf: 'center',
    width: moderateScale(18),
    height: moderateScale(18),
    borderRadius: 0,
  },
  checkboxTextStyle: {
    fontSize: moderateScale(14),
    textAlign: 'center',
    width: moderateScale(240),
  },
  checkBoxViewStyle: {
    marginBottom: horizontalScale(8),
    marginHorizontal: horizontalScale(8),
    padding: horizontalScale(8),
    paddingHorizontal: horizontalScale(8),
    flexDirection: 'row',
  },
  saveButton: {
    color: Colors.blueText,
    marginRight: horizontalScale(10),
    fontSize: moderateScale(16),
    fontWeight: '400',
  },
  cancelButton: {
    color: Colors.blueText,
    marginLeft: horizontalScale(16),
    fontSize: moderateScale(16),
    fontWeight: '400',
  },

  datePickerContrainer: {
    marginTop: verticalScale(1),
    marginBottom: verticalScale(1),
    width: '100%',
  },
})

export default styles
