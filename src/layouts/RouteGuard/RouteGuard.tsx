'use client'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ROUTES } from 'src/constants/routes'

export { RouteGuard }

function RouteGuard({ children }) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath)

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false)
    router.events.on('routeChangeStart', hideContent)

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck)

    return () => {
      router.events.off('routeChangeStart', hideContent)
      router.events.off('routeChangeComplete', authCheck)
    }
  }, [])

  function authCheck(url) {
    const publicPaths = [
      ROUTES.root,
      ROUTES.signIn,
      ROUTES.link,
      ROUTES.newPassword,
      ROUTES.resetPassword,
      ROUTES.signUpWithEmail,
      ROUTES.verifyEmail,
      ROUTES.thankYou,
      ROUTES.notFound,
    ]
    const path = url.split('?')[0]
    const user = localStorage.getItem('user') && JSON?.parse(localStorage.getItem('user'))
    if (!user?.isLoggedIn && !publicPaths.includes(path)) {
      setAuthorized(false)
      router.push({
        pathname: ROUTES.signIn,
      })
    } else {
      setAuthorized(true)
    }
  }

  return authorized && children
}
