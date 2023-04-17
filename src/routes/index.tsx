import React from 'react'
import AuthStack from './auth'
import AppStack from './app'
import { useAuth } from '../contexts'
import * as SplashScreen from 'expo-splash-screen'

export type ScreenList = {
  Home: undefined
  Profile: undefined
  SignIn: undefined
  SignUp: undefined
  EmailVerification: undefined
}

SplashScreen.preventAutoHideAsync()

const Routes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (!isLoading) {
    SplashScreen.hideAsync()
  }

  return isAuthenticated ? <AppStack /> : <AuthStack />
}

export default Routes
