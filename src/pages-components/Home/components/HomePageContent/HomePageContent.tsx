import CloseIcon from '@mui/icons-material/Close'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import { styled } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { animated, interpolate } from '@react-spring/web'
import Link from 'next/link'
import { FC } from 'react'
import { ROUTES } from 'src/constants/routes'
import { CompanyType } from 'src/types'
import { Card, CompanyCard } from './components'
import { useHomePageAnim } from './hooks'

type ContentProps = {
  data: { company: CompanyType; images: string[] }[]
  likeAction: (id: string) => void | Promise<void>
  dislikeAction: (id: string) => void | Promise<void>
}

export const HomePageContent: FC<ContentProps> = ({ data, likeAction, dislikeAction }) => {
  const { animArray, isLike, isShowLabel, onDislikeClick, onLikeClick, currentIndex, trans, bind } = useHomePageAnim({
    data,
    likeAction,
    dislikeAction,
  })

  return (
    <Stack flex={1} position="relative">
      <Stack flex={1}>
        {animArray.map(({ x, y, rot, scale }, i) => (
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
        ))}
      </Stack>

      {currentIndex >= 0 && (
        <Wrapper>
          <LinkContainer href={`${ROUTES.brand}/${data[currentIndex].company.id}`}>
            <CompanyCard data={data[currentIndex]?.company} />
          </LinkContainer>
          <Stack direction="row" justifyContent="space-between" width="100%" paddingX={9}>
            <StyledButton onClick={onDislikeClick} sx={{ borderColor: '#EC1B40' }} size="large">
              <CloseIcon color="error" />
            </StyledButton>
            <StyledButton onClick={onLikeClick} size="large" sx={{ borderColor: '#18bc9c' }}>
              <FavoriteOutlinedIcon color="primary" />
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

const LinkContainer = styled(Link)`
  color: inherit;
  text-decoration: none;
`
