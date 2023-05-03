'use client'

import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { CircularProgress, Typography, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'src/store'
import { closeModal, openModal } from 'src/store/slices/modal'
import { LocationIcon } from 'src/assets/icons/location'
import { useRouter } from 'next/router'
import { ROUTES } from 'src/constants/routes'
import { useGeoLocation } from 'src/hooks/useGeoLocation'
import { setLocation } from 'src/store/slices/user'
import { useOneLocation, useStoreGeoLocation } from 'src/services/useGeoLocation'
import { notify } from 'src/store/slices/notify'
import { Type } from 'src/store/slices/notify/notify.slice'

export const MainSettings = () => {
  const [distance, setDistance] = useState<number | number[]>(50)
  const { getLocation, location, error, loading } = useGeoLocation()
  const [setUserGeoPosition, , , , storeLocationLoading, storeLocationSuccess, storeLocationError] =
    useStoreGeoLocation()
  const dispatch = useDispatch()
  const router = useRouter()

  const [data, errorFetching] = useOneLocation(
    localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).uid,
  )

  useEffect(() => {
    if (!!location) {
      const userId = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).uid
      dispatch(setLocation({ location: location }))
      setUserGeoPosition({
        uid: userId,
        latitude: location.latitude,
        longitude: location.longitude,
        name: location.name,
      })
      dispatch(
        notify({
          type: error || errorFetching ? Type.error : Type.error,
          message: storeLocationError || errorFetching || storeLocationSuccess,
        }),
      )
    }

    if (storeLocationSuccess) {
      dispatch(closeModal())
    }
  }, [error, location, storeLocationSuccess, errorFetching])

  const handleLocation = () => {
    dispatch(
      openModal({
        open: true,
        title: 'Use my location',
        subTitle: `You’ll need to enable your location in to use Spacewise`,
        children: (
          <Stack display="flex" flexDirection="column" gap={2} width="100%">
            <Button variant="contained" onClick={getLocation}>
              {storeLocationLoading || loading ? <CircularProgress /> : `Allow Location`}
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                dispatch(closeModal())
                router.push(ROUTES.location)
              }}
            >
              Pick a Separate Location
            </Button>
          </Stack>
        ),
        icon: <LocationIcon />,
      }),
    )
  }

  return (
    <List
      sx={{ width: '100%', bgcolor: 'white' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={<ListSubheaderStyled id="nested-list-subheader">Discovery</ListSubheaderStyled>}
    >
      <ListItemButton onClick={() => console.error('error')}>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <ListItemTextStyled primary="Categories" color="primary" sx={{ width: 'auto' }} />
          <TypographyStyled>Sport, Health, +4 more</TypographyStyled>
        </Box>
        <ArrowForwardIosIcon fontSize="small" sx={{ color: '#9AA09E' }} />
      </ListItemButton>
      <StyledDivider sx={{ left: 20 }} />
      <ListItemButton onClick={handleLocation}>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <ListItemTextStyled primary="Location" color="primary" sx={{ width: 'auto' }} />
          <TypographyStyled>{data && data.name}</TypographyStyled>
        </Box>
        <ArrowForwardIosIcon fontSize="small" sx={{ color: '#9AA09E' }} />
      </ListItemButton>
      <StyledDivider sx={{ left: 20 }} />
      <ListItemButton
        onClick={() => console.error('error')}
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <ListItemTextStyled primary="Distance preference" sx={{ textAlign: 'start' }} color="primary" />
          <TypographyStyled>{distance} km</TypographyStyled>
        </Box>
        <Slider
          defaultValue={distance}
          value={distance}
          onChange={(e: any) => setDistance(e.target.value)} // this annoying type needs to be fixed with this kind of approach
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      </ListItemButton>
      <ListItemButton onClick={() => console.error('error')}>
        <ListItemTextStyled primary="Only show brands in this range" />
        <Switch />
      </ListItemButton>
    </List>
  )
}

const StyledDivider = styled(Divider)`
  position: relative;
  width: calc(100% + 48px);
  left: -24px;
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

const ListSubheaderStyled = styled(ListSubheader)`
  width: 100%;
  height: 50px;
  background: #f8f9fb;
  font-family: Manrope;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  text-transform: uppercase;
  color: #747978;
  justify-content: center;
  flex: none;
  order: 0;
  flex-grow: 0;
`

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