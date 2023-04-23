import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import { FC, PropsWithChildren, ReactNode } from 'react'
import { HeartIcon } from 'src/assets/icons/heart'
import ModalBackground from 'src/assets/svg/modal-background.svg'
interface CustomDialogProps extends DialogProps, PropsWithChildren {
  title: string
  subtitle: string
  icon?: ReactNode
}

export const CustomDialog: FC<CustomDialogProps> = ({
  title,
  subtitle,
  open,
  onClose,
  fullWidth = true,
  maxWidth = 'sm',
  icon = <HeartIcon />,
  children,
}) => {
  return (
    <StyledDialog open={open} onClose={onClose} fullWidth={fullWidth} maxWidth={maxWidth}>
      <DialogContent>
        <Stack
          sx={{
            position: 'absolute',
            width: 'calc(100% - 32px);',
            height: '164px',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image
              placeholder="blur"
              blurDataURL={`${ModalBackground}`}
              unoptimized
              src={ModalBackground}
              fill
              style={{ objectFit: 'contain' }}
              alt="Modal background"
            />
            <Stack
              sx={{
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              {icon}
            </Stack>
          </div>
        </Stack>
        <Stack>
          <Typography
            marginTop="184px"
            whiteSpace="pre-wrap"
            textAlign="center"
            fontWeight={700}
            fontSize={24}
            lineHeight="34px"
            marginBottom={2}
          >
            {title}
          </Typography>
          <Typography
            whiteSpace="pre-wrap"
            textAlign="center"
            fontWeight={400}
            fontSize={16}
            lineHeight="22px"
            marginBottom={4}
            color="rgba(57, 63, 62, 1)"
          >
            {subtitle}
          </Typography>
          {children}
        </Stack>
      </DialogContent>
    </StyledDialog>
  )
}

const StyledDialog = styled(Dialog)`
  .MuiDialog-container {
    align-items: center;

    @media screen and (max-width: 450px) {
      align-items: end;
    }
  }

  .MuiPaper-root {
    margin-inline: 0;
    width: 100%;
  }
`
