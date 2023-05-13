import { createSlice } from '@reduxjs/toolkit'

export type SettingsType = {
  uid?: string
  distance?: number
  filterByDistance?: boolean
  updatedAt?: Record<string, number>
  createdAt?: Record<string, number>
  categories?: Array<Record<string, any>>
  location?: Record<string, number | string>
}

const initialState = {
  createdAt: {},
  updatedAt: {},
  uid: global.localStorage && JSON.parse(global.localStorage.getItem('user') || null)?.uid,
  location: (global.localStorage && JSON.parse(global.localStorage.getItem('location') || null)) || null,
  distance: (global.localStorage && JSON.parse(global.localStorage.getItem('distance') || null)) || 0,
  categories: (global.localStorage && JSON.parse(global.localStorage.getItem('categories') || null)) || [],
  filterByDistance:
    (global.localStorage && JSON.parse(global.localStorage.getItem('filterByDistance') || null)) || false,
}
// create a slice
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, { payload }: { payload: SettingsType }) => {
      state.categories = payload.categories || state.categories
      state.createdAt = payload.createdAt || state.createdAt
      state.updatedAt = payload.updatedAt || state.updatedAt
      state.distance = payload.distance || state.distance
      state.filterByDistance = payload.filterByDistance || state.filterByDistance
      state.location = payload.location || state.location
      state.uid = payload.uid || state.uid
    },
  },
})
