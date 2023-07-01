import { Platform, StatusBar, StyleSheet } from 'react-native'

import {
  Colors,
  FontFamily,
  MetricsSizes,
  FontSize,
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../theme/constants'

const styles = StyleSheet.create({
  menuSafeAreaView: { 
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  headingView: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(12),
    paddingTop: verticalScale(31),
    paddingBottom: verticalScale(15)
  },
  subHeadingView: {
    borderRadius: 24,
    borderWidth: 1,
    height: verticalScale(48),
    width: horizontalScale(48),
    borderColor: Colors.lineColorGray,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  stylesContainerText: {
    fontSize: FontSize.small,
    color: Colors.textDullColor,
  },
  stylesContainerName: {
    fontSize: FontSize.small,
    fontFamily: FontFamily.FiraSansBold,
    color: Colors.textDullColor,
    width: horizontalScale(175),
  },

  stylesContainerNameShort: {
    fontSize: FontSize.small,
    alignSelf: 'center',
    color: Colors.textDullColor,
  },
  styleNameEmail: {
    marginLeft: horizontalScale(10),
    marginTop: moderateScale(5),
    color: Colors.textDullColor,
    flexShrink: 1
  },

  stylesContainerEmail: {
    fontSize: FontSize.small,
    color: Colors.textDullColor,
    textTransform: 'lowercase'
  },
  menuItem: {
    margin: moderateScale(12),
  },
  menuItemBottom: {
    margin: moderateScale(12),
    flexDirection: 'row',
  },

  horizontalLine: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.lineColorGray,
    height: 1,
    marginVertical: moderateScale(7),
  },
  emptyStyleVertical: {
    height: moderateScale(5),
  },
  feedbackLogoutStyle: {
    width: moderateScale(15),
    height: moderateScale(15),
    alignSelf: 'center',
    marginHorizontal: moderateScale(3),
  },
})

export default styles
