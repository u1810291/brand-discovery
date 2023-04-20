import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import { FC } from 'react'

interface ChipsListProps {
  data?: string[]
  totalCount?: number
}

export const ChipsList: FC<ChipsListProps> = ({ data = [], totalCount = 2 }) => {
  if (data.length > totalCount) {
    const neededData = data.slice(0, totalCount)
    const otherData = data.slice(totalCount)

    return (
      <Stack spacing={0.5} direction="row" width="100%">
        {neededData.map((item, index) => (
          <Chip key={index} label={item} color="primary" />
        ))}
        <Tooltip title={otherData.join(', ')}>
          <Chip label={`+${otherData.length}`} color="primary" />
        </Tooltip>
      </Stack>
    )
  }

  return (
    <Stack spacing={0.5} direction="row" width="100%" flexWrap="wrap" justifyContent="start">
      {data.map((item, index) => (
        <Chip key={index} label={item} color="primary" sx={{ width: 'fit-content', marginTop: '4px !important' }} />
      ))}
    </Stack>
  )
}
