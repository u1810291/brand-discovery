'use client'

import { Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { ChipsList } from 'src/UI/ChipList'

import { BrandSkeleton } from 'src/components/Skeletons'
import { MainLayout } from 'src/layouts/MainLayout'
import { companies } from '../Home/mock'
import { CompanyCard, Gallery } from './components'

const galleryCount = 123

export const Brand = () => {
  const router = useRouter()
  const { id } = router.query
  const currentCompany = companies.find((item) => item.company.id === id)
  // TODO: CHANGE TO LOADING DATA FROM API
  const isLoading = false
  return (
    <MainLayout showBackButton>
      {isLoading ? (
        <BrandSkeleton />
      ) : (
        <Stack spacing={3}>
          <CompanyCard data={currentCompany?.company} />
          <Stack spacing={1}>
            <Typography fontWeight={700} fontSize={'14px'} lineHeight={'20px'}>
              Categories
            </Typography>
            <ChipsList data={currentCompany?.company.tags} totalCount={currentCompany?.company.tags.length} />
          </Stack>
          <Stack spacing={1}>
            <Typography fontWeight={700} fontSize={'14px'} lineHeight={'20px'}>
              {galleryCount} Gallery Photos
            </Typography>
            <Gallery />
          </Stack>
        </Stack>
      )}
    </MainLayout>
  )
}
