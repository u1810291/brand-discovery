/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { styled } from '@mui/material'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { AppDispatch, useDispatch } from 'src/store'
import { logout } from 'src/store/slices/auth'
import { AccountSettings, LegalSettings, MainSettings } from './components'
import { SettingsPageFormType, defaultValues, schema } from './helper'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

export const SettingsPageContent = ({ signOut, setSuccess, loading }) => {
  const dispatch: AppDispatch = useDispatch()

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<SettingsPageFormType>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    console.error('first')
  }

  return (
    <Stack position="relative" width="100%" height="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack position="absolute" sx={{ background: 'transparent', height: '100%', width: '100%' }}>
        <Stack display="flex" flexGrow={1} bgcolor="white" paddingBottom={2} paddingTop={2} flexDirection="row">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Settings
          </Typography>
          <Button type="submit" disabled={!isDirty || !isValid || isSubmitting}>
            Save
          </Button>
        </Stack>
        <StyledDivider />
        <Stack display="flex" flexDirection="column" overflow="hidden" height="100%" sx={{ overflowY: 'scroll' }}>
          <MainSettings />
          <AccountSettings />
          <LegalSettings />
          <Button
            fullWidth
            sx={{ height: 48, color: 'black', background: 'white', marginTop: 3, marginBottom: 3 }}
            onClick={async () => {
              const success = await signOut()
              if (success) {
                setSuccess('You are signed out')
                dispatch(logout())
              }
            }}
          >
            {loading ? <CircularProgress /> : 'Logout'}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

const StyledDivider = styled(Divider)`
  position: relative;
  width: 100%;
`
