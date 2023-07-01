import { StyleSheet } from 'react-native'

import {
  Colors,
  FontFamily,
  MetricsSizes,
  FontSize,
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../../../../../src/theme/constants'

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  dropDownContainer: {
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  datePickerContrainer: {
    marginTop: verticalScale(1),
    marginBottom: verticalScale(1),
    width: '100%',
  },
  saveButton: {
    color: Colors.blueText,
    marginRight: horizontalScale(10),
    fontSize: moderateScale(16),
    fontWeight: '400',
  },
  cancelButton: {
    color: Colors.blueText,
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '400',
  },
  emptyView: {
    height: verticalScale(15),
    backgroundColor: Colors.white,
  },
})
export default styles
