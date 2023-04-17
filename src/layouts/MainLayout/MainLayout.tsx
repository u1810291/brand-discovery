'use client'

import { FC, PropsWithChildren } from 'react'
import { styled } from '@mui/material'
import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton'
import ArrowBack from '@mui/icons-material/ArrowBack'
import Stack, { StackProps } from '@mui/material/Stack'

type MainLayoutProps = {
  showBackButton?: boolean
  hasPadding?: boolean
} & PropsWithChildren &
  StackProps

export const MainLayout: FC<MainLayoutProps> = ({ children, showBackButton, hasPadding = true, ...props }) => {
  const router = useRouter()

  return (
    <Root padding={hasPadding && 3} {...props}>
      {showBackButton && (
        <Stack alignItems="start" marginBottom={5}>
          <IconButton onClick={() => router.back()}>
            <ArrowBack />
          </IconButton>
        </Stack>
      )}
      {children}
    </Root>
  )
}

const Root = styled(Stack)`
  height: 100vh;
  box-sizing: border-box;
  width: 100%;
  max-width: 900px;
  margin-inline: auto;
  overflow-x: hidden;
`
