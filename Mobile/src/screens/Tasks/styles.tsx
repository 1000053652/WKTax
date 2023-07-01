import { StyleSheet } from 'react-native'
import {
  Colors,
  FontFamily,
  MetricsSizes,
  FontSize,
  horizontalScale,
  verticalScale,
  FontWeight,
} from '../../theme/constants'

const styles = StyleSheet.create({
  homeSafeAreaView: {
    backgroundColor: Colors.white,
    width: '100%',
    flex: 1,
  },

  headerStyle: {
    flexDirection: 'row',
    marginHorizontal: MetricsSizes.tiny,
    height: MetricsSizes.regular + MetricsSizes.small,
  },
  buttonUploadContactStyle: {
    width: '50%',
    alignSelf: 'center',
  },

  headerRowStyle: {},
  logoStyle: {
    width: horizontalScale(30),
    height: verticalScale(30),
  },
  titleView: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: Colors.borderDullColor,
    borderBottomColor: Colors.borderDullColor,
    padding: horizontalScale(10),
  },
  textTitle: {
    fontSize: FontSize.tiny,
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: FontFamily.FiraSansRegular,
    textTransform: 'capitalize',
  },
  myTaskText: {
    fontFamily: FontFamily.FiraSansRegular,
    fontSize: FontSize.small,
    fontWeight: FontWeight.normal,
    marginLeft: horizontalScale(15),
    marginTop: verticalScale(12),
    marginBottom: verticalScale(4),
  },
  mainView: {
    borderColor: Colors.borderColor,
    borderWidth: 1,
    flexDirection: 'row',
    paddingVertical: verticalScale(12),
    width: '100%',
    marginTop: verticalScale(8),
  },
  boxTitle: {
    color: '#009881',
    fontWeight: '400',
    fontFamily: FontFamily.FiraSansRegular,
    marginBottom: 5,
    fontSize: FontSize.small,
  },
  boxSubTitle: {
    fontFamily: FontFamily.FiraSansItalic,
    fontWeight: FontWeight.normal,
    fontSize: FontSize.tinyx,
    marginBottom: verticalScale(5),
    color: Colors.grayTint1,
  },
  boxReviewSignSubTitle: {
    fontFamily: FontFamily.FiraSansRegular,
    fontWeight: FontWeight.normal,
    fontSize: FontSize.tinyx,
    marginBottom: verticalScale(5),
    color: Colors.grayTint1,
  },
  boxReviewSignClientType: {
    fontFamily: FontFamily.FiraSansMedium,
    fontWeight: FontWeight.medium,
    fontSize: FontSize.tinyx,
    color: Colors.textColor,
    lineHeight: verticalScale(14),
  },
  boxReviewSignClientTypeStatus: {
    fontFamily: FontFamily.FiraSansMedium,
    fontWeight: FontWeight.medium,
    fontSize: FontSize.tinyx,
    lineHeight: verticalScale(16),
    textTransform: 'uppercase',
  },
  completedCountText: {
    fontFamily: FontFamily.FiraSansItalic,
    fontSize: FontSize.tinyx,
    fontWeight: FontWeight.normal,
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    paddingHorizontal: horizontalScale(7),
  },
  textBackground: {
    backgroundColor: '#EDEDED',
    padding: 10,
  },
  taskIcon: {
    width: horizontalScale(24),
    height: verticalScale(24),
  },
  rightArrowIcon: {
    width: horizontalScale(18),
    height: verticalScale(18),
  },
  taskItemCenterView: {
    width: '71.4%',
  },
  iconsView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '13.6%',
  },
  rightIconsView: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '15.2%',
    height: verticalScale(24),
  },
  accountSubText: {
    fontFamily: FontFamily.FiraSansRegular,
    fontSize: FontSize.tiny,
    fontWeight: '300',
    color: '#353535',
  },
  progressBar: {
    height: verticalScale(17),
    borderColor: Colors.lightGray,
    borderWidth: 1,
    backgroundColor: Colors.backgroundFooterColor,
    width: '100%',
  },
  backArrowStyle: {
    width: horizontalScale(30),
    height: verticalScale(30),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  logoStyleCenterMain: {
    width: '100%',
    height: verticalScale(30),
  },
  animatedView: {
    backgroundColor: Colors.darkGray,
    height: verticalScale(17),
    width: '100%',
  },
  rightIconContainer: {
    height: verticalScale(30),
    justifyContent: 'center',
  },
})

export default styles
