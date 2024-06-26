'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from 'src/components/Header'
import CircularProgress from '@mui/material/CircularProgress'

export default () => {
  const SignIn = dynamic(() => import('src/pages-components/SignIn').then((component) => component.SignIn), {
    suspense: true,
    ssr: false,
  })
  return (
    <div>
      <Header title="Sign in">
        <meta name="description" content="Sign in page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <SignIn />
      </Suspense>
    </div>
  )
}
