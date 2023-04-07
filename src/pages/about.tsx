'use client'
import { Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import App from '../components/App'
import { PasswordInput } from '../UI/PasswordInput'

export default function About() {
  const { control } = useForm()
  return (
    <App>
      <Typography>About Page</Typography>
      <Button>Test label</Button>
      <PasswordInput name="name" control={control} />
    </App>
  )
}
