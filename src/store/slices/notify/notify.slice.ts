import { createSlice } from '@reduxjs/toolkit'

export enum Type {
  success = 'success',
  error = 'error',
}

type NotifyType = {
  message: string
  type: Type
}

type NotifySliceType = {
  message: string
  type: Type
  isShowNotify: boolean
}

const initialState: NotifySliceType = {
  message: '',
  type: null,
  isShowNotify: false,
}

export const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    notify: (state, { payload }: { payload: NotifyType }) => {
      state.message = payload.message
      state.type = payload.type
      state.isShowNotify = true
    },
    notifyClose: (state) => {
      state.isShowNotify = false
    },
  },
})
