'use client'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { TextContainer } from './styles'
import { useTheme } from '@mui/material'
import { LogoBackground } from 'src/assets/svg/components'
import { ROUTES } from 'src/constants/routes'
import { MainLayout } from 'src/layouts/MainLayout'
import Image from 'next/image'
import SpacewiseSVG from 'src/assets/svg/components/spacewise.svg'

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
          <LogoBackground width="100%" height="100%" />
          <TextContainer>
            <Image src={SpacewiseSVG} alt="Spacewise" width={261} height={37} />
            <Typography fontWeight={800} fontSize={24} color={palette.primary.main}>
              Brand Discovery
            </Typography>
          </TextContainer>
        </Stack>
        <Button variant="contained" fullWidth href={ROUTES.signIn}>
          Login
        </Button>
      </Stack>
    </MainLayout>
  )
}
