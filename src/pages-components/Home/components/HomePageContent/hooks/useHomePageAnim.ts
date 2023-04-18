import { useSprings } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useState } from 'react'
import { CompanyType } from 'src/types'

const to = (i: number) => ({
  x: 0,
  y: 0,
  scale: 1,
  rot: 0,
  delay: i * 100,
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1, y: 0 })

type UseHomePageAnimParams = {
  data: { company: CompanyType }[]
  likeAction: (id: string) => void | Promise<void>
  dislikeAction: (id: string) => void | Promise<void>
}
export const useHomePageAnim = ({ data, likeAction, dislikeAction }: UseHomePageAnimParams) => {
  const [isLike, setIsLike] = useState<boolean | null>(null)
  const [isShowLabel, setIsShowLabel] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const trans = (r: number, s: number) => `rotateX(0deg) rotateY(${r}deg) rotateZ(${r}deg) scale(${s})`

  const currentIndex = data.length - activeIndex - 1

  const handleLikeAction = () => {
    likeAction(data[currentIndex].company.id)
  }

  const handleDislikeAction = () => {
    dislikeAction(data[currentIndex].company.id)
  }

  const getNextSlide = (isLike: boolean) => {
    gone.add(currentIndex)
    setIsShowLabel(false)
    api.start((i) => {
      if (currentIndex !== i) return

      const x = isLike ? 100 + window.innerWidth : -window.innerWidth
      const rot = isLike ? 100 : -100
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
      await handleLikeAction()
    } else if (direction < 0) {
      await handleDislikeAction()
    }
  }

  const onLikeClick = async () => {
    setIsLike(true)
    setIsShowLabel(true)
    await handleLikeAction()
    getNextSlide(true)
  }

  const onDislikeClick = async () => {
    setIsLike(false)
    setIsShowLabel(true)
    await handleDislikeAction()
    getNextSlide(false)
  }
  const [gone] = useState(() => new Set())
  const [animArray, api] = useSprings(data.length, (i) => ({
    ...to(i),
    from: from(i),
  }))

  const bind = useDrag(({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
    const trigger = vx > 0.1

    if (xDir > 0) {
      setIsLike(true)
      setIsShowLabel(true)
    } else if (xDir < 0) {
      setIsLike(false)
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

  return { isLike, isShowLabel, onLikeClick, onDislikeClick, animArray, currentIndex, trans, bind }
}
