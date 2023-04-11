'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from 'src/components/Header'
import CircularProgress from '@mui/material/CircularProgress'

export default () => {
  const NewPassword = dynamic(
    () => import('src/pages-components/NewPassword').then((component) => component.NewPassword),
    {
      suspense: true,
    },
  )
  return (
    <div>
      <Header title="New password">
        <meta name="description" content="New password page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <NewPassword />
      </Suspense>
    </div>
  )
}
