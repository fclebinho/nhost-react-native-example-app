import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomePage, ProfilePage } from '../pages'
import { ScreenList } from '.'

interface AppStackProps {}

const Stack = createNativeStackNavigator<ScreenList>()

const AppStack: React.FC<AppStackProps> = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Home'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Profile" component={ProfilePage} />
    </Stack.Navigator>
  )
}

export default AppStack
