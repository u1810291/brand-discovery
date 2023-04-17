'use client'

import { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { MainLayout } from 'src/layouts/MainLayout'
import { yupResolver } from '@hookform/resolvers/yup'
import { NewPasswordFormType, schema } from './helper'
import { PasswordInput } from 'src/components/PasswordInput'
import { useUpdatePassword } from 'react-firebase-hooks/auth'
import Image from 'next/image'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import firebaseApp from '../../services/firebase'
import Notification from 'src/components/Notification'
import CircularProgress from '@mui/material/CircularProgress'
import SpacewiseSVG from 'src/assets/svg/spacewise.svg'

const auth = getAuth(firebaseApp())

export const NewPassword = () => {
  const [success, setSuccess] = useState('')
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<NewPasswordFormType>({
    defaultValues: { password: '', confirmPassword: '' },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const [updatePassword, updating, error] = useUpdatePassword(auth)

  const onSubmit = async (data: NewPasswordFormType) => {
    const success = await updatePassword(data.password)
    if (success) {
      setSuccess('Updated password')
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
            {updating ? <CircularProgress /> : 'Continue'}
          </Button>
        </Stack>
        <Notification text={error?.message || success} type={error ? 'error' : 'success'} />
      </Stack>
    </MainLayout>
  )
}
