import {
  useAuthenticationStatus,
  useSignInEmailPassword,
  useUserData,
  User,
  useSignOut,
} from '@nhost/react'
import { useNavigation } from '@react-navigation/native'
import React, { createContext, useContext } from 'react'
import { ScreenList } from '../routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface AuthContextData {
  isAuthenticated: boolean
  isLoading: boolean
  needsEmailVerification: boolean
  user: User | null
  signIn(email: string, password: string): Promise<void>
  signOut(): Promise<void>
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ScreenList>>()
  const { signInEmailPassword, needsEmailVerification } =
    useSignInEmailPassword()
  const { isAuthenticated, isLoading } = useAuthenticationStatus()
  const { signOut: nhostSignOut } = useSignOut()
  const user = useUserData()

  const signOut = async (): Promise<void> => {
    nhostSignOut()
  }

  const signIn = async (email: string, password: string) => {
    signInEmailPassword(email, password).then(
      ({ isSuccess, needsEmailVerification, error }) => {
        console.log(isSuccess, needsEmailVerification, error, user)
        if (needsEmailVerification) {
          navigate('EmailVerification')
        }

        if (isSuccess) {
          return
        }

        throw new Error(error?.message)
      },
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        needsEmailVerification,
        user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
