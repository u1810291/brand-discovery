import SyncIcon from '@mui/icons-material/Sync'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import emailjs from 'emailjs-com'
import { collection, getDocs, query, where } from 'firebase/firestore'
import 'firebase/functions'
import Link from 'next/link'
import { FC } from 'react'
import { LikedCardSkeleton } from 'src/components/Skeletons'
import { ROUTES } from 'src/constants/routes'
import { db } from 'src/services/firebase'
import { UserData } from 'src/store/slices/auth/auth.slice'
import { CompanyType } from 'src/types'
import { CompanyCard, Slider } from './components'

export const generateEmail = async (data: { to: string; subject: string; body: string }) => {
  try {
    await emailjs.send('service_ml3efig', 'template_g2tlyfk', data, 'dl1eXeogprxy04wG4')
    return {
      message: 'Email sent successfully',
    }
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Error sending email')
  }
}

type LikedPageContentProps = {
  data: { company: CompanyType; images: string[] }[]
}

export const LikedPageContent: FC<LikedPageContentProps> = ({ data }) => {
  const user: UserData = JSON.parse(localStorage.getItem('user') || null)

  async function handleEmailGeneration() {
    try {
      const q = query(collection(db(), 'users'), where('uid', '==', user.uid))
      const docs = await getDocs(q)
      const userData = docs.docs[0].data()
      const result = await generateEmail({
        subject: 'Landlord wants to get connected to brands',
        body: `This is automatically generated e-mail from Spacewise Discovery App.
               Landlord ${userData.firstName} ${userData.lastName} ${userData.email} wants to get connected to the following brands:
               brand Id's`,
        to: 'accountmanagement@spacewise.net',
      })
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }
  // TODO: CHANGE TO LOADING DATA FROM API
  const isLoading = false
  return (
    <Stack flex={1} overflow="auto" padding={3} paddingTop={5} gap={{ sm: 5 }}>
      <Button variant="outlined" onClick={handleEmailGeneration} startIcon={<SyncIcon />}>
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
