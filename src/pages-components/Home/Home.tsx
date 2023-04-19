'use client'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import SettingsIcon from '@mui/icons-material/Settings'
import Box from '@mui/material/Box'
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
import { HomePageContent } from './components'
import { companies } from './mock'
import { SettingsPageContent } from './components/SettingsPageContent'

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
    { icon: <FavoriteBorderIcon />, content: <Box>Like</Box> },
    { icon: <InfoIcon />, content: <Box>Info</Box> },
    {
      icon: <SettingsIcon />,
      content: <SettingsPageContent setSuccess={setSuccess} signOut={signOut} loading={loading} />,
    },
  ]
  return (
    <MainLayout padding={3} paddingTop={5} sx={{ background: '#F8F9FB' }}>
      <TabsPanel tabs={tabs} error={error} success={success} />
      <InitialModal open={initialModalOpen} onClose={initialModalClose} userName="Username" />
      <LimitModal open={isLimitModalOpen} />
    </MainLayout>
  )
}
