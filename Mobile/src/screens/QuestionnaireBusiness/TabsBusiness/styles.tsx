import { StyleSheet, Dimensions } from 'react-native'

import {
  Colors,
  FontSize,
  moderateScale,
} from '../../../theme/constants'

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  boxItemWhite: {
    width: '45%',
    height: 69,
    borderColor: Colors.grayBorder,
    borderWidth: 1,
    marginVertical: 7,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.white,
  },
  boxItemGray: {
    width: '45%',
    height: 69,
    borderColor: Colors.grayBorder,
    borderWidth: 1,
    marginVertical: 7,
    marginHorizontal: 10,
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
    width: 20,
    height: 20,
    marginHorizontal: 3,
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
})

export default styles
