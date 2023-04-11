'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from 'src/components/Header'
import CircularProgress from '@mui/material/CircularProgress'

export default () => {
  const Home = dynamic(() => import('src/pages-components/Home').then((component) => component.Home), {
    suspense: true,
  })
  return (
    <div>
      <Header title="Home">
        <meta name="description" content="Home page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <Home />
      </Suspense>
    </div>
  )
}
