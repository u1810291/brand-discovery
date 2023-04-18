'use client'

import { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { MainLayout } from 'src/layouts/MainLayout'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputField } from 'src/components/InputField'
import { schema, ResetPasswordFormType } from './helper'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth'
import Image from 'next/image'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import firebaseApp from 'src/services/firebase'
import Typography from '@mui/material/Typography'
import Notification from 'src/components/Notification'
import CircularProgress from '@mui/material/CircularProgress'
import SpacewiseSVG from 'src/assets/svg/spacewise.svg'

const auth = getAuth(firebaseApp())

export const ResetPassword = () => {
  const [success, setSuccess] = useState('')
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
            {sending ? <CircularProgress /> : 'Send me reset password instructions'}
          </Button>
        </Stack>
        <Button type="button" variant="text" sx={{ width: 'fit-content', alignSelf: 'center' }}>
          Reset via Phone Number
        </Button>
        <Notification type={!!error ? 'error' : 'success'} text={error?.message || success} />
      </Stack>
    </MainLayout>
  )
}
