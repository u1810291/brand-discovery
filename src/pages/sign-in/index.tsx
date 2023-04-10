'use client'

import CircularProgress from '@mui/material/CircularProgress'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Header from 'src/components/Header'

export default () => {
  const SignIn = dynamic(() => import('src/pages-components/SignIn').then((component) => component.SignIn), {
    suspense: true,
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
