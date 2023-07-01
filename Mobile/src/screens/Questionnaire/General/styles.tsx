import { StyleSheet } from 'react-native'

import {
  Colors,
  FontFamily,
  FontSize,
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../../theme/constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerView: {
    flex: 1,
  },
  generalInformationText: {
    color: Colors.blueShadeColor,
    fontSize: FontSize.small,
    fontFamily: FontFamily.FiraSansRegular,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
  },
  sepratorLine: {
    height: 1,
    backgroundColor: Colors.borderColor,
  },
  textField: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  dropDownContainer: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  safeAreaViewStyle: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  fieldLabel: {
    margin: 5,
    marginLeft: 10,
    fontSize: FontSize.small,
  },
  datePickerContrainer: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  leftSlotViewStyle: {
    width: moderateScale(120),
  },
  centerSlotViewStyle: {
    width: moderateScale(160),
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  rightSlotViewStyle: {
    width: moderateScale(280),
    marginRight: moderateScale(140),
    paddingRight: moderateScale(150),
  },
  textStyleOther: {
    color: Colors.blueShadeColor,
    fontSize: FontSize.tiny,
    fontWeight: '500',
    width: moderateScale(180),
  },
  leftText: {
    width: moderateScale(140),
    fontSize: moderateScale(14),
    textAlign: 'left',
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
  switchContainer: {
    backgroundColor: Colors.white,
    height: verticalScale(44),
    paddingHorizontal: horizontalScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  switchTxt: {
    fontSize: FontSize.tiny,
    marginLeft: horizontalScale(16),
    marginVertical: verticalScale(8),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
    width: '90%',
  },
  switchSubTxt: {
    fontSize: FontSize.tinyx,
    marginLeft: horizontalScale(16),
    marginVertical: verticalScale(8),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.backgroundUploadHome,
    width: '90%',
    fontWeight: '400',
  },
})
export default styles
