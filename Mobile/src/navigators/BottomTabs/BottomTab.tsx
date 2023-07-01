import React from 'react'
import { Image, ImageSourcePropType } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Text from '../../theme/common/Text'
import { BottomTabData } from './types'
import { useTranslation } from 'react-i18next'

const Tab = createBottomTabNavigator()

export const BottomTab = (item: BottomTabData) => {
  const { t } = useTranslation()
  return (
    <Tab.Screen
      name={t(item.name)}
      component={item.screen}
      options={{
        tabBarLabelPosition: 'below-icon',
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              resizeMode={'contain'}
              source={focused ? item.selectedIcon : item.unSelectedIcon}
              style={item.imageStyle}
            />
          )
        },
        tabBarLabel: ({ focused }) => {
          return (
            <Text
              children={t(item.name).toString()}
              testID={focused ? item.selectedTestId : item.unSelectedTestId}
              stylesContainerText={
                focused ? item.textSelectedStyle : item.textUnSelectedStyle
              }
            />
          )
        },
      }}
    />
  )
}
