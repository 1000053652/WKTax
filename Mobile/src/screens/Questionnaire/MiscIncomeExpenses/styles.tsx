import { StyleSheet } from 'react-native'

import {
  Colors,
  FontFamily,
  FontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme/constants'

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    backgroundColor: Colors.backgroundFooterColor,
    flex: 1,
  },

  headerField: {
    textAlign: 'left',
    marginLeft: horizontalScale(15),
    fontSize: moderateScale(14),
    fontWeight:'bold',
  },
  headerFieldView: { height: verticalScale(45), justifyContent: 'center' },

  item: {
    backgroundColor: Colors.white,
    height: verticalScale(44),
    marginStart: moderateScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  subTitleTextStyle: {
    textAlign: 'left',
    marginLeft: horizontalScale(15),
    fontSize: moderateScale(14),
    color: Colors.grayTint1,
  },
  giftItemViewStylew: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
    marginVertical: verticalScale(15),
  },
  giftItemButton: {
    fontSize: moderateScale(17),
    fontStyle: 'normal',
    marginHorizontal: horizontalScale(16),
    marginVertical: verticalScale(8),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.testColorBlue,
    width: '85%',
    backgroundColor: Colors.white,
  },

  horizontalLine2: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.lineColorGray,
    height: 1,
    marginTop: verticalScale(2),
  },

  finishLaterButtonContainer: {
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    marginLeft: horizontalScale(10),
    borderColor: Colors.grayBorder,
  },

  footer: {
    flexDirection: 'row',
    height: 50,
  },
  doneButtonContainer: {
    borderWidth: 0.5,
    width: '46%',
    marginRight: horizontalScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.grayBorder,
  },
  saveButton: {
    color: Colors.blueText,
    marginRight: horizontalScale(10),
    fontSize: moderateScale(16),
    fontWeight: '400',
  },
  cancelButton: {
    color: Colors.blueText,
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '400',
  },
  datePickerContrainer: {
    marginTop: verticalScale(1),
    marginBottom: verticalScale(1),
    width: '100%',
  },
  dropDownContainer: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  stylesSwipeViewStyle: {
    fontSize: FontSize.tiny,
    backgroundColor: Colors.swipeBackgroundTextColor,
    alignSelf: 'center',
    textAlign: 'center',
    minHeight: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(100),
    alignContent: 'center',
  },
  stylesSwipeTextStyle: {
    color: Colors.white,
  },
  img: {
    width: horizontalScale(10),
    height: verticalScale(15),
    right: moderateScale(5),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  giftItem: {
    fontSize: moderateScale(17),
    fontStyle: 'normal',
    marginLeft: moderateScale(16),
    marginVertical: moderateScale(8),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
    width: '90%',
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: moderateScale(10),
  },
  giftForgivenStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: moderateScale(10),
  },
  textInputLabel: {
    fontSize: moderateScale(14),
    color: Colors.textDullColor,
    fontWeight: '400',
    width: '85%',
    margin: horizontalScale(16),
  },
})

export default styles
