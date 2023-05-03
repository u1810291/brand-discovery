/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Stack from '@mui/material/Stack'
import { MainLayout } from 'src/layouts/MainLayout'
import ListItemButton from '@mui/material/ListItemButton'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { CircularProgress, Typography, styled, useMediaQuery } from '@mui/material'
import { Search } from 'src/assets/icons/search'
import { CategoryNavbar } from './components/CategoryNavbar'
import { useDispatch } from 'react-redux'
import { notify } from 'src/store/slices/notify'
import { Type } from 'src/store/slices/notify/notify.slice'
import { ROUTES } from 'src/constants/routes'
import { useRouter } from 'next/router'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { SelectedCategories } from './components/SelectedCategories'
import { useGetCategories } from 'src/services/useCategories'
export type CategoriesType = {
  query: string
}

export const Categories = () => {
  const isMiddleWidth = useMediaQuery('(min-width:550px)')
  const isBigWidth = useMediaQuery('(min-width:800px)')
  const router = useRouter()
  const dispatch = useDispatch()
  const cityNameCount = isBigWidth ? 10 : isMiddleWidth ? 5 : 2
  const [query, setQuery] = useState<string>()
  const [fetch, categories, loading, error] = useGetCategories()
  const user = useMemo(() => localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')), [])
  const [selectedCategories, setSelectedCategories] = useState<Array<string>>([
    'Adult',
    'Music',
    'Health',
    'Sport',
    'Technology',
  ])

  const handleChange = useCallback((e) => {
    console.error('first')
  }, [])

  useEffect(() => {
    fetch(user?.uid)
  }, [user?.uid])

  return (
    <MainLayout showBackButton navbar={<CategoryNavbar field={query} updateField={handleChange} />}>
      <Stack>
        <List sx={{ width: '100%', bgcolor: 'white' }} component="nav" aria-labelledby="nested-list-subheader">
          {query && (
            <>
              <ListItemButton sx={{ paddingLeft: 0 }} onClick={() => console.error('error')}>
                <Search />
                <Box sx={{ width: '100%', paddingLeft: 2 }}>
                  <ListItemTextStyled primary={query} color="primary" sx={{ width: 'auto' }} />
                </Box>
              </ListItemButton>
              <StyledDivider sx={{ left: 20 }} />
            </>
          )}
          <SelectedCategories totalCount={categories?.length} data={selectedCategories} />
          {loading ? (
            <Stack display="flex" flexDirection="row" alignItems="center" justifyContent="center" height="100%">
              <CircularProgress />
            </Stack>
          ) : (
            categories?.map((category, i) => (
              <React.Fragment key={`${category.createdAt}-${i}`}>
                <ListItemButton onClick={() => console.error('error')}>
                  <Box sx={{ display: 'flex', width: '100%' }}>
                    <ListItemTextStyled primary={category.name} color="primary" sx={{ width: 'auto' }} />
                  </Box>
                  <ArrowForwardIosIcon fontSize="small" sx={{ color: '#9AA09E' }} />
                </ListItemButton>
                <StyledDivider sx={{ left: 20 }} />
              </React.Fragment>
            ))
          )}
        </List>
      </Stack>
    </MainLayout>
  )
}

const TypographyStyled = styled(Typography)(({ theme }) =>
  theme.unstable_sx({
    color: 'primary.main',
    alignItems: 'center',
    verticalAlign: 'middle',
    display: 'table-cell',
    textAlign: 'center',
    flexGrow: 1,
    lineHeight: '32px',
  }),
)

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
