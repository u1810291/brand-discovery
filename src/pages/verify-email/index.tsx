import CircularProgress from '@mui/material/CircularProgress'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Header from 'src/components/Header'

export default () => {
  const VerifyEmail = dynamic(
    () => import('src/pages-components/VerifyEmail').then((component) => component.VerifyEmail),
    {
      suspense: true,
    },
  )
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
