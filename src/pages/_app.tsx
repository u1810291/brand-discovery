import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import '../styles/general/fonts.css'
import { GlobalStyle } from '../styles/general/globalStyles'
import { theme } from '../styles/themes'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>{/* <link rel="icon" href="/favicon.svg" /> */}</Head>
      <GlobalStyle />
      <ThemeProvider theme={theme.default}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
