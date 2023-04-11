'use client'

import { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useTheme } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { ROUTES } from 'src/constants/routes'
import { SingInFormType, schema } from './helper'
import { MainLayout } from 'src/layouts/MainLayout'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputField } from 'src/components/InputField'
import { PasswordInput } from 'src/components/PasswordInput'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { Notification } from 'src/components/Notification/Notification'
import Link from 'next/link'
import Image from 'next/image'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import firebaseApp from 'src/services/firebase'
import Typography from '@mui/material/Typography'
import SpacewiseSVG from 'src/assets/svg/spacewise.svg'
import CircularProgress from '@mui/material/CircularProgress'

const auth = getAuth(firebaseApp())

export const SignIn = () => {
  const { push } = useRouter()
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<SingInFormType>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth)
  const onSubmit = async (data: SingInFormType) => {
    await signInWithEmailAndPassword(data.email, data.password)
  }

  useEffect(() => {
    if (!!user?.user?.uid) {
      localStorage.setItem('uuid', JSON.stringify(user?.user?.uid))
      push('/home')
    }
  }, [user])

  const { palette } = useTheme()

  return (
    <MainLayout id="main-layout">
      <Stack marginY="auto">
        <Stack alignSelf="center">
          <Image src={SpacewiseSVG} alt="Spacewise" width={261} height={37} />
        </Stack>
        <Typography component="h3" fontWeight={800} fontSize={24} marginTop={5} marginBottom={4} alignSelf="center">
          Login with Spacewise ID
        </Typography>
        <Stack
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          width="100%"
          spacing={{ xs: 4, sm: 6 }}
        >
          <Stack spacing={{ xs: 3, sm: 5 }}>
            <InputField
              fullWidth
              name="email"
              label="E-mail address"
              placeholder="Enter your email"
              control={control}
              autoComplete="nope"
            />
            <PasswordInput
              fullWidth
              name="password"
              label="Password"
              placeholder="Enter your password"
              control={control}
              autoComplete="nope"
            />
            <Link href={ROUTES.resetPassword} style={{ textDecoration: 'none' }}>
              <Button type="button" variant="text" sx={{ width: 'fit-content' }}>
                Forgot Password?
              </Button>
            </Link>
          </Stack>
          <Button type="submit" variant="contained" disabled={!isDirty || !isValid || isSubmitting}>
            {loading ? <CircularProgress color="success" /> : 'Login'}
          </Button>
        </Stack>
        <Divider sx={{ marginBlock: { xs: 4, sm: 6 } }}>OR</Divider>
        <Stack spacing={{ xs: 2, sm: 4 }}>
          <Typography component="h5" fontWeight={500} fontSize={14} color={palette.grey[600]} alignSelf="center">
            Are you new to Spacewise?
          </Typography>
          <Link href={ROUTES.signUp} style={{ textDecoration: 'none' }}>
            <Button fullWidth variant="outlined" href={ROUTES.signUp}>
              Create new account
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Notification text={error?.message} type="error" />
    </MainLayout>
  )
}
