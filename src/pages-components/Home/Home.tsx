'use client'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import SettingsIcon from '@mui/icons-material/Settings'
import Button from '@mui/material/Button'
import { getAuth } from 'firebase/auth'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSignOut } from 'react-firebase-hooks/auth'
import { TabsPanel } from 'src/components/TabsPanel'
import { ROUTES } from 'src/constants/routes'
import { useToggle } from 'src/hooks'
import { MainLayout } from 'src/layouts/MainLayout'
import firebaseApp, { db } from 'src/services/firebase'
import { useAppDispatch, useAppSelector } from 'src/store'
import { UserData } from 'src/store/slices/auth/auth.slice'
import { closeModal, openModal } from 'src/store/slices/modal'
import { EmptyState, HomePageContent, InfoPageContent, LikedPageContent, SettingsPageContent } from './components'
import { companies } from './mock'
import { brandsSelector } from 'src/store/slices/brands'

const auth = getAuth(firebaseApp())

export const Home = () => {
  const router = useRouter()
  const [success, setSuccess] = useState('')
  const [signOut, loading, errorMessage] = useSignOut(auth)
  const dispatch = useAppDispatch()
  const user: UserData = JSON.parse(localStorage.getItem('user') || null)
  const { isOpen: isShowEmptyContent, open: showEmptyContent } = useToggle(false)
  const { brands } = useAppSelector(brandsSelector)
  useEffect(() => {
    const handleClick = async (uid: string) => {
      try {
        const q = query(collection(db(), 'users'), where('uid', '==', uid))
        const docs = await getDocs(q)
        if (docs.docs.length === 0) {
          console.log(`User with UID ${uid} not found.`)
        } else {
          const docId = docs.docs[0].id
          const updatedData = {
            email: auth.currentUser.email,
          }
          await updateDoc(docs.docs[0].ref, updatedData)
          await updateDoc(doc(db(), 'users', docId), { modalShown: true })
          console.log(`User with UID ${uid} updated successfully.`)
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (user?.uid) {
      const q = query(collection(db(), 'users'), where('uid', '==', user?.uid))

      getDocs(q)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0]

            if (!userDoc.data().modalShown) {
              dispatch(
                openModal({
                  title: `Hi ${userDoc.data().firstName}, \n Welcome back`,
                  subTitle: `Now you can start working with \n Spacewise Brand Discovery`,
                  open: true,
                  children: (
                    <Button
                      variant="contained"
                      onClick={() => {
                        dispatch(closeModal())
                        handleClick(user.uid)
                      }}
                    >
                      Start Now
                    </Button>
                  ),
                }),
              ) // Closing paranthesis of dispatch function was missing.
            }
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [user])

  useEffect(() => {
    if (success) {
      setTimeout(() => router.push(ROUTES.root), 100)
    }
  }, [success])

  console.error(brands)
  const tabs = [
    {
      name: 'home',
      icon: <HomeIcon />,
      content: isShowEmptyContent ? (
        <EmptyState
          onClick={() =>
            router.push({
              pathname: ROUTES.home,
              query: {
                activeTab: 'settings',
              },
            })
          }
        />
      ) : (
        <HomePageContent
          data={brands}
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
    { name: 'liked', icon: <FavoriteBorderIcon />, content: <LikedPageContent data={companies} /> },
    { name: 'info', icon: <InfoIcon />, content: <InfoPageContent /> },
    {
      name: 'settings',
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
