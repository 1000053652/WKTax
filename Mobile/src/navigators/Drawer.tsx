import React, { useEffect } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import MenuScreen from './Menu/Menu'
import MainNavigator from './BottomTabs/Main'
import { useLazyGetRefereshTokenApiQuery } from '../services/modules/auth'
import { useSelector } from 'react-redux'
import { GetTokenRequest } from '../services/modules/auth/requestTypes'
import { ApplicationScreenProps } from '../../@types/navigation'
const Drawer = createDrawerNavigator()

const AppDrawerNavigator = ({ navigation, route }: ApplicationScreenProps) => {
  const [getRefereshTokenApi] = useLazyGetRefereshTokenApiQuery({
    pollingInterval: 600000,
  })
  const AuthorizationValue = useSelector(
    state => 'Bearer ' + state?.auth?.authData?.authorizationToken
  )
  const AuthToken: string = useSelector(
    state => state?.auth?.authData?.authToken as string
  )
  const callRefreshAPi = () => {
    const request: GetTokenRequest = {
      authToken: AuthToken,
      authCode: AuthorizationValue,
    }
    getRefereshTokenApi(request, false)
  }

  useEffect(() => {
    setTimeout(() => {
      callRefreshAPi()
    }, 600000)
  }, [])

  return (
    <Drawer.Navigator
      drawerContent={() => <MenuScreen navigation={navigation} route={route} />}
      screenOptions={{
        drawerStyle: {
          width: '83%',
        },
        drawerType: 'front',
        drawerPosition: 'right',
      }}
    >
      <Drawer.Screen
        name="Main"
        component={MainNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  )
}
export default AppDrawerNavigator
