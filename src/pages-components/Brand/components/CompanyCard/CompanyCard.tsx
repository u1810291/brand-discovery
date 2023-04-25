import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { Typography, styled } from '@mui/material'
import Stack, { StackProps } from '@mui/material/Stack'
import Image from 'next/image'
import { FC } from 'react'
import { CompanyType } from 'src/types'

type CompanyCardProps = {
  data?: CompanyType
} & StackProps
export const CompanyCard: FC<CompanyCardProps> = ({ data, ...props }) => {
  return (
    <Root {...props}>
      <Image
        placeholder="blur"
        blurDataURL={`${data?.image}`}
        unoptimized
        alt="logo"
        src={data?.image}
        width={104}
        height={104}
      />
      <Stack spacing={1} width="100%">
        <Typography fontWeight={800} fontSize={'20px'} lineHeight={'28px'}>
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
          <Typography marginLeft={0.5} component="span" fontSize={'12px'} lineHeight={'16px'} fontWeight={500}>
            Followers
          </Typography>
        </Typography>
      </Stack>
    </Root>
  )
}

const Root = styled(Stack)`
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  gap: 16px;
`
