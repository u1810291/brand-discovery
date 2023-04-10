import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Notification from 'src/components/Notification'
import { getAuth } from 'firebase/auth'
import { useSendEmailVerification } from 'react-firebase-hooks/auth'
import { CheckMarkIcon } from 'src/assets/svg/components'
import { MainLayout } from 'src/layouts/MainLayout'
import firebaseApp from 'src/services/firebase'
import { useTheme } from '@mui/material'
import { useState } from 'react'

const auth = getAuth(firebaseApp())

export const VerifyEmail = () => {
  const { palette } = useTheme()
  const [sendEmailVerification, sending, error] = useSendEmailVerification(auth)
  const [success, setSuccess] = useState<string>()
  return (
    <MainLayout showBackButton>
      <Stack flex={1} marginTop={{ xs: 10, sm: 20 }}>
        <Stack
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            backgroundColor: palette.primary.light,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
        >
          <CheckMarkIcon />
        </Stack>
        <Typography fontSize={24} fontWeight={800} lineHeight="40px" textAlign="center" marginTop={{ xs: 3, sm: 10 }}>
          Verify your email address
        </Typography>
        <Stack spacing={{ xs: 1, sm: 5 }} direction="row" marginTop={{ xs: 3, sm: 10 }}>
          <Button variant="contained" fullWidth href="https://mail.google.com/mail">
            Open Gmail
          </Button>
          <Button
            variant="outlined"
            onClick={async () => {
              const res = await sendEmailVerification()
              if (res) setSuccess('Sent email')
            }}
            fullWidth
          >
            {sending ? <CircularProgress /> : 'Resend Email'}
          </Button>
        </Stack>
        <Notification text={error?.message || success} type={error ? 'error' : 'success'} />
      </Stack>
    </MainLayout>
  )
}
