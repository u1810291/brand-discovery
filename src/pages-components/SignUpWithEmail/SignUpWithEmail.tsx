'use client'
/* eslint-disable prettier/prettier */

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { ROUTES } from 'src/constants/routes'
import { MainLayout } from 'src/layouts/MainLayout'
import { InputField } from 'src/UI/InputField'
import { PasswordInput } from 'src/UI/PasswordInput'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import * as yup from 'yup'
import { getAuth } from 'firebase/auth'
import firebaseApp from '../../services/firebase'

const auth = getAuth(firebaseApp())

type SignUpWithEmailFormType = {
  email: string
  companyName: string
  firstName: string
  lastName: string
  password: string
  spaceCount: string
}

const defaultValues = {
  email: '',
  companyName: '',
  firstName: '',
  lastName: '',
  password: '',
  spaceCount: '',
}

const schema = yup.object({
  email: yup.string().required().email(),
  companyName: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
  spaceCount: yup.string().notRequired(),
})

export const SignUpWithEmail = () => {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<SignUpWithEmailFormType>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

<<<<<<< HEAD
  const onSubmit = (data: SignUpWithEmailFormType) => {
    console.log(data)
=======
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    )
  }
  if (loading) {
    return <p>Loading...</p>
  }
  if (user) {
    return window.location.replace(ROUTES.initial)
  }
  const onSubmit = (data: SignUpWithEmailFormType) => {
    createUserWithEmailAndPassword(data.email, data.password)
>>>>>>> 634260660a8521434d6e571b3ce7e22543591d1d
  }

  return (
    <MainLayout showBackButton>
      <Stack marginY="auto" spacing={3}>
        <Typography fontWeight={700} fontSize={28} alignSelf="center">
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
                {...props}
                onChange={(e, value) => {
                  props.field.onChange(value)
                }}
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
            Continue
          </Button>
          <Typography fontSize={14} fontWeight={400}>
            Use of this app constitutes acceptance of the Terms of Use, Booking Terms and Privacy Policy.
          </Typography>
        </Stack>
      </Stack>
    </MainLayout>
  )
}
