import { posix } from 'path'
import { StyleSheet, Dimensions } from 'react-native'

import {
  Colors,
  FontFamily,
  horizontalScale,
  FontSize,
  moderateScale,
  verticalScale,
} from '../../../theme/constants'

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  safeAreaViewStyle2: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  grayView: {
    backgroundColor: Colors.backgroundFooterColor,
  },
  incomeMainViewWhite: {
    backgroundColor: Colors.white,
    marginTop: moderateScale(8),
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
    height: moderateScale(40),
    backgroundColor: Colors.white,
    marginHorizontal: 0,
    marginVertical: 0,
    minHeight: 0,
    minWidth: 0,
    width: horizontalScale(150),
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: moderateScale(10),
  },
  buttonCancelSaveStyle2: {
    height: moderateScale(40),
    backgroundColor: Colors.white,
    marginHorizontal: 0,
    marginVertical: 0,
    minHeight: 0,
    minWidth: 0,
    width: moderateScale(140),
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
  leftView: {
    width: '30%',
  },

  leftText: {
    width: moderateScale(140),
    fontSize: moderateScale(14),
    textAlign: 'left',
  },
  textStyleOther: {
    color: Colors.blueShadeColor,
    fontSize: FontSize.tiny,
    fontWeight: '500',
    width: moderateScale(180),
  },
  textStyleOtherFirst: {
    color: Colors.blueShadeColor,
    fontSize: FontSize.tiny,
    fontWeight: '500',
    paddingHorizontal: moderateScale(5),
    marginHorizontal: moderateScale(10),
  },
  dependentItem: {
    fontSize: moderateScale(16),
    fontStyle: 'normal',
    marginLeft: moderateScale(16),
    marginVertical: moderateScale(8),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
    width: '90%',
    paddingRight: moderateScale(10)
  },
  dependentItemDetails: {
    fontSize: moderateScale(12),
    fontStyle: 'normal',
    marginLeft: moderateScale(16),
    marginVertical: moderateScale(3),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.gray,
    width: '90%',
    textTransform:'uppercase'
  },
  dependentItemDetailsRight: {
    fontSize: moderateScale(12),
    fontStyle: 'normal',

    marginVertical: moderateScale(3),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.gray,
    width: '80%',
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
    height: moderateScale(44),
    flexDirection: 'row',
    alignItems: 'center',
  },

  horizontalLine2: {
    width: '97%',
    alignSelf: 'center',
    backgroundColor: Colors.lineColorGray,
    height: 1,
    marginTop: moderateScale(2),
  },

  dependentItemDetails2: {
    color: Colors.testColorBlue,
    width: '55%',
    marginHorizontal: moderateScale(10),
    textAlign: 'right',
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: moderateScale(10),
    height: moderateScale(44),
  },
  stylesSwipeViewStyle: {
    fontSize: FontSize.tiny,
    backgroundColor: Colors.swipeBackgroundTextColor,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(100),
    alignContent: 'center',
    height: '100%',
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
    right: horizontalScale(30)
  },
  dependentItem2: {
    fontSize: moderateScale(17),
    fontStyle: 'normal',
    marginHorizontal: moderateScale(16),
    marginVertical: moderateScale(8),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.testColorBlue,
    width: '85%',
  },
  swipeListViewStyle: {
    height: moderateScale(250),
  },
  horizontalLine: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.lineColorGray,
    height: 1,
  },
  leftSlotViewStyle: {
    width: moderateScale(120),
  },
  centerSlotViewStyle: {
    width: moderateScale(160),
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  centerSlotViewStyleHeading: {
    width: moderateScale(110),
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  rightSlotViewStyle: {
    width: moderateScale(280),
    marginRight: moderateScale(140),
    paddingRight: moderateScale(150),
  },
  viewIconOther: {
    width: 150,
    alignSelf: 'flex-start',
  },
  stylesContainerText: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontWeight: '300',
    fontSize: FontSize.tinyx,
    marginTop: moderateScale(-10),
    height: moderateScale(25),
  },
  scrollViewStyle: {
    marginBottom: moderateScale(45),
  },
  empty50: {
    height: verticalScale(50),
  },

  renderItemBackground: { backgroundColor: Colors.white,    paddingRight: horizontalScale(10) },
})

export default styles
