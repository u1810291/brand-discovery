'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
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
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = [
      ROUTES.signIn,
      ROUTES.link,
      ROUTES.newPassword,
      ROUTES.resetPassword,
      ROUTES.signUpWithEmail,
      ROUTES.verifyEmail,
      ROUTES.thankYou,
    ]
    const path = url.split('?')[0]
    const user = localStorage.getItem('user') && JSON?.parse(localStorage.getItem('user'))
    if (!user.isLoggedIn && !publicPaths.includes(path)) {
      setAuthorized(false)
      router.push({
        pathname: ROUTES.signIn,
        query: { returnUrl: router.asPath },
      })
    } else {
      setAuthorized(true)
    }
  }

  return authorized && children
}
