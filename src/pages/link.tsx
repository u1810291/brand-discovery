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
    console.error('First render 1', router.query)
    if (router.query.mode === 'verifyEmail') {
      console.error('First if statement')
      if (router?.query?.oobCode) {
        verifyEmail(router?.query?.oobCode)
        console.error('Second if statement')
        router.replace(ROUTES.signIn)
      }
    }
    if (router.query.mode === 'resetPassword') {
      router.push(`${ROUTES.newPassword}${window.location.search}`)
    }
  }, [router.query.mode])
  return null
}
