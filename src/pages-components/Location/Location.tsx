'use client'
import React, { useCallback, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import { MainLayout } from 'src/layouts/MainLayout'
import ListItemButton from '@mui/material/ListItemButton'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { CircularProgress, styled, useMediaQuery } from '@mui/material'
import { Search } from 'src/assets/icons/search'
import { LocationIcon } from 'src/assets/icons/location'
import { useStoreGeoLocation } from 'src/services/useGeoLocation'
import { CityNames } from './components/CityNames/CityNames'
import { LocationNavbar } from './components/LocationNavbar'
import { useDispatch } from 'react-redux'
import { notify } from 'src/store/slices/notify'
import { Type } from 'src/store/slices/notify/notify.slice'
import { ROUTES } from 'src/constants/routes'
import { useRouter } from 'next/router'

export type LocationType = {
  query: string
}

export const Location = () => {
  const isMiddleWidth = useMediaQuery('(min-width:550px)')
  const isBigWidth = useMediaQuery('(min-width:800px)')
  const router = useRouter()
  const dispatch = useDispatch()
  const cityNameCount = isBigWidth ? 10 : isMiddleWidth ? 5 : 3
  const [setUserGeoPosition, query, setQuery, countries, loading, success, error] = useStoreGeoLocation()

  const handleChange = useCallback((e) => {
    setQuery(e)
  }, [])

  const handleChooseLocation = useCallback((e) => {
    const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
    setUserGeoPosition({
      uid: user?.uid,
      name: e.address?.city || e.address?.country || e?.address?.place,
      latitude: Number(e.lat),
      longitude: Number(e.lon),
    })
  }, [])
  useEffect(() => {
    if (success || error) {
      dispatch(notify({ type: error ? Type.error : Type.success, message: error?.message || success }))
    }
    if (success) {
      router.push(ROUTES.home)
    }
  }, [error, success])
  return (
    <MainLayout showBackButton navbar={<LocationNavbar field={query} updateField={handleChange} />}>
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
          {loading || success ? (
            <Stack display="flex" flexDirection="row" alignItems="center" justifyContent="center" height="100%">
              <CircularProgress />
            </Stack>
          ) : (
            countries?.map((country, i) => (
              <React.Fragment key={`${country.display_name}-${i}`}>
                <ListItemButton sx={{ paddingLeft: 0 }} onClick={() => handleChooseLocation(country)}>
                  <LocationIcon width="28px" height="28px" />
                  <Box sx={{ width: '100%', paddingLeft: 2 }}>
                    <ListItemTextStyled
                      primary={country.address.city || country.address.country || country.address.place}
                      color="primary"
                      sx={{ width: 'auto' }}
                    />
                    <Stack display="flex" flexDirection="row" gap={1}>
                      <CityNames
                        data={
                          country.display_name.split(',') || [
                            country.address.railway,
                            country.address.region,
                            country.address.suburb,
                          ]
                        }
                        totalCount={cityNameCount}
                      />
                    </Stack>
                  </Box>
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
