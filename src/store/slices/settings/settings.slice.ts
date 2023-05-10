import { createSlice } from '@reduxjs/toolkit'

export type SettingsType = {
  createdAt: Record<string, number>
  uid: string
  distance: number
  filterByDistance: boolean
  categories: Array<Record<string, any>>
  updatedAt: Record<string, number>
  location: Record<string, number>
}

const initialState = {
  createdAt: {},
  location: {},
  uid: '',
  distance: 0,
  filterByDistance: null,
  categories: [],
  updatedAt: {},
}
// create a slice
export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: <T>(state, { payload }: { payload: T & SettingsType }) => {
      state = {
        ...state,
        ...payload,
      }
    },
  },
})
