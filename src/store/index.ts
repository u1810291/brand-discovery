import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import authSlice from './slices/auth'
import modalSlice from './slices/modal'
import notifySlice from './slices/notify'
import settingsSlice from './slices/settings'
import userSlice from './slices/user'
import brandsSlice from './slices/brands'

const store = configureStore({
  reducer: {
    modal: modalSlice,
    auth: authSlice,
    notify: notifySlice,
    settings: settingsSlice,
    user: userSlice,
    brands: brandsSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
