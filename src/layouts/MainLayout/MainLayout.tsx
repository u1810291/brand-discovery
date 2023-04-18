'use client'

import ArrowBack from '@mui/icons-material/ArrowBack'
import { styled } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Stack, { StackProps } from '@mui/material/Stack'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'
import { useWindowSize } from 'src/hooks'

type MainLayoutProps = {
  showBackButton?: boolean
  hasPadding?: boolean
} & PropsWithChildren &
  StackProps

export const MainLayout: FC<MainLayoutProps> = ({ children, showBackButton, hasPadding = true, ...props }) => {
  const router = useRouter()
  const { height } = useWindowSize()
  return (
    <Root padding={hasPadding && 3} height={`${height}px`} {...props}>
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
  box-sizing: border-box;
  width: 100%;
  max-width: 900px;
  margin-inline: auto;
  overflow-x: hidden;
`
