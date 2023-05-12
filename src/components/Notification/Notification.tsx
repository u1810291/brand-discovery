import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useAppDispatch, useAppSelector } from 'src/store'
import { notifyClose, selectors } from 'src/store/slices/notify'

export function Notification({ text, type, duration }: NotificationType) {
  const dispatch = useAppDispatch()
  const open = useAppSelector(selectors.isShowNotifySelector)

  const handleClose = () => {
    dispatch(notifyClose())
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration || 6000}
      onClose={handleClose}
      sx={{ zIndex: 10 }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  )
}

type NotificationType = {
  text: string
  type: 'error' | 'warning' | 'info' | 'success'
  duration?: number
}
