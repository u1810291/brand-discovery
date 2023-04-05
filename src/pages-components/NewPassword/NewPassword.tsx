import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { SpacewiseSVG } from 'src/assets/svg/components'
import { MainLayout } from 'src/layouts/MainLayout'
import { PasswordInput } from 'src/UI/PasswordInput'
import * as yup from 'yup'

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
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<NewPasswordFormType>({
    defaultValues: { password: '', confirmPassword: '' },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: NewPasswordFormType) => {
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
            Continue
          </Button>
        </Stack>
      </Stack>
    </MainLayout>
  )
}
