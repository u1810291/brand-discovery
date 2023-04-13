/* eslint-disable prettier/prettier */
'use client'

import { useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { ROUTES } from 'src/constants/routes'
import { useTheme } from '@mui/material/styles'
import { MainLayout } from 'src/layouts/MainLayout'
import { useSendEmailVerification, useSignInWithFacebook, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import Link from 'next/link'
import Image from 'next/image'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import firebaseApp from 'src/services/firebase'
import Typography from '@mui/material/Typography'
import Notification from 'src/components/Notification'
import CircularProgress from '@mui/material/CircularProgress'
import SpacewiseSVG from 'src/assets/svg/spacewise.svg'
import FacebookIcon from 'src/assets/svg/facebook-icon.svg'

const auth = getAuth(firebaseApp())

export const SignUp = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { palette } = useTheme()
  const { push } = useRouter()
  const [signInWithGoogle, googleUser, , googleError] = useSignInWithGoogle(auth)
  const [signInWithFacebook, facebookUser, , facebookError] = useSignInWithFacebook(auth)
  const [sendEmailVerification, sending, error] = useSendEmailVerification(auth)

  useEffect(() => {
    if (!sending && (!!googleUser?.user?.uid || !!facebookUser?.user?.uid)) {
      localStorage.setItem('uuid', JSON.stringify(googleUser?.user?.uid || facebookUser?.user?.uid))
      push(ROUTES.home)
    }
  }, [googleUser, facebookUser])

  return (
    <MainLayout showBackButton>
      <Stack marginY="auto" marginTop={{ xs: 0, sm: 'auto' }} spacing={5}>
        <Stack alignSelf="center">
          <Image src={SpacewiseSVG} alt="Spacewise" width={261} height={37} />
          <Typography component="h3" fontWeight={800} fontSize={24} marginTop={5} alignSelf="center">
            Sign Up
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <Button
            variant="outlined"
            sx={{ height: 48 }}
            startIcon={<Image src="/images/Google.png" width={41} height={39} alt="Google" />}
            onClick={async () => {
              await signInWithGoogle()
              await sendEmailVerification()
            }}
          >
            {sending ? <CircularProgress color="success" /> : 'Sign up with Google'}
          </Button>
          {/*<Button
            sx={{ height: 48 }}
            variant="outlined"
            startIcon={<Image src="/images/Linkedin.png" width={50} height={39} alt="Linkedin" />}
          >
            Sign up with Linkedin
          </Button>*/}
          <Button
            sx={{ height: 48 }}
            variant="outlined"
            startIcon={<Image src={FacebookIcon} width={24} height={24} alt="facebook icon"/>}
            onClick={async () => {
              await signInWithFacebook()
              await sendEmailVerification()
            }}
          >
            {sending ? <CircularProgress color="success" /> : 'Sign in with Facebook'}
          </Button>
          <Link href={ROUTES.signUpWithEmail} style={{ textDecoration: 'none' }}>
            <Button sx={{ height: 48 }} variant="outlined">
              Sign up with Email
            </Button>
          </Link>
        </Stack>
        <Typography component="span" marginTop={3} color="#9AA09E">
          By signing up you confirm that you accept the{' '}
          <Link href="#" style={{ textDecoration: 'none' }}>
            Terms of service
          </Link>
          ,{' '}
          <Link href="#" style={{ textDecoration: 'none' }}>
            Privacy policy
          </Link>{' '}
          and{' '}
          <Link href="#" style={{ textDecoration: 'none' }}>
            Acceptable use policy
          </Link>
        </Typography>
        <Notification type="error" text={googleError?.message || facebookError?.message || error?.message} />
      </Stack>
    </MainLayout>
  )
}
