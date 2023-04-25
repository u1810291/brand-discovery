import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { GallerySwiper } from 'src/UI/GallerySwiper'
import { Indicator } from 'src/components/Indicator'
import { ROUTES } from 'src/constants/routes'
import { MainLayout } from 'src/layouts/MainLayout'
import { Swiper as SwiperCommon } from 'swiper'

const data = [
  { title: 'Brands', subtitle: 'Lorem Ipsum Dolor Sit Amet', image: '/images/step1.png' },
  { title: 'Liked Brands', subtitle: 'Lorem Ipsum Dolor Sit Amet', image: '/images/step2.png' },
  { title: 'Settings', subtitle: 'Lorem Ipsum Dolor Sit Amet', image: '/images/step3.png' },
]

export const WalkThrough = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [swiper, setSwiper] = useState<SwiperCommon>()

  const router = useRouter()

  const getNextSlide = () => {
    if (activeIndex < data.length - 1) {
      swiper?.slideNext()
      setActiveIndex((prev) => prev + 1)
    } else {
      router.push(ROUTES.signIn)
    }
  }
  const getPrevSlide = () => {
    if (activeIndex > 0) {
      swiper?.slidePrev()
      setActiveIndex((prev) => prev - 1)
    }
  }

  return (
    <MainLayout position="relative" padding={0}>
      <Indicator count={data.length} activeIndex={activeIndex} top="35px" />
      <Stack height="100%" width="40%" onClick={getPrevSlide} position="absolute" top={0} left={0} zIndex={2} />
      <Stack height="100%" width="40%" onClick={getNextSlide} position="absolute" top={0} right={0} zIndex={2} />
      <GallerySwiper
        data={data}
        swiperOptions={{ spaceBetween: 0, slidesPerView: 1 }}
        setSwiper={setSwiper}
        renderElement={(item) => (
          <>
            <ImageContainer width="100%" height="100%">
              <Image
                placeholder="blur"
                blurDataURL={`${item}`}
                unoptimized
                src={item.image}
                alt="picture"
                width={600}
                height={400}
              />
            </ImageContainer>
            <Wrapper spacing={1}>
              <Typography fontWeight={700} fontSize={40} lineHeight="55px">
                {item.title}
              </Typography>
              <Typography fontWeight={700} fontSize={18} lineHeight="25px">
                {item.subtitle}
              </Typography>
            </Wrapper>
          </>
        )}
      />
    </MainLayout>
  )
}

const ImageContainer = styled(Stack)`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Wrapper = styled(Stack)`
  position: absolute;
  width: 100%;
  bottom: 120px;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  text-align: center;
`
