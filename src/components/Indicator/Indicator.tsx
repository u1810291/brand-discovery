import Stack, { StackProps } from '@mui/material/Stack'
import { FC } from 'react'

type IndicatorProps = {
  activeIndex: number
  count: number
  hasBorder?: boolean
} & StackProps
export const Indicator: FC<IndicatorProps> = ({ activeIndex, count, hasBorder, ...props }) => {
  const blockArray = Array(count).fill('')

  return (
    <Stack
      direction="row"
      gap={{ xs: '4px', sm: '20px' }}
      height={hasBorder ? '5px' : '4px'}
      width="calc(100% - 32px)"
      position="absolute"
      left=" 16px"
      top="16px"
      zIndex={2}
      {...props}
    >
      {blockArray.map((item, index) => (
        <Stack
          sx={{ opacity: index <= activeIndex ? '1' : 0.32 }}
          bgcolor="#FFFFFF"
          key={index}
          borderRadius="4px"
          width="100%"
          height="100%"
          border={hasBorder && '0.1px solid'}
        />
      ))}
    </Stack>
  )
}
