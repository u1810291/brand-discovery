import CloseIcon from '@mui/icons-material/Close'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import { IconButton, styled } from '@mui/material'
import Stack from '@mui/material/Stack'
import { animated, interpolate, useSprings } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { FC, useState } from 'react'
import { CompanyType } from 'src/types'
import { Card, CompanyCard } from './components'
// TODO: поправить цвета в теме

const to = (i: number) => ({
  x: 0,
  y: 0,
  scale: 1,
  rot: 0,
  delay: i * 100,
})
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1, y: 0 })

const trans = (r: number, s: number) => `rotateX(0deg) rotateY(${r}deg) rotateZ(${r}deg) scale(${s})`

type ContentProps = {
  data: { company: CompanyType; images: string[] }[]
  likeAction: (id: string) => void | Promise<void>
  dislikeAction: (id: string) => void | Promise<void>
}

export const HomePageContent: FC<ContentProps> = ({ data, likeAction, dislikeAction }) => {
  const [isLike, setIsLike] = useState<boolean | null>(null)
  const [isShowLabel, setIsShowLabel] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const currentIndex = data.length - activeIndex - 1

  const handleLikeAction = () => {
    likeAction(data[currentIndex].company.id)
  }

  const handleDislikeAction = () => {
    dislikeAction(data[currentIndex].company.id)
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
        config: { friction: 50, tension: 800, duration: 400 },
      }
    })
    setActiveIndex((prev) => prev + 1)
  }
  const getDragResult = async (direction: number) => {
    if (direction > 0) {
      await handleDislikeAction()
    } else if (direction < 0) {
      await handleLikeAction()
    }
  }

  const onLikeClick = async () => {
    await handleLikeAction()
    setIsLike(true)
    setIsShowLabel(true)
    getNextSlide(false)
  }

  const onDislikeClick = async () => {
    await handleDislikeAction()
    setIsLike(false)
    setIsShowLabel(true)
    getNextSlide(true)
  }
  const [gone] = useState(() => new Set())
  const [props, api] = useSprings(data.length, (i) => ({
    ...to(i),
    from: from(i),
  }))

  const bind = useDrag(({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
    const trigger = vx > 0.1

    if (xDir > 0) {
      setIsLike(false)
      setIsShowLabel(true)
    } else if (xDir < 0) {
      setIsLike(true)
      setIsShowLabel(true)
    } else {
      setIsShowLabel(false)
    }

    if (!active && trigger) {
      gone.add(index)
      setActiveIndex((prev) => prev + 1)
      setIsShowLabel(false)
      getDragResult(xDir)
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
    if (!active && gone.size === data.length) {
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
              images={data[i]?.images || []}
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
          <CompanyCard data={data[currentIndex]?.company} />
          <Stack direction="row" justifyContent="space-between" width="100%" paddingX={9}>
            <StyledButton onClick={onLikeClick} size="large" sx={{ borderColor: '#18bc9c' }}>
              <FavoriteOutlinedIcon color="primary" />
            </StyledButton>
            <StyledButton sx={{ borderColor: '#EC1B40' }} size="large" onClick={onDislikeClick}>
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
  border: 2px solid;
  border-radius: 50%;
`
const Animated = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  will-change: transform;
`
