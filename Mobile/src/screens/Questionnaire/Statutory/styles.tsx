import { StyleSheet } from 'react-native'

import {
  Colors,
  FontFamily,
  MetricsSizes,
  FontSize,
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../../theme/constants'

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  grayView: {
    backgroundColor: Colors.backgroundFooterColor,
  },
  incomeMainViewWhite: {
    backgroundColor: Colors.white,
    marginTop: verticalScale(8),
  },
  headerViewStyle: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
  },
  headerViewStyleRow: {
    flex: 1,
    width: '100%',
  },
  buttonCancelSaveTextStyle: {
    color: Colors.testColorBlue,
    fontSize: FontSize.small,
  },
  buttonCancelSaveTextStyleChange: {
    color: Colors.black,
    fontSize: FontSize.tiny,
  },
  buttonCancelSaveTextStyleRight: {
    color: Colors.testColorBlue,
    textAlign: 'right',
    fontSize: FontSize.small,
  },
  buttonCancelSaveStyle: {
    height: verticalScale(40),
    backgroundColor: Colors.white,
    marginHorizontal: 0,
    marginVertical: 0,
    minHeight: 0,
    minWidth: 0,
    width: '100%',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: horizontalScale(10),
  },
  buttonCenterSaveStyle: {
    height: verticalScale(40),
    backgroundColor: Colors.white,
    marginHorizontal: 0,
    marginVertical: 0,
    minHeight: 0,
    minWidth: 0,
    width: horizontalScale(180),
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  buttonCancelSaveStyle2: {
    height: verticalScale(40),
    backgroundColor: Colors.white,
    marginHorizontal: 0,
    marginVertical: 0,
    minHeight: 0,
    minWidth: 0,
    width: horizontalScale(140),
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: horizontalScale(10),
  },
  buttonCancelSaveStyleRight: {
    height: verticalScale(40),
    backgroundColor: Colors.white,
    marginHorizontal: 0,
    marginVertical: 0,
    minHeight: 0,
    minWidth: 0,
    width: '50%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: horizontalScale(10),
  },
  leftView: {
    width: '65%',
  },

  leftText: {
    width: horizontalScale(140),
    fontSize: moderateScale(14),
    textAlign: 'left',
  },
  textStyleOther: {
    color: Colors.blueShadeColor,
    fontSize: FontSize.tiny,
    fontWeight: '500',
    width: horizontalScale(180),
  },
  textStyleOtherFirst: {
    color: Colors.blueShadeColor,
    fontSize: FontSize.tiny,
    fontWeight: '500',
    paddingHorizontal: horizontalScale(5),
    marginHorizontal: horizontalScale(10),
  },
  dependentItem: {
    fontSize: moderateScale(17),
    fontStyle: 'normal',
    marginLeft: horizontalScale(16),
    marginVertical: verticalScale(8),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
    width: '90%',
  },
  dependentItemDetails: {
    fontSize: moderateScale(17),
    fontStyle: 'normal',
    marginLeft: horizontalScale(16),
    marginVertical: verticalScale(3),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.gray,
    width: '90%',
  },
  dependentItemDetailsRight: {
    fontSize: moderateScale(17),
    fontStyle: 'normal',
    marginLeft: horizontalScale(16),
    marginVertical: verticalScale(3),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.gray,
    width: '80%',
    textAlign: 'right',
  },
  img: {
    width: horizontalScale(10),
    height: verticalScale(15),
    right: horizontalScale(5),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  item: {
    backgroundColor: Colors.white,
    height: verticalScale(44),
    marginStart: horizontalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
  },

  horizontalLine2: {
    width: '97%',
    alignSelf: 'center',
    backgroundColor: Colors.lineColorGray,
    height: 1,
    marginTop: verticalScale(2),
  },

  dependentItemDetails2: {
    color: Colors.testColorBlue,
    width: '55%',
    marginHorizontal: horizontalScale(10),
    textAlign: 'right',
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: horizontalScale(10),
  },
  stylesSwipeViewStyle: {
    fontSize: FontSize.tiny,
    backgroundColor: Colors.swipeBackgroundTextColor,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: horizontalScale(100),
    alignContent: 'center',
    height: verticalScale(83),
  },
  stylesSwipeTextStyle: {
    color: Colors.white,
  },
  flatListItemLeft: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '50%',
  },
  flatListItemRight: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '50%',
  },
  dependentItem2: {
    fontSize: moderateScale(17),
    fontStyle: 'normal',
    marginHorizontal: horizontalScale(16),
    marginVertical: verticalScale(8),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.testColorBlue,
    width: '85%',
  },
  swipeListViewStyle: {
    height: verticalScale(250),
  },
  horizontalLine: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.lineColorGray,
    height: 1,
  },
  leftSlotViewStyle: {
    width: '35%',
  },

  centerSlotViewStyle: {
    width: horizontalScale(150),
  },

  centerSlotViewStyle1: {
    width: '30%',
    marginLeft: horizontalScale(5),
  },
  rightSlotViewStyle: {
    width: horizontalScale(280),
    marginRight: horizontalScale(140),
    paddingRight: horizontalScale(150),
  },
  stylesContainerText: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontWeight: '300',
    fontSize: FontSize.tinyx,
    marginTop: verticalScale(-5),
    height: verticalScale(25),
  },
  stylesContainerTextMain: {
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignSelf: 'flex-start',
    fontWeight: '400',
    fontSize: moderateScale(11),
    marginTop: verticalScale(-10),
    height: verticalScale(25),
    paddingHorizontal: horizontalScale(15),
  },
  scrollViewStyle: {
    marginBottom: verticalScale(45),
  },
  yesButton: {
    width: horizontalScale(65),
    height: verticalScale(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  leftText1: {
    fontSize: moderateScale(14),
    textAlign: 'left',
    width: horizontalScale(220),
  },

  textStyle: {
    fontSize: moderateScale(14),
  },
  rightViewContainer: {
    flexDirection: 'row',
    right: horizontalScale(30),
  },
})

export default styles
