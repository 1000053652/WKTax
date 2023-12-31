import { StyleSheet } from 'react-native'
import {
  Color,
  Colors,
  FontFamily,
  FontSize,
  FontWeight,
  horizontalScale,
  moderateScale,
  Spacing,
  verticalScale,
} from '../../../theme/constants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.textDullColor,
    marginBottom: verticalScale(4),
    fontSize: moderateScale(14),
    fontWeight: FontWeight.normal,
    lineHeight: moderateScale(18),
    marginHorizontal: 16,
  },
  error: {
    color: Color.error,
    fontSize: FontSize.tiny,
    paddingTop: Spacing.small2,
    marginHorizontal: horizontalScale(16),
  },
  dropdownStyles: {
    width: '95%',
    marginTop: 10,
    borderWidth: 0.5,
    marginLeft: 5,
    borderColor: Colors.borderColor,
  },
  boxStyles: {
    borderRadius: 0,
    borderWidth: 0.5,
    width: '92%',
    height: 50,
    marginLeft: 10,
    borderColor: Colors.borderColor,
  },
  dropdownViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.grayTint1,
    borderWidth: 1,
    height: verticalScale(44),
    marginHorizontal: horizontalScale(16),
  },
  dropdownViewErrorStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.error,
    borderWidth: 1,
    height: verticalScale(44),
    backgroundColor: Colors.errorLight,
    marginHorizontal: horizontalScale(16),
  },
  placeholderStyle: {
    fontSize: FontSize.tiny,
    fontFamily: FontFamily.FiraSansRegular,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'left',
    marginLeft: 10,
  },
  selectedTextStyle: {
    fontSize: FontSize.tiny,
    fontFamily: FontFamily.FiraSansRegular,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'left',
    marginLeft: 8,
  },
  iconStyle: {
    width: horizontalScale(20),
    height: verticalScale(20),
    marginHorizontal: horizontalScale(16),
  },
  itemContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'left',
  },
})
