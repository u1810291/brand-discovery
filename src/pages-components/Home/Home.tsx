'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import firebaseApp from 'src/services/firebase'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import SettingsIcon from '@mui/icons-material/Settings'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { TabsPanel } from 'src/components/TabsPanel'
import { MainLayout } from 'src/layouts/MainLayout'
import { useSignOut } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import { ROUTES } from 'src/constants/routes'

const auth = getAuth(firebaseApp())

export const Home = () => {
  const { push } = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [signOut, loading, errorMessage] = useSignOut(auth)

  useEffect(() => {
    setError(errorMessage?.message)
  }, [errorMessage])

  useEffect(() => {
    if (success) {
      setTimeout(() => push(ROUTES.root), 100)
    }
  }, [success])

  const tabs = [
    { icon: <HomeIcon />, content: <Box>Slider</Box> },
    { icon: <FavoriteBorderIcon />, content: <Box>Like</Box> },
    { icon: <InfoIcon />, content: <Box>Info</Box> },
    {
      icon: <SettingsIcon />,
      content: (
        <Box>
          <Button
            onClick={async () => {
              const success = await signOut()
              if (success) {
                setSuccess('You are signed out')
              }
            }}
          >
            {loading ? <CircularProgress /> : 'Logout'}
          </Button>
        </Box>
      ),
    },
  ]
  return (
    <MainLayout>
      <TabsPanel tabs={tabs} error={error} success={success} />
    </MainLayout>
  )
}
