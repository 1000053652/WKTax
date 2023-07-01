import { StyleSheet } from 'react-native'
import {
  Colors,
  FontFamily,
  MetricsSizes,
  FontSize,
  horizontalScale,
  verticalScale,
  FontWeight,
  moderateScale,
} from '../../../theme/constants'

const styles = StyleSheet.create({
  contactSafeAreaView: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  headerView: {
    alignItems: 'center',
  },
  nameIntialRoundedView: {
    borderRadius: 30,
    borderWidth: 1,
    height: 60,
    width: 60,
    borderColor: Colors.greenShade,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  nameIntialsText: {
    fontSize: FontSize.regular,
    fontFamily: FontFamily.FiraSansMedium,
    alignSelf: 'center',
    color: Colors.greenShade,
  },
  fullNameText: {
    marginTop: verticalScale(8),
    fontSize: FontSize.small,
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.grayTint1,
  },
  signatureRequireText: {
    marginTop: verticalScale(12),
    fontSize: FontSize.tinyxx,
    fontFamily: FontFamily.FiraSansItalic,
    color: Colors.textColorRed,
    lineHeight: 12,
    fontWeight: FontWeight.normal,
    paddingHorizontal: 16,
  },
  headerDivider: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.borderColor,
    marginTop: 16,
  },
  taxReturnItemContainer: {},
  taxReturnItemSubContainer: {
    marginHorizontal: 16,
  },
  downloadReturnButton: {
    backgroundColor: Colors.textAndBorderColor,
    borderRadius: 0,
    marginTop: verticalScale(12),
    marginBottom: verticalScale(12),
    paddingHorizontal: 16,
    width: 178,
    height: 40,
  },
  downloadReturnButtonText: {
    color: 'white',
    fontSize: FontSize.tiny,
    fontFamily: FontFamily.FiraSansRegular,
    lineHeight: 18,
  },
  fileNameTitleText: {
    marginTop: verticalScale(13),
    fontSize: FontSize.tiny,
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.grayTint1,
    lineHeight: 17,
  },
  fileNameText: {
    marginTop: verticalScale(8),
    fontSize: FontSize.tiny,
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.testColorBlue,
    lineHeight: 17,
  },
  dueDateText: {
    marginTop: verticalScale(6),
    fontSize: FontSize.tinyx,
    fontFamily: FontFamily.FiraSansItalic,
    color: Colors.grayTint1,
    lineHeight: 14,
  },
  pencilImage: {
    height: verticalScale(24),
    width: horizontalScale(24),
  },
  checkImage: {
    height: verticalScale(16),
    width: horizontalScale(16),
  },
  dropdown: {
    height: verticalScale(45),
    borderColor: Colors.testColorBlue,
    borderWidth: 1,
    width: 208,
    paddingHorizontal: 12,
  },
  signatureNeededText: {
    marginHorizontal: 8,
    fontSize: FontSize.tinyx,
    fontFamily: FontFamily.FiraSansMedium,
    color: Colors.textColor,
    lineHeight: 14.4,
    textTransform: 'capitalize',
  },
  signatureRequiredView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  dropDownPlaceHolderText: {
    fontSize: FontSize.tiny,
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.textColor,
    lineHeight: 17,
  },
  dropDownText: {
    fontSize: FontSize.tiny,
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.textColor,
    lineHeight: 18,
  },
  dropDownItemContainer: {
    backgroundColor: Colors.homeHeadingBackColor,
  },
})

export default styles
