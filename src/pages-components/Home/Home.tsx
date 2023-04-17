'use client'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import SettingsIcon from '@mui/icons-material/Settings'
import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'
import { TabsPanel } from 'src/components/TabsPanel'
import { ROUTES } from 'src/constants/routes'
import { MainLayout } from 'src/layouts/MainLayout'
import firebaseApp from 'src/services/firebase'
import { HomePageContent } from './components'
import { companies } from './mock'

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
    {
      icon: <HomeIcon />,
      content: (
        <HomePageContent
          data={companies}
          likeAction={() => {
            return
          }}
          dislikeAction={() => {
            return
          }}
        />
      ),
    },
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
    <MainLayout padding={3} paddingTop={5}>
      <TabsPanel tabs={tabs} error={error} success={success} />
    </MainLayout>
  )
}
