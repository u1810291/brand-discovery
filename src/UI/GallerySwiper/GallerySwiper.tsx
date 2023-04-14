import { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { Controller, EffectCards, Swiper as SwiperCommon, SwiperOptions } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-cards'
import { Swiper, SwiperSlide } from 'swiper/react'
type GallerySwiperProps<T> = {
  data: T[]
  renderElement: (el: T, index?: number) => JSX.Element
  swiperOptions: SwiperOptions
  setSwiper: Dispatch<SetStateAction<SwiperCommon | undefined>>
}

export const GallerySwiper = <T,>({ data, renderElement, swiperOptions, setSwiper }: GallerySwiperProps<T>) => {
  return (
    <StyledSwiper
      modules={[Controller, EffectCards]}
      onSwiper={setSwiper}
      simulateTouch={false}
      allowTouchMove={false}
      {...swiperOptions}
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>{renderElement(item, index)}</SwiperSlide>
      ))}
    </StyledSwiper>
  )
}

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  .swiper-slide {
    width: auto;
  }
`
