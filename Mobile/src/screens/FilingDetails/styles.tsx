import { StyleSheet } from 'react-native'
import {
  Colors,
  FontSize,
  moderateScale,
  verticalScale,
} from '../../theme/constants'

export const styles = StyleSheet.create({
  homeSafeAreaView: {
    backgroundColor: Colors.white,
    flex: 1,
  },

  container: {
    backgroundColor: Colors.white,
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
    flex: 1,
  },
  subContainer: {
    marginRight: 20,
  },
  leftView: {
    fontSize: 16,
    width: '85%',
  },
  leftText: {
    marginLeft: 16,
    fontSize: 16,
    width: '85%',
    color: Colors.black,
  },
  yesButton: {
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: Colors.grayBorder,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 40,
  },
  rightViewContainer: {
    marginLeft: -60,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  arrowImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  completedText: {
    color: Colors.success,
    textAlign: 'left',
  },
  doneButtonContainer: {
    borderWidth: 0.5,
    width: '46%',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.grayBorder,
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
  inputBoxStyles: {
    width: '100%',
    borderWidth: 1,
  },
  iconStyles: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  stylesSwipeViewStyle: {
    fontSize: FontSize.tiny,
    height: moderateScale(35),
    backgroundColor: Colors.swipeBackgroundTextColor,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(100),
    alignContent: 'center',
  },
  stylesSwipeTextStyle: {
    color: Colors.white,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    width: '95%',
    borderRadius: 8,
    marginLeft: 10,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  containerFirmList: {
    flex: 1,
    marginTop: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    alignContent: 'flex-start',
  },
  backTextWhite: {
    color: Colors.white,
  },
  rowFront: {
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  addFinancialText: {
    margin: 10,
    color: Colors.testColorBlue,
    fontSize: 18,
  },
  dropdownStyle: {
    height: 70,
  },
  labelStyle: {
    margin: 10,
  },
  ynoContainer: {
    flex: 1,
  },
  textfieldViewContainer: {
    margin: 5,
  },
  dropDownContainer: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  addFinancial: {
    height: 50,
    justifyContent: 'center',
  },
})
