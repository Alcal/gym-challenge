import { Provider as StateProvider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '../components/Layout'
import '../styles/globals.css'
import theme from '../theme'
import store from '../state'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateProvider store={store}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Gymondo Challenge</title>
          <meta name="description" content="A test app so that our good friends at Gymondo will like us" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </StateProvider>
  )
}

export default MyApp
