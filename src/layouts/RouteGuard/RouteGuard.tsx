'use client'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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
      ROUTES.notFound,
      ROUTES.walkThrough,
    ]
    const privatePaths = [
      ROUTES.brand,
      ROUTES.categories,
      ROUTES.home,
      ROUTES.location,
      ROUTES.notFound,
      ROUTES.account,
      ROUTES.termsOfUse,
    ]

    const path = url.split('?')[0]

    if (matchRoute(path, ROUTES, '404')) {
      router.replace({
        pathname: ROUTES.notFound,
        query: {
          attemptUrl: router.asPath,
          returnUrl:
            localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).isLoggedIn
              ? ROUTES.home
              : ROUTES.signIn,
        },
      })
    } else if (matchRoute(path, privatePaths, 'loggedIn')) {
      router.replace({
        pathname: ROUTES.home,
        query: router.query,
      })
    } else if (matchRoute(path, publicPaths, 'loggedOut')) {
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

const matchRoute = (url, routes, action) => {
  const user = localStorage.getItem('user') && JSON?.parse(localStorage.getItem('user'))

  const map = {
    loggedIn: () => user?.isLoggedIn && !routes.includes(`/${url.split('/')[1]}`),
    loggedOut: () => !user?.isLoggedIn && !routes.includes(url),
    '404': () => !(Object.values(routes).includes(url) || Object.values(routes).includes(`/${url.split('/')[1]}`)),
  }
  return map[action]()
}
