import { useKindeAuth } from '@kinde-oss/kinde-auth-react'
import { routes } from '@redwoodjs/router'
import { useEffect } from 'react'
import { useAuth } from 'src/auth'



const HomePage = () => {
  const all = useAuth()
  const { isAuthenticated,  getCurrentUser, signUp, logOut, logIn, client, hasRole } = useAuth()

  console.log("All", all)

  const createOrg = async () => {
    await client?.createOrg({
      org_name: 'my-rw-org-14',
      app_state: {
        redirectTo: "users"
      }
    })
  }


console.log(all,"HAS ROLE", hasRole('Admin'))
  // const user = getCurrentUser()
  //


  return (
    <>
      {/* MetaTags, h1, paragraphs, etc. */}

      <p>{JSON.stringify({ isAuthenticated })}</p>
      <button onClick={() => signUp({
        // email: 'your.email@email.com',
        // password: 'super secret password',
      })}>sign up</button>

      <button onClick={async () => console.log(await getCurrentUser())}>show user</button>
      <button onClick={() => logIn()}>login</button>
      <button onClick={() => logOut()}>logout</button>
      <button onClick={createOrg}>Org</button>
    </>
  )
}
export default HomePage
