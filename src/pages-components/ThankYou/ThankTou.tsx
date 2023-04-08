import { Stack, Typography, useTheme } from '@mui/material'
import { SpacewiceBackground, SpacewiseSVG } from 'src/assets/svg/components'
import { MainLayout } from 'src/layouts/MainLayout'

export const ThankYou = () => {
  const { palette } = useTheme()
  return (
    <MainLayout hasPadding={false}>
      <Stack direction="column" bgcolor="#D1EAF1" flex={1} position="relative" alignItems="center">
        <Stack marginTop={{ xs: 13, sm: 25 }} alignItems="center">
          <SpacewiseSVG />
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
          <SpacewiceBackground width="100%" height="100%" />
        </Stack>
      </Stack>
    </MainLayout>
  )
}
