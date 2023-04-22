import { configureStore } from '@reduxjs/toolkit'
import { useDispatch as useBasicDispatch } from 'react-redux'
import modalSlice from './slices/modal'
import authSlice from './slices/auth'

const store = configureStore({
  reducer: {
    modal: modalSlice,
    auth: authSlice,
  },
  devTools: true,
})
export type RootType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useDispatch = (): AppDispatch => useBasicDispatch()
export default store
