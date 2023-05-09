import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

export const LikedCardSkeleton = () => {
  return (
    <Root>
      <Stack direction="row" spacing={2}>
        <Skeleton variant="rounded" width={80} height={80} />
        <Stack spacing={0.5} width="100%" flex={1}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Stack>
      </Stack>
      <Stack width="100%">
        <Skeleton variant="text" />
        <Skeleton variant="rounded" width="100%" sx={{ height: { xs: '180px', sm: '500px' } }} />
      </Stack>
    </Root>
  )
}

const Root = styled(Stack)`
  width: calc(100% - 32px);
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  margin-inline: 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
`
