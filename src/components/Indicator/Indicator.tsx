import Stack from '@mui/material/Stack'
import { FC } from 'react'

type IndicatorProps = {
  activeIndex: number
  count: number
}
export const Indicator: FC<IndicatorProps> = ({ activeIndex, count }) => {
  const blockArray = Array(count).fill('')

  return (
    <Stack
      direction="row"
      gap={{ xs: '4px', sm: '20px' }}
      height="4px"
      width="calc(100% - 32px)"
      position="absolute"
      left=" 16px"
      top="16px"
      zIndex={2}
    >
      {blockArray.map((item, index) => (
        <Stack
          sx={{ opacity: index <= activeIndex ? '1' : 0.32 }}
          bgcolor="#FFFFFF"
          key={index}
          borderRadius="4px"
          width="100%"
          height="100%"
        />
      ))}
    </Stack>
  )
}
