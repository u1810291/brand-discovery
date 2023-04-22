import { createSlice } from '@reduxjs/toolkit'

type AuthType = {
  token: string
}

// create a slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    logTime: null,
  },
  reducers: {
    login: (state, { payload }: { payload: AuthType }) => {
      localStorage.setItem('token', JSON.parse(payload.token).stsTokenManager.accessToken)
      localStorage.setItem('logTime', new Date().toISOString())
      state.token = payload.token
      state.logTime = new Date().toISOString()
    },
    logout: (state) => {
      localStorage.setItem('token', '')
      localStorage.setItem('logTime', null)
      state.token = ''
      state.logTime = null
    },
  },
})

export const authSelector = (state) => state.auth
