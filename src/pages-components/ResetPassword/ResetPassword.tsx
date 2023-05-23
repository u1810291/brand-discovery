'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { getAuth } from 'firebase/auth'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import SpacewiseSVG from 'src/assets/svg/spacewise.svg'
import { InputField } from 'src/components/InputField'
import { MainLayout } from 'src/layouts/MainLayout'
import firebaseApp from 'src/services/firebase'
import { useAppDispatch } from 'src/store'
import { notify } from 'src/store/slices/notify'
import { Type } from 'src/store/slices/notify/notify.slice'
import { ResetPasswordFormType, schema } from './helper'
import { formattedMessage } from 'src/utils/formatErrors'

const auth = getAuth(firebaseApp())

export const ResetPassword = () => {
  const [success, setSuccess] = useState('')
  const dispatch = useAppDispatch()
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<ResetPasswordFormType>({
    defaultValues: { email: '' },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth)

  const onSubmit = async (data: ResetPasswordFormType) => {
    const success = await sendPasswordResetEmail(data.email)
    if (success) {
      setSuccess('Sent email')
    }
  }

  useEffect(() => {
    if (error?.message || success) {
      dispatch(
        notify({
          type: error?.message ? Type.error : Type.success,
          message: formattedMessage(error?.message) || success,
        }),
      )
    }
  }, [success, error])

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
            <InputField
              fullWidth
              name="email"
              label="E-mail address"
              placeholder="Enter your email"
              control={control}
            />
          </Stack>
          <Button type="submit" variant="contained" disabled={!isDirty || !isValid || isSubmitting}>
            {sending ? <CircularProgress size={24} /> : 'Send me reset password instructions'}
          </Button>
        </Stack>
        {/* <Button type="button" variant="text" sx={{ width: 'fit-content', alignSelf: 'center' }}>
          Reset via Phone Number
        </Button> */}
      </Stack>
    </MainLayout>
  )
}
