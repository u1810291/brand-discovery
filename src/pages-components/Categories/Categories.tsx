'use client'
import AddIcon from '@mui/icons-material/Add'
import { CircularProgress, Typography, styled } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { MainLayout } from 'src/layouts/MainLayout'
import { useGetCategories } from 'src/services/useCategories'
import { useAppDispatch, useAppSelector } from 'src/store'
import { notify } from 'src/store/slices/notify'
import { Type } from 'src/store/slices/notify/notify.slice'
import { settingsSelector } from 'src/store/slices/settings'
import { CategoryNavbar } from './components/CategoryNavbar'
import { SelectedCategories } from './components/SelectedCategories'

export type CategoriesType = {
  query: string
}

export const Categories = () => {
  const [searchResult, setSearchResult] = useState<Array<string>>([])
  const [query, setQuery] = useState('')
  const { categories: selected } = useAppSelector(settingsSelector)
  const user = useMemo(() => localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')), [])

  const { categories, getSelectedCategories, loading, error, setCategory, deleteCategory } = useGetCategories()
  const dispatch = useAppDispatch()

  const handleChange = useCallback(
    (e) => {
      setQuery(e)
      if (e === '') {
        setSearchResult([])
      } else {
        const filteredCategories = categories.filter(
          (category) => category.toLowerCase().indexOf(e.toLowerCase()) !== -1,
        )
        setSearchResult(filteredCategories)
      }
    },
    [categories],
  )

  const handleSetCategory = useCallback(
    (category) => {
      setCategory(user.uid, category, () => getSelectedCategories(user))
    },
    [user, setCategory, getSelectedCategories],
  )

  useEffect(() => {
    getSelectedCategories(user)
  }, [])

  useEffect(() => {
    if (error) {
      dispatch(notify({ message: error, type: Type.error }))
    }
  }, [dispatch, error])

  const handleDelete = useCallback((item: string) => {
    deleteCategory(user, item)
  }, [])

  const getIsSelectedCategory = (category: string) => {
    return selected.includes(category)
  }

  return (
    <MainLayout
      padding={0}
      showBackButton
      headerProps={{ padding: 3, marginBottom: 0, paddingBottom: 1 }}
      navbar={<CategoryNavbar field={query} updateField={handleChange} />}
    >
      <List sx={{ width: '100%', bgcolor: 'white' }} component="nav" aria-labelledby="nested-list-subheader">
        {selected?.length ? (
          <Stack
            position="relative"
            height="fit-content"
            padding={2}
            spacing={0.5}
            flexWrap="wrap"
            justifyContent="start"
            display="flex"
            flexDirection="column"
            bgcolor="#F8F9FB"
          >
            <Stack>
              <RegularTypographyStyled>Selected Categories ({selected?.length})</RegularTypographyStyled>
            </Stack>
            <SelectedCategories totalCount={selected?.length} data={selected} handleDelete={handleDelete} />
          </Stack>
        ) : null}

        {loading ? (
          <Stack display="flex" flexDirection="row" alignItems="center" justifyContent="center" height="100%">
            <CircularProgress />
          </Stack>
        ) : query ? (
          searchResult?.map((search) => (
            <React.Fragment key={search}>
              <ListItemButton disabled={getIsSelectedCategory(search)} onClick={() => handleSetCategory(search)}>
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <ListItemTextStyled primary={search} color="primary" sx={{ width: 'auto' }} />
                </Box>
                {!getIsSelectedCategory(search) && <AddIcon sx={{ color: '#9AA09E' }} />}
              </ListItemButton>
              <StyledDivider sx={{ left: 20 }} />
            </React.Fragment>
          ))
        ) : (
          categories?.map((category, i) => (
            <React.Fragment key={`${category}-${i}`}>
              <ListItemButton disabled={getIsSelectedCategory(category)} onClick={() => handleSetCategory(category)}>
                <Box sx={{ display: 'flex', width: '100%' }}>
                  <ListItemTextStyled primary={category} color="primary" sx={{ width: 'auto' }} />
                </Box>
                {!getIsSelectedCategory(category) && <AddIcon sx={{ color: '#9AA09E' }} />}
              </ListItemButton>
              <StyledDivider sx={{ left: 20 }} />
            </React.Fragment>
          ))
        )}
      </List>
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
