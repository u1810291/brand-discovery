import { createSlice } from '@reduxjs/toolkit'

export type UserData = {
  refreshToken: string
  emailVerified: boolean
  expiresIn: number
  createdAt: number
  lastLoginAt: number
  isLoggedIn: boolean
}

type AuthType = {
  _tokenResponse: {
    refreshToken: string
    expiresIn: number
  }
  user: {
    emailVerified: boolean
    createdAt: number
    lastLoginAt: number
  }
}

const initialState = {
  user: {
    isLoggedIn: null,
    expiresIn: 0,
    createdAt: 0,
    lastLoginAt: 0,
    refreshToken: '',
    emailVerified: null,
  },
} satisfies { user: UserData }
// create a slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }: { payload: AuthType }) => {
      const userData: UserData = {
        refreshToken: payload._tokenResponse.refreshToken,
        expiresIn: payload._tokenResponse.expiresIn,
        emailVerified: payload.user.emailVerified,
        createdAt: payload.user.createdAt,
        lastLoginAt: payload.user.lastLoginAt,
        isLoggedIn: true,
      }
      localStorage.setItem('user', JSON.stringify(userData))
      state.user = userData
    },
    signUp: (state, { payload }: { payload: AuthType }) => {
      const userData: UserData = {
        refreshToken: payload._tokenResponse.refreshToken,
        expiresIn: payload._tokenResponse.expiresIn,
        emailVerified: payload.user.emailVerified,
        createdAt: payload.user.createdAt,
        lastLoginAt: payload.user.lastLoginAt,
        isLoggedIn: false,
      }
      localStorage.setItem('user', JSON.stringify(userData))
      state.user = userData
    },
    logout: (state) => {
      localStorage.setItem('user', '')
      state.user = null
    },
  },
})
