import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

export const BrandSkeleton = () => {
  const count = Array(10)
  return (
    <Root>
      <Stack direction="row" spacing={2}>
        <Skeleton variant="rounded" width={80} height={80} />
        <Stack spacing={0.5} width="100%" flex={1}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Stack>
      </Stack>
      <Stack width="100%">
        <Skeleton variant="rounded" width="100%" sx={{ height: '80px' }} />
      </Stack>
      <Stack>
        <Skeleton variant="text" width="100%" />
        <Skeleton width="100%" sx={{ height: { xs: '216px', sm: '450px' } }} />
      </Stack>
      <Container>
        {count.fill('').map((_, index) => (
          <Skeleton key={index} sx={{ height: { xs: '102px', sm: '202px' } }} />
        ))}
      </Container>
    </Root>
  )
}

const Root = styled(Stack)`
  width: 100%;
  height: calc(100% - 80px);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
  overflow-y: auto;

  .MuiSkeleton-root {
    transform: scale(1);
  }
`

const Container = styled(Stack)`
  margin-top: 8px;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(3, minmax(102px, 278px));
  grid-template-rows: masonry;
  justify-content: space-between;
  gap: 8px;
`
