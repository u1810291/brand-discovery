import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Button, Typography, styled } from '@mui/material'
import Stack from '@mui/material/Stack'
import Image from 'next/image'
import { ROUTES } from 'src/constants/routes'
import { MainLayout } from 'src/layouts/MainLayout'

export const NotFoundPage = () => {
  return (
    <MainLayout
      padding={0}
      paddingTop={17}
      bgcolor="rgba(228, 244, 241, 1)"
      position="relative"
      maxWidth={'100% !important'}
    >
      <Stack paddingX={{ xs: 6, sm: 17 }}>
        <Typography fontSize={56} lineHeight="72px" fontWeight={800} color="rgba(1, 169, 136, 1)">
          Not found
        </Typography>
        <Typography fontSize={16} lineHeight="22px" fontWeight={500} color="rgba(116, 121, 120, 1)">
          Sorry, but the page you were trying to view does not exit.
        </Typography>
        <Typography marginTop={5} fontSize={16} lineHeight="22px" fontWeight={500} color="rgba(82, 176, 158, 1)">
          It looks like this was the result of either
        </Typography>
        <Stack direction="row" alignItems="center" mt={3}>
          <InfoOutlinedIcon sx={{ color: 'rgba(225, 134, 93, 1)' }} />
          <Typography fontSize={12} fontWeight={500} color="rgba(116, 121, 120, 1)">
            It looks like this was the result of either
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" mt={1}>
          <InfoOutlinedIcon sx={{ color: 'rgba(225, 134, 93, 1)' }} />
          <Typography fontSize={12} fontWeight={500} color="rgba(116, 121, 120, 1)">
            An out-of-date link
          </Typography>
        </Stack>
        <Button variant="contained" href={ROUTES.home} sx={{ width: 'fit-content', marginTop: 5 }}>
          Back to Homepage
        </Button>
      </Stack>
      <ImageContainer>
        <Image src="/images/404.png" alt="Not found page image" unoptimized width={400} height={250} />
      </ImageContainer>
    </MainLayout>
  )
}

const ImageContainer = styled(Stack)`
  position: absolute;
  bottom: 0;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`
