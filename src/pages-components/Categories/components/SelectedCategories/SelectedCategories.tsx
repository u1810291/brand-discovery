'use client'

import { styled } from '@mui/material'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import { FC } from 'react'

interface SelectedCategoriesProps {
  data?: string[]
  totalCount?: number
}

export const SelectedCategories: FC<SelectedCategoriesProps> = ({ data = [], totalCount = 2 }) => {
  if (data.length > totalCount) {
    const neededData = data.slice(0, totalCount)
    const otherData = data.slice(totalCount)

    return (
      <Stack spacing={0.5} width="100%" flexWrap="wrap" justifyContent="start" display="flex" flexDirection="column">
        <Stack>
          <TypographyStyled>Selected Categories ({totalCount})</TypographyStyled>
        </Stack>
        <Stack spacing={0.5} direction="row" width="100%" flexWrap="wrap" justifyContent="start">
          {neededData.map((item, index) => (
            <Chip key={index} label={item} color="primary" variant="outlined" sx={{ background: '#E4F4F1' }} />
          ))}
          <Tooltip title={otherData.join(', ')}>
            <Chip label={`+${otherData.length}`} color="primary" variant="outlined" sx={{ background: '#E4F4F1' }} />
          </Tooltip>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack spacing={0.5} width="100%" flexWrap="wrap" justifyContent="start" display="flex" flexDirection="column">
      <Stack>
        <TypographyStyled>Selected Categories ({totalCount})</TypographyStyled>
      </Stack>
      <Stack spacing={0.5} direction="row" width="100%" flexWrap="wrap" justifyContent="start">
        {data.map((item, index) => (
          <Chip
            key={index}
            label={item}
            color="primary"
            variant="outlined"
            sx={{ width: 'fit-content', marginTop: '4px !important', background: '#E4F4F1' }}
          />
        ))}
      </Stack>
    </Stack>
  )
}

const TypographyStyled = styled(Typography)`
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  text-transform: capitalize;
  color: #000000;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`
