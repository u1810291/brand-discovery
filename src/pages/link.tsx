'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from 'src/components/Header'
import CircularProgress from '@mui/material/CircularProgress'

export default () => {
  const Link = dynamic(() => import('src/pages-components/Link').then((component) => component.Link), {
    suspense: true,
    ssr: false,
  })

  return (
    <div>
      <Header title="Link">
        <meta name="description" content="Initial page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <Link />
      </Suspense>
    </div>
  )
}
