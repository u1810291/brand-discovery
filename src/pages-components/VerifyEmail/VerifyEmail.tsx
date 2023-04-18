'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import { getAuth } from 'firebase/auth'
import { MainLayout } from 'src/layouts/MainLayout'
import { useSendEmailVerification } from 'react-firebase-hooks/auth'
import Image from 'next/image'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import firebaseApp from 'src/services/firebase'
import Typography from '@mui/material/Typography'
import Notification from 'src/components/Notification'
import CircularProgress from '@mui/material/CircularProgress'
import CheckMarkIcon from 'src/assets/svg/check-mark-icon.svg'

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
          <Image
            placeholder="blur"
            blurDataURL={`${CheckMarkIcon}`}
            unoptimized
            src={CheckMarkIcon}
            alt="Spacewise background"
          />
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
