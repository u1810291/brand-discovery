import { DialogProps } from '@mui/material/Dialog'
import { FC } from 'react'
import { CustomDialog } from 'src/UI/CustomDialog'

export const LimitModal: FC<DialogProps> = (props) => {
  return (
    <CustomDialog
      title="You’re all out of like."
      subtitle={` You are only have 100 likes per day. \n More likes are coming soon.`}
      {...props}
    ></CustomDialog>
  )
}
