'use client'

import CircularProgress from '@mui/material/CircularProgress'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Header from 'src/components/Header'

export default () => {
  const Home = dynamic(() => import('src/pages-components/Home').then((component) => component.Home), {
    suspense: true,
    ssr: false,
  })
  return (
    <div>
      <Header title="Spacewise Brand Discovery">
        <meta name="description" content="Home page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <Home />
      </Suspense>
    </div>
  )
}
