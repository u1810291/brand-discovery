'use client'

import CircularProgress from '@mui/material/CircularProgress'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Header from 'src/components/Header'

export default () => {
  const NotFoundPage = dynamic(
    () => import('src/pages-components/NotFoundPage').then((component) => component.NotFoundPage),
    {
      suspense: true,
    },
  )
  return (
    <div>
      <Header title="Home">
        <meta name="description" content="Home page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <NotFoundPage />
      </Suspense>
    </div>
  )
}
