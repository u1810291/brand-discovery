'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from 'src/components/Header'
import CircularProgress from '@mui/material/CircularProgress'

export default () => {
  const Account = dynamic(() => import('src/pages-components/Account').then((component) => component.Account), {
    suspense: true,
  })
  return (
    <div>
      <Header title="Account">
        <meta name="description" content="Account page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <Account />
      </Suspense>
    </div>
  )
}
