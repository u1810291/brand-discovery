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
import { SettingsPageFormType, schema } from './helper'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect } from 'react'
import { useUpdateSettings } from 'src/services/useGeoLocation'

export const SettingsPageContent = ({ signOut, setSuccess, loading }) => {
  const dispatch: AppDispatch = useDispatch()
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<SettingsPageFormType>({
    defaultValues: {
      categories: localStorage.getItem('categories') && JSON.parse(localStorage.getItem('categories')),
      distance: 50,
      filterByDistance: true,
      location: localStorage.getItem('location') && JSON.parse(localStorage.getItem('location')),
    },
    values: {
      categories: localStorage.getItem('categories') && JSON.parse(localStorage.getItem('categories')),
      distance: 80,
      filterByDistance: true,
      location: localStorage.getItem('location') && JSON.parse(localStorage.getItem('location')),
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const [updateSettings, success, error] = useUpdateSettings()

  const onSubmit = async (data) => {
    const userId = JSON.parse(localStorage.getItem('user' || null)).uid

    updateSettings({
      uid: userId,
      name: data.location.name,
      latitude: data.location.latitude,
      longitude: data.location.longitude,
      categories: data.categories,
      distance: data.distance,
      filterByDistance: data.filterByDistance,
    })
  }

  return (
    <Stack position="relative" width="100%" height="100%">
      <Stack position="absolute" sx={{ background: 'transparent', height: '100%', width: '100%' }}>
        <Stack
          display="flex"
          flexGrow={1}
          bgcolor="white"
          paddingBottom={2}
          paddingTop={2}
          flexDirection="row"
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Settings
          </Typography>
          <Button type="submit" disabled={!isValid || isSubmitting}>
            Save
          </Button>
        </Stack>
        <StyledDivider />
        <Stack display="flex" flexDirection="column" overflow="hidden" height="100%" sx={{ overflowY: 'scroll' }}>
          <MainSettings control={control} />
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
