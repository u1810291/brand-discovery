'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { styled, useTheme } from '@mui/material'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { getAuth } from 'firebase/auth'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { useForm } from 'react-hook-form'
import SpacewiseSVG from 'src/assets/svg/spacewise.svg'
import { InputField } from 'src/components/InputField'
import { PasswordInput } from 'src/components/PasswordInput'
import { ROUTES } from 'src/constants/routes'
import { MainLayout } from 'src/layouts/MainLayout'
import firebaseApp from 'src/services/firebase'
import { useAppDispatch } from 'src/store'
import { login } from 'src/store/slices/auth'
import { notify } from 'src/store/slices/notify'
import { Type } from 'src/store/slices/notify/notify.slice'
import { SingInFormType, schema } from './helper'
import { formattedMessage } from 'src/utils/formatErrors'

const auth = getAuth(firebaseApp())

export const SignIn = () => {
  const dispatch = useAppDispatch()
  const { palette } = useTheme()
  const router = useRouter()

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<SingInFormType>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth)
  const onSubmit = async (data: SingInFormType) => {
    await signInWithEmailAndPassword(data.email, data.password)
  }

  useEffect(() => {
    if (user?.user?.uid) {
      dispatch(login(JSON.parse(JSON.stringify(user))))
      router.push(user?.user?.emailVerified ? ROUTES.home : ROUTES.verifyEmail)
    }
  }, [user?.user?.uid])

  useEffect(() => {
    if (error?.message) {
      dispatch(
        notify({
          type: Type.error,
          message: formattedMessage(error?.message),
        }),
      )
    }
  }, [error])

  const videoElement = document.createElement('video')
  const videoSupport = typeof videoElement.play === 'function'

  const userAgent = navigator.userAgent.toLowerCase()
  const isIos = /iphone|ipad|ipod/.test(userAgent)

  if (localStorage.getItem('walkthroughCompleted') || !videoSupport || isIos) {
    return (
      <MainLayout id="main-layout">
        <Stack marginY="auto">
          <Stack alignSelf="center">
            <Image
              placeholder="blur"
              blurDataURL={`${SpacewiseSVG}`}
              unoptimized
              src={SpacewiseSVG}
              alt="Spacewise"
              width={261}
              height={37}
            />
          </Stack>
          <Typography component="h3" fontWeight={800} fontSize={24} marginTop={5} marginBottom={4} alignSelf="center">
            Login with Spacewise ID
          </Typography>
          <Stack
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            width="100%"
            spacing={{ xs: 4, sm: 6 }}
          >
            <Stack spacing={{ xs: 3, sm: 5 }}>
              <InputField
                fullWidth
                name="email"
                label="E-mail address"
                placeholder="Enter your email"
                control={control}
                autoComplete="nope"
              />
              <PasswordInput
                fullWidth
                name="password"
                label="Password"
                placeholder="Enter your password"
                control={control}
                autoComplete="nope"
              />
              <Button type="button" variant="text" sx={{ width: 'fit-content' }}>
                <Link
                  href={ROUTES.resetPassword}
                  style={{ textDecoration: 'none', width: '100%', height: '100%', color: 'inherit' }}
                >
                  Forgot Password?
                </Link>
              </Button>
            </Stack>
            <Button type="submit" variant="contained" disabled={!isDirty || !isValid || isSubmitting}>
              {loading ? <CircularProgress color="success" size={24} /> : 'Login'}
            </Button>
          </Stack>
          <StyledDivider sx={{ marginBlock: { xs: 4, sm: 6 } }}>OR</StyledDivider>
          <Stack spacing={{ xs: 2, sm: 4 }}>
            <Typography component="h5" fontWeight={500} fontSize={14} color={palette.grey[600]} alignSelf="center">
              Are you new to Spacewise?
            </Typography>
            <Button fullWidth variant="outlined">
              <Link
                href={ROUTES.signUpWithEmail}
                style={{
                  textDecoration: 'none',
                  width: '100%',
                  height: '100%',
                  color: 'inherit',
                  textAlign: 'center',
                }}
              >
                Create new account
              </Link>
            </Button>
          </Stack>
        </Stack>
      </MainLayout>
    )
  } else router.push(ROUTES.walkThrough)
}

const StyledDivider = styled(Divider)`
  ::after,
  ::before {
    transform: translateY(0);
  }
`
