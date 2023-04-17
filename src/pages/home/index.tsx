import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { ScreenList } from '../../routes'
import { useAuth } from '../../contexts'

type HomeScreensProps = NativeStackNavigationProp<ScreenList, 'Home'>

const Home: React.FC = () => {
  const { navigate } = useNavigation<HomeScreensProps>()
  const { signOut } = useAuth()
  const { user } = useAuth()

  const handleSignOut = () => signOut()

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Text> {user?.email}</Text>

      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => navigate('Profile')}>
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut}>
          <Text>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
})

export default Home
