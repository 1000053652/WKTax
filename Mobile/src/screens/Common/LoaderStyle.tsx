import { Colors } from '../../../src/theme/constants'
import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: Colors.white,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    opacity: 0.5,
  },
})

export default styles
