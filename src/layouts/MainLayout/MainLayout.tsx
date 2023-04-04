import { ArrowBack } from '@mui/icons-material'
import { IconButton, Stack, StackProps, styled } from '@mui/material'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

type MainLayoutProps = {
  showBackButton?: boolean
} & PropsWithChildren &
  StackProps

export const MainLayout: FC<MainLayoutProps> = ({ children, showBackButton, ...props }) => {
  const router = useRouter()

  return (
    <Root {...props}>
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
  height: 100%;
  min-height: 100vh;
  width: 100%;
  max-width: 900px;
  margin-inline: auto;
  padding: ${({ theme: { spacing } }) => spacing(3)};
`
