import React from 'react'
import Stack from '@mui/material/Stack'
import { MainLayout } from 'src/layouts/MainLayout'
import { InputField } from 'src/components/InputField'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

export type LocationType = {
  query: string
}

export const schema = yup.object({
  query: yup.string(),
})

export const Location = () => {
  const { control } = useForm<LocationType>({
    defaultValues: { query: '' },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  return (
    <MainLayout
      showBackButton
      navbar={
        <Stack display="flex" alignItems="center" width="100%">
          <InputField
            variant="standard"
            control={control}
            name="query"
            fullWidth
            placeholder="Enter a query"
            sx={{ borderBottom: '0px !important' }}
          />
        </Stack>
      }
    >
      <Stack>Some</Stack>
    </MainLayout>
  )
}
