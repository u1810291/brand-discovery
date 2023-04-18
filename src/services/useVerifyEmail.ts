/* eslint-disable @typescript-eslint/no-unused-vars */
import { Auth, applyActionCode } from 'firebase/auth'
import { useCallback, useState } from 'react'

export const useVerifyEmail = (auth: Auth) => {
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState<boolean>()
  const [success, setSuccess] = useState<any>()
  const verifyEmail = useCallback((actionCode: string, continueUrl?: () => void, lang?: string) => {
    setLoading(true)
    console.error('oobCode', actionCode)
    applyActionCode(auth, actionCode)
      .then((res) => {
        setLoading(false)
        setSuccess(res)
        console.error(res)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
        setError(error)
      })
  }, [])
  return [verifyEmail, success, loading, error]
}
