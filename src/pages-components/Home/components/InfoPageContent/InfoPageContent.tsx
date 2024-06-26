'use client'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'
import SpacewiseSVG from 'src/assets/svg/spacewise.svg'

export const InfoPageContent = () => {
  const { palette } = useTheme()

  return (
    <Stack direction="column" flex={1} position="relative" alignItems="center" paddingX={3}>
      <Stack paddingTop={{ xs: 5, sm: 10 }} alignItems="center" paddingBottom={{ xs: 0, sm: 3 }}>
        <Image
          placeholder="blur"
          blurDataURL={`${SpacewiseSVG}`}
          unoptimized
          src={SpacewiseSVG}
          alt="Spacewise"
          width={170}
          height={24}
        />
        <Typography fontWeight={800} fontSize={14} color={palette.primary.main} marginTop={{ xs: 1, sm: 3 }}>
          Digital solution for short-term leasing
        </Typography>
        <Stack spacing={2} alignItems="center" marginTop={0.5}>
          <Typography fontWeight={800} fontSize={24} lineHeight="32px" whiteSpace="pre-wrap" color="#393F3E">
            Market & rent out short-term units with ease.
          </Typography>
          <Stack maxHeight={{ sm: '100%', xs: '46%' }}>
            <Image unoptimized src={'/images/InfoContent.png'} alt="Spacewise" width={322} height={254} />
          </Stack>
          <Typography fontWeight={500} fontSize={14} lineHeight="24px" whiteSpace="pre-wrap" color="#393F3E">
            The solution for CRE professionals who want to drive revenue and efficiencies with a centralized, digital
            leasing process.
          </Typography>
          <Stack spacing={2} direction="row" width="100%">
            <Button variant="contained" size="large" href="https://www.spacewise.net/demo/" fullWidth>
              Book A Demo
            </Button>
            <Button variant="contained" size="large" href="https://www.spacewise.net/about-us/" fullWidth>
              Contact Us
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
