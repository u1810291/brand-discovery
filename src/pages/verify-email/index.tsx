'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from 'src/components/Header'
import CircularProgress from '@mui/material/CircularProgress'

export default () => {
  const VerifyEmail = dynamic(
    () => import('src/pages-components/VerifyEmail').then((component) => component.VerifyEmail),
    {
      suspense: true,
    },
  )
  console.log(VerifyEmail)
  return (
    <div>
      <Header title="Verify email">
        <meta name="description" content="Verify email" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <VerifyEmail />
      </Suspense>
    </div>
  )
}
