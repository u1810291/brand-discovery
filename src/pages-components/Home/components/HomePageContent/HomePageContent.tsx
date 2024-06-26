'use client'
import CloseIcon from '@mui/icons-material/Close'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import { animated, to } from '@react-spring/web'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import Link from 'next/link'
import { FC, useEffect, useMemo } from 'react'
import { CompanyCardSkeleton } from 'src/components/Skeletons'
import { ROUTES } from 'src/constants/routes'
import { db } from 'src/services/firebase'
import { useBrands } from 'src/services/useBrands'
import { useAppDispatch, useAppSelector } from 'src/store'
import { brandsSelector } from 'src/store/slices/brands'
import { openModal } from 'src/store/slices/modal'
import { Card, CompanyCard } from './components'
import { useHomePageAnim } from './hooks'

type ContentProps = {
  likeAction: (id: string) => void | Promise<void>
  dislikeAction: (id: string) => void | Promise<void>
  finishAction: () => void | Promise<void>
}

async function handleActionClick(uid: string, cid: string, liked: boolean) {
  try {
    const uq = query(collection(db(), 'users'), where('uid', '==', uid))
    const udocs = await getDocs(uq)
    const cq = query(collection(db(), 'brands'), where('_id', '==', cid))
    const cdocs = await getDocs(cq)
    const companyData = cdocs.docs[0].data()

    const username = companyData.instagram_url.split('/')
    const updateData = {
      name: username[username.length - 1],
      company_id: cid,
      time: new Date(),
      liked,
    }
    const userData = udocs.docs[0].data()

    if (userData.likes && userData.likes.some((like) => like.company_id === cid)) {
      return
    } else if (userData?.likes?.length) {
      const updatedUserLikes = [...userData.likes, updateData]
      await updateDoc(doc(db(), 'users', userData.email), { likes: updatedUserLikes })
      return
    } else {
      await updateDoc(doc(db(), 'users', userData.email), { likes: [updateData] })
      return
    }
  } catch (err) {
    console.error(err)
    alert(err)
  }
}

export const HomePageContent: FC<ContentProps> = ({ likeAction, dislikeAction, finishAction }) => {
  const { brands } = useAppSelector(brandsSelector)
  const { fetchAllBrands, loading: brandsLoading } = useBrands()
  const user = useMemo(() => localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')), [])

  useEffect(() => {
    fetchAllBrands(user, finishAction)
  }, [])

  const {
    animArray,
    isLike,
    isShowLabel,
    onDislikeClick,
    onLikeClick,
    currentIndex,
    trans,
    bind,
    likesLeft,
    dailyLikesGranted,
  } = useHomePageAnim({
    data: brands,
    likeAction,
    dislikeAction,
    finishAction,
  })
  const { loading } = useBrands()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (likesLeft <= 0 && !dailyLikesGranted) {
      dispatch(
        openModal({
          title: `You’re all out of like.`,
          subTitle: `You have only 50 likes at this moment.
    More likes are coming soon.
     Our manager will contact you soon. `,
          open: true,
          children: <></>,
        }),
      )
    }
    if (likesLeft <= 0 && dailyLikesGranted) {
      dispatch(
        openModal({
          title: `You’re all out of like.`,
          subTitle: `You are only have 100 likes per day.
  More likes are coming soon. `,
          open: true,
          children: <></>,
        }),
      )
    }
  }, [likesLeft])

  const handleLike = async () => {
    const likeResult = await onLikeClick()
    if (likeResult != -1) {
      handleActionClick(user.uid, brands[currentIndex].company.id, true)
    }
  }

  const handleDislike = async () => {
    const dislikeResult = await onDislikeClick()
    if (dislikeResult != -1) {
      handleActionClick(user.uid, brands[currentIndex].company.id, false)
    }
  }

  const showingElementsIndex = currentIndex - 3

  return (
    <Stack flex={1} position="relative" marginX={3} marginTop={5} marginBottom={4}>
      <Stack flex={1}>
        {loading || brandsLoading ? (
          <Skeleton variant="rectangular" sx={{ flex: 1, opacity: 0.7 }} />
        ) : (
          animArray.map(
            ({ x, y, rot, scale }, i) =>
              i > showingElementsIndex && (
                <Animated key={i} style={{ x, y }}>
                  <Card
                    isLike={isLike}
                    isShowLabel={i === currentIndex && isShowLabel}
                    images={brands[currentIndex]?.images?.slice(0, 5) || []}
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    {...bind(i)}
                    style={{
                      transform: to([rot, scale], trans),
                    }}
                  />
                </Animated>
              ),
          )
        )}
      </Stack>

      {currentIndex >= 0 && (
        <Wrapper>
          {loading || brandsLoading ? (
            <CompanyCardSkeleton />
          ) : (
            <LinkContainer href={`${ROUTES.brand}/${brands[currentIndex].company.id}`}>
              <CompanyCard data={brands[currentIndex].company} />
            </LinkContainer>
          )}
          <Stack direction="row" justifyContent="space-between" width="100%" paddingX={9}>
            {loading || brandsLoading ? (
              <>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
              </>
            ) : (
              <>
                <StyledButton onClick={handleDislike} sx={{ borderColor: '#EC1B40' }} size="large">
                  <CloseIcon color="error" />
                </StyledButton>
                <StyledButton onClick={handleLike} size="large" sx={{ borderColor: '#18bc9c' }}>
                  <FavoriteOutlinedIcon color="primary" />
                </StyledButton>
              </>
            )}
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
  z-index: 3;
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

const LinkContainer = styled(Link)`
  color: inherit;
  text-decoration: none;
`
