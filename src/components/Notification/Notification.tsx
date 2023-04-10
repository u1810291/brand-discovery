import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

export function Notification({ text, type, duration }: INotification) {
  console.log(text)
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

interface INotification {
  text: string
  type: 'error' | 'warning' | 'info' | 'success'
  duration?: number
}
