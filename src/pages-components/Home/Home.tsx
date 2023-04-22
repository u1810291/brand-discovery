'use client'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import firebaseApp from 'src/services/firebase'
import SettingsIcon from '@mui/icons-material/Settings'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { companies } from './mock'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useDispatch } from 'src/store'
import { useEffect, useState } from 'react'
import { ROUTES } from 'src/constants/routes'
import { HomePageContent } from './components'
import { MainLayout } from 'src/layouts/MainLayout'
import { TabsPanel } from 'src/components/TabsPanel'
import { useSignOut } from 'react-firebase-hooks/auth'
import { closeModal, openModal } from 'src/store/slices/modal'
import { SettingsPageContent } from './components/SettingsPageContent'

const auth = getAuth(firebaseApp())
// TODO: need global state for control limit and initial modal
export const Home = () => {
  const { push } = useRouter()
  const [success, setSuccess] = useState('')
  const [signOut, loading, errorMessage] = useSignOut(auth)
  const dispatch = useDispatch()
  dispatch(
    openModal({
      title: `Hi Username, \n Welcome back`,
      subTitle: `Now you can start working with \n Spacewise Brand Discovery`,
      open: true,
      children: (
        <Button variant="contained" onClick={() => dispatch(closeModal())}>
          Start Now
        </Button>
      ),
    }),
  )

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
      <TabsPanel tabs={tabs} error={errorMessage?.message} success={success} />
      {/* <LimitModal open={isLimitModalOpen} /> */}
    </MainLayout>
  )
}
