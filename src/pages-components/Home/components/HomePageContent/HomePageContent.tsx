'use client'
import CloseIcon from '@mui/icons-material/Close'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import { animated, interpolate } from '@react-spring/web'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import { CompanyCardSkeleton } from 'src/components/Skeletons'
import { ROUTES } from 'src/constants/routes'
import { db } from 'src/services/firebase'
import { useBrands } from 'src/services/useBrands'
import { useAppDispatch } from 'src/store'
import { openModal } from 'src/store/slices/modal'
import { Card, CompanyCard } from './components'
import { useHomePageAnim } from './hooks'

type ContentProps = {
  data: any[]
  likeAction: (id: string) => void | Promise<void>
  dislikeAction: (id: string) => void | Promise<void>
  finishAction: () => void | Promise<void>
}

// interface likeData {
//   name: string
//   company_id: string
//   time: Date
//   liked: boolean
// }

async function handleActionClick(uid: string, cid: string, liked: boolean) {
  try {
    const uq = query(collection(db(), 'users'), where('uid', '==', uid))
    const udocs = await getDocs(uq)
    const cq = query(collection(db(), 'companies'), where('_id', '==', cid))
    const cdocs = await getDocs(cq)
    const companyData = cdocs.docs[0].data()

    const updateData = {
      name: companyData.profile_name,
      company_id: cid,
      time: new Date(),
      liked,
    }
    const userData = udocs.docs[0].data()
    if (userData.likes && userData.likes.some((like) => like.company_id === cid)) {
      // Company ID already exists in likes array
      return
    } else if (userData.likes) {
      // Add the new like to the existing array
      const updatedUserLikes = [...userData.likes, updateData]
      await updateDoc(doc(db(), 'users', udocs.docs[0].id), { likes: updatedUserLikes })
      return
    } else {
      // Create a new likes array with the first like
      await updateDoc(doc(db(), 'users', udocs.docs[0].id), { likes: [updateData] })
      return
    }
  } catch (err) {
    alert(err)
  }
}

export const HomePageContent: FC<ContentProps> = ({ data, likeAction, dislikeAction, finishAction }) => {
  const { animArray, isLike, isShowLabel, onDislikeClick, onLikeClick, currentIndex, trans, bind, likesLeft } =
    useHomePageAnim({
      data,
      likeAction,
      dislikeAction,
      finishAction,
    })
  const { loading } = useBrands()

  const user = JSON.parse(localStorage.getItem('user') || null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (likesLeft <= 0) {
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

  const handleLike = () => {
    handleActionClick(user.uid, data[currentIndex].company.id, true)
    onLikeClick()
  }

  const handleDislike = () => {
    handleActionClick(user.uid, data[currentIndex].company.id, false)
    onDislikeClick()
  }

  return (
    <Stack flex={1} position="relative" marginX={3} marginTop={5} marginBottom={4}>
      <Stack flex={1}>
        {loading ? (
          <Skeleton variant="rectangular" sx={{ flex: 1, opacity: 0.7 }} />
        ) : (
          animArray.map(({ x, y, rot, scale }, i) => (
            <Animated key={i} style={{ x, y }}>
              <Card
                isLike={isLike}
                isShowLabel={i === currentIndex && isShowLabel}
                images={data[i]?.images?.slice(0, 5) || []}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                {...bind(i)}
                style={{
                  transform: interpolate([rot, scale], trans),
                }}
              />
            </Animated>
          ))
        )}
      </Stack>

      {currentIndex >= 0 && (
        <Wrapper>
          {loading ? (
            <CompanyCardSkeleton />
          ) : (
            <LinkContainer href={`${ROUTES.brand}/${data[currentIndex].company.id}`}>
              <CompanyCard data={data[currentIndex].company} />
            </LinkContainer>
          )}
          <Stack direction="row" justifyContent="space-between" width="100%" paddingX={9}>
            {loading ? (
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
