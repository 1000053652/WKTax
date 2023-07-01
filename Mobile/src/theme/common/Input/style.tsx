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
    alignSelf: 'stretch',
    display: 'flex',
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(7),
  },
  label: {
    color: Colors.grayDark,
    fontSize: FontSize.tiny,
    fontFamily: FontFamily.FiraSansRegular,
  },

  testIconView: {
    borderColor: Colors.grayLight,
    borderRadius: 0,
    borderWidth: moderateScale(1),
    flexDirection: 'row',
    height: moderateScale(45),
    alignItems: 'center',
  },
  textInputContainer: {
    borderColor: Colors.grayLight,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(15),
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.textColor,
  },
  errorTextInputContainer: {
    borderColor: Colors.errorColor,
    flexDirection: 'row',
    paddingHorizontal: moderateScale(15),
    borderRadius: 0,
    borderWidth: moderateScale(1),
    color: Colors.textColor,
  },

  icon: {
    alignSelf: 'center',
  },
  error: {
    color: Colors.error,
    paddingTop: moderateScale(4),
    fontFamily: FontFamily.FiraSansRegular,
    fontSize: FontSize.tinyx,
    textAlign: 'left',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
})

export default styles
