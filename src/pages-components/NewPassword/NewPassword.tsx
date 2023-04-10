'use client'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUpdatePassword } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import SpacewiseSVG from 'src/assets/svg/components/spacewise.svg'
import { MainLayout } from 'src/layouts/MainLayout'
import { PasswordInput } from 'src/UI/PasswordInput'
import * as yup from 'yup'
import firebaseApp from '../../services/firebase'
import { getAuth } from 'firebase/auth'
import Notification from 'src/components/Notification'
import Image from 'next/image'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

const auth = getAuth(firebaseApp())

type NewPasswordFormType = {
  password: string
  confirmPassword: string
}

const schema = yup.object({
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
})

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
          <Image src={SpacewiseSVG} alt="Spacewise" width={261} height={37} />
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
