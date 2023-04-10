import { CircularProgress } from '@mui/material'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Header from 'src/components/Header'

export default () => {
  const ThankYou = dynamic(() => import('src/pages-components/ThankYou').then((component) => component.ThankYou), {
    suspense: true,
  })
  return (
    <div>
      <Header title="Thank you">
        <meta name="description" content="Thank you page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <ThankYou />
      </Suspense>
    </div>
  )
}
