import { StyleSheet } from 'react-native'
import {
  Colors,
  FontFamily,
  FontSize,
  FontWeight,
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../../../../theme/constants'

const styles = StyleSheet.create({
  previouslyItemContainer: {
    borderColor: Colors.borderColor,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(8),
    backgroundColor: Colors.lightGray,
    alignItems: 'center',
  },
  previouslyIconsView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(24),
    height: verticalScale(24),
    marginRight: 14,
  },
  previouslyUserIcons: {
    width: moderateScale(23),
    height: moderateScale(23),
  },
  previouslyItemCenterViewEngLetter: {
    width: '87%',
    paddingRight: horizontalScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previouslyItemCenterView: {
    width: '87%',
    paddingRight: horizontalScale(19),
  },
  previouslyTitle: {
    fontSize: FontSize.tiny,
    fontWeight: FontWeight.normal,
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.greenShade,
    lineHeight: verticalScale(17),
  },
  download: {
    fontSize: FontSize.tiny,
    fontWeight: FontWeight.normal,
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.testColorBlue,
    lineHeight: verticalScale(17),
    textAlign: 'center',
    justifyContent: 'center',
  },
  downloadView: {
    justifyContent: 'center',
  },
  previouslySubTitle: {
    fontSize: FontSize.tinyx,
    fontWeight: FontWeight.normal,
    fontFamily: FontFamily.FiraSansItalic,
    color: Colors.grayTint1,
    lineHeight: verticalScale(14),
  },
  previouslyViews: {
    borderColor: Colors.borderDullColor,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: verticalScale(15),
    paddingVertical: verticalScale(12),
    marginTop: verticalScale(24),
  },
  previouslyText: {
    color: Colors.grayTint1,
    fontWeight: FontWeight.normal,
    fontFamily: FontFamily.FiraSansRegular,
    fontSize: FontSize.small,
    lineHeight: verticalScale(19),
  },
  niceJobView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(8),
  },
  thumbImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbImageIcon: {
    width: horizontalScale(24),
    height: verticalScale(24),
  },
  niceJobTitlesContainer: {
    marginHorizontal: moderateScale(12),
  },
  niceJobTitle: {
    color: Colors.blueShade1,
    fontWeight: FontWeight.normal,
    fontFamily: FontFamily.FiraSansRegular,
    fontSize: FontSize.small,
    lineHeight: verticalScale(19),
    marginBottom: moderateScale(5),
  },
  niceJobTitleSubTitle: {
    color: Colors.blueShade1,
    fontWeight: FontWeight.normal,
    fontFamily: FontFamily.FiraSansRegular,
    fontSize: FontSize.small,
    lineHeight: verticalScale(19),
  },
  buttonDownloadStyle: {
    marginTop: moderateScale(15),
  },
  buttonDownload: {
    width: '75%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderColor: '#007AC3',
    borderWidth: 1,
    borderRadius: 0,
    flexDirection: 'row',
    padding: moderateScale(10),
  },
  downloadTittle: {
    fontSize: FontSize.tiny,
    color: '#007AC3',
  },
  buttonUploadContactStyle: {
    width: '57.33%',
    alignSelf: 'center',
    backgroundColor: Colors.testColorBlue,
    paddingVertical: verticalScale(28),
    paddingTop: verticalScale(14),
    paddingBottom: verticalScale(13),
    borderRadius: 0,
  },
  buttonUploadtyle: {
    color: Colors.white,
    fontWeight: FontWeight.normal,
    fontFamily: FontFamily.FiraSansRegular,
    fontSize: FontSize.tiny,
    lineHeight: verticalScale(17),
  },
  tasksCompletedSubTitlesContainer: {
    marginHorizontal: verticalScale(16),
    marginBottom: verticalScale(15),
  },
  accountSubText: {
    color: Colors.textDullColor,
    fontWeight: FontWeight.light,
    fontFamily: FontFamily.FiraSansRegular,
    fontSize: FontSize.tinyx,
    lineHeight: verticalScale(14),
  },
  accountSubText2: {
    color: Colors.textDullColor,
    fontWeight: FontWeight.light,
    fontFamily: FontFamily.FiraSansRegular,
    fontSize: FontSize.tinyx,
    lineHeight: verticalScale(14),
    marginBottom: moderateScale(10),
  },
  downloadUserIcons: {
    marginLeft: moderateScale(10),
    width: moderateScale(14),
    height: moderateScale(14),
  },
  missingMainView: {
    borderRadius: verticalScale(20),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#EA8F00',
    width: verticalScale(35),
    height: verticalScale(25),
  },
  missingText: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: 'white',
    fontFamily: FontFamily.FiraSansMedium,
    fontWeight: FontWeight.medium,
    fontSize: FontSize.tinyx,
    letterSpacing: 1,
    lineHeight: 16,
  },
  missingMessage: {
    marginLeft: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontFamily: FontFamily.FiraSansMedium,
    fontWeight: FontWeight.medium,
    fontSize: FontSize.tinyx,
    letterSpacing: 1,
    lineHeight: 16,
  },
  missingView: {
    height: 29,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  boxReviewSignSubTitle: {
    fontFamily: FontFamily.FiraSansRegular,
    fontWeight: FontWeight.normal,
    fontSize: FontSize.tinyx,
    marginBottom: verticalScale(5),
    color: Colors.grayTint1,
  },
  reviewSignDownloadReturnButton: {
    backgroundColor: Colors.textAndBorderColor,
    borderRadius: 0,
    alignSelf: 'center',
    marginTop: verticalScale(12),
    marginBottom: verticalScale(12),
  },
  boxReviewSignClientType: {
    fontFamily: FontFamily.FiraSansMedium,
    fontWeight: FontWeight.medium,
    fontSize: FontSize.tinyx,
    color: Colors.textColor,
    lineHeight: verticalScale(14),
  },
  boxReviewSignClientTypeTitle: {
    fontFamily: FontFamily.FiraSansMedium,
    fontWeight: FontWeight.medium,
    fontSize: FontSize.tinyx,
    color: Colors.blueShade1,
    lineHeight: verticalScale(16),
  },
})

export default styles
