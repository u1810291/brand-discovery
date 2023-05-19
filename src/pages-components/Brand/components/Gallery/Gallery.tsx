'use client'

import { Stack, styled } from '@mui/material'
import { FullScreenImage } from 'src/components/FullScreenImage'

export const Gallery = ({ currentCompany, images }) => {
  const firstImage = images?.[0]
  const otherImages = images?.slice(1, images?.length)
  return (
    <Stack>
      <FirstImageContainer>
        <FullScreenImage
          image={{ src: firstImage, alt: 'Gallery image', height: 216, width: 323 }}
          company={currentCompany}
        />
      </FirstImageContainer>
      <Container>
        {otherImages?.map((item, index) => (
          <ImageContainer key={`${item}-${index}`}>
            <FullScreenImage
              image={{ src: item, alt: 'Gallery image', height: 102, width: 102 }}
              company={currentCompany}
            />
          </ImageContainer>
        ))}
      </Container>
    </Stack>
  )
}

const ImageContainer = styled(Stack)`
  width: 100%;
  height: 102px;
  border-radius: 8px;
  overflow: hidden;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  @media (min-width: 600px) {
    height: 202px;
  }
`

const FirstImageContainer = styled(Stack)`
  width: 100%;
  max-height: 216px;
  border-radius: 16px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (min-width: 600px) {
    max-height: 450px;
  }
`
const Container = styled(Stack)`
  margin-top: 8px;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, minmax(103px, 278px));
  grid-template-rows: masonry;
  justify-content: space-between;
  gap: 8px;
`
