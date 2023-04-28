import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

export function Notification({ text, type, duration }: NotificationType) {
  const [open, setOpen] = useState(!!text)
  const handleClose = () => {
    setOpen(false)
  }
  useEffect(() => {
    setOpen(!!text)
  }, [text])
  return (
    <Snackbar open={open} autoHideDuration={duration || 6000} onClose={handleClose}>
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
