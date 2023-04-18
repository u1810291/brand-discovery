'use client'
import { styled } from '@mui/material'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Tabs, { TabsProps } from '@mui/material/Tabs'
import { FC, ReactNode, SyntheticEvent, useState } from 'react'
import { Notification } from '../Notification/Notification'
import { Item } from './Item'

type TabsPanelProps = {
  tabs: Array<{ icon: string | React.ReactElement; content: ReactNode }>
  error: string
  success: string
} & TabsProps

export const TabsPanel: FC<TabsPanelProps> = ({ tabs, className, error, success, ...props }) => {
  const [value, setValue] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Stack spacing={1} className={className} flex={1}>
      <Stack flex={1}>
        {tabs.map((tab, index) => (
          <Item key={index} value={value} index={index}>
            {tab.content}
          </Item>
        ))}
      </Stack>
      <StyledDivider />
      <Stack>
        <Tabs value={value} onChange={handleChange} {...props}>
          {tabs.map((tab, index) => (
            <Tab key={index} icon={tab.icon} sx={{ width: '25%' }} />
          ))}
        </Tabs>
      </Stack>
      <Notification type={error ? 'error' : 'success'} text={error || success} />
    </Stack>
  )
}

const StyledDivider = styled(Divider)`
  margin-top: ${({ theme: { spacing } }) => spacing(2)};
  margin-bottom: ${({ theme: { spacing } }) => spacing(2)};
  position: relative;
  width: calc(100% + 48px);
  left: -24px;
`
