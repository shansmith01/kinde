import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './scaffold.css'
import { AuthProvider, useAuth } from './auth'

import './index.css'
import { KindeProvider } from '@kinde-oss/kinde-auth-react'


const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <KindeProvider
       clientId="c3606f43c657454389737aab1f29c742"
       domain="https://boardreport-staging.au.kinde.com"
       logoutUri={window.location.origin}
       redirectUri={window.location.origin}
      >
        <AuthProvider>
        <RedwoodApolloProvider useAuth={useAuth}>
          <Routes />
        </RedwoodApolloProvider></AuthProvider>
      </KindeProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
