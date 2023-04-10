import { useState } from 'react'
import Notification from 'src/components/Notification'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import { getAuth } from 'firebase/auth'
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import SpacewiseSVG from 'src/assets/svg/components/spacewise.svg'
import { MainLayout } from 'src/layouts/MainLayout'
import { InputField } from 'src/UI/InputField'
import * as yup from 'yup'
import firebaseApp from 'src/services/firebase'
import Image from 'next/image'

const auth = getAuth(firebaseApp())

type ResetPasswordFormType = {
  email: string
}

const schema = yup.object({
  email: yup.string().required().email(),
})

export const ResetPassword = () => {
  const [success, setSuccess] = useState('')
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<ResetPasswordFormType>({
    defaultValues: { email: '' },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth)

  const onSubmit = async (data: ResetPasswordFormType) => {
    const success = await sendPasswordResetEmail(data.email)
    if (success) {
      setSuccess('Sent email')
    }
  }

  return (
    <MainLayout showBackButton>
      <Stack marginY="auto" marginTop={{ xs: 0, sm: 'auto' }} spacing={5}>
        <Stack alignSelf="center">
          <Image src={SpacewiseSVG} alt="Spacewise" width={261} height={37} />
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
            {sending ? <CircularProgress /> : 'Send me reset password instructions'}
          </Button>
        </Stack>
        <Button type="button" variant="text" sx={{ width: 'fit-content', alignSelf: 'center' }}>
          Reset via Phone Number
        </Button>
        <Notification type={!!error ? 'error' : 'success'} text={error?.message || success} />
      </Stack>
    </MainLayout>
  )
}
