import Button from '@mui/material/Button'
import { DialogProps } from '@mui/material/Dialog'
import { FC } from 'react'
import { CustomDialog } from 'src/UI/CustomDialog'

interface InitialModalProps extends DialogProps {
  userName: string
}

export const InitialModal: FC<InitialModalProps> = ({ userName, ...props }) => {
  return (
    <CustomDialog
      title={`Hi ${userName}, \n Welcome back`}
      subtitle={` Now you can start working with \n Spacewise Brand Discovery`}
      {...props}
    >
      <Button variant="contained" onClick={() => props.onClose({}, 'escapeKeyDown')}>
        Start Now
      </Button>
    </CustomDialog>
  )
}
