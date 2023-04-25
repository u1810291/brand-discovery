'use client'

import IconButton from '@mui/material/IconButton'
import ArrowBack from '@mui/icons-material/ArrowBack'
import Stack, { StackProps } from '@mui/material/Stack'
import { styled } from '@mui/material'
import { Modal } from 'src/components'
import { useRouter } from 'next/router'
import { useWindowSize } from 'src/hooks'
import { useSelector } from 'react-redux'
import { ROUTES } from 'src/constants/routes'
import { authSelector } from 'src/store/slices/auth'
import { FC, PropsWithChildren, ReactElement, useLayoutEffect } from 'react'
import { UserData } from 'src/store/slices/auth/auth.slice'

type MainLayoutProps = {
  showBackButton?: boolean
  hasPadding?: boolean
  navbar?: ReactElement | null
} & PropsWithChildren &
  StackProps

export const MainLayout: FC<MainLayoutProps> = ({ children, showBackButton, hasPadding = true, navbar, ...props }) => {
  const router = useRouter()
  const { height } = useWindowSize()
  const { user } = useSelector(authSelector)
  const userData: UserData = JSON.parse(localStorage.getItem('user') || null)

  //TODO: Needs to be fixed redirect
  useLayoutEffect(() => {
    // if (!userData?.emailVerified && userData?.refreshToken) {
    //   router.push(ROUTES.verifyEmail)
    // } else if (!userData?.isLoggedIn && userData?.emailVerified) {
    //   console.error(user)
    //   router.push(ROUTES.home)
    // } else {
    //   // router.push(ROUTES.root)
    // }
  }, [user])

  return (
    <Root padding={hasPadding && 3} height={`${height}px`} {...props}>
      {showBackButton && (
        <Stack alignItems="center" marginBottom={{ xs: 2.5, sm: 5 }} display="flex" flexDirection="row">
          <IconButton onClick={() => router.back()}>
            <ArrowBack />
          </IconButton>
          {navbar}
        </Stack>
      )}
      {children}
      <Modal />
    </Root>
  )
}

const Root = styled(Stack)`
  box-sizing: border-box;
  width: 100%;
  max-width: 900px;
  margin-inline: auto;
  overflow-x: hidden;
`
