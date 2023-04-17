import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { EmailVerificationPage, SignInPage, SignUpPage } from '../pages'
import { ScreenList } from '.'

const Stack = createNativeStackNavigator<ScreenList>()

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SignIn" component={SignInPage} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
      <Stack.Screen
        name="EmailVerification"
        component={EmailVerificationPage}
      />
    </Stack.Navigator>
  )
}

export default AuthStack
