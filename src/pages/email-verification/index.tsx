import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

// import { Container } from './styles';

const EmailVerification: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Email Verification</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
})

export default EmailVerification
