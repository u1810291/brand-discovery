'use client'

import Head from 'next/head'
import 'src/styles/general/fonts.css'
import 'src/styles/general/styles.css'
import type { AppProps } from 'next/app'
import { theme } from '../styles/themes'
import { ThemeProvider } from '@mui/material/styles/'

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
