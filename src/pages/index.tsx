'use client'

import CircularProgress from '@mui/material/CircularProgress'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Header from 'src/components/Header'

export default () => {
  const InitialPage = dynamic(() => import('src/pages-components/Initial').then((component) => component.Initial), {
    suspense: true,
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
