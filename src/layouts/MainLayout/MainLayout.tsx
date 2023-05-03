'use client'

import ArrowBack from '@mui/icons-material/ArrowBack'
import { styled } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Stack, { StackProps } from '@mui/material/Stack'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, ReactElement, useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal } from 'src/components'
import Notification from 'src/components/Notification'
import { useWindowSize } from 'src/hooks'
import { notify, notifySelector } from 'src/store/slices/notify'
import { useDispatch } from 'src/store'
import { Type } from 'src/store/slices/notify/notify.slice'

type MainLayoutProps = {
  showBackButton?: boolean
  hasPadding?: boolean
  navbar?: ReactElement | null
} & PropsWithChildren &
  StackProps

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MainLayout: FC<MainLayoutProps> = ({ children, showBackButton, hasPadding = true, navbar, ...props }) => {
  const router = useRouter()
  const { height } = useWindowSize()
  const { message, type } = useSelector(notifySelector)
  const dispatch = useDispatch()
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)

  window.addEventListener('online', () => {
    setIsOnline(true)
  })
  window.addEventListener('offline', () => [setIsOnline(false)])

  useLayoutEffect(() => {
    setIsOnline(navigator.onLine)
    if (!isOnline) {
      dispatch(notify({ type: Type.error, message: 'You are in offline mode' }))
    }
  }, [navigator.onLine])

  return (
    <Root padding={{ xs: 3, sm: 5 }} height={`${height}px`} {...props}>
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
  box-shadow: 0px 16px 64px rgba(179, 180, 174, 0.25);
`
