import { useCallback, useState } from 'react'
import { verifyPasswordResetCode, confirmPasswordReset, Auth } from 'firebase/auth'

export const useVerifyResetPassword = (auth: Auth) => {
  const [loading, setLoading] = useState<boolean>()
  const [error, setError] = useState<any>()
  const [success, setSuccess] = useState<string>()
  const verifyPassword = useCallback(
    (code: string | string[], newPassword: string) => {
      setLoading(true)
      verifyPasswordResetCode(auth, code as string)
        .then((email: string) => {
          if (!!email) {
            confirmPasswordReset(auth, code as string, newPassword)
              .then(() => {
                setLoading(false)
                setSuccess('Successfully reset')
              })
              .catch((err) => {
                setLoading(false)
                setError(err?.message)
              })
          } else {
            setLoading(false)
            setError(`Email doesn't exist`)
          }
        })
        .catch((err) => {
          setLoading(false)
          setError(err?.message)
        })
      setLoading(false)
    },
    [auth],
  )

  return { verifyPassword, success, loading, error } as const
}
