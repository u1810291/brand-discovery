import { createSlice } from '@reduxjs/toolkit'

enum Type {
  success = 'success',
  error = 'error',
}

type NotifyType = {
  message: string
  type: Type
}

const initialState = {
  message: '',
  type: null,
} satisfies NotifyType

export const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    notify: (state, { payload }: { payload: NotifyType }) => {
      state.message = payload.message
      state.type = payload.type
    },
  },
})
