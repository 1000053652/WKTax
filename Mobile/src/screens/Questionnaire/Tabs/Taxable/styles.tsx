import { StyleSheet } from 'react-native'

import { Colors } from '../../../../theme/constants'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    flex: 1,
  },
  subContainer: {
    marginRight: 20,
  },
  leftView: {
    width: '75%',
  },
  leftText: {
    fontSize: 14,
  },
  yesButton: {
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: Colors.grayBorder,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 40,
  },
  rightViewContainer: {
    right: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  arrowImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  completedText: {
    color: Colors.success,
    textAlign: 'left',
  },
  doneButtonContainer: {
    borderRadius: 2,
    borderWidth: 0.5,
    width: '46%',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.grayBorder,
  },

  doneButton: {},
  finishLaterButtonContainer: {
    borderRadius: 2,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    marginLeft: 10,
    borderColor: Colors.grayBorder,
  },

  finishLaterButton: {},
  footer: {
    flexDirection: 'row',
    height: 50,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 15,
  },
})

export default styles
