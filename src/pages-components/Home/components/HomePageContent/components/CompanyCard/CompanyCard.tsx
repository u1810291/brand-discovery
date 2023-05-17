'use client'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { Typography, styled } from '@mui/material'
import Stack, { StackProps } from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'
import { FC } from 'react'
import { ChipsList } from 'src/UI/ChipList'

type CompanyCardProps = {
  data?: any
} & StackProps
export const CompanyCard: FC<CompanyCardProps> = ({ data, ...props }) => {
  const isMiddleWidth = useMediaQuery('(min-width:550px)')
  const isBigWidth = useMediaQuery('(min-width:800px)')

  const chipsCount = isBigWidth ? 7 : isMiddleWidth ? 5 : 1

  return (
    <Root {...props}>
      <Image
        placeholder="blur"
        blurDataURL={`${data?.profile_pic_url_hd}`}
        alt="logo"
        src={data?.profile_pic_url_hd}
        width={96}
        height={96}
      />
      <Stack spacing={0.5} width="100%">
        <Typography fontWeight={800} fontSize={'16px'} lineHeight={'22px'}>
          {data?.username}
        </Typography>
        <Stack direction="row" alignItems="center" gap={0.5}>
          <LocationOnOutlinedIcon sx={{ color: '#747978' }} />
          <Typography fontSize={'12px'} lineHeight={'16px'} fontWeight={400} color="#747978">
            {data?.location?.name || 'Worldwide'}
          </Typography>
        </Stack>
        <Typography fontWeight={800} fontSize={'16px'} lineHeight={'22px'} alignItems="center">
          {data?.followers_count}
          <Typography marginLeft={0.5} component="span" fontSize={'12px'} lineHeight={'16px'} fontWeight={400}>
            Followers
          </Typography>
        </Typography>
        <ChipsList data={[data?.category_enum]} totalCount={chipsCount} />
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
  gap: 16px;
`
