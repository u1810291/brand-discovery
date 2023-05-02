'use client'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import SettingsIcon from '@mui/icons-material/Settings'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'
import { TabsPanel } from 'src/components/TabsPanel'
import { ROUTES } from 'src/constants/routes'
import { useToggle } from 'src/hooks'
import { MainLayout } from 'src/layouts/MainLayout'
import firebaseApp from 'src/services/firebase'
import { useDispatch } from 'src/store'
import { UserData } from 'src/store/slices/auth/auth.slice'
import { closeModal, openModal } from 'src/store/slices/modal'
import { EmptyState, HomePageContent, LikedPageContent } from './components'
import { SettingsPageContent } from './components/SettingsPageContent'
import { companies } from './mock'

const auth = getAuth(firebaseApp())

export const Home = () => {
  const router = useRouter()
  const [success, setSuccess] = useState('')
  const [signOut, loading, errorMessage] = useSignOut(auth)
  const dispatch = useDispatch()
  const user: UserData = JSON.parse(localStorage.getItem('user') || null)
  const { isOpen: isShowEmptyContent, open: showEmptyContent } = useToggle(false)

  useEffect(() => {
    if (router.pathname === '/home' && Date.parse(new Date().toString()) - user?.lastLoginAt < 100) {
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
    }
  }, [])

  useEffect(() => {
    if (success) {
      setTimeout(() => router.push(ROUTES.root), 100)
    }
  }, [success])

  const tabs = [
    {
      icon: <HomeIcon />,
      content: isShowEmptyContent ? (
        <EmptyState
          onClick={() => {
            return
          }}
        />
      ) : (
        <HomePageContent
          data={companies}
          likeAction={() => {
            return
          }}
          dislikeAction={() => {
            return
          }}
          finishAction={showEmptyContent}
        />
      ),
    },
    { icon: <FavoriteBorderIcon />, content: <LikedPageContent data={companies} /> },
    { icon: <InfoIcon />, content: <Box>Info</Box> },
    {
      icon: <SettingsIcon />,
      content: <SettingsPageContent setSuccess={setSuccess} signOut={signOut} loading={loading} />,
    },
  ]
  return (
    <MainLayout padding={0} sx={{ background: '#F8F9FB' }}>
      <TabsPanel tabs={tabs} error={errorMessage?.message} success={success} />
      {/* <LimitModal open={isLimitModalOpen} /> */}
    </MainLayout>
  )
}
