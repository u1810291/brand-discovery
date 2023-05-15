/* eslint-disable @typescript-eslint/no-unused-vars */
import { Auth, AuthError, sendEmailVerification } from 'firebase/auth'
import { useCallback, useState } from 'react'

export const useSendVerifyEmail = (auth: Auth) => {
  const [error, setError] = useState<AuthError>()
  const [loading, setLoading] = useState<boolean>()
  const [success, setSuccess] = useState<any>()

  const sendVerifyEmail = useCallback(() => {
    const actionCodeSettings = {
      url: `https://${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}/?email=${auth?.currentUser?.email}`,
      handleCodeInApp: true,
    }
    setLoading(true)
    sendEmailVerification(auth?.currentUser, actionCodeSettings)
      .then((res) => {
        setLoading(false)
        setSuccess(res)
      })
      .catch(function (error) {
        console.error(error)
        setError(error?.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  return [sendVerifyEmail, loading, error, success] as const
}
