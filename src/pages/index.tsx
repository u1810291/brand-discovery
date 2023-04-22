'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from 'src/components/Header'
import CircularProgress from '@mui/material/CircularProgress'

export default () => {
  const InitialPage = dynamic(() => import('src/pages-components/Initial').then((component) => component.Initial), {
    suspense: true,
    ssr: false,
  })

  return (
    <div>
      <Header title="Initial">
        <meta name="description" content="Initial page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <InitialPage />
      </Suspense>
    </div>
  )
}
