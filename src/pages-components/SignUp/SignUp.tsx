'use client'

import { Button, Link, Stack, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import { useSignInWithFacebook, useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { FacebookIcon, SpacewiseSVG } from 'src/assets/svg/components'
import { ROUTES } from 'src/constants/routes'
import { MainLayout } from 'src/layouts/MainLayout'
import { getAuth } from 'firebase/auth'
import firebaseApp from '../../services/firebase'

const auth = getAuth(firebaseApp())

export const SignUp = () => {
  const { palette } = useTheme()
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth)
  const [signInWithFacebook, facebookUser, facebookLoading, facebookError] = useSignInWithFacebook(auth)

  if (googleError || facebookError) {
    return (
      <div>
        <p>Error: {(googleError || facebookError).message}</p>
      </div>
    )
  }
  if (googleLoading || facebookLoading) {
    return <p>Loading...</p>
  }
  if (googleUser || facebookUser) {
    return window.location.replace(ROUTES.initial)
  }
  return (
    <MainLayout showBackButton>
      <Stack marginY="auto" spacing={5}>
        <Stack alignSelf="center">
          <SpacewiseSVG />
          <Typography fontWeight={800} fontSize={24} marginTop={5} alignSelf="center">
            Sign Up
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <Button
            variant="outlined"
            sx={{ height: 48 }}
            startIcon={<Image src="/images/Google.png" width={41} height={39} alt="Google" />}
            onClick={() => signInWithGoogle()}
          >
            Sign up with Google
          </Button>
          {/* <Button
            sx={{ height: 48 }}
            variant="outlined"
            startIcon={<Image src="/images/Linkedin.png" width={50} height={39} alt="Linkedin" />}
          >
            Sign up with Linkedin
          </Button>*/}
          <Button
            sx={{ height: 48 }}
            variant="outlined"
            startIcon={<FacebookIcon />}
            onClick={() => signInWithFacebook()}
          >
            Sign in with Facebook
          </Button>
          <Button sx={{ height: 48 }} variant="outlined" href={ROUTES.signUpWithEmail}>
            Sign up with Email
          </Button>
          <Typography>
            By signing up you confirm that you accept the <Link>Terms of service</Link>, <Link>Privacy policy</Link> and{' '}
            <Link>Acceptable use policy</Link>
          </Typography>
        </Stack>
        <Stack borderRadius={2} overflow="hidden">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            bgcolor="rgba(228, 244, 241, 0.5);"
            width="100%"
            padding={2}
          >
            <Typography fontSize={14} fontWeight={600}>
              Already registered?
            </Typography>
            <Button>Login here</Button>
          </Stack>
        </Stack>
      </Stack>
    </MainLayout>
  )
}
