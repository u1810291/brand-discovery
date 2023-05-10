import CloseIcon from '@mui/icons-material/Close'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import { animated, interpolate } from '@react-spring/web'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { CompanyCardSkeleton } from 'src/components/Skeletons'
import { ROUTES } from 'src/constants/routes'
import { closeModal, openModal } from 'src/store/slices/modal'
import { CompanyType } from 'src/types'
import { Card, CompanyCard } from './components'
import { useHomePageAnim } from './hooks'

type ContentProps = {
  data: { company: CompanyType; images: string[] }[]
  likeAction: (id: string) => void | Promise<void>
  dislikeAction: (id: string) => void | Promise<void>
  finishAction: () => void | Promise<void>
}

export const HomePageContent: FC<ContentProps> = ({ data, likeAction, dislikeAction, finishAction }) => {
  const { animArray, isLike, isShowLabel, onDislikeClick, onLikeClick, currentIndex, trans, bind, likesLeft } =
    useHomePageAnim({
      data,
      likeAction,
      dislikeAction,
      finishAction,
    })

  const dispatch = useDispatch()

  useEffect(() => {
    if (likesLeft <= 0) {
      dispatch(
        openModal({
          title: `You’re all out of like.`,
          subTitle: `You are only have 100 likes per day.
    More likes are coming soon. `,
          open: true,
          children: (<></>
          ),
        }),
      )
    }
  }, [likesLeft])
  // TODO: CHANGE TO LOADING DATA FROM API
  const isLoading = false

  return (
    <Stack flex={1} position="relative" marginX={3} marginTop={5} marginBottom={4}>
      <Stack flex={1}>
        {isLoading ? (
          <Skeleton variant="rectangular" sx={{ flex: 1, opacity: 0.7 }} />
        ) : (
          animArray.map(({ x, y, rot, scale }, i) => (
            <Animated key={i} style={{ x, y }}>
              <Card
                isLike={isLike}
                isShowLabel={i === currentIndex && isShowLabel}
                images={data[i]?.images.slice(0, 5) || []}
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
          {isLoading ? (
            <CompanyCardSkeleton />
          ) : (
            <LinkContainer href={`${ROUTES.brand}/${data[currentIndex].company.id}`}>
              <CompanyCard data={data[currentIndex]?.company} />
            </LinkContainer>
          )}
          <Stack direction="row" justifyContent="space-between" width="100%" paddingX={9}>
            {isLoading ? (
              <>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
              </>
            ) : (
              <>
                <StyledButton onClick={onDislikeClick} sx={{ borderColor: '#EC1B40' }} size="large">
                  <CloseIcon color="error" />
                </StyledButton>
                <StyledButton onClick={onLikeClick} size="large" sx={{ borderColor: '#18bc9c' }}>
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

const LinkContainer = styled(Link)`
  color: inherit;
  text-decoration: none;
`
