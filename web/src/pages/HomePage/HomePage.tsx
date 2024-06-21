import { useAuth } from 'src/auth'

const HomePage = () => {
  const { isAuthenticated,  getCurrentUser, signUp, logOut, logIn } = useAuth()




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
    </>
  )
}
export default HomePage
