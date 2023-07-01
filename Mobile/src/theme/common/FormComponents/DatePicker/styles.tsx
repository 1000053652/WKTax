import { StyleSheet } from 'react-native'
import { constants, colors } from 'src/styles/global'

const styles = StyleSheet.create({
  dateContainer: {
    paddingTop: constants.unit,
    paddingHorizontal: 3 * constants.unit,
  },
  datePicker: {
    height: 40,
    width: '100%',
  },
  dateInput: {
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderColor: constants.inputColor,
    alignItems: 'flex-start',
  },
  dateText: {
    fontSize: constants.fontMediumLarge,
    color: constants.inputColor,
  },
  placeholderText: {
    fontSize: constants.fontMediumLarge,
    color: colors.grayMedium,
  },
  calendarIcon: {
    borderBottomWidth: 1,
    borderColor: constants.inputColor,
    paddingBottom: 8,
    paddingTop: 6,
  },
})

export default styles
