import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { SpacewiseSVG } from 'src/assets/svg/components'
import { MainLayout } from 'src/layouts/MainLayout'
import { InputField } from 'src/UI/InputField'
import * as yup from 'yup'

type ResetPasswordFormType = {
  email: string
}

const schema = yup.object({
  email: yup.string().required().email(),
})

export const ResetPassword = () => {
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<ResetPasswordFormType>({
    defaultValues: { email: '' },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: ResetPasswordFormType) => {
    console.log(data)
  }

  return (
    <MainLayout showBackButton>
      <Stack marginY="auto" marginTop={{ xs: 0, sm: 'auto' }} spacing={5}>
        <Stack alignSelf="center">
          <SpacewiseSVG />
        </Stack>
        <Typography component="h3" fontWeight={800} fontSize={24} marginTop={5} marginBottom={4} alignSelf="center">
          Reset Password
        </Typography>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} width="100%" spacing={{ xs: 4, sm: 6 }}>
          <Stack>
            <InputField
              fullWidth
              name="email"
              label="E-mail address"
              placeholder="Enter your email"
              control={control}
            />
          </Stack>
          <Button type="submit" variant="contained" disabled={!isDirty || !isValid || isSubmitting}>
            Send me reset password instructions
          </Button>
        </Stack>
        <Button type="button" variant="text" sx={{ width: 'fit-content', alignSelf: 'center' }}>
          Reset via Phone Number
        </Button>
      </Stack>
    </MainLayout>
  )
}
