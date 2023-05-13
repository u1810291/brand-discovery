'use client'

import ArrowBack from '@mui/icons-material/ArrowBack'
import { styled } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Stack, { StackProps } from '@mui/material/Stack'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, ReactElement, useLayoutEffect, useRef, useState } from 'react'
import { Modal } from 'src/components'
import Notification from 'src/components/Notification'
import { useClickOutside, useWindowSize } from 'src/hooks'
import { useAppDispatch, useAppSelector } from 'src/store'
import { closeModal } from 'src/store/slices/modal'
import { notify, selectors } from 'src/store/slices/notify'
import { Type } from 'src/store/slices/notify/notify.slice'

type MainLayoutProps = {
  showBackButton?: boolean
  navbar?: ReactElement | null
  headerProps?: StackProps
} & PropsWithChildren &
  StackProps

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MainLayout: FC<MainLayoutProps> = ({ children, showBackButton, navbar, headerProps, ...props }) => {
  const router = useRouter()
  const { height } = useWindowSize()
  const { message, type } = useAppSelector(selectors.notifySelector)
  const dispatch = useAppDispatch()
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)
  const modalRef = useRef<HTMLDivElement | null>(null)

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

  useClickOutside(modalRef, () => dispatch(closeModal()))

  return (
    <Root padding={{ xs: 3, sm: 5 }} height={`${height}px`} {...props}>
      {showBackButton && (
        <Stack
          alignItems="center"
          marginBottom={{ xs: 2.5, sm: 5 }}
          display="flex"
          flexDirection="row"
          {...headerProps}
        >
          <IconButton onClick={() => router.back()}>
            <ArrowBack />
          </IconButton>
          {navbar}
        </Stack>
      )}
      {children}
      <Modal modalRef={modalRef} />
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
