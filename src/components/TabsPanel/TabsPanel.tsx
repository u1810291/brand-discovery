import { Divider, Stack, Tab, Tabs, TabsProps, styled } from '@mui/material'
import { FC, ReactNode, SyntheticEvent, useState } from 'react'
import { TabPanel } from './components'

type TabsPanelProps = {
  tabs: Array<{ icon: string | React.ReactElement; content: ReactNode }>
} & TabsProps

export const TabsPanel: FC<TabsPanelProps> = ({ tabs, className, ...props }) => {
  const [value, setValue] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Stack spacing={1} className={className} flex={1} divider={<StyledDivider />}>
      <Stack flex={1}>
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            {tab.content}
          </TabPanel>
        ))}
      </Stack>
      <Stack>
        <Tabs value={value} onChange={handleChange} {...props}>
          {tabs.map((tab, index) => (
            <Tab key={index} icon={tab.icon} sx={{width:'25%'}} />
          ))}
        </Tabs>
      </Stack>
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
