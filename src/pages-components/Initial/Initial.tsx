/* eslint-disable prettier/prettier */
'use client'

import { useTheme } from '@mui/material'
// import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
// import Link from 'next/link'
import LogoBackground from 'src/assets/svg/logo-background.svg'
import SpacewiseSVG from 'src/assets/svg/spacewise.svg'
import { ROUTES } from 'src/constants/routes'
import { MainLayout } from 'src/layouts/MainLayout'
import { TextContainer } from './styles'
import { useRouter } from 'next/router'

export const Initial = () => {
  const { palette } = useTheme()
  const router = useRouter()
  const whiteListRoutes = ['resetPassword', 'verifyEmail']
  // TODO: needs to be updated more smart way for redirects

  if (!!localStorage.getItem('user')) {
    router.replace(ROUTES.home)
  } else if(whiteListRoutes.includes(router.query.mode as string)) {
    router.replace(`/link${window.location.search}`)
  } else {
    setTimeout(() => router.replace(ROUTES.signIn), 2000)
  }

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
            <Image placeholder="blur" blurDataURL={`${LogoBackground}`} unoptimized src={LogoBackground} fill style={{ objectFit: 'contain' }} alt="Logo background" />
          </div>
          <TextContainer>
            <Image placeholder="blur" blurDataURL={`${SpacewiseSVG}`} unoptimized src={SpacewiseSVG} alt="Spacewise" width={261} height={37} />
            <Typography fontWeight={800} fontSize={24} color={palette.primary.main}>
              Brand Discovery
            </Typography>
          </TextContainer>
        </Stack>
        {/* <Link href={ROUTES.signIn} style={{ textDecoration: 'none' }}>
          <Button variant="contained" fullWidth>
            Login
          </Button>
        </Link> */}
      </Stack>
    </MainLayout>
  )
}
