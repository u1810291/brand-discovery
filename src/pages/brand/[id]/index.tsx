'use client'

import CircularProgress from '@mui/material/CircularProgress'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Header from 'src/components/Header'

export default () => {
  const Brand = dynamic(() => import('src/pages-components/Brand').then((component) => component.Brand), {
    suspense: true,
  })
  return (
    <div>
      <Header title="Brand">
        <meta name="description" content="Brand page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <Brand />
      </Suspense>
    </div>
  )
}
