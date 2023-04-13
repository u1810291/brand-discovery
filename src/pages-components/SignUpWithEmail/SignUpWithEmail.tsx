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

const auth = getAuth(firebaseApp())

export const SignUpWithEmail = () => {
  const { push } = useRouter()
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
      localStorage.setItem('uuid', JSON.stringify(user?.user?.uid))
      push(ROUTES.home)
    }
  }, [user])
  const onSubmit = (data: SignUpWithEmailFormType) => {
    createUserWithEmailAndPassword(data.email, data.password)
  }

  return (
    <MainLayout showBackButton>
      <Stack marginY="auto" marginTop={{ xs: 0, sm: 'auto' }} spacing={3}>
        <Typography component="h3" fontWeight={700} fontSize={28} alignSelf="center">
          Sign Up with Email
        </Typography>
        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputField name="email" placeholder="Enter your E-mail" label="E-mail address" control={control} />
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
            render={(props) => (
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
