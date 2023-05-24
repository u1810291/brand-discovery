/* eslint-disable prettier/prettier */
'use client'

import { useTheme } from '@mui/material'
// import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
// import Link from 'next/link'
import LogoBackground from 'src/assets/svg/logo-background.svg'
import SpacewiseSVG from 'src/assets/svg/spacewise.svg'
import { ROUTES } from 'src/constants/routes'
import { MainLayout } from 'src/layouts/MainLayout'
import { TextContainer } from './styles'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useAppDispatch } from 'src/store'
import { login } from 'src/store/slices/auth'
import firebaseApp from 'src/services/firebase'
import { getAuth } from 'firebase/auth'

const auth = getAuth(firebaseApp())

export const Initial = () => {
  const { palette } = useTheme()
  const router = useRouter()
  const whiteListRoutes = ['resetPassword', 'verifyEmail']
  const [signInWithEmailAndPassword, user] = useSignInWithEmailAndPassword(auth)
  const dispatch = useAppDispatch()

  async function signIn(email, password) {
    await signInWithEmailAndPassword(email, password)
  }
  useEffect(() => {
    const params = new URL(window.location.href)
    if (!!localStorage.getItem('user')) {
      router.replace(ROUTES.home)
    } else if(whiteListRoutes.includes(router.query.mode as string)) {
      router.replace(`/link${window?.location.search}`)
    }
    if (params.searchParams.get('email') && params.searchParams.get('password')) {
      signIn(params.searchParams.get('email'), params.searchParams.get('password')).catch((err) => console.error(err))
    }
  }, [])

  useEffect(() => {
    let timeout = null
    timeout = setTimeout(() => {
      if (user?.user?.uid) {
        dispatch(login(JSON.parse(JSON.stringify(user))))
        router.push(user?.user?.emailVerified ? ROUTES.home : ROUTES.verifyEmail)
      } else {
        router.replace(ROUTES.signIn)}
        clearTimeout(timeout)
        return
      }, 2000)
    return () => {
      clearTimeout(timeout)
    }
  }, [user?.user?.uid])
  return (
    <MainLayout>
      <Stack
        direction="column"
        justifyContent="end"
        spacing={{ xs: 20, sm: 30 }}
        paddingBottom={{ xs: 10, sm: 25 }}
        flex={1}
      >
        <Stack position="relative" width={{ xs: 375, sm: 500 }} height={{ xs: 450 }} marginX="auto">
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image placeholder="blur" blurDataURL={`${LogoBackground}`} unoptimized src={LogoBackground} fill style={{ objectFit: 'contain' }} alt="Logo background" />
          </div>
          <TextContainer>
            <Image placeholder="blur" blurDataURL={`${SpacewiseSVG}`} unoptimized src={SpacewiseSVG} alt="Spacewise" width={261} height={37} />
            <Typography fontWeight={800} fontSize={24} color={palette.primary.main}>
              Brand Discovery
            </Typography>
          </TextContainer>
        </Stack>
        {/* <Link href={ROUTES.signIn} style={{ textDecoration: 'none' }}>
          <Button variant="contained" fullWidth>
            Login
          </Button>
        </Link> */}
      </Stack>
    </MainLayout>
  )
}
