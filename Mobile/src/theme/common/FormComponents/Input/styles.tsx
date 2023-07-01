import { StyleSheet } from 'react-native'
import { constants } from 'src/styles/global'

const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    right: constants.unit * 6,
    top: constants.unit * 8,
  },
  check: {
    position: 'absolute',
    right: constants.unit * 6,
    top: constants.unit * 7,
  },
  container: {
    marginBottom: constants.unit,
  },
})

export default styles
