'use client'

import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { ChipsList } from 'src/UI/ChipList'

import { BrandSkeleton } from 'src/components/Skeletons'
import { MainLayout } from 'src/layouts/MainLayout'
import { CompanyCard, Gallery } from './components'
import { useEffect } from 'react'
import { useBrands } from 'src/services/useBrands'

export const Brand = () => {
  const router = useRouter()
  const { id } = router.query
  const { brands, fetchOneBrand } = useBrands()

  useEffect(() => {
    fetchOneBrand(id)
  }, [])

  const isLoading = false
  return (
    <MainLayout showBackButton>
      {isLoading ? (
        <BrandSkeleton />
      ) : (
        <Stack spacing={3}>
          <CompanyCard data={brands?.company} />
          <Stack spacing={1}>
            <Typography fontWeight={700} fontSize={'14px'} lineHeight={'20px'}>
              Categories
            </Typography>
            <ChipsList data={brands?.company?.tags} totalCount={brands?.company?.tags?.length} />
          </Stack>
          <Stack spacing={1}>
            <Typography fontWeight={700} fontSize={'14px'} lineHeight={'20px'}>
              {brands?.images?.filter(Boolean).length} Gallery Photos
            </Typography>
            <Gallery />
          </Stack>
        </Stack>
      )}
    </MainLayout>
  )
}
