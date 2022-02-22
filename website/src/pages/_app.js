import '../styles/globals.css'
import ProtectedPage from '../components/Auth/ProtectedPage'
import AnonymousPage from '../components/Auth/AnonymousPage'
import { Fragment } from 'react'
import Layout from '../components/UI/Layout'

function MyApp({ Component, pageProps }) {
  const isProtected = Component.isProtected
  const isAnonymous = Component.isAnonymous

  if (isProtected && isAnonymous) {
    throw new Error(
      `The component ${Component.name} is anonymous and protected as the same time. Please choose either one`
    )
  }

  const Render = (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )

  return (
    <Fragment>
      {isProtected ? (
        <ProtectedPage>{Render}</ProtectedPage>
      ) : isAnonymous ? (
        <AnonymousPage>{Render}</AnonymousPage>
      ) : (
        Render
      )}
    </Fragment>
  )
}

// Add just so IDE doesn't complain :)
MyApp.isProtected = false
MyApp.isAnonymous = false

export default MyApp
