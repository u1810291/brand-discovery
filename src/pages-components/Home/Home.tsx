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
import { InitialModal, LimitModal } from 'src/components'
import { TabsPanel } from 'src/components/TabsPanel'
import { ROUTES } from 'src/constants/routes'
import { useToggle } from 'src/hooks'
import { MainLayout } from 'src/layouts/MainLayout'
import firebaseApp from 'src/services/firebase'
import { HomePageContent, LikedPageContent } from './components'
import { companies } from './mock'

const auth = getAuth(firebaseApp())
// TODO: need global state for control limit and initial modal
const isLimitModalOpen = false
export const Home = () => {
  const { push } = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [signOut, loading, errorMessage] = useSignOut(auth)
  const { isOpen: initialModalOpen, close: initialModalClose } = useToggle(true)

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
    { icon: <FavoriteBorderIcon />, content: <LikedPageContent data={companies} /> },
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
              localStorage.setItem('token', '')
            }}
          >
            {loading ? <CircularProgress /> : 'Logout'}
          </Button>
        </Box>
      ),
    },
  ]
  return (
    <MainLayout padding={0}>
      <TabsPanel tabs={tabs} error={error} success={success} />
      <InitialModal open={initialModalOpen} onClose={initialModalClose} userName="Username" />
      <LimitModal open={isLimitModalOpen} />
    </MainLayout>
  )
}
