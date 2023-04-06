import { Button, Stack, Typography, useTheme } from '@mui/material'
import { CheckMarkIcon } from 'src/assets/svg/components'
import { MainLayout } from 'src/layouts/MainLayout'

export const VerifyEmail = () => {
  const { palette } = useTheme()
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
          <Button variant="outlined" fullWidth>
            Resend Email
          </Button>
        </Stack>
      </Stack>
    </MainLayout>
  )
}
