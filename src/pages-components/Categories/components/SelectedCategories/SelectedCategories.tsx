'use client'

import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Tooltip from '@mui/material/Tooltip'
import { FC } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'

interface SelectedCategoriesProps {
  data?: string[]
  totalCount?: number
  handleDelete: (item: string) => void
}

export const SelectedCategories: FC<SelectedCategoriesProps> = ({ data = [], totalCount = 2, handleDelete }) => {
  if (data.length > totalCount) {
    const neededData = data.slice(0, totalCount)
    const otherData = data.slice(totalCount)

    return (
      <Stack spacing={0.5} direction="row" width="100%" flexWrap="wrap" justifyContent="start">
        {neededData.map((item, index) => (
          <Chip
            key={index}
            label={item}
            color="primary"
            variant="outlined"
            sx={{ background: '#E4F4F1' }}
            deleteIcon={<CloseIcon />}
            onDelete={() => handleDelete(item)}
          />
        ))}
        <Tooltip title={otherData.join(', ')}>
          <Chip label={`+${otherData.length}`} color="primary" variant="outlined" sx={{ background: '#E4F4F1' }} />
        </Tooltip>
      </Stack>
    )
  }

  return (
    <Stack spacing={0.5} direction="row" width="100%" flexWrap="wrap" justifyContent="start">
      {data.map((item, index) => (
        <Chip
          key={`${item}-${index}`}
          label={item}
          color="primary"
          variant="outlined"
          sx={{ width: 'fit-content', marginTop: '4px !important', background: '#E4F4F1' }}
          deleteIcon={<CloseIcon />}
          onDelete={() => handleDelete(item)}
        />
      ))}
    </Stack>
  )
}
