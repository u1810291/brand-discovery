import { createSlice } from '@reduxjs/toolkit'
import { ReactElement } from 'react'

type ModalType = {
  open: boolean
  title: string
  subTitle: string
  children: ReactElement | null
}

// create a slice
export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    title: '',
    open: false,
    subTitle: '',
    children: null,
  },
  reducers: {
    openModal: (state, { payload }: { payload: ModalType }) => {
      state.open = payload.open
      state.title = payload.title
      state.subTitle = payload.subTitle
      state.children = payload.children
    },
    closeModal: (state) => {
      state.title = ''
      state.subTitle = ''
      state.children = null
      state.open = false
    },
  },
})

export const modalSelector = (state) => state.modal
