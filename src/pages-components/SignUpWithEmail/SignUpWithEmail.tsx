/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useCreateUserWithEmailAndPassword, useSendEmailVerification } from 'react-firebase-hooks/auth'
import { Controller, useForm } from 'react-hook-form'
import { InputField } from 'src/components/InputField'
import Notification from 'src/components/Notification'
import { PasswordInput } from 'src/components/PasswordInput'
import { ROUTES } from 'src/constants/routes'
import { MainLayout } from 'src/layouts/MainLayout'
import firebaseApp from 'src/services/firebase'
import { SignUpWithEmailFormType, defaultValues, schema } from './helper'
import 'firebase/firestore'

const auth = getAuth(firebaseApp())

export const SignUpWithEmail = () => {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<SignUpWithEmailFormType>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)
  const [sendEmailVerification, sending, emailVerifyError] = useSendEmailVerification(auth)

  useEffect(() => {
    if (!!user?.user?.uid && !emailVerifyError?.message && !sending) {
      const token = JSON.stringify(user.user.toJSON())
      localStorage.setItem('token', JSON.parse(token).stsTokenManager.accessToken)
      router.push(ROUTES.verifyEmail)
    }
  }, [user?.user?.uid, sending])

  const onSubmit = async (data: SignUpWithEmailFormType) => {
    await createUserWithEmailAndPassword(data.email, data.password)
    await sendEmailVerification()
  }

  return (
    <MainLayout showBackButton>
      <Stack marginY="auto" marginTop={{ xs: 0, sm: 'auto' }} spacing={3}>
        <Typography component="h3" fontWeight={700} fontSize={28} alignSelf="center">
          Sign Up with Email
        </Typography>
        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="email"
            placeholder="Enter your E-mail"
            label="E-mail address"
            control={control}
            autoComplete="email"
          />
          <InputField name="companyName" placeholder="Enter your Company name" label="Company name" control={control} />
          <InputField name="firstName" placeholder="Enter your First name" label="First name" control={control} />
          <InputField name="lastName" placeholder="Enter your Last name" label="Last name" control={control} />
          <PasswordInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="new-password"
            control={control}
          />
          <Controller
            render={({ field: { value, onChange } }) => (
              <ToggleButtonGroup exclusive aria-label="text alignment" value={value} onChange={onChange}>
                <ToggleButton value="1-3" key="1-3">
                  1-3 Spaces
                </ToggleButton>
                <ToggleButton value="4-9" key="4-9">
                  4-9 Spaces
                </ToggleButton>
                <ToggleButton value="10+" key="10+">
                  10+ Spaces
                </ToggleButton>
              </ToggleButtonGroup>
            )}
            name="spaceCount"
            control={control}
          />
          <Button type="submit" variant="contained" disabled={!isDirty || !isValid || isSubmitting}>
            {loading || sending ? <CircularProgress color="success" /> : 'Continue'}
          </Button>
          <Typography fontSize={14} fontWeight={400} color="#747978" textAlign="center">
            Use of this app constitutes acceptance of the <Link>Terms of Use</Link>, <Link>Booking Terms</Link> and{' '}
            <Link>Privacy Policy</Link>.
          </Typography>
        </Stack>
        <Notification type="error" text={error?.message || emailVerifyError?.message} />
      </Stack>
    </MainLayout>
  )
}
