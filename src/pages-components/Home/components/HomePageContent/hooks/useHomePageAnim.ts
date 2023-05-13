import { useSprings } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from 'src/services/firebase'
import { UserData } from 'src/store/slices/auth/auth.slice'
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
  finishAction: () => void | Promise<void>
}
export const useHomePageAnim = ({ data, likeAction, dislikeAction, finishAction }: UseHomePageAnimParams) => {
  const [isLike, setIsLike] = useState<boolean | null>(null)
  const [isShowLabel, setIsShowLabel] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const trans = (r: number, s: number) => `rotateX(0deg) rotateY(${r}deg) rotateZ(${r}deg) scale(${s})`
  const user: UserData = JSON.parse(localStorage.getItem('user') || null)
  const [likesLeft, setLikesLeft] = useState(user.dailyLikesGranted ? user.dailyLikesLeft : user.likesLeft)

  async function dailyLikesAdd(): Promise<string> {
    try {
      const q = query(collection(db(), 'users'), where('uid', '==', user.uid))
      const docs = await getDocs(q)

      if (docs.docs.length === 0) {
        throw new Error(`No user found with uid: ${user.uid}`)
      }
      const userData = docs.docs[0].data() as UserData

      if (userData.dailyLikesGranted && !userData.likesUpdated) {
        const updatedData = {
          likesUpdated: new Date(),
        }
        await updateDoc(docs.docs[0].ref, updatedData)
        return '-'
      } else if (userData.dailyLikesGranted) {
        const now = new Date()
        //@ts-expect-error correct data Types
        const diff = now.getTime() - userData.likesUpdated.toMillis()
        const hoursPassed = diff / 3600000
        if (hoursPassed > 24) {
          const updatedData = {
            likesUpdated: new Date(),
            dailyLikesLeft: 100,
          }
          setLikesLeft(100)
          await updateDoc(docs.docs[0].ref, updatedData)
          return '+'
        } else return '-'
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getDailyLikesCount = async () => {
    const likesAdded = await dailyLikesAdd()
    if (likesAdded === '+') setLikesLeft(100)
  }

  useEffect(() => {
    getDailyLikesCount()
  }, [])

  async function updateLikesLeft(uid: string) {
    try {
      const q = query(collection(db(), 'users'), where('uid', '==', uid))
      const docs = await getDocs(q)

      if (docs.docs.length === 0) {
        throw new Error(`No user found with uid: ${uid}`)
      }

      const userData = docs.docs[0].data() as UserData

      const likesField = userData.dailyLikesGranted ? 'dailyLikesLeft' : 'likesLeft'

      setLikesLeft(userData[likesField])

      if (userData[likesField] <= 0) {
        return
      }

      const updatedData = {
        [likesField]: userData[likesField] - 1,
        updatedAt: new Date(),
      }

      await updateDoc(docs.docs[0].ref, updatedData)
      console.log(`Successfully updated likes for user with uid: ${uid}`)
    } catch (err) {
      console.error(err)
    }
  }

  const currentIndex = data.length - activeIndex - 1

  const handleLikeAction = () => {
    setLikesLeft(likesLeft - 1)
    updateLikesLeft(user.uid)
    likeAction(data[currentIndex].company.id)
  }

  const handleDislikeAction = () => {
    setLikesLeft(likesLeft - 1)
    updateLikesLeft(user.uid)
    dislikeAction(data[currentIndex].company.id)
  }

  async function getNextSlide(isLike: boolean) {
    gone.add(currentIndex)
    setIsShowLabel(false)

    const q = query(collection(db(), 'users'), where('uid', '==', user.uid))
    const docs = await getDocs(q)

    if (docs.docs.length === 0) {
      throw new Error(`No user found with uid: ${user.uid}`)
    }

    const userData = docs.docs[0].data() as UserData

    const dailyLikesGranted = userData.dailyLikesGranted
    const likesField = dailyLikesGranted ? 'dailyLikesLeft' : 'likesLeft'

    if (userData[likesField] <= 0) {
      return
    }

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
    if (gone.size === data.length) {
      setTimeout(() => finishAction(), 300)
    }
  }
  const getDragResult = async (direction: number) => {
    if (direction > 0) {
      await handleLikeAction()
    } else if (direction < 0) {
      await handleDislikeAction()
    }
  }

  const onLikeClick = async () => {
    setIsShowLabel(true)
    setIsLike(true)
    await handleLikeAction()
    getNextSlide(true)
  }

  const onDislikeClick = async () => {
    setIsShowLabel(true)
    setIsLike(false)
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

    // if (likesLeft >= 0) return
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
      if (gone.size === data.length) {
        setTimeout(() => finishAction(), 300)
      }
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
  })

  return { isLike, isShowLabel, onLikeClick, onDislikeClick, animArray, currentIndex, trans, bind, likesLeft }
}
