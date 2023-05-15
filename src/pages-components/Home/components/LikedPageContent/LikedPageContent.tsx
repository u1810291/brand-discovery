'use client'
import { FC } from 'react'
import { CompanyType } from 'src/types'
import { styled } from '@mui/material/styles'
import { ROUTES } from 'src/constants/routes'
import { CompanyCard, Slider } from './components'
import { LikedCardSkeleton } from 'src/components/Skeletons'
import { UserData } from 'src/store/slices/auth/auth.slice'
import { useEmailGeneration } from 'src/services/useEmailGeneration'
import SyncIcon from '@mui/icons-material/Sync'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Link from 'next/link'

type LikedPageContentProps = {
  data: { company: CompanyType; images: string[] }[]
}

export const LikedPageContent: FC<LikedPageContentProps> = ({ data }) => {
  const user: UserData = JSON.parse(localStorage.getItem('user') || null)
  const { handleEmailGeneration } = useEmailGeneration()

  // TODO: CHANGE TO LOADING DATA FROM API
  const isLoading = false
  return (
    <Stack flex={1} overflow="auto" padding={3} paddingTop={5} gap={{ sm: 5 }}>
      <Button variant="outlined" onClick={() => handleEmailGeneration(user.uid)} startIcon={<SyncIcon />}>
        Sync brands with Spacewise Platform
      </Button>
      <Stack component="ul" padding={0} gap={2}>
        {isLoading ? (
          <>
            <LikedCardSkeleton />
            <LikedCardSkeleton />
            <LikedCardSkeleton />
          </>
        ) : (
          data.map((item, index) => (
            <Card key={`${item.company.title}-${index}`}>
              <LinkContainer href={`${ROUTES.brand}/${item.company.id}`}>
                <CompanyCard data={item.company} />
              </LinkContainer>
              <Slider images={item.images.slice(0, 5)} tag={item.company.tags[0]} />
            </Card>
          ))
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
