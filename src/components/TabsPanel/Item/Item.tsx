'use client'
import { FC, ReactNode } from 'react'
import Stack from '@mui/material/Stack'

type ItemProps = {
  children: ReactNode
  index: number
  value: number
}

export const Item: FC<ItemProps> = ({ index, value, children }) => {
  return (
    <Stack
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      height={value === index ? '100%' : 0}
    >
      {value === index && (
        <Stack flex={1} sx={{ width: '100%', height: '100%' }}>
          {children}
        </Stack>
      )}
    </Stack>
  )
}
