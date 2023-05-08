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
import 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { Controller, useForm } from 'react-hook-form'
import { InputField } from 'src/components/InputField'
import { PasswordInput } from 'src/components/PasswordInput'
import { ROUTES } from 'src/constants/routes'
import { MainLayout } from 'src/layouts/MainLayout'
import firebaseApp from 'src/services/firebase'
import { useSendVerifyEmail } from 'src/services/useSendVerifyEmail'
import { useUpdateUser } from 'src/services/useUpdateUser'
import { AppDispatch, useDispatch } from 'src/store'
import { signUp } from 'src/store/slices/auth'
import { notify } from 'src/store/slices/notify'
import { Type } from 'src/store/slices/notify/notify.slice'
import { SignUpWithEmailFormType, defaultValues, schema } from './helper'
// import { addDoc, collection } from 'firebase/firestore'
// import { db } from 'src/services/firebase'

const auth = getAuth(firebaseApp())

export const SignUpWithEmail = () => {
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()
  const {
    control,
    handleSubmit,
    getValues,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<SignUpWithEmailFormType>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)
  const [sendVerifyEmail, sending, emailVerifyError] = useSendVerifyEmail(auth)
  const [updateUser] = useUpdateUser(auth)

  useEffect(() => {
    if (!!user?.user?.uid && !emailVerifyError?.message && !sending) {
      updateUser({
        uid: user.user.uid,
        firstName: getValues().firstName,
        lastName: getValues().lastName,
        companyName: getValues().companyName,
        spaceCount: getValues().spaceCount,
      })
      dispatch(signUp(JSON.parse(JSON.stringify(user))))
      router.push(ROUTES.verifyEmail)
    }
  }, [user?.user?.uid, sending])

  const onSubmit = async (data: SignUpWithEmailFormType) => {
    await createUserWithEmailAndPassword(data.email, data.password)
    await sendVerifyEmail()
  }

  useEffect(() => {
    if (error?.message || emailVerifyError?.message) {
      dispatch(
        notify({
          type: Type.error,
          message: error?.message || emailVerifyError?.message,
        }),
      )
    }
  }, [error, emailVerifyError])
  return (
    <MainLayout showBackButton>
      <Stack marginY="auto" marginTop={{ xs: 0, sm: 'auto' }} spacing={3}>
        <Typography component="h3" fontWeight={700} fontSize={28} alignSelf="center">
          Sign Up with Email
        </Typography>
        <Stack spacing={{ xs: 2, sm: 4 }} component="form" onSubmit={handleSubmit(onSubmit)}>
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
      </Stack>
    </MainLayout>
  )
}
