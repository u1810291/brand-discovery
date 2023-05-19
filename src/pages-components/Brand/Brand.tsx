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
  const { brand, fetchOneBrand, loading } = useBrands()

  useEffect(() => {
    fetchOneBrand(id)
  }, [])

  return (
    <MainLayout showBackButton>
      {loading && !brand?.company ? (
        <BrandSkeleton />
      ) : (
        brand?.company && (
          <Stack spacing={3}>
            <CompanyCard data={brand?.company} />
            <Stack spacing={1}>
              <Typography fontWeight={700} fontSize={'14px'} lineHeight={'20px'}>
                Categories
              </Typography>
              <ChipsList
                data={brand?.company?.tags.filter((el) => el && el !== 'undefined')}
                totalCount={brand?.company?.tags?.length}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography fontWeight={700} fontSize={'14px'} lineHeight={'20px'}>
                {brand?.images?.filter(Boolean).length} Gallery Photos
              </Typography>
              <Gallery />
            </Stack>
          </Stack>
        )
      )}
    </MainLayout>
  )
}
