/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { styled } from '@mui/material'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { ROUTES } from 'src/constants/routes'
import { usePreviousRoute } from 'src/hooks/usePreviousRoute'
import { useUpdateSettings } from 'src/services/useGeoLocation'
import { AppDispatch, useDispatch } from 'src/store'
import { logout } from 'src/store/slices/auth'
import { notify } from 'src/store/slices/notify'
import { Type } from 'src/store/slices/notify/notify.slice'
import { settingsSelector } from 'src/store/slices/settings'
import { AccountSettings, LegalSettings, MainSettings } from './components'
import { SettingsPageFormType, schema } from './helper'

export const SettingsPageContent = ({ signOut, setSuccess, loading }) => {
  const dispatch: AppDispatch = useDispatch()
  const router = useRouter()
  const { updateSettings, fetchSettings, success, error } = useUpdateSettings()
  const settings = useSelector(settingsSelector)
  const previousRoute = usePreviousRoute()
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<SettingsPageFormType>({
    defaultValues: {
      categories: settings?.categories,
      distance: settings?.distance || 0,
      filterByDistance: settings?.filterByDistance || false,
      location: settings?.location,
    },
    values: {
      categories: settings?.categories,
      distance: settings?.distance,
      filterByDistance: settings?.filterByDistance,
      location: settings?.location,
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
    localStorage.removeItem('distance')
    localStorage.removeItem('filterByDistance')
  }
  useEffect(() => {
    const excludedPaths = [ROUTES.account, ROUTES.categories, ROUTES.location]
    const prevPath = localStorage.getItem('history')
    if (!excludedPaths.includes(prevPath)) {
      const userId = JSON.parse(localStorage.getItem('user')).uid
      fetchSettings(userId)
    }
  }, [])

  useEffect(() => {
    if ((success && typeof success !== 'object') || error) {
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
