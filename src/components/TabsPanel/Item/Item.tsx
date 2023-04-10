'use client'
import Stack from '@mui/material/Stack'
import { FC, ReactNode } from 'react'

type ItemProps = {
  children: ReactNode
  index: number
  value: number
}

const Item: FC<ItemProps> = ({ index, value, children }) => {
  return (
    <Stack
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Stack flex={1} sx={{ width: '100%', height: '100%' }}>
          {children}
        </Stack>
      )}
    </Stack>
  )
}

export default Item
