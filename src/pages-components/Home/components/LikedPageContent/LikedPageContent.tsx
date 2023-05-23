'use client'
import SyncIcon from '@mui/icons-material/Sync'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { useEffect, useMemo } from 'react'
import { LikedCardSkeleton } from 'src/components/Skeletons'
import { ROUTES } from 'src/constants/routes'
import { useEmailGeneration } from 'src/services/useEmailGeneration'
import { UserData } from 'src/store/slices/auth/auth.slice'
import { CompanyCard, Slider } from './components'
import { useBrands } from 'src/services/useBrands'

export const LikedPageContent = () => {
  const user: UserData = useMemo(() => localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')), [])
  const { handleEmailGeneration } = useEmailGeneration()

  const { fetchLikedBrands, brands, loading } = useBrands()

  useEffect(() => {
    fetchLikedBrands(user)
  }, [])

  return (
    <Stack flex={1} overflow="auto" padding={3} paddingTop={5} gap={{ sm: 5 }}>
      <Button variant="outlined" onClick={() => handleEmailGeneration(user.uid)} startIcon={<SyncIcon />}>
        Sync brands with Spacewise Platform
      </Button>
      <Stack component="ul" padding={0} gap={2} flex={1}>
        {loading ? (
          <>
            <LikedCardSkeleton />
            <LikedCardSkeleton />
            <LikedCardSkeleton />
          </>
        ) : brands ? (
          brands.map((item, index) => (
            <Card key={`${item.company.title}-${index}`}>
              <LinkContainer href={`${ROUTES.brand}/${item.company.id}`}>
                <CompanyCard data={item.company} />
              </LinkContainer>
              <Slider images={item.images.slice(0, 5)} tag={item.company.tags[0]} />
            </Card>
          ))
        ) : (
          <Stack flex={1} justifyContent="center">
            <Typography textAlign="center">You don't have liked brands yet</Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  )
}

const Card = styled(Stack)`
  padding: 24px;
  gap: 16px;
  background: #ffffff;
  box-shadow: 0px 16px 64px rgba(179, 180, 174, 0.25);
  border-radius: 16px;
  border: 0.5px solid rgba(179, 180, 174, 0.1);
`

const LinkContainer = styled(Link)`
  color: inherit;
  text-decoration: none;
`
