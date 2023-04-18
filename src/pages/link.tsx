'use client'

import { useRouter } from 'next/router'
import { ROUTES } from 'src/constants/routes'

export default () => {
  const router = useRouter()
  if (router.query.mode === 'verifyEmail') {
    router.push(`${ROUTES.thankYou}${window.location.search}`)
  }
  if (router.query.mode === 'resetPassword') {
    router.push(`${ROUTES.newPassword}${window.location.search}`)
  }
  return null
}
