import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import { FC, useState } from 'react'
import { GallerySwiper } from 'src/UI/GallerySwiper'
import { Indicator } from 'src/components/Indicator'
import { Swiper as SwiperCommon } from 'swiper'

type SliderProps = {
  images: string[]
  tag: string
}
export const Slider: FC<SliderProps> = ({ images, tag }) => {
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
    <Stack position="relative">
      <Background />
      <Indicator count={images.length} activeIndex={activeIndex} />
      <Stack height="100%" width="40%" onClick={getPrevSlide} position="absolute" top={0} left={0} zIndex={2} />
      <Stack height="100%" width="40%" onClick={getNextSlide} position="absolute" top={0} right={0} zIndex={2} />
      <GallerySwiper
        data={images}
        swiperOptions={{ spaceBetween: 0, slidesPerView: 1 }}
        setSwiper={setSwiper}
        renderElement={(item) => (
          <ImageContainer width="100%" height={{ xs: '180px', sm: 500 }}>
            <Image
              placeholder="blur"
              blurDataURL={`${item}`}
              unoptimized
              src={item}
              alt="picture"
              width={275}
              height={180}
            />
          </ImageContainer>
        )}
      />
      <Chip
        label={tag}
        sx={{ position: 'absolute', bottom: '20px', right: '16px', zIndex: 1, background: '#FFE0CC' }}
      />
    </Stack>
  )
}

const ImageContainer = styled(Stack)`
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
  background: linear-gradient(to top, rgba(0, 0, 0, 0) 90%, rgba(0, 0, 0, 1) 100%);
  box-shadow: 0px 16px 64px rgba(179, 180, 174, 0.25);
  border-radius: 16px;
`
