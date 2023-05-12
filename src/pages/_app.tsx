'use client'

import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { RouteGuard } from 'src/layouts/RouteGuard'
import store from 'src/store'
import 'src/styles/general/fonts.css'
import 'src/styles/general/styles.css'
import { theme } from '../styles/themes'

export default function App({ Component, pageProps }: AppProps) {
  const [path, setPath] = useState<string>()
  const router = useRouter()
  useEffect(() => {
    setPath(router.asPath)
    localStorage.setItem('history', path)
  }, [router.asPath])
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
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
