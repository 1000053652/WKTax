import { StyleSheet } from 'react-native'
import { colors } from '../../../styles/global'
import { FontFamily, MetricsSizes, FontSize } from '../../constants'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.linkBlue,
    borderRadius: MetricsSizes.tiny / 2,
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: MetricsSizes.tiny,
    marginVertical: MetricsSizes.tiny,
    minHeight: MetricsSizes.regular,
    minWidth: MetricsSizes.regular + MetricsSizes.large * 2,
  },
  text: {
    color: colors.white,
    fontSize: FontSize.tiny,
    fontFamily: FontFamily.FiraSansRegular,
  },
})

export default styles
