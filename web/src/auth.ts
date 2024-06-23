import createKindeClient, {KindeClient} from '@kinde-oss/kinde-auth-pkce-js'
import { createAuthentication } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'

// If you're integrating with an auth service provider you should delete this interface.
// Instead you should import the type from their auth client sdk.
export interface AuthClient {
  login: () => User
  logout: () => void
  register: () => User
  getToken: () => string
  getUser: () => User | null
  getUserOrgs: () => { id: string; name: string }[] | { id: string; name: string } | null
}

// If you're integrating with an auth service provider you should delete this interface.
// This type should be inferred from the general interface above.
interface User {
  // The name of the id variable will vary depending on what auth service
  // provider you're integrating with. Another common name is `sub`
  id: string
  email?: string
  username?: string
  roles: string[]
}

// If you're integrating with an auth service provider you should delete this interface
// This type should be inferred from the general interface above
export interface ValidateResetTokenResponse {
  error?: string
  [key: string]: string | undefined
}

// Replace this with the auth service provider client sdk

const client = await createKindeClient({
  client_id: "c3606f43c657454389737aab1f29c742",
  domain: "https://boardreport-staging.au.kinde.com",
  redirect_uri: window.location.origin,
  is_dangerously_use_local_storage: process.env.NODE_ENV === 'development' ? true : false,
  on_redirect_callback(user, appState: { redirectTo: string }) {
    window.location.href = appState?.redirectTo || "/"
  },
});

function createAuth() {
  const authImplementation = createAuthImplementation(client)

  // You can pass custom provider hooks here if you need to as a second
  // argument. See the Redwood framework source code for how that's used
  return createAuthentication(authImplementation)
}

// This is where most of the integration work will take place. You should keep
// the shape of this object (i.e. keep all the key names) but change all the
// values/functions to use methods from the auth service provider client sdk
// you're integrating with
function createAuthImplementation(client: KindeClient) {
  return {
    type: 'kinde-auth',
    client,
    login: async () => client.login(),
    logout: async () => client.logout(),
    signup: async () => client.register(),
    getToken: async () => client.getToken(),
    getUserOrgs: async () => client.getUserOrganizations(),
    getUserMetadata: async () => client.getUser(),}
}

export const { AuthProvider, useAuth } = createAuth()
