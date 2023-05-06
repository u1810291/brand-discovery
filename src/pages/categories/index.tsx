'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from 'src/components/Header'
import CircularProgress from '@mui/material/CircularProgress'

export default () => {
  const Location = dynamic(() => import('src/pages-components/Categories').then((component) => component.Categories), {
    suspense: true,
  })
  return (
    <div>
      <Header title="Categories">
        <meta name="description" content="Categories page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <Location />
      </Suspense>
    </div>
  )
}
