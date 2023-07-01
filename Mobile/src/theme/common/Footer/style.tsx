import { StyleSheet } from 'react-native'
import {
  Colors,
  FontFamily,
  MetricsSizes,
  FontSize,
  moderateScale,
} from '../../../theme/constants'
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: moderateScale(45),
    paddingHorizontal: 20,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundFooterColor,
  },

  img: {
    width: moderateScale(24),
    height: moderateScale(24),
    marginHorizontal: moderateScale(10),
  },
  brandName: {
    color: Colors.textDullColor,
    fontSize: FontSize.smallx,
    fontWeight: '400',
  },
  poweredStyle: {
    color: Colors.textDullColor,
    fontSize: FontSize.tinyx,
    fontStyle: 'normal',
  },
})

export default styles
