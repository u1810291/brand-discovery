import { configureStore } from '@reduxjs/toolkit'
import { useDispatch as useBasicDispatch } from 'react-redux'
import modalSlice from './slices/modal'
import authSlice from './slices/auth'
import notifySlice from './slices/notify'
import settingsSlice from './slices/settings'

const store = configureStore({
  reducer: {
    modal: modalSlice,
    auth: authSlice,
    notify: notifySlice,
    settings: settingsSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
// export type RootType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useDispatch = (): AppDispatch => useBasicDispatch()
export default store
