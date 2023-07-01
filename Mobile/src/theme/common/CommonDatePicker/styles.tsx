import { StyleSheet } from 'react-native'
import {
  Colors,
  moderateScale,
  horizontalScale,
  verticalScale,
  FontFamily,
  Thickness,
  FontSize,
  Color,
  Spacing,
} from '../../constants'
import { FontWeight } from '../../constants'

const styles = StyleSheet.create({
  datePickerContainer: {
    marginHorizontal: horizontalScale(16),
  },
  datePickerTitle: {
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.textDullColor,
    marginBottom: verticalScale(4),
    fontSize: moderateScale(14),
    fontWeight: FontWeight.normal,
  },
  datePickerBoxView: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(10),
    width: '49%',
    borderWidth: 1,
    borderColor: Colors.grayTint1,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datePickerErrorBoxView: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(10),
    width: '49%',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: Colors.error,
    borderWidth: Thickness.small2,
    backgroundColor: Colors.errorLight,
  },
  error: {
    color: Color.error,
    fontSize: FontSize.tiny,
    paddingTop: Spacing.small2,
  },
  datePickerPlaceHolderText: {
    fontFamily: FontFamily.FiraSansRegular,
    color: Colors.textColor,
    fontSize: moderateScale(16),
    fontWeight: FontWeight.light,
  },
  datePickerIcon: {
    justifyContent: 'flex-end',
    width: horizontalScale(20),
    height: verticalScale(20),
  },
  clearContainer: {
    left: '30%',
    justifyContent: 'center',
  },
  clearImage: {
    width: 15,
    height: 15,
  },
})
export default styles
