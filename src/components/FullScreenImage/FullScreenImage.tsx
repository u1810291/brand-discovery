import { Close } from '@mui/icons-material'
import { Dialog, IconButton, Stack, Typography, styled } from '@mui/material'
import Image from 'next/image'
import { FC, memo } from 'react'
import { useToggle } from 'src/hooks'

type FullScreenImageProps = {
  image: { src: string; alt: string; width: number; height: number }
  company?: { title: string; image: string }
}

export const FullScreenImage: FC<FullScreenImageProps> = memo(function FullScreen({ image: { alt, ...img }, company }) {
  const { isOpen, open, close } = useToggle(false)
  return (
    <>
      <Image {...img} unoptimized onClick={open} alt={alt} />
      <StyledDialog open={isOpen} onClose={close} fullScreen>
        <Stack direction="row" padding={3} width="100%" alignItems="center" justifyContent="space-between">
          <Stack direction="row" gap="10px" alignItems="center">
            <Stack bgcolor="rgba(255, 255, 255, 0.8)">
              <Image unoptimized src={company?.image} alt="Company logo" width={56} height={56} />
            </Stack>
            <Typography fontWeight={700} fontSize={'16px'} lineHeight={'22px'}>
              {company?.title}
            </Typography>
          </Stack>
          <IconButton onClick={close} sx={{ width: 'fit-content', color: '#fff', zIndex: 4 }}>
            <Close />
          </IconButton>
        </Stack>
        <FullImage unoptimized {...img} alt={alt} />
      </StyledDialog>
    </>
  )
})

const FullImage = styled(Image)`
  position: absolute;
  top: 50%;
  bottom: auto;
  width: calc(100% - 48px);
  height: auto;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  max-width: 900px;
  max-height: 90%;
`

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    background-color: rgba(0, 0, 0, 0.9);
    color: rgba(255, 255, 255, 1);
  }
`
