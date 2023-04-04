import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Divider, Stack, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { SpacewiseSVG } from 'src/assets/svg/components'
import { ROUTES } from 'src/constants/routes'
import { MainLayout } from 'src/layouts/MainLayout'
import { InputField } from 'src/UI/InputField'
import { PasswordInput } from 'src/UI/PasswordInput'
import * as yup from 'yup'

type SingInFormType = {
  email: string
  password: string
}

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
})

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

  const onSubmit = (data: SingInFormType) => {
    console.log(data)
  }

  const forgotPassword = () => {
    return
  }

  const { palette } = useTheme()
  return (
    <MainLayout>
      <Stack marginY="auto">
        <Stack alignSelf="center">
          <SpacewiseSVG />
        </Stack>
        <Typography fontWeight={800} fontSize={24} marginTop={5} marginBottom={4} alignSelf="center">
          Login with Spacewise ID
        </Typography>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} width="100%" spacing={{ xs: 4, sm: 6 }}>
          <Stack spacing={{ xs: 3, sm: 5 }}>
            <InputField
              fullWidth
              name="email"
              label="E-mail address"
              placeholder="Enter your email"
              control={control}
            />
            <PasswordInput
              fullWidth
              name="password"
              label="Password"
              placeholder="Enter your password"
              control={control}
              autoComplete="new-password"
            />
            <Button type="button" variant="text" sx={{ width: 'fit-content' }} onClick={forgotPassword}>
              Forgot Password?
            </Button>
          </Stack>
          <Button type="submit" variant="contained" disabled={!isDirty || !isValid || isSubmitting}>
            Login
          </Button>
        </Stack>
        <Divider sx={{ marginBlock: { xs: 4, sm: 6 } }}>OR</Divider>
        <Stack spacing={{ xs: 2, sm: 4 }}>
          <Button
            variant="outlined"
            sx={{ height: 48 }}
            startIcon={<Image src="/images/Google.png" width={41} height={39} alt="Google" />}
          >
            Continue with Google
          </Button>
          <Typography fontWeight={500} fontSize={14} color={palette.grey[600]} alignSelf="center">
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
