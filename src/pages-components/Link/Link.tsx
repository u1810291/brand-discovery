'use client'

import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ROUTES } from 'src/constants/routes'
import { useVerifyEmail } from 'src/services/useVerifyEmail'
import firebaseApp from 'src/services/firebase'

const auth = getAuth(firebaseApp())

export const Link = () => {
  const router = useRouter()
  const [verifyEmail] = useVerifyEmail(auth)
  useEffect(() => {
    if (router.query.mode === 'verifyEmail') {
      if (router?.query?.oobCode) {
        const params = new URL(router?.query?.continueUrl.toString())

        verifyEmail(router?.query?.oobCode)
        router.replace(ROUTES.root, {
          query: {
            email: params.searchParams.get('email'),
            password: params.searchParams.get('password'),
          },
        })
      }
    }
    if (router.query.mode === 'resetPassword') {
      router.push(`${ROUTES.newPassword}${window.location.search}`)
    }
  }, [router.query.mode])

  return null
}
