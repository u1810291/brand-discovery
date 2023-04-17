import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { Chip, Typography, styled } from '@mui/material'
import Stack from '@mui/material/Stack'
import Image from 'next/image'
import { FC } from 'react'
import { CompanyType } from 'src/types'

type CompanyCardProps = {
  data?: CompanyType
}
export const CompanyCard: FC<CompanyCardProps> = ({ data }) => {
  return (
    <Root>
      <Image alt="logo" src={data?.image} width={96} height={96} />
      <Stack spacing={0.5}>
        <Typography fontWeight={800} fontSize={'16px'} lineHeight={'22px'}>
          {data?.title}
        </Typography>
        <Stack direction="row" alignItems="center" gap={0.5}>
          <LocationOnOutlinedIcon />
          <Typography fontSize={'12px'} lineHeight={'16px'} fontWeight={400} color="#747978">
            {data?.location}
          </Typography>
        </Stack>
        <Typography fontWeight={800} fontSize={'16px'} lineHeight={'22px'} alignItems="center">
          {data?.followers}
          <Typography marginLeft={0.5} component="span" fontSize={'12px'} lineHeight={'16px'} fontWeight={400}>
            Followers
          </Typography>
        </Typography>
        <Stack direction="row" gap={0.5}>
          {data?.tags.map((tag) => (
            <Chip label={tag} key={tag} />
          ))}
        </Stack>
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
  flex-direction: row;
  gap: 16px;
`
