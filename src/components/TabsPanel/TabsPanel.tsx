'use client'
import { styled } from '@mui/material'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Tabs, { TabsProps } from '@mui/material/Tabs'
import { FC, ReactNode, SyntheticEvent, useState } from 'react'
import { Notification } from '../Notification/Notification'
import { Item } from './Item'
import { useRouter } from 'next/router'

type TabsPanelProps = {
  tabs: Array<{ icon: string | React.ReactElement; content: ReactNode; name: string }>
  error: string
  success: string
} & TabsProps

export const TabsPanel: FC<TabsPanelProps> = ({ tabs, className, error, success, ...props }) => {
  const router = useRouter()
  const [value, setValue] = useState(
    router.query.activeTab ? tabs.map((el) => el.name).indexOf(router.query.activeTab as string) : 0,
  )

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
    router.push({ query: { activeTab: tabs[newValue].name } })
  }

  return (
    <Stack className={className} flex={1} maxHeight="100%">
      <Wrapper>
        {tabs.map((tab, index) => (
          <Item key={index} value={value} index={index}>
            {tab.content}
          </Item>
        ))}
      </Wrapper>
      <Container borderTop="1px solid #EAEAE7" height={88} justifyContent="center">
        <Tabs value={value} onChange={handleChange} {...props} sx={{ paddingInline: 3 }}>
          {tabs.map((tab, index) => (
            <Tab key={`${tab.name}-${index}`} icon={tab.icon} sx={{ width: '25%' }} />
          ))}
        </Tabs>
      </Container>
      <Notification type={error ? 'error' : 'success'} text={error || success} />
    </Stack>
  )
}

const Wrapper = styled(Stack)`
  flex: 1;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`

const Container = styled(Stack)`
  .MuiTabs-root {
    @media (max-width: 413px) {
      padding-inline: 0;
    }
  }
`
