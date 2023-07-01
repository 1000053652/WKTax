import { StyleSheet, Dimensions } from 'react-native'

import {
  Colors,
  FontFamily,
  MetricsSizes,
  FontSize,
  moderateScale,
  horizontalScale,
} from '../../../theme/constants'

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    flex: 1,
  },
  subContainer: {
    marginRight: 20,
  },
  boxItemWhite: {
    width: '45%',
    height: moderateScale(69),
    borderColor: Colors.grayBorder,
    borderWidth: 1,
    marginVertical: moderateScale(7),
    marginHorizontal: moderateScale(10),
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.white,
  },
  boxItemGray: {
    width: '45%',
    height: moderateScale(69),
    borderColor: Colors.grayBorder,
    borderWidth: 1,
    marginVertical: moderateScale(7),
    marginHorizontal: moderateScale(10),
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.backgroundFooterColor,
  },
  item: {
    flexDirection: 'row',
    marginLeft: moderateScale(10),
  },
  img: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginHorizontal: moderateScale(3),
  },
  stylesContainerText: {
    width: moderateScale(150),
    fontSize: FontSize.small,
  },
  stylesContainerTextStatus: {
    width: moderateScale(150),
    fontSize: FontSize.tinyx,
    color: Colors.statusColor,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  horizontalLine: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.lineColorGray,
    height: 1,
    marginVertical: moderateScale(7),
  },
  stylestextAditional: {
    width: '95%',
    marginHorizontal: moderateScale(10),
    color: Colors.grayTint1,
    marginVertical: moderateScale(10),
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

  finishLaterButtonContainer: {
    borderRadius: 2,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    marginLeft: 10,
    borderColor: Colors.grayBorder,
  },
  footer: {
    flexDirection: 'row',
    height: 50,
  },
  header: {
    margin: 15,
    fontWeight: 'bold',
  },
})

export default styles
