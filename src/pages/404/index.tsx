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
      <Header title="Not found">
        <meta name="description" content="Not found page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <NotFoundPage />
      </Suspense>
    </div>
  )
}
