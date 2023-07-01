import { StyleSheet } from 'react-native'

import {
  Colors,
  FontFamily,
  MetricsSizes,
  FontSize,
  moderateScale,
  FontWeight,
} from '../../../theme/constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stylesContainerName: {
    color: Colors.blueShade1,
    fontSize: FontSize.smallx,
    fontWeight: '500',
  },
  stylesContainerDesc: {
    fontSize: FontSize.small,
    color: Colors.textDullColor,
    marginHorizontal: 20,
    width: moderateScale(340),
  },
  stylesFirmKey: {
    fontSize: FontSize.small,
    color: Colors.textDullColor,
    width: moderateScale(324),
  },
  stylesAccountingText: {
    fontSize: FontSize.tiny,
    color: Colors.textDullColor,
    width: moderateScale(340),
  },
  stylesSwipeViewStyle: {
    fontSize: FontSize.tiny,
    height: moderateScale(35),
    backgroundColor: Colors.swipeBackgroundTextColor,
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: moderateScale(100),
    alignContent: 'center',
  },
  stylesSwipeTextStyle: {
    color: Colors.white,
  },
  stylesAccountingText2: {
    fontSize: FontSize.tiny,
    color: Colors.textDullColor,
    width: moderateScale(340),
  },

  inputBoxStyles: {
    borderRadius: 0,
  },
  BoxStyles: {
    borderRadius: 0,
    width: moderateScale(340),
  },
  stylesTextInstrcution: {
    fontSize: FontSize.tinyx,
    textAlign: 'left',
    color: Colors.grayTint1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: FontFamily.FiraSansRegular,
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    width: moderateScale(340),
  },
  empltyView: {
    height: moderateScale(20),
  },
  reqitem: {
    fontSize: moderateScale(17),
    fontStyle: 'normal',
    marginHorizontal: moderateScale(16),
    marginVertical: moderateScale(8),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.blueShade1,
  },
  reqitem2: {
    fontSize: moderateScale(17),
    fontStyle: 'normal',
    marginHorizontal: moderateScale(16),
    marginVertical: moderateScale(8),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.black,
    alignContent: 'flex-start',
    width: '80%',
  },
  buttonContinueStyle: {
    width: moderateScale(341),
    alignSelf: 'center',
    borderRadius: 0,
    marginTop: MetricsSizes.regular,
    height: moderateScale(44),
  },
  homeSafeAreaView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  toolbar: {
    flex: 1,
    alignContent: 'space-between',
    backgroundColor: Colors.white,
  },
  headerViewStyle: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
  },
  headerViewStyleRow: {
    flex: 1,
    width: '100%',
  },
  horizontalLine: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.lineColorGray,
    height: 1,
    marginTop: moderateScale(2),
  },
  horizontalLine2: {
    width: '97%',
    alignSelf: 'center',
    backgroundColor: Colors.lineColorGray,
    height: 1,
    marginTop: moderateScale(2),
  },
  buttonCancelSaveStyle: {
    height: moderateScale(40),
    backgroundColor: Colors.white,
    marginHorizontal: 0,
    marginVertical: 0,
    minHeight: 0,
    minWidth: 0,
    width: '100%',
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
  buttonCancelSaveTextStyle: {
    color: Colors.testColorBlue,
  },
  buttonCancelSaveTextStyleChange: {
    color: Colors.black,
  },
  buttonCancelSaveTextStyleRight: {
    color: Colors.testColorBlue,
    textAlign: 'right',
  },
  item: {
    backgroundColor: Colors.white,
    height: moderateScale(40),
    marginStart: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageViewStyle: {
    flex: 1,
    marginTop: moderateScale(20),
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },
  containerKey: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },
  containerFirmList: {
    flex: 1,
    marginTop: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    alignContent: 'flex-start',
  },

  containerFirmList2: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
    alignContent: 'flex-start',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    alignContent: 'center',
  },
  bg: {
    flex: 1,
    justifyContent: 'center',
  },
  welcomeStyle: {
    color: Colors.blueShade1,
    fontSize: FontSize.smallx,
    fontStyle: 'normal',
    paddingTop: 30,
  },
  txt: {
    fontSize: FontSize.small,
    fontStyle: 'normal',
    paddingTop: 30,
    textAlign: 'left',
  },
  subtxt: {
    fontSize: FontSize.small,
    fontStyle: 'normal',
    paddingTop: moderateScale(27.97),
    paddingLeft: moderateScale(15),
    textAlign: 'left',
  },
  titleFirmList: {
    fontSize: FontSize.tiny,
    fontStyle: 'normal',
    width: 324,
    textAlign: 'left',
    paddingStart: 15,
    paddingBottom: 10,
  },

  image: {
    width: moderateScale(130),
    height: moderateScale(130),
    marginVertical: moderateScale(30),
  },
  img: {
    width: 8,
    height: 14,
    right: 0,
    margin: 10,
    alignContent: 'flex-end',
  },
  textInputContainer: {
    borderColor: Colors.grayLight,
    borderRadius: 6,
    borderWidth: 1,
    flexDirection: 'row',
    height: 50,
    width: MetricsSizes.textInpWidth,
    paddingHorizontal: 20,
    paddingStart: 5,
    alignItems: 'center',
  },
  backArrowStyle: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  backArrowTouchableStyle: {
    marginLeft: moderateScale(5),
    marginTop: moderateScale(8),
  },

  rowFront: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    flex: 1,
    width:"100%",
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  welComeText: {
    color: Colors.blueText,
    fontWeight: '500',
    fontSize: 18,
  },
  removeButtonTitle: {
    color: Colors.textColorRed,
    fontWeight: FontWeight.normal,
  },
  cancelButtonTitle: {
    color: Colors.systemBlue,
    fontWeight: FontWeight.heavy,
  },
})

export default styles
