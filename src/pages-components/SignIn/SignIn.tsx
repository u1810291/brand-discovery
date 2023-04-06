'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { getAuth } from 'firebase/auth'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import { InputField } from 'src/UI/InputField'
import { PasswordInput } from 'src/UI/PasswordInput'
import { SpacewiseSVG } from 'src/assets/svg/components'
import { ROUTES } from 'src/constants/routes'
import { MainLayout } from 'src/layouts/MainLayout'
import * as yup from 'yup'
import firebaseApp from '../../services/firebase'

type SingInFormType = {
  email: string
  password: string
}

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
})

const auth = getAuth(firebaseApp())

export const SignIn = () => {
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
  const onSubmit = async (data: SingInFormType) => {
    await signInWithEmailAndPassword(data.email, data.password)
    if (user) {
      console.log(user)
      return window.location.replace(ROUTES.initial)
    }
  }

  const { palette } = useTheme()
  return (
    <MainLayout>
      <Stack marginY="auto">
        <Stack alignSelf="center">
          <SpacewiseSVG />
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
            <Button type="button" variant="text" sx={{ width: 'fit-content' }} href={ROUTES.resetPassword}>
              Forgot Password?
            </Button>
          </Stack>
          <Button type="submit" variant="contained" disabled={!isDirty || !isValid || isSubmitting}>
            Login
          </Button>
        </Stack>
        <Divider sx={{ marginBlock: { xs: 4, sm: 6 } }}>OR</Divider>
        <Stack spacing={{ xs: 2, sm: 4 }}>
          <Typography component="h5" fontWeight={500} fontSize={14} color={palette.grey[600]} alignSelf="center">
            Are you new to Spacewise?
          </Typography>
          <Button fullWidth variant="outlined" href={ROUTES.signUp}>
            Create new account
          </Button>
        </Stack>
      </Stack>
    </MainLayout>
  )
}
