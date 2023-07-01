import { StyleSheet } from 'react-native'
import { Colors, FontSize, moderateScale } from '../../../theme/constants'

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '100%',
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
    fontSize: 16,
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
    justifyContent: 'flex-end',
  },
  completedText: {
    color: Colors.success,
    textAlign: 'left',
  },
  doneButtonContainer: {
    borderRadius: 2,
    borderWidth: 0.5,
    width: '46%',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.grayBorder,
  },

  doneButton: {},
  finishLaterButtonContainer: {
    borderRadius: 2,
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
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: moderateScale(10),
  },
  stylesSwipeViewStyle: {
    fontSize: FontSize.tiny,
    height: moderateScale(35),
    backgroundColor: Colors.swipeBackgroundTextColor,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(75),
    alignContent: 'center',
  },
  stylesSwipeTextStyle: {
    color: '#ffffff',
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
  saveButton: {
    color: Colors.blueText,
    marginRight: 16,
    fontSize: 16,
    fontWeight: '400',
  },
  cancelButton: {
    color: Colors.blueText,
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '400',
  },
  electronic: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.black,
  },
})
