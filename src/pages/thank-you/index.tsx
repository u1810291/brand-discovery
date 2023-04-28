'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from 'src/components/Header'
import CircularProgress from '@mui/material/CircularProgress'

export default () => {
  const ThankYou = dynamic(() => import('src/pages-components/ThankYou').then((component) => component.ThankYou), {
    suspense: true,
    ssr: false,
  })
  return (
    <div>
      <Header title="Thank you">
        <meta name="description" content="Thank you page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <ThankYou />
      </Suspense>
    </div>
  )
}
