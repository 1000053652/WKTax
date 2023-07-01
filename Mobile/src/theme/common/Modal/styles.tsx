import { StyleSheet } from 'react-native'
import { Colors, FontFamily, MetricsSizes } from '../../constants'

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flex: 1,
    backgroundColor: '#35353580',
  },
  mainView: {
    width: '90%',
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: MetricsSizes.regular,
    borderRadius: MetricsSizes.tiny,
  },
  horizontalLine: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: Colors.lineColorGray,
    height: 1,
  },
  titleStyle: {
    fontFamily: FontFamily.FiraSansLight,
    paddingVertical: MetricsSizes.tiny + 5,
  },
  descStyle: {
    fontFamily: FontFamily.FiraSansLight,
    paddingVertical: MetricsSizes.tiny + 5,
    color: Colors.testColorBlue,
  },
  buttonCancelContactStyle: {
    backgroundColor: Colors.white,
  },

  buttonCancelContactText: {
    color: Colors.textColorRed,
    fontFamily: FontFamily.FiraSansLight,
  },
})

export default styles
