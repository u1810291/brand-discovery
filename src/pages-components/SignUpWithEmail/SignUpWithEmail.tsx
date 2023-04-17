/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { ROUTES } from 'src/constants/routes'
import { MainLayout } from 'src/layouts/MainLayout'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { InputField } from 'src/components/InputField'
import { PasswordInput } from 'src/components/PasswordInput'
import { defaultValues, SignUpWithEmailFormType, schema } from './helper'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import firebaseApp from 'src/services/firebase'
import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import Notification from 'src/components/Notification'
import CircularProgress from '@mui/material/CircularProgress'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
// import { initializeApp } from 'firebase/app'
import 'firebase/firestore'

const auth = getAuth(firebaseApp())
// const firebaseConfig = {
//   apiKey: 'AIzaSyA3NzKeWjSrrtEeNDXE1T4qxYr__5zNdTE',
//   authDomain: 'brand-discovery-42739.firebaseapp.com',
//   projectId: 'brand-discovery-42739',
//   storageBucket: 'brand-discovery-42739.appspot.com',
//   messagingSenderId: '609950786624',
//   appId: '1:609950786624:web:36793b7abfb83e8ed5aba5',
//   measurementId: 'G-288GJLGKMX',
// }

// const app = initializeApp(firebaseConfig)

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

  useEffect(() => {
    if (!!user?.user?.uid) {
      const token = JSON.stringify(user.user.toJSON())
      localStorage.setItem('token', JSON.parse(token).stsTokenManager.accessToken)
      router.push(ROUTES.verifyEmail)
    }
  }, [user])

  const onSubmit = async (data: SignUpWithEmailFormType) => {
    await createUserWithEmailAndPassword(data.email, data.password)
    // if (user?.user?.uid) {
    //   app.firestore().collection('user').add({
    //     id: user?.user?.uid,
    //     first_name: data.firstName,
    //     last_name: data.lastName,
    //     company_name: data.companyName,
    //     spaces: data.spaceCount,
    //   })
    // }
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
            render={({ formState, fieldState, ...props }) => (
              <ToggleButtonGroup
                exclusive
                aria-label="text alignment"
                onChange={(e, value) => props.field.onChange(value)}
                {...props}
              >
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
            {loading ? <CircularProgress color="success" /> : 'Continue'}
          </Button>
          <Typography fontSize={14} fontWeight={400} color="#747978" textAlign="center">
            Use of this app constitutes acceptance of the <Link>Terms of Use</Link>, <Link>Booking Terms</Link> and{' '}
            <Link>Privacy Policy</Link>.
          </Typography>
        </Stack>
        <Notification type="error" text={error?.message} />
      </Stack>
    </MainLayout>
  )
}
