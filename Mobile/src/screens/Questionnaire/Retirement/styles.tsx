import { StyleSheet } from 'react-native'
import { Colors } from '../../../theme/constants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 5,
  },
  scrollContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  finalContainer: {
    height: 50,
    flexDirection: 'row',
    marginBottom: 2,
  },
  questionText: {
    flex: 1,
    margin: 20,
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  doneButton: {
    backgroundColor: Colors.testColorBlue,
    width: '50%',
    justifyContent: 'center',
    borderColor: 'grey',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  elementStyle: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#EEEEEE',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
})
