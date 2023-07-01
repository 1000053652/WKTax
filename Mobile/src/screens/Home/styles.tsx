import { StyleSheet } from 'react-native'

import {
  Colors,
  FontFamily,
  MetricsSizes,
  FontSize,
  moderateScale,
  horizontalScale,
  verticalScale,
  FontWeight,
} from '../../theme/constants'

const styles = StyleSheet.create({
  homeSafeAreaView: {
    backgroundColor: "white",
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerStyle: {
    flexDirection: 'row',
    marginButtomginHorizontal: MetricsSizes.tiny,
    height: MetricsSizes.regular + MetricsSizes.small,
  },
  buttonContactStyle: {
    width: '57%',
    alignSelf: 'center',
    borderRadius: 0,
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(15),
    paddingHorizontal: verticalScale(10),
  },
  buttonUploadStyle: {
    width: '57%',
    alignSelf: 'center',
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(15),
    paddingHorizontal: verticalScale(10),
    borderRadius: 0,
    backgroundColor: Colors.buttonColor,
  },
  buttonUploadStyleDisable: {
    width: '57%',
    alignSelf: 'center',
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(8),
    paddingHorizontal: verticalScale(10),
    borderRadius: 0,
    backgroundColor: Colors.backgroundUploadHome,
  },
  buttonUploadContactTextStyle: {
    fontSize: FontSize.tiny,
    fontWeight: FontWeight.normal,
    lineHeight: verticalScale(17),
    justifyContent: 'center',
    textAlign: 'center',
  },
  buttonUploadTextStyleDisable: {
    fontSize: FontSize.tinyx,
    fontWeight: FontWeight.normal,
    lineHeight: verticalScale(14),
    justifyContent: 'center',
    textAlign: 'center',
  },
  headerRowStyle: {
    flex: 3,
  },
  logoStyleCenter: {
    width: MetricsSizes.regular,
    height: MetricsSizes.regular,
  },
  logoStyleCenterMain: {
    width: '100%',
    height: verticalScale(30),
  },
  logoStyle: {
    width: horizontalScale(30),
    height: verticalScale(30),
  },
  forwardrrowStyle: {
    width: horizontalScale(16),
    height: verticalScale(16),
  },
  myTaskTitleArrowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forwardrrowStyleArrow: {
    width: horizontalScale(8),
    height: verticalScale(14),
  },
  fillCheckIcon: {
    width: horizontalScale(24),
    height: verticalScale(24),
    marginRight: horizontalScale(12),
  },
  mainViewStyle: {
    backgroundColor: Colors.homeHeadingBackColor,
    width: '60%',
    paddingVertical: MetricsSizes.tiny,
    marginTop: verticalScale(12),
  },
  mainViewStyleHeading: {
    fontSize: FontSize.tiny,
    fontFamily: FontFamily.FiraSansBold,
    marginLeft: MetricsSizes.tiny,
  },
  mainViewStyleDesc: {
    fontSize: FontSize.tiny,
    fontFamily: FontFamily.FiraSansRegular,
    marginLeft: MetricsSizes.tiny,
  },
  welcomeLabelStyle: {
    fontSize: moderateScale(24),
    color: Colors.textDullColor,
    fontFamily: FontFamily.FiraSansRegular,
    paddingVertical: MetricsSizes.tiny,
  },
  viewMyTaskStyle: {
    backgroundColor: Colors.white,
    marginHorizontal: horizontalScale(8),
    paddingVertical: horizontalScale(16),
    paddingHorizontal: horizontalScale(16),
    borderColor: Colors.borderDullColor,
    borderWidth: 1,
    marginTop: verticalScale(32),
    color:'#000'
  },
  helpfulLinkStyle: {
    backgroundColor: Colors.white,
    margin: MetricsSizes.tiny,
    padding: MetricsSizes.tiny,
    height: verticalScale(185),
    borderColor: Colors.borderDullColor,
    borderWidth: 1,
    marginTop: verticalScale(32),
  },
  taskLabelStyle: {
    fontSize: FontSize.small,
    fontFamily: FontFamily.FiraSansRegular,
    marginBottom: verticalScale(16),
    lineHeight: verticalScale(19),
    fontWeight: FontWeight.normal,
    color:"#000",
  },
  taskLabelStyleHelpful: {
    fontSize: FontSize.small,
    fontFamily: FontFamily.FiraSansRegular,
    paddingVertical: MetricsSizes.tiny,
    color:"#000",
  },
  taskLabelStyleDesc1: {
    fontSize: FontSize.tiny,
    fontFamily: FontFamily.FiraSansRegular,
    lineHeight: verticalScale(16.8),
    letterSpacing: 0.6,
    color:"#000",
  },
  taskLabelStyleDescNoTask: {
    fontSize: FontSize.tinyx,
    fontWeight: FontWeight.medium,
    fontFamily: FontFamily.FiraSansRegular,
    paddingVertical: MetricsSizes.regular / 2,
    letterSpacing: 1,
    lineHeight: verticalScale(16),
    textTransform: 'uppercase',
  },
  taskLabelStyleDesc: {
    fontSize: FontSize.tiny,
    fontFamily: FontFamily.FiraSansRegular,
    paddingHorizontal: moderateScale(5),
    textTransform: 'uppercase',
    color:'#000'
  },
  taskLabelStyleDescWarning: {
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.white,
    fontSize: FontSize.tiny,
    textTransform: 'uppercase',
    fontWeight: FontWeight.medium,
  },

  taskLabelStyleDescBold: {
    fontSize: FontSize.tiny,
    fontWeight: '700',
  },
  warningViewStyle: {
    backgroundColor: 'red',
    borderRadius: MetricsSizes.regular + MetricsSizes.small,
    height: MetricsSizes.small,
    width: MetricsSizes.small,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  mainWarningViewStyle: {
    flexDirection: 'row',
    marginTop: verticalScale(24),
  },
  congratView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowViewHelpOne: {
    flexDirection: 'row',
    flex: 10,
    justifyContent:'center',
    alignItems:'center',
  },
  rowViewHelpTwo: {
    flexDirection: 'row',
    height: MetricsSizes.regular + MetricsSizes.small,
    flex: 10,
  },
  taskLabelStyleDescText: {
    fontSize: FontSize.tiny,
    fontFamily: FontFamily.FiraSansRegular,
    flex: 8.5,
    color: Colors.testColorBlue
  },
  flexTwo: {
    flex: 1,
    height: MetricsSizes.regular + MetricsSizes.small,
    justifyContent:'center',
  },
  horizontalLine: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.lineColorGray,
    height: 1,
    marginVertical: MetricsSizes.small,
  },
  taskLabelSelectServiceStyleStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: FontSize.small,
    fontFamily: FontFamily.FiraSansRegular,
    paddingVertical: MetricsSizes.tiny,
  },
  emptyView: {
    height: verticalScale(20),
    paddingVertical: moderateScale(45),
  },
  rowItemServiceListView: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderTopColor: Colors.borderColor,
    borderBottomColor: Colors.borderColor,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginVertical: moderateScale(7),
  },
  rowItemServiceList: {
    marginHorizontal: moderateScale(5),
    flex: 8,
    alignItems: 'flex-start',
  },
  rowItemServiceListImage: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reqlistitem: {
    fontSize: FontSize.regular,
    fontStyle: 'normal',
    marginHorizontal: moderateScale(16),
    marginVertical: moderateScale(8),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
    fontWeight: '400',
  },
  reqlistitemDesc: {
    fontSize: FontSize.tiny,
    fontStyle: 'normal',
    marginHorizontal: moderateScale(16),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
  },
  reqlistitemStatus: {
    fontSize: FontSize.tiny,
    fontStyle: 'normal',
    marginLeft: moderateScale(5),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
  },

  reqlistImage: {
    width: moderateScale(21),
    height: moderateScale(21),
    margin: moderateScale(8),
    alignContent: 'flex-end',
  },
  imageStyle: {
    width: moderateScale(15),
    height: moderateScale(15),
  },
  statusView: {
    flexDirection: 'row',
    marginVertical: moderateScale(20),
    marginLeft: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrowStyle: {
    width: horizontalScale(30),
    height: verticalScale(30),
  },
  backArrowContainer: {
    height: verticalScale(30),
    justifyContent: 'center',
  },
  rightIconContainer: {
    height: verticalScale(30),
    justifyContent: 'center',
  },
})

export default styles
