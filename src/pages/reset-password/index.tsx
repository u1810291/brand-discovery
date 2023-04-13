'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from 'src/components/Header'
import CircularProgress from '@mui/material/CircularProgress'

export default () => {
  const ResetPassword = dynamic(
    () => import('src/pages-components/ResetPassword').then((component) => component.ResetPassword),
    {
      suspense: true,
    },
  )
  return (
    <div>
      <Header title="Reset password">
        <meta name="description" content="Reset password page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <ResetPassword />
      </Suspense>
    </div>
  )
}
