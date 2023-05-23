'use client'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { FC } from 'react'

interface NameListProps {
  data?: Array<string>[]
  totalCount?: number
}

export const NameList: FC<NameListProps> = ({ data, totalCount = 2 }) => {
  const neededData = data.slice(0, totalCount)
  const otherData = data.slice(totalCount)
  if (data.length > totalCount) {
    return (
      <Stack spacing={0.5} direction="row" width="100%" justifyContent="end">
        {neededData.map((item, index) => (
          <TypographyStyled key={`${item}-${index}`} color="primary" sx={{ display: 'flex', flexDirection: 'row' }}>
            {neededData.length - 1 === index ? `${item}` : `${item},`}
          </TypographyStyled>
        ))}
        <TypographyStyled color="primary" sx={{ display: 'flex', flexDirection: 'row' }}>
          +{otherData.length}
        </TypographyStyled>
      </Stack>
    )
  }

  return (
    <Stack spacing={0.5} direction="row" width="100%" flexWrap="wrap" justifyContent="end">
      {data.map((item, index) => (
        <TypographyStyled key={`${item}-${index}`} color="primary" sx={{ display: 'flex', flexDirection: 'row' }}>
          {neededData.length - 1 === index ? `${item}` : `${item},`}
        </TypographyStyled>
      ))}
    </Stack>
  )
}

const TypographyStyled = styled(Typography)(({ theme }) =>
  theme.unstable_sx({
    color: 'primary.main',
    alignItems: 'center',
    verticalAlign: 'middle',
    display: 'table-cell',
    textAlign: 'center',
    lineHeight: '32px',
  }),
)
