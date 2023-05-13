'use client'

import { useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { getAuth } from 'firebase/auth'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSendEmailVerification } from 'react-firebase-hooks/auth'
import CheckMarkIcon from 'src/assets/svg/check-mark-icon.svg'
import { MainLayout } from 'src/layouts/MainLayout'
import firebaseApp from 'src/services/firebase'
import { useAppDispatch } from 'src/store'
import { notify } from 'src/store/slices/notify'
import { Type } from 'src/store/slices/notify/notify.slice'

const auth = getAuth(firebaseApp())

export const VerifyEmail = () => {
  const { palette } = useTheme()
  const [sendEmailVerification, sending, error] = useSendEmailVerification(auth)
  const [success, setSuccess] = useState<string>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (error?.message || success) {
      dispatch(
        notify({
          type: error?.message ? Type.error : Type.success,
          message: error?.message || success,
        }),
      )
    }
  }, [error])

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
            {sending ? <CircularProgress size={24} /> : 'Resend Email'}
          </Button>
        </Stack>
      </Stack>
    </MainLayout>
  )
}
