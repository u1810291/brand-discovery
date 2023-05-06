'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from 'src/components/Header'
import CircularProgress from '@mui/material/CircularProgress'

export default () => {
  const Location = dynamic(() => import('src/pages-components/Location').then((component) => component.Location), {
    suspense: true,
  })
  return (
    <div>
      <Header title="Location">
        <meta name="description" content="Location page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <Location />
      </Suspense>
    </div>
  )
}
