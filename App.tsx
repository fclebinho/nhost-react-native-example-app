/* eslint-disable camelcase */
import { NhostClient, NhostProvider } from '@nhost/react'
import { NhostApolloProvider } from '@nhost/react-apollo'

import { NHOST_REGION, NHOST_SUBDOMAIN } from '@env'

import { AuthProvider } from './src/contexts'
import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes'
import React from 'react'

const nhost = new NhostClient({
  region: NHOST_REGION,
  subdomain: NHOST_SUBDOMAIN,
})

export default function App() {
  return (
    <NhostProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>
        <NavigationContainer>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </NavigationContainer>
      </NhostApolloProvider>
    </NhostProvider>
  )
}
