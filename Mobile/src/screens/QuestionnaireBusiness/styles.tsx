import { StyleSheet, Dimensions } from 'react-native'

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
  safeAreaViewStyle: {
    backgroundColor: Colors.backgroundFooterColor,
    flex: 1,
  },
  tabIndicatorStyle: { backgroundColor: Colors.blueShade1 },
  tarBarStyle: { backgroundColor: Colors.white },

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
  vehicleDecContainer: { flexDirection: 'row' },
  vehicleDec: { width: '80%' },
  stylesContainerText: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    fontWeight: '300',
    color: Colors.black,
    fontSize: moderateScale(14),
    marginTop: verticalScale(5),
  },
})

export default styles
