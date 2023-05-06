'use client'

import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ROUTES } from 'src/constants/routes'
import { useVerifyEmail } from 'src/services/useVerifyEmail'
import firebaseApp from 'src/services/firebase'

const auth = getAuth(firebaseApp())

export default () => {
  const router = useRouter()
  const [verifyEmail] = useVerifyEmail(auth)
  useEffect(() => {
    if (router.query.mode === 'verifyEmail') {
      if (router?.query?.oobCode) {
        verifyEmail(router?.query?.oobCode)
        router.replace(ROUTES.signIn)
      }
    }
    if (router.query.mode === 'resetPassword') {
      router.push(`${ROUTES.newPassword}${window.location.search}`)
    }
  }, [router.query.mode])
  return null
}
