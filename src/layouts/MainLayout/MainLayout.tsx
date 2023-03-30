import { Stack, StackProps, styled } from '@mui/material'
import { FC, PropsWithChildren } from 'react'

export const MainLayout: FC<PropsWithChildren & StackProps> = ({ children, ...props }) => {
  return <Root {...props}>{children}</Root>
}

const Root = styled(Stack)`
  height: 100%;
  min-height: 100vh;
  width: 100%;
  max-width: 900px;
  margin-inline: auto;
`
