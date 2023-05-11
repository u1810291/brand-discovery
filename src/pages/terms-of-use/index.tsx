'use client'

import CircularProgress from '@mui/material/CircularProgress'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Header from 'src/components/Header'

export default () => {
  const TermsOfUSe = dynamic(
    () => import('src/pages-components/TermsOfUse').then((component) => component.TermsOfUse),
    {
      suspense: true,
    },
  )
  return (
    <div>
      <Header title="Terms of use">
        <meta name="description" content="Terms of use" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <TermsOfUSe />
      </Suspense>
    </div>
  )
}
