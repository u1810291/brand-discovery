'use client'

import CircularProgress from '@mui/material/CircularProgress'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Header from 'src/components/Header'

/**
 * TODO: This will help us to optimize build time and load
 * time when we don't export or next export our SSR pages.
 * @info https://nextjs.org/docs/messages/prerender-error
 */
// export async function getStaticPaths() {
//   if (process.env.SKIP_BUILD_STATIC_GENERATION) {
//     return {
//       paths: [],
//       fallback: 'blocking',
//     }
//   }

//   const res = await fetch('https://.../brand?sort=date-desc&limit=10')
//   const brands = await res.json()

//   const paths = brands.map((brand) => ({
//     params: { id: brand.id },
//   }))

//   // { fallback: false } means other routes should 404
//   return { paths, fallback: false }
// }

export default () => {
  const Brand = dynamic(() => import('src/pages-components/Brand').then((component) => component.Brand), {
    suspense: true,
  })
  return (
    <div>
      <Header title="Brand">
        <meta name="description" content="Brand page" />
      </Header>
      <Suspense fallback={<CircularProgress />}>
        <Brand />
      </Suspense>
    </div>
  )
}
