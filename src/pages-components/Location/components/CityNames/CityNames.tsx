import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material'
import React from 'react'

export const CityNames = ({ data, totalCount }) => {
  if (data.length > totalCount) {
    const neededData = data.slice(0, totalCount)

    return (
      <Stack
        spacing={0.3}
        direction="row"
        width="100%"
        height="24px"
        textOverflow="ellipsis"
        overflow="hidden"
        // whiteSpace="nowrap"
      >
        {neededData.map((item, index) => (
          <TypographyStyled key={index} color="primary" sx={{ display: 'flex', flexDirection: 'row' }}>
            {item},
          </TypographyStyled>
        ))}
      </Stack>
    )
  }

  return (
    <Stack spacing={0.5} direction="row" width="100%" flexWrap="wrap" justifyContent="start">
      {data.map((item, index) => (
        <Typography key={index} color="primary" sx={{ width: 'fit-content', marginTop: '4px !important' }}>
          {item.name}
        </Typography>
      ))}
    </Stack>
  )
}

const TypographyStyled = styled(Typography)(({ theme }) =>
  theme.unstable_sx({
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '147.7%',
    color: '#9AA09E',
    flex: 'none',
    order: 1,
    alignSelf: 'stretch',
    flexGrow: 0,
  }),
)
