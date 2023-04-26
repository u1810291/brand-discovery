import React from 'react'
import Stack from '@mui/material/Stack'
import { MainLayout } from 'src/layouts/MainLayout'
import { InputField } from 'src/components/InputField'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import ListItemButton from '@mui/material/ListItemButton'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material'
import { Search } from 'src/assets/icons/search'
import { LocationIcon } from 'src/assets/icons/location'

export type LocationType = {
  query: string
}

export const schema = yup.object({
  query: yup.string(),
})

const data = [...new Array(20)]

export const Location = () => {
  const { control } = useForm<LocationType>({
    defaultValues: { query: '' },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  return (
    <MainLayout
      showBackButton
      navbar={
        <Stack display="flex" alignItems="center" width="100%">
          <InputField
            variant="standard"
            control={control}
            name="query"
            fullWidth
            placeholder="Enter a query"
            sx={{ borderBottom: '0px !important' }}
          />
        </Stack>
      }
    >
      <Stack>
        <List sx={{ width: '100%', bgcolor: 'white' }} component="nav" aria-labelledby="nested-list-subheader">
          <ListItemButton sx={{ paddingLeft: 0 }} onClick={() => console.error('error')}>
            <Search />
            <Box sx={{ width: '100%', paddingLeft: 2 }}>
              <ListItemTextStyled primary="Location" color="primary" sx={{ width: 'auto' }} />
              <TypographyStyled>Some</TypographyStyled>
            </Box>
          </ListItemButton>
          <StyledDivider sx={{ left: 20 }} />
          {data.map((_el, i) => (
            <React.Fragment key={i}>
              <ListItemButton sx={{ paddingLeft: 0 }} onClick={() => console.error('error')}>
                <LocationIcon width="28px" height="28px" />
                <Box sx={{ width: '100%', paddingLeft: 2 }}>
                  <ListItemTextStyled primary="Location" color="primary" sx={{ width: 'auto' }} />
                  <TypographyStyled>Some</TypographyStyled>
                </Box>
              </ListItemButton>
              <StyledDivider sx={{ left: 20 }} />
            </React.Fragment>
          ))}
        </List>
      </Stack>
    </MainLayout>
  )
}

const StyledDivider = styled(Divider)`
  position: relative;
  width: calc(100% + 48px);
  left: -24px;
  color: #dae3e1;
`

const ListItemTextStyled = styled(ListItemText)`
  width: 262px;
  height: 24px;

  font-family: 'Manrope';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 147.7%;
  flex: none;
  order: 0;
  flex-grow: 1;
  color: ${(color) => (color.color === 'primary' ? '#000000' : '#9aa09e')};
`

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
