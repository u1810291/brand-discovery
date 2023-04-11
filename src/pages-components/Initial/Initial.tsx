'use client'

import Link from 'next/link'
import Image from 'next/image'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import SpacewiseSVG from 'src/assets/svg/spacewise.svg'
import LogoBackground from 'src/assets/svg/logo-background.svg'
import { TextContainer } from './styles'
import { useTheme } from '@mui/material'
import { ROUTES } from 'src/constants/routes'
import { MainLayout } from 'src/layouts/MainLayout'

export const Initial = () => {
  const { palette } = useTheme()
  return (
    <MainLayout>
      <Stack
        direction="column"
        justifyContent="end"
        spacing={{ xs: 20, sm: 30 }}
        paddingBottom={{ xs: 10, sm: 25 }}
        flex={1}
      >
        <Stack position="relative" width={{ xs: 375, sm: 500 }} height={{ xs: 450 }} marginX="auto">
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image src={LogoBackground} fill style={{ objectFit: 'contain' }} alt="Logo background" />
          </div>
          <TextContainer>
            <Image src={SpacewiseSVG} alt="Spacewise" width={261} height={37} />
            <Typography fontWeight={800} fontSize={24} color={palette.primary.main}>
              Brand Discovery
            </Typography>
          </TextContainer>
        </Stack>
        <Button variant="contained" fullWidth>
          <Link href={ROUTES.signIn} style={{ textDecoration: 'none' }}>
            Login
          </Link>
        </Button>
      </Stack>
    </MainLayout>
  )
}
