'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from 'src/constants/routes'

export { RouteGuard }

function RouteGuard({ children }) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    authCheck(router.asPath)
    const hideContent = () => setAuthorized(false)
    router.events.on('routeChangeStart', hideContent)
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
      ROUTES.walkThrough,
    ]

    const path = url.split('?')[0]
    const user = localStorage.getItem('user') && JSON?.parse(localStorage.getItem('user'))
    if (user?.isLoggedIn && !Object.values(ROUTES).includes(path)) {
      router.replace({
        pathname: ROUTES.notFound,
        query: { returnUrl: path },
      })
    }
    if (!user?.isLoggedIn && !publicPaths.includes(path)) {
      setAuthorized(false)
      router.replace({
        pathname: ROUTES.signIn,
        query: { returnUrl: router.asPath },
      })
    } else {
      setAuthorized(true)
    }
  }

  return authorized && children
}
