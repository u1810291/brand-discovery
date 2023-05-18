'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { getAuth } from 'firebase/auth'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import SpacewiseSVG from 'src/assets/svg/spacewise.svg'
import { PasswordInput } from 'src/components/PasswordInput'
import { ROUTES } from 'src/constants/routes'
import { MainLayout } from 'src/layouts/MainLayout'
import firebaseApp from 'src/services/firebase'
import { useVerifyResetPassword } from 'src/services/useVerifyReset'
import { useAppDispatch } from 'src/store'
import { notify } from 'src/store/slices/notify'
import { Type } from 'src/store/slices/notify/notify.slice'
import { NewPasswordFormType, schema } from './helper'
import { formattedMessage } from 'src/utils/formatErrors'

const auth = getAuth(firebaseApp())

export const NewPassword = () => {
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<NewPasswordFormType>({
    defaultValues: { password: '', confirmPassword: '' },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { verifyPassword: resetPassword, success, loading, error } = useVerifyResetPassword(auth)

  useEffect(() => {
    if (error?.message || success) {
      dispatch(
        notify({
          type: error?.message ? Type.error : Type.success,
          message: formattedMessage(error?.message) || success,
        }),
      )
    }
    if (success) {
      router.push(ROUTES.signIn)
    }
  }, [success, error])

  const onSubmit = async (data: NewPasswordFormType) => {
    await resetPassword(router?.query?.oobCode, data.password)
  }

  return (
    <MainLayout showBackButton>
      <Stack marginY="auto" marginTop={{ xs: 0, sm: 'auto' }} spacing={5}>
        <Stack alignSelf="center">
          <Image
            placeholder="blur"
            blurDataURL={`${SpacewiseSVG}`}
            unoptimized
            src={SpacewiseSVG}
            alt="Spacewise"
            width={261}
            height={37}
          />
        </Stack>
        <Typography component="h3" fontWeight={800} fontSize={24} marginTop={5} marginBottom={4} alignSelf="center">
          Reset Password
        </Typography>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} width="100%" spacing={{ xs: 4, sm: 6 }}>
          <Stack>
            <PasswordInput
              fullWidth
              name="password"
              label="Enter new password"
              placeholder="Enter new password"
              control={control}
              autoComplete="nope"
            />
            <PasswordInput
              fullWidth
              name="confirmPassword"
              label="Re-enter new password"
              placeholder="Re-enter new password"
              control={control}
              autoComplete="nope"
            />
          </Stack>
          <Button type="submit" variant="contained" disabled={!isDirty || !isValid || isSubmitting}>
            {loading ? <CircularProgress size={24} /> : 'Continue'}
          </Button>
        </Stack>
      </Stack>
    </MainLayout>
  )
}
