import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/general/fonts.css'
import '../styles/general/styles.css'
import { theme } from '../styles/themes'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>{/* <link rel="icon" href="/favicon.svg" /> */}</Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
