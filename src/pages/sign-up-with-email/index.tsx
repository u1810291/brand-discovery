'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from 'src/components/Header'
import CircularProgress from '@mui/material/CircularProgress'

export default () => {
  const SignUpWithEmail = dynamic(
    () => import('src/pages-components/SignUpWithEmail').then((component) => component.SignUpWithEmail),
    {
      suspense: true,
      ssr: false,
    },
  )
  return (
    <div>
      <Header title="Sign Up With Email up">
        <meta name="description" content="Sign Up With Email up page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <SignUpWithEmail />
      </Suspense>
    </div>
  )
}
