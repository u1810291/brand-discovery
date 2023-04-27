'use client'

import IconButton from '@mui/material/IconButton'
import ArrowBack from '@mui/icons-material/ArrowBack'
import Stack, { StackProps } from '@mui/material/Stack'
import { styled } from '@mui/material'
import { Modal } from 'src/components'
import { useRouter } from 'next/router'
import { useWindowSize } from 'src/hooks'
import { useSelector } from 'react-redux'
import Notification from 'src/components/Notification'
import { FC, PropsWithChildren, ReactElement, useEffect } from 'react'
import { notifySelector } from 'src/store/slices/notify'
import { ROUTES } from 'src/constants/routes'

type MainLayoutProps = {
  showBackButton?: boolean
  hasPadding?: boolean
  navbar?: ReactElement | null
} & PropsWithChildren &
  StackProps

export const MainLayout: FC<MainLayoutProps> = ({ children, showBackButton, hasPadding = true, navbar, ...props }) => {
  const router = useRouter()
  const { height } = useWindowSize()
  const { message, type } = useSelector(notifySelector)

  useEffect(() => {
    const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
    return () => {
      if ([ROUTES.home, ROUTES.brand, ROUTES.location, ROUTES.thankYou].includes(router.pathname) && !user.isLoggedIn) {
        router.push(ROUTES.root)
      } else if (
        [ROUTES.home, ROUTES.brand, ROUTES.location, ROUTES.thankYou, ROUTES.link].includes(router.pathname) &&
        !user.emailVerified
      ) {
        setTimeout(() => router.push(ROUTES.verifyEmail), 1000)
      }
    }
  }, [])

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
      <Notification text={message} type={type} />
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
