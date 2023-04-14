import CloseIcon from '@mui/icons-material/Close'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import { IconButton, styled } from '@mui/material'
import Stack from '@mui/material/Stack'
import { animated, interpolate, useSprings } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useState } from 'react'
import { Card, CompanyCard } from './components'
// TODO: поправить цвета в теме
const companies = [
  {
    company: {
      title: 'Adidas',
      location: 'San Francisco',
      image: '/images/adidas1.jpg',
      followers: 0,
      tags: ['Sport', '+2'],
    },
    images: ['/images/adidas1.jpg', '/images/adidas1.jpg', '/images/adidas1.jpg', '/images/adidas1.jpg'],
  },
  {
    company: {
      title: 'Nice',
      location: 'San Francisco',
      image: '/images/adidas1.jpg',
      followers: 0,
      tags: ['Sport', '+2'],
    },
    images: ['/images/adidas1.jpg', '/images/adidas1.jpg', '/images/adidas1.jpg', '/images/adidas1.jpg'],
  },
  {
    company: {
      title: 'Puma',
      location: 'San Francisco',
      image: '/images/adidas1.jpg',
      followers: 0,
      tags: ['Sport', '+2'],
    },
    images: ['/images/adidas1.jpg', '/images/adidas1.jpg', '/images/adidas1.jpg', '/images/adidas1.jpg'],
  },
  {
    company: {
      title: 'Reebok',
      location: 'San Francisco',
      image: '/images/adidas1.jpg',
      followers: 0,
      tags: ['Sport', '+2'],
    },
    images: ['/images/adidas2.jpg', '/images/adidas1.jpg', '/images/adidas2.jpg', '/images/adidas1.jpg'],
  },
]

const to = (i: number) => ({
  x: 0,
  y: 0,
  scale: 1,
  rot: 0,
  delay: i * 100,
})
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1, y: 0 })

const trans = (r: number, s: number) => `rotateX(0deg) rotateY(${r}deg) rotateZ(${r}deg) scale(${s})`

export const HomePageContent = () => {
  const [isLike, setIsLike] = useState<boolean | null>(null)
  const [isShowLabel, setIsShowLabel] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const currentIndex = companies.length - activeIndex - 1

  const likeAction = () => {
    console.log('like action')
  }

  const dislikeAction = () => {
    console.log('dislike action')
  }

  const getNextSlide = (isDisLike: boolean) => {
    gone.add(currentIndex)
    setIsShowLabel(false)
    api.start((i) => {
      if (currentIndex !== i) return

      const x = isDisLike ? 100 + window.innerWidth : -window.innerWidth
      const rot = isDisLike ? 100 : -100
      const scale = 1
      return {
        x,
        rot,
        scale,
        delay: 0,
        config: { friction: 50, tension: 800 },
      }
    })
    setActiveIndex((prev) => prev + 1)
  }
  const getDragResult = async (direction: number) => {
    if (direction > 0) {
      await dislikeAction()
    } else if (direction < 0) {
      await likeAction()
    }
  }

  const onLikeClick = async () => {
    await likeAction()
    getNextSlide(false)
    setIsLike(true)
    setIsShowLabel(true)
  }

  const onDislikeClick = async () => {
    await dislikeAction()
    getNextSlide(true)
    setIsLike(false)
    setIsShowLabel(true)
  }
  const [gone] = useState(() => new Set())
  const [props, api] = useSprings(companies.length, (i) => ({
    ...to(i),
    from: from(i),
  }))

  const bind = useDrag(({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
    const trigger = vx > 0.1
    if (!active && trigger) {
      gone.add(index)
      setActiveIndex((prev) => prev + 1)
      setIsShowLabel(false)
      getDragResult(xDir)
    }
    if (xDir > 0) {
      setIsLike(false)
      setIsShowLabel(true)
    } else if (xDir < 0) {
      setIsLike(true)
      setIsShowLabel(true)
    } else {
      setIsShowLabel(false)
    }

    api.start((i) => {
      if (index !== i) return
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0
      const rot = mx / 100
      const scale = 1
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
      }
    })
    if (!active && gone.size === companies.length) {
      alert('finish')
    }
  })
  return (
    <Stack flex={1} position="relative">
      <Stack flex={1}>
        {props.map(({ x, y, rot, scale }, i) => (
          <Animated key={i} style={{ x, y }}>
            <Card
              isLike={isLike}
              isShowLabel={i === currentIndex && isShowLabel}
              images={companies[i]?.images || []}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
              }}
            />
          </Animated>
        ))}
      </Stack>

      {currentIndex >= 0 && (
        <Wrapper>
          <CompanyCard data={companies[currentIndex]?.company} />
          <Stack direction="row" justifyContent="space-between" width="100%" paddingX={9}>
            <StyledButton
              onClick={onLikeClick}
              size="large"
              sx={{ background: 'rgba(24, 188, 156, 0.15)', borderColor: '#18bc9c' }}
            >
              <FavoriteOutlinedIcon color="primary" />
            </StyledButton>
            <StyledButton
              sx={{ borderColor: '#EC1B40', background: 'rgba(236, 27, 64, 0.15)' }}
              size="large"
              onClick={onDislikeClick}
            >
              <CloseIcon color="error" />
            </StyledButton>
          </Stack>
        </Wrapper>
      )}
    </Stack>
  )
}

const Wrapper = styled(Stack)`
  position: absolute;
  width: 100%;
  bottom: 20px;
  z-index: 2;
  max-width: 700px;
  gap: 16px;
  left: 50%;
  transform: translateX(-50%);
`

const StyledButton = styled(IconButton)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 16px;
  gap: 10px;
  border: 1px solid;
  border-radius: 50%;
`
const Animated = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  will-change: transform;
`
