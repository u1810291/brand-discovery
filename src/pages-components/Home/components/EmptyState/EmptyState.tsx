import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { keyframes, styled } from '@mui/material/styles'
import Image from 'next/image'
import { FC } from 'react'
import EmptyStateBackground from 'src/assets/svg/empty-state-background.svg'

type EmptyStateProps = {
  onClick: () => void
}

export const EmptyState: FC<EmptyStateProps> = ({ onClick }) => {
  return (
    <Root paddingTop={{ xs: 11, sm: 17 }}>
      <Stack paddingX={{ xs: 6, sm: 17 }} zIndex={10}>
        <Typography fontSize={40} lineHeight="55px" fontWeight={800} color="rgba(1, 169, 136, 1)">
          Ops, sorry!
        </Typography>
        <Typography marginTop={2} fontSize={16} lineHeight="22px" fontWeight={500} color="rgba(116, 121, 120, 1)">
          We can’t found more brand on your locations.
        </Typography>
        <Typography marginTop={1} fontSize={16} lineHeight="22px" fontWeight={500}>
          Please extend search radius.
        </Typography>
        <Button size="large" variant="contained" sx={{ width: 'fit-content', marginTop: 4 }} onClick={onClick}>
          Change Distance Preference
        </Button>
      </Stack>
      <ImageContainer>
        <Image unoptimized src={EmptyStateBackground} alt="Spacewise" width={261} height={37} />
      </ImageContainer>
    </Root>
  )
}
const ImageContainer = styled(Stack)`
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 100%;
  max-height: 70%;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`

const show = keyframes`
    from { opacity: 0; scale:0.8}
    to { opacity: 1; scale: 1; }
  `

const Root = styled(Stack)`
  position: relative;
  height: 100%;
  transition: scale 0.3 ease-in;
  animation: 1s ${show} ease;
`
