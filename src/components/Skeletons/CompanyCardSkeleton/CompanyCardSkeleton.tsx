import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

export const CompanyCardSkeleton = () => {
  return (
    <Root>
      <Skeleton variant="rounded" width={96} height={96} />
      <Stack spacing={0.5} width="100%" flex={1}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="rounded" />
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
  flex-direction: row;
  flex: 1;
  gap: 16px;
`
