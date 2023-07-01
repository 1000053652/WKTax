import { StyleSheet, Dimensions } from 'react-native'

import {
  Colors,
  FontFamily,
  FontSize,
  horizontalScale,
  MetricsSizes,
  moderateScale,
  verticalScale,
} from '../../theme/constants'

const styles = StyleSheet.create({
  containers: {
    flex: 1,
  },
  item: {
    backgroundColor: Colors.white,
    height: moderateScale(150),
    marginStart: moderateScale(5),
  },

  horizontalLine2: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.lineColorGray,
    height: 1,
    marginTop: moderateScale(2),
  },
  horizontalLine: {
    margin: moderateScale(10),
    marginVertical: moderateScale(15),
  },
  headerStyle: {
    flexDirection: 'row',
    height: MetricsSizes.regular + 2,
    backgroundColor: Colors.white,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backArrowStyle: {
    width: horizontalScale(25),
    height: verticalScale(25),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: horizontalScale(-10),
  },
  dependentItem: {
    fontSize: moderateScale(16),
    fontStyle: 'normal',
    marginLeft: moderateScale(16),
    marginVertical: moderateScale(8),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
    width: '30%',
  },
  dependentTitleItem: {
    fontSize: moderateScale(12),
    fontStyle: 'normal',
    marginLeft: moderateScale(16),
    marginVertical: moderateScale(10),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
    width: '60%',
  },
  sectionText: {
    fontSize: moderateScale(14),
    fontStyle: 'normal',
    marginLeft: moderateScale(16),
    marginVertical: moderateScale(10),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
    width: '60%',
    backgroundColor: Colors.white,
    fontWeight:'500'
  },
  uploaderText: {
    fontSize: moderateScale(14),
    fontStyle: 'normal',
    marginLeft: moderateScale(8),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
    width: '80%',
  },
  assetsView: {
    marginTop: moderateScale(10),
    backgroundColor: Colors.white,
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
  equipmentView: {
    flexDirection: 'row',
    marginTop: moderateScale(15),
  },

  priceView: {
    flexDirection: 'row',
    marginTop: moderateScale(2),
    marginBottom: moderateScale(10),
  },
  equipmentText: {
    fontSize: moderateScale(16),
    fontStyle: 'normal',
    marginLeft: moderateScale(16),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
    width: '90%',
  },
  purchasesText: {
    fontSize: moderateScale(14),
    fontStyle: 'normal',
    marginLeft: moderateScale(16),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
    width: '50%',
  },
  addTo: {
    fontSize: moderateScale(16),
    fontStyle: 'normal',
    marginLeft: moderateScale(16),
    marginVertical: moderateScale(8),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.testColorBlue,
    width: '60%',
  },
  headerTo: {
    fontSize: moderateScale(14),
    fontStyle: 'normal',
    marginLeft: moderateScale(4),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.testColorBlue,
  },
  assetsText: {
    fontSize: moderateScale(14),
    fontStyle: 'normal',
    marginLeft: moderateScale(4),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
    width: '80%',
  },
  saveText: {
    fontSize: moderateScale(16),
    fontStyle: 'normal',
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.testColorBlue,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  stylesSwipeViewStyle: {
    fontSize: FontSize.tiny,
    height: moderateScale(140),
    backgroundColor: Colors.swipeBackgroundTextColor,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(100),
    alignContent: 'center',
  },
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingLeft: moderateScale(10),
  },
  stylesSwipeTextStyle: {
    color: '#ffffff',
  },
  swipeListViewStyle: {
    maxHeight: Dimensions.get('window').height - moderateScale(390),
  },
  mainViewStyle: {
    backgroundColor: Colors.white,
  },
  datePickerContrainer: {
    marginTop: verticalScale(1),
    marginBottom: verticalScale(1),
    width: '100%',
  },
  containerStyle: {
    width: '50%',
  },
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
  swipeList: {
    height: '100%',
  },
  switchView: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: horizontalScale(10),
    marginTop: verticalScale(10),
  },
  yesNoBack: { backgroundColor: Colors.white },
  doneButtonContainer: {
    borderRadius: 2,
    borderWidth: 0.5,
    width: '46%',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.grayBorder,
  },

  finishLaterButtonContainer: {
    borderRadius: 2,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    marginLeft: 10,
    borderColor: Colors.grayBorder,
  },

  footer: {
    flexDirection: 'row',
    height: 50,
    position: 'absolute',
    bottom: 0,
  },
  textInputView: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingVertical: verticalScale(10),
  },
  sectionView: {
    marginVertical: verticalScale(10),
    backgroundColor: Colors.white,

  },
  sectionFreeView: {
    marginVertical: verticalScale(10),
    paddingVertical: verticalScale(10),
    backgroundColor: Colors.white,
  },
})

export default styles
