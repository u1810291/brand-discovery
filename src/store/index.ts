import { configureStore, createEntityAdapter } from '@reduxjs/toolkit'
import { useDispatch as useBasicDispatch } from 'react-redux'
import modalSlice from './slices/modal'

const store = configureStore({
  reducer: {
    modal: modalSlice,
  },
  devTools: true,
})
export type RootType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useDispatch = (): AppDispatch => useBasicDispatch()
export default store
