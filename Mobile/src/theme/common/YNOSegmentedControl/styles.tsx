import { StyleSheet } from 'react-native'
import {
  FontFamily,
  Colors,
  moderateScale,
  FontSize,
  verticalScale,
} from '../../constants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 18,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  segmentViewContainer: {
    flexDirection: 'column',
    marginLeft: 22,
    flex: 1,
    justifyContent: 'center',
  },
  yesNoButtonEnable: {
    borderRadius: 0,
    borderWidth: 2,
    borderColor: Colors.testColorBlue,
    backgroundColor: Colors.backgroundSelected,
    minWidth: 64,
    minHeight: 34,
    borderRightWidth: 2,
  },
  yesNoButtonDisable: {
    borderRadius: 0,
    borderWidth: 2,
    borderColor: Colors.borderColor,
    backgroundColor: Colors.white,
    minWidth: 64,
    minHeight: 34,
    borderRightWidth: 2,
  },
  titleLeftText: {
    fontSize: FontSize.tiny,
    color: Colors.textDullColor,
    fontFamily: FontFamily.FiraSansRegular,
    fontWeight: '400',
    width: '53%',
  },
  titleAboveText: {
    fontSize: FontSize.tiny,
    color: Colors.textDullColor,
    fontFamily: FontFamily.FiraSansRegular,
    fontWeight: '400',
    width: '100%',
  },
  aboveYNOText: {
    fontSize: FontSize.tinyx,
    fontStyle: 'normal',
    marginBottom: verticalScale(2),
    fontFamily: FontFamily.FiraSansRegular,
    fontWeight: '500',
    color: Colors.grayTint1,
  },
})
