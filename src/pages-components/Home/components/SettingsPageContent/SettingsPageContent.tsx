'use client'

import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { styled } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'

export const SettingsPageContent = ({ signOut, setSuccess, loading }) => {
  return (
    <Stack position="relative">
      <Box sx={{ flexGrow: 1, display: 'flex' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          News
        </Typography>
        <Button>Save</Button>
      </Box>
      <StyledDivider />
      <Box sx={{ background: '#F8F9FB', height: 'calc(100% + 100px)', left: 0 }}>
        <List
          sx={{ width: '100%', bgcolor: 'transparent' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Discovery
            </ListSubheader>
          }
        >
          <ListItemButton onClick={() => console.error('error')}>
            <ListItemIcon>Icon</ListItemIcon>
            <ListItemText primary="Inbox" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </List>
        <Button
          fullWidth
          sx={{ height: 48, color: 'black' }}
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
  )
}

const StyledDivider = styled(Divider)`
  margin-top: ${({ theme: { spacing } }) => spacing(2)};
  margin-bottom: ${({ theme: { spacing } }) => spacing(2)};
  position: relative;
  width: calc(100% + 48px);
  left: -24px;
`
