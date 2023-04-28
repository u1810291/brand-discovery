import Stack from '@mui/material/Stack'
import React from 'react'
import { InputField } from 'src/components/InputField'

export const LocationNavbar = ({ field, updateField }) => {
  return (
    <Stack display="flex" alignItems="center" width="100%">
      <InputField
        variant="standard"
        value={field}
        onChange={(e) => updateField(e.target.value)}
        name="query"
        fullWidth
        placeholder="Enter a query"
        sx={{ borderBottom: '0px !important' }}
      />
    </Stack>
  )
}
