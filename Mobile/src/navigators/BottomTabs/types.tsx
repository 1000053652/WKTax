import { ImageSourcePropType } from 'react-native'
export type BottomTabData = {
  name: string
  screen: any
  selectedIcon: ImageSourcePropType
  unSelectedIcon: ImageSourcePropType
  imageStyle: {}
  textSelectedStyle: {}
  textUnSelectedStyle: {}
  selectedTestId: string
  unSelectedTestId: string
}
