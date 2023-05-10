/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { styled } from '@mui/material'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useForm } from 'react-hook-form'
import { AppDispatch, useDispatch } from 'src/store'
import { logout } from 'src/store/slices/auth'
import { AccountSettings, LegalSettings, MainSettings } from './components'
import { SettingsPageFormType, schema } from './helper'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect } from 'react'
import { useUpdateSettings } from 'src/services/useGeoLocation'
import { settingsSelector } from 'src/store/slices/settings'
import { useSelector } from 'react-redux'
import { notify } from 'src/store/slices/notify'
import { Type } from 'src/store/slices/notify/notify.slice'

export const SettingsPageContent = ({ signOut, setSuccess, loading }) => {
  const dispatch: AppDispatch = useDispatch()
  const { updateSettings, fetchSettings, success, error } = useUpdateSettings()
  const settings = useSelector(settingsSelector)
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<SettingsPageFormType>({
    defaultValues: {
      categories: settings?.categories?.length
        ? settings?.categories
        : JSON.parse(localStorage.getItem('categories' || null)),
      distance: settings?.distance || 50,
      filterByDistance: settings?.filterByDistance || false,
      location:
        JSON.parse(localStorage.getItem('location' || null)) &&
        Object.keys(JSON.parse(localStorage.getItem('location' || null))).length !== 0
          ? JSON.parse(localStorage.getItem('location' || null))
          : settings?.location,
    },
    values: {
      categories: settings?.categories?.length
        ? settings?.categories
        : JSON.parse(localStorage.getItem('categories' || null)),
      distance: settings?.distance || 50,
      filterByDistance: settings?.filterByDistance || false,
      location:
        JSON.parse(localStorage.getItem('location' || null)) &&
        Object.keys(JSON.parse(localStorage.getItem('location' || null))).length !== 0
          ? JSON.parse(localStorage.getItem('location' || null))
          : settings?.location,
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data) => {
    const userId = JSON.parse(localStorage.getItem('user')).uid

    updateSettings({
      uid: userId,
      location: data.location,
      categories: data.categories,
      distance: data.distance,
      filterByDistance: data.filterByDistance,
    })
    localStorage.removeItem('categories')
    localStorage.removeItem('location')
  }
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user')).uid
    fetchSettings(userId)
  }, [])

  useEffect(() => {
    if (typeof success !== 'object' || error) {
      dispatch(
        notify({
          type: error ? Type.error : Type.success,
          message: error ? error : success,
        }),
      )
    }
  }, [success, error])

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
            {loading ? <CircularProgress size={24} /> : 'Logout'}
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
