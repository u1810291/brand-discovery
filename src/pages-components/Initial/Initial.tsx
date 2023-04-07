'use client'
import { Button, Stack, styled, Typography, useTheme } from '@mui/material'
import { LogoBackground, SpacewiseSVG } from 'src/assets/svg/components'
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
          <LogoBackground width="100%" height="100%" />
          <TextContainer>
            <SpacewiseSVG />
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

const TextContainer = styled(Stack)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -10%);
`
