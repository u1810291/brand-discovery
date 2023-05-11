'use client'

import Head from 'next/head'
import store from 'src/store'
import 'src/styles/general/fonts.css'
import 'src/styles/general/styles.css'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { theme } from '../styles/themes'
import { ThemeProvider } from '@mui/material/styles'
import { RouteGuard } from 'src/layouts/RouteGuard'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [path, setPath] = useState<string>()
  const router = useRouter()
  useEffect(() => {
    setPath(router.asPath)
    localStorage.setItem('history', path)
    console.error(path)
  }, [router.asPath])
  return (
    <>
      <Head>{/* <link rel="icon" href="/favicon.svg" /> */}</Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
        </ThemeProvider>
      </Provider>
    </>
  )
}
