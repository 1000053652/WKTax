import { StatusBar, StyleSheet } from 'react-native'

import { Colors, moderateScale } from '../../../theme/constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#ecf0f1',
    padding: 8,
    justifyContent: 'center',
  },
  containermain: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    alignContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  headerViewStyle: {
    flexDirection: 'row',

    backgroundColor: '#ffffff',
  },
  headerViewStyleRow: {
    flex: 1,
    width: '100%',
  },
  horizontalLine: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.lineColorGray,
    height: 1,
    marginTop: moderateScale(2),
  },
  backArrowStyle: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  backArrowTouchableStyle: {
    marginLeft: moderateScale(5),
    margin: moderateScale(8),
  },
})

export default styles
