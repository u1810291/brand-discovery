'use client'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Typography, styled } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LocationIcon } from 'src/assets/icons/location'
import { SliderField } from 'src/components/SliderField'
import { SwitchField } from 'src/components/SwitchField'
import { ROUTES } from 'src/constants/routes'
import { useEffectOnce } from 'src/hooks/useEffectOnce'
import { useGeoLocation } from 'src/hooks/useGeoLocation'
import { useOneLocation, useUpdateSettings } from 'src/services/useGeoLocation'
import { useDispatch } from 'src/store'
import { closeModal, openModal } from 'src/store/slices/modal'
import { notify } from 'src/store/slices/notify'
import { Type } from 'src/store/slices/notify/notify.slice'
import { settingsSelector } from 'src/store/slices/settings'
import { setLocation } from 'src/store/slices/user'

export const MainSettings = ({ control }) => {
  const { getLocation, location, error } = useGeoLocation()
  const [distance, setDistance] = useState(50)
  const settings = useSelector(settingsSelector)
  const { success: storeLocationSuccess, error: storeLocationError } = useUpdateSettings()
  const dispatch = useDispatch()
  const router = useRouter()

  const {
    fetchLocation,
    loading,
    error: errorFetching,
  } = useOneLocation(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).uid)

  useEffect(() => {
    if (!!location) {
      const userId = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).uid
      dispatch(setLocation({ location: location }))
      localStorage.setItem(
        'location',
        JSON.stringify({
          uid: userId,
          name: location.name,
          latitude: Number(location.latitude),
          longitude: Number(location.longitude),
          placeId: null,
        }),
      )
    }
    dispatch(
      notify({
        type: error || errorFetching ? Type.error : Type.success,
        message: storeLocationError || errorFetching || storeLocationSuccess,
      }),
    )

    if (!error) {
      dispatch(closeModal())
    }
  }, [error, location, storeLocationSuccess, errorFetching])

  useEffectOnce(() => {
    fetchLocation()
  })

  const handleLocation = () => {
    dispatch(
      openModal({
        open: true,
        title: 'Use my location',
        subTitle: `You’ll need to enable your location in to use Spacewise`,
        children: (
          <Stack display="flex" flexDirection="column" gap={2} width="100%">
            <Button variant="contained" onClick={getLocation}>
              Allow Location
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
      sx={{ width: '100%', bgcolor: 'white', paddingBottom: 0 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={<ListSubheaderStyled id="nested-list-subheader">Discovery</ListSubheaderStyled>}
    >
      <ListItemButton onClick={() => router.push(ROUTES.categories)}>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <ListItemTextStyled primary="Categories" color="primary" sx={{ width: 'auto' }} />
          {loading ? (
            <Skeleton variant="text" width={200} />
          ) : (
            <TypographyStyled>{settings?.categories?.map((el) => el?.categoryName).join(',')}</TypographyStyled>
          )}
        </Box>
        <ArrowForwardIosIcon fontSize="small" sx={{ color: '#9AA09E' }} />
      </ListItemButton>
      <StyledDivider sx={{ left: 20 }} />
      <ListItemButton onClick={handleLocation}>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <ListItemTextStyled primary="Location" color="primary" sx={{ width: 'auto' }} />
          {loading ? (
            <Skeleton variant="text" width={200} />
          ) : (
            <TypographyStyled>{settings?.location?.name}</TypographyStyled>
          )}
        </Box>
        <ArrowForwardIosIcon fontSize="small" sx={{ color: '#9AA09E' }} />
      </ListItemButton>
      <StyledDivider sx={{ left: 20 }} />
      <ListItemButton sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <ListItemTextStyled primary="Distance preference" sx={{ textAlign: 'start' }} color="primary" />

          {loading ? (
            <Skeleton variant="text" width={50} />
          ) : (
            <TypographyStyled>{settings?.distance || distance} km</TypographyStyled>
          )}
        </Box>
        <SliderField
          aria-label="Default"
          name="distance"
          valueLabelDisplay="auto"
          control={control}
          handleChange={setDistance}
        />
      </ListItemButton>
      <ListItemButton>
        <ListItemTextStyled primary="Only show brands in this range" />
        {loading ? <Skeleton width={50} height={32} /> : <SwitchField name="filterByDistance" control={control} />}
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
