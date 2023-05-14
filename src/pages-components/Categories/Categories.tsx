'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Stack from '@mui/material/Stack'
import { MainLayout } from 'src/layouts/MainLayout'
import ListItemButton from '@mui/material/ListItemButton'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { CircularProgress, Typography, styled } from '@mui/material'
import { Search } from 'src/assets/icons/search'
import { CategoryNavbar } from './components/CategoryNavbar'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { SelectedCategories } from './components/SelectedCategories'
import { useGetCategories } from 'src/services/useCategories'
import { useAppDispatch, useAppSelector } from 'src/store'
import { notify } from 'src/store/slices/notify'
import { Type } from 'src/store/slices/notify/notify.slice'
import { settingsSelector } from 'src/store/slices/settings'

export type CategoriesType = {
  query: string
}

export const Categories = () => {
  const [searchResult, setSearchResult] = useState<Array<Record<string, string | number>>>([
    { id: Math.random() * 1000, categoryName: 'Technology' },
  ])
  const [query, setQuery] = useState('')
  const { categories: selected } = useAppSelector(settingsSelector)
  const user = useMemo(() => localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')), [])

  const { categories, getSelectedCategories, loading, error, setCategory } = useGetCategories()
  const dispatch = useAppDispatch()

  const handleChange = useCallback((e) => {
    setQuery(e)
  }, [])

  const handleSetCategory = useCallback((category) => {
    setCategory(user.uid, category)
  }, [])

  useEffect(() => {
    console.error(selected)
    getSelectedCategories(user)
  }, [])

  useEffect(() => {
    if (error) {
      dispatch(notify({ message: error, type: Type.error }))
    }
  }, [dispatch, error])

  return (
    <MainLayout showBackButton navbar={<CategoryNavbar field={query} updateField={handleChange} />}>
      <Stack>
        <List sx={{ width: '100%', bgcolor: 'white' }} component="nav" aria-labelledby="nested-list-subheader">
          {selected?.length ? (
            <Stack position="relative" height={selected && 100}>
              <Stack
                spacing={0.5}
                width="calc(100% + 50px)"
                flexWrap="wrap"
                justifyContent="start"
                display="flex"
                flexDirection="column"
                position="absolute"
                left={-25}
                padding="10px 20px"
                bgcolor="#F8F9FB"
              >
                <Stack>
                  <RegularTypographyStyled>Selected Categories ({selected?.length})</RegularTypographyStyled>
                </Stack>
                <SelectedCategories totalCount={selected?.length} data={selected} />
              </Stack>
            </Stack>
          ) : null}

          {loading ? (
            <Stack display="flex" flexDirection="row" alignItems="center" justifyContent="center" height="100%">
              <CircularProgress />
            </Stack>
          ) : query ? (
            searchResult?.map((search) => <React.Fragment key={search.id}>{search.categoryName}</React.Fragment>)
          ) : (
            categories?.map((category, i) => (
              <React.Fragment key={`${category}-${i}`}>
                <ListItemButton onClick={() => handleSetCategory(category)}>
                  <Box sx={{ display: 'flex', width: '100%' }}>
                    <ListItemTextStyled primary={category} color="primary" sx={{ width: 'auto' }} />
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

const RegularTypographyStyled = styled(Typography)`
  font-family: 'Manrope';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  text-transform: capitalize;
  color: #000000;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`

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
