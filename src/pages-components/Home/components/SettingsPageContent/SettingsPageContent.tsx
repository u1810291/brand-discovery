'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import { styled } from '@mui/material'
import { AccountSettings, LegalSettings, MainSettings } from './components'

export const SettingsPageContent = ({ signOut, setSuccess, loading }) => {
  return (
    <Stack position="relative" width="100%" height="90%">
      <Stack
        position="absolute"
        sx={{ background: 'transparent', height: 'calc(100% + 100px)', width: 'calc(100% + 50px)' }}
        left={-25}
        top={-40}
      >
        <Box sx={{ display: 'flex', flexGrow: 1, background: 'white', paddingBottom: 2, paddingTop: 2 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Settings
          </Typography>
          <Button>Save</Button>
        </Box>
        <StyledDivider />
        <Box
          sx={{
            height: 'calc(100% + 100px)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            overflowY: 'scroll',
          }}
        >
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
                localStorage.setItem('token', '')
              }
            }}
          >
            {loading ? <CircularProgress /> : 'Logout'}
          </Button>
        </Box>
      </Stack>
    </Stack>
  )
}

const StyledDivider = styled(Divider)`
  position: relative;
  width: calc(100% + 48px);
  left: -24px;
`
