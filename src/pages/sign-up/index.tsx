'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from 'src/components/Header'
import CircularProgress from '@mui/material/CircularProgress'

export default () => {
  const SignUp = dynamic(() => import('src/pages-components/SignUp').then((component) => component.SignUp), {
    suspense: true,
  })
  return (
    <div>
      <Header title="Sign up">
        <meta name="description" content="Sign up page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <SignUp />
      </Suspense>
    </div>
  )
}
