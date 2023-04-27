'use client'

import { useTheme } from '@mui/material'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { getAuth } from 'firebase/auth'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import SpacewiseBackground from 'src/assets/svg/spacewise-background.svg'
import SpacewiseSVG from 'src/assets/svg/spacewise.svg'
import { ROUTES } from 'src/constants/routes'
import { MainLayout } from 'src/layouts/MainLayout'
import firebaseApp from 'src/services/firebase'
import { useVerifyEmail } from 'src/services/useVerifyEmail'

const auth = getAuth(firebaseApp())

export const ThankYou = () => {
  const { palette } = useTheme()
  const router = useRouter()
  const query = router.query

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [verifyEmail, success, loading, error] = useVerifyEmail(auth)

  useEffect(() => {
    let timeout = null
    if (query?.oobCode) {
      verifyEmail(query.oobCode)
    }
    if (success) {
      timeout = setTimeout(() => {
        router.push(ROUTES.home)
      }, 5000)
    }
    return () => {
      clearInterval(timeout)
    }
  }, [query?.apiKey, success])
  return (
    <MainLayout padding={0}>
      <Stack direction="column" bgcolor="#D1EAF1" flex={1} position="relative" alignItems="center">
        <Stack marginTop={{ xs: 13, sm: 25 }} alignItems="center">
          <Image
            placeholder="blur"
            blurDataURL={`${SpacewiseSVG}`}
            unoptimized
            src={SpacewiseSVG}
            alt="Spacewise"
            width={261}
            height={37}
          />
          <Typography fontWeight={800} fontSize={24} color={palette.primary.main} marginTop={1}>
            Brand Discovery
          </Typography>
          <Typography
            fontWeight={600}
            fontSize={32}
            lineHeight="44px"
            whiteSpace="pre-wrap"
            marginTop={4}
            color="#393F3E"
          >
            Thank you for {'\n'} joining our Beta.
          </Typography>
          <Typography
            fontWeight={400}
            fontSize={24}
            lineHeight="33px"
            whiteSpace="pre-wrap"
            marginTop={3}
            color="#393F3E"
          >
            We&apos;ll review your request and {'\n'} grant you access shortly.
          </Typography>
        </Stack>
        <Stack position="absolute" bottom={0} width="100%" height={{ xs: 380, sm: 500 }}>
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image
              unoptimized
              src={SpacewiseBackground}
              fill
              style={{ objectFit: 'contain' }}
              alt="Spacewise background"
            />
          </div>
        </Stack>
      </Stack>
    </MainLayout>
  )
}
