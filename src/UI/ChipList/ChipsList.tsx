import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
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
          <StyledChip key={index} label={item} color="secondary" />
        ))}
        <Tooltip title={otherData.join(', ')}>
          <StyledChip label={`+${otherData.length}`} />
        </Tooltip>
      </Stack>
    )
  }

  return (
    <Stack spacing={0.5} direction="row" width="100%" flexWrap="wrap" justifyContent="start">
      {data.map((item, index) => (
        <StyledChip
          key={index}
          label={item}
          color="secondary"
          sx={{ width: 'fit-content', marginTop: '4px !important' }}
        />
      ))}
    </Stack>
  )
}

const StyledChip = styled(Chip)`
  background-color: #e4f4f1;
  color: #393f3e;
`
