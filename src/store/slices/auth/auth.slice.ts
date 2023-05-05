import { createSlice } from '@reduxjs/toolkit'

export type UserData = {
  refreshToken: string
  emailVerified: boolean
  expiresIn: number
  createdAt: number
  lastLoginAt: number
  isLoggedIn: boolean
  uid: string
  modalShown: boolean
}

type AuthType = {
  _tokenResponse: {
    refreshToken: string
    expiresIn: number
  }
  user: {
    uid: string
    emailVerified: boolean
    createdAt: number
    lastLoginAt: number
  }
}

const initialState: { user: UserData | null } = {
  user: null,
}

// create a slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }: { payload: AuthType }) => {
      const userData: UserData = {
        uid: payload.user.uid,
        refreshToken: payload._tokenResponse.refreshToken,
        expiresIn: payload._tokenResponse.expiresIn,
        emailVerified: payload.user.emailVerified,
        createdAt: payload.user.createdAt,
        lastLoginAt: payload.user.lastLoginAt,
        modalShown: false,
        isLoggedIn: true,
      }
      localStorage.setItem('user', JSON.stringify(userData))
      state.user = userData
    },
    signUp: (state, { payload }: { payload: AuthType }) => {
      const userData: UserData = {
        uid: payload.user.uid,
        refreshToken: payload._tokenResponse.refreshToken,
        expiresIn: payload._tokenResponse.expiresIn,
        emailVerified: payload.user.emailVerified,
        createdAt: payload.user.createdAt,
        lastLoginAt: payload.user.lastLoginAt,
        isLoggedIn: false,
        modalShown: false,
      }
      localStorage.setItem('user', JSON.stringify(userData))
      state.user = userData
    },
    logout: (state) => {
      localStorage.removeItem('user')
      state.user = null
    },
  },
})
