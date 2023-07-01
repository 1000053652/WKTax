import React, { useCallback, useEffect, useRef } from 'react'
import { InteractionManager, SafeAreaView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from '../hooks'
import { useFlipper } from '@react-navigation/devtools'
import { ApplicationStackParamList } from '../../@types/navigation'
import { useSelector } from 'react-redux'
import { linking } from './Linking'
import { AuthNavigator } from './AuthNavigator'
import { AfterLoginNavigator } from './AfterLoginNavigator'
import { DeepLinkEnum, useDeepLinks, useURL } from './hooks'
import { checkDeepLinkResult, navigationRef } from './services'
import { useInActivityHook } from './hooks/useInActivityHook'
import { StatusBar } from 'react-native'
import { glbStyles } from '../styles/global'

const Stack = createStackNavigator<ApplicationStackParamList>()
const Drawer = createDrawerNavigator()

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const { colors } = NavigationTheme
  const isLogin = useSelector(state => state?.auth?.isLogin)

  useFlipper(navigationRef)


  const { addDeepLink } = useDeepLinks()
  const link = useURL()

  const handleDeepLink = useCallback(
    (url: string) => {
      const task = InteractionManager.runAfterInteractions(() => {
        const { didDeepLinkLand, action, linkPath } = checkDeepLinkResult(url)
        if (!didDeepLinkLand) {
          addDeepLink({
            id: linkPath,
            type: DeepLinkEnum.NAVIGATION,
            action: () => navigationRef.current?.dispatch(action),
          })
        }
      })

      return () => task.cancel()
    },
    [navigationRef]
  )

  useEffect(() => {
    if (!link) {
      return
    }else if (link.includes('#/firm/')){
      handleDeepLink(link)
    }else{
      return
    }
  }, [link])

  return (
    <SafeAreaView style={glbStyles.safeAreaView}>
      <StatusBar translucent backgroundColor="white" />
      <NavigationContainer
        theme={NavigationTheme}
        ref={navigationRef}
        linking={linking}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {isLogin ? (
            <Stack.Screen
              name="AfterLoginNavigator"
              component={AfterLoginNavigator}
              options={{ title: 'After Auth' }}
            />
          ) : (
            <Stack.Screen
              name="AuthNavigator"
              component={AuthNavigator}
              options={{ title: 'Auth' }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
