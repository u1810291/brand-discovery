import { useCallback, useState } from 'react'
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth'

export const useVerifyResetPassword = (auth) => {
  const [loading, setLoading] = useState<boolean>()
  const [error, setError] = useState<any>()
  const [success, setSuccess] = useState<string>()
  const verifyPassword = useCallback(
    (code: string, newPassword: string) => {
      setLoading(true)
      verifyPasswordResetCode(auth, code)
        .then((email: string) => {
          if (!!email) {
            confirmPasswordReset(auth, code, newPassword)
              .then((res) => {
                setLoading(false)
                setSuccess('Successfully reset')
              })
              .catch((err) => {
                setLoading(false)
                setError(err)
              })
          } else {
            setLoading(false)
            setError(`Email doesn't exist`)
          }
        })
        .catch((err) => {
          setLoading(false)
          setError(err)
        })
      setLoading(false)
    },
    [auth],
  )

  return [verifyPassword, success, loading, error]
}
