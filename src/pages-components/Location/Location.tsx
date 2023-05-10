'use client'
import { CircularProgress, styled, useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { LocationIcon } from 'src/assets/icons/location'
import { Search } from 'src/assets/icons/search'
import { ROUTES } from 'src/constants/routes'
import { MainLayout } from 'src/layouts/MainLayout'
import { useUpdateSettings } from 'src/services/useGeoLocation'
import { notify } from 'src/store/slices/notify'
import { Type } from 'src/store/slices/notify/notify.slice'
import { CityNames } from './components/CityNames/CityNames'
import { LocationNavbar } from './components/LocationNavbar'

export type LocationType = {
  query: string
}

export const Location = () => {
  const isMiddleWidth = useMediaQuery('(min-width:550px)')
  const isBigWidth = useMediaQuery('(min-width:800px)')
  const router = useRouter()
  const dispatch = useDispatch()
  const cityNameCount = isBigWidth ? 10 : isMiddleWidth ? 5 : 3
  const [chosenLocation, setChosenLocation] = useState()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, query, setQuery, countries, loading, success, error] = useUpdateSettings()

  const handleChange = useCallback((e) => {
    setQuery(e)
  }, [])

  const handleChooseLocation = useCallback((e) => {
    const user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
    localStorage.setItem(
      'location',
      JSON.stringify({
        uid: user?.uid,
        name: e.address?.city || e.address?.country || e?.address?.place,
        latitude: Number(e.lat),
        longitude: Number(e.lon),
        placeId: Number(e.place_id),
      }),
    )
    setChosenLocation(e.place_id)

    router.back()
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
              <StyledDivider sx={{ left: '0px' }} />
            </>
          )}
          {loading || success ? (
            <Stack display="flex" flexDirection="row" alignItems="center" justifyContent="center" height="100%">
              <CircularProgress />
            </Stack>
          ) : (
            countries?.map((country, i) => (
              <React.Fragment key={`${country.display_name}-${i}`}>
                <ListItemButton
                  sx={{ paddingLeft: 0 }}
                  onClick={() => handleChooseLocation(country)}
                  style={{ background: chosenLocation === country.place_id && '#E4F4F1', width: 'calc(100% + 7%)' }}
                >
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
                <StyledDivider sx={{ left: '0px' }} />
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
