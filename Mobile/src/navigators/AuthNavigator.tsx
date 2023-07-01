import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ApplicationStackParamList } from '../../@types/navigation'
import {
  AddFirmConnection,
  AddFirmScreen,
  FirmConnections,
  Login,
} from '../screens'

const Stack = createStackNavigator<ApplicationStackParamList>()

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="AddFirmConnection"
        component={AddFirmConnection}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FirmConnections"
        component={FirmConnections}
        options={{ headerShown: false, animationEnabled: false }}
      />
      <Stack.Screen
        name="AddFirm"
        component={AddFirmScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
