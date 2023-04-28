import { createSlice } from '@reduxjs/toolkit'
import { CoordinatesType } from 'src/hooks/useGeoLocation'

type SettingsType = {
  location: CoordinatesType
}

const initialState = {
  location: null,
} satisfies SettingsType

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLocation: (state, { payload }: { payload: SettingsType }) => {
      state.location = payload.location
    },
  },
})
