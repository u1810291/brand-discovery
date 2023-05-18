'use client'
import { Typography, styled } from '@mui/material'
import Stack from '@mui/material/Stack'
import { animated } from '@react-spring/web'
import Image from 'next/image'
import { FC, useState } from 'react'
import { GallerySwiper } from 'src/UI/GallerySwiper'
import { Indicator } from 'src/components/Indicator'
import { Swiper as SwiperCommon } from 'swiper'

type CardProps = {
  images: string[]
  isLike: boolean | null
  isShowLabel: boolean
}
export const Card: FC<CardProps> = ({ images, isShowLabel, isLike, ...props }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [swiper, setSwiper] = useState<SwiperCommon>()

  const getNextSlide = () => {
    if (activeIndex < images.length - 1) {
      swiper?.slideNext()
      setActiveIndex((prev) => prev + 1)
    }
  }
  const getPrevSlide = () => {
    if (activeIndex > 0) {
      swiper?.slidePrev()
      setActiveIndex((prev) => prev - 1)
    }
  }

  return (
    <Container {...props}>
      <Background />
      <Indicator count={images.length} activeIndex={activeIndex} />
      <Stack height="100%" width="40%" onClick={getPrevSlide} position="absolute" top={0} left={0} zIndex={2} />
      <Stack height="100%" width="40%" onClick={getNextSlide} position="absolute" top={0} right={0} zIndex={2} />
      {isShowLabel &&
        typeof isLike === 'boolean' &&
        (isLike ? (
          <Stack
            border="4px solid #18BC9C"
            color=" #18BC9C"
            borderRadius={2}
            paddingX={2}
            paddingY={1}
            position="absolute"
            top={40}
            zIndex={2}
            left={8}
          >
            <Typography fontWeight={800} fontSize=" 40px" lineHeight="55px">
              LIKE
            </Typography>
          </Stack>
        ) : (
          <Stack
            border="4px solid #EC1B40"
            color=" #EC1B40"
            borderRadius={2}
            paddingX={2}
            paddingY={1}
            position="absolute"
            top={40}
            zIndex={2}
            right={8}
          >
            <Typography fontWeight={800} fontSize=" 40px" lineHeight="55px">
              NOPE
            </Typography>
          </Stack>
        ))}
      <GallerySwiper
        data={images.filter(Boolean)}
        setSwiper={setSwiper}
        swiperOptions={{ spaceBetween: 0, slidesPerView: 1 }}
        renderElement={(item) => (
          <ImageContainer>
            <Image
              src={item}
              unoptimized
              width={600}
              height={400}
              alt="picture"
              // placeholder="blur"
              // blurDataURL={`${item}`}
            />
          </ImageContainer>
        )}
      />
    </Container>
  )
}
const Container = styled(animated.div)`
  will-change: transform;
  height: 100%;
  display: flex;
  flex-direction: column;
  touch-action: none;
`

const ImageContainer = styled(Stack)`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Background = styled(Stack)`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  opacity: 0.8;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 21%,
    rgba(0, 0, 0, 0) 90%,
    rgba(0, 0, 0, 1) 100%
  );
  box-shadow: 0px 16px 64px rgba(179, 180, 174, 0.25);
  border-radius: 16px;
`
