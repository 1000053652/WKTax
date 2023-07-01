import { StyleSheet } from 'react-native'
import {
  Colors,
  FontFamily,
  MetricsSizes,
  FontSize,
  moderateScale,
} from '../../../src/theme/constants'
const styles = StyleSheet.create({
  contactSafeAreaView: {
    backgroundColor: Colors.white,
    flex: 1,
  },

  headingLabelView: {
    fontFamily: FontFamily.FiraSansExtraBoldItalic,
    fontSize: FontSize.tiny,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  headingLabel: {
    fontFamily: FontFamily.FiraSansRegular,
    fontSize: FontSize.regular,
    paddingVertical: MetricsSizes.small,
    color: Colors.textColor,
  },
  initialsText: {
    fontSize: 16,
    color: '#000',
  },
  contactLogoImageStyle: {
    width: moderateScale(100),
    height: moderateScale(100),
  },

  nameStyle: {
    color: Colors.testColorBlue,
    fontFamily: FontFamily.FiraSansBold,
    textAlign: 'center',
    marginTop: MetricsSizes.small,
  },
  initialsCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    borderWidth:2,
    borderColor:'#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  mainRowItemView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: MetricsSizes.regular,
  },
  horizontalLine: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: Colors.lineColorGray,
    height: 1,
  },
  rowItemStyle: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: MetricsSizes.small,
  },
  rowItemStyleMedium: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: MetricsSizes.small,
  },

  rowItemImage: {
    width: MetricsSizes.small,
    height: MetricsSizes.small,
    marginHorizontal: MetricsSizes.tiny,
  },
  rowItemText: {
    fontFamily: FontFamily.FiraSansRegular,
    fontSize: FontSize.tiny,
    color: Colors.textColor,
  },
  subHeadingView: {
    borderRadius: 100,
    borderWidth: 1,
    height: moderateScale(55),
    width: moderateScale(55),
    borderColor: Colors.lineColorGray,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  stylesContainerNameShort: {
    fontSize: FontSize.small,
    alignSelf: 'center',
    color: Colors.textDullColor,
  },
})

export default styles
