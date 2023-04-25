'use client'

import CircularProgress from '@mui/material/CircularProgress'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Header from 'src/components/Header'

export default () => {
  const WalkThrough = dynamic(
    () => import('src/pages-components/WalkThrough').then((component) => component.WalkThrough),
    {
      suspense: true,
    },
  )
  return (
    <div>
      <Header title="Walk through">
        <meta name="description" content="Walk through page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <WalkThrough />
      </Suspense>
    </div>
  )
}
