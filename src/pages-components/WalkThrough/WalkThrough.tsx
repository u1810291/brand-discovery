import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ReactPlayer from 'react-player'
import { GallerySwiper } from 'src/UI/GallerySwiper'
import { Indicator } from 'src/components/Indicator'
import { MainLayout } from 'src/layouts/MainLayout'
import { Swiper as SwiperCommon } from 'swiper'

const videos = [
  { src: '/videos/HomeScreen.mp4' },
  { src: '/videos/LikedScreen.mp4' },
  { src: '/videos/SettingsScreen.mp4' },
]

export const WalkThrough = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [swiper, setSwiper] = useState<SwiperCommon>()

  const router = useRouter()

  const getNextSlide = () => {
    if (activeIndex < videos.length - 1) {
      swiper?.slideNext()
      setActiveIndex((prev) => prev + 1)
    } else {
      alert('end')
      localStorage.setItem('walkthroughCompleted', true.toString())
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
      <Stack position="absolute" zIndex={2} top="35px" left="16px" width="calc(100% - 32px)">
        <Indicator hasBorder count={videos.length} activeIndex={activeIndex} position={'initial'} width="100%" />
      </Stack>
      <Stack height="100%" width="40%" onClick={getPrevSlide} position="absolute" top={0} left={0} zIndex={2} />
      <Stack height="100%" width="40%" onClick={getNextSlide} position="absolute" top={0} right={0} zIndex={2} />
      <GallerySwiper
        data={videos}
        swiperOptions={{ spaceBetween: 0, slidesPerView: 1 }}
        setSwiper={setSwiper}
        renderElement={(item) => (
          <ReactPlayer width="100%" height="100%" muted playing loop onEnded={getNextSlide} url={item.src} />
        )}
      />
    </MainLayout>
  )
}
