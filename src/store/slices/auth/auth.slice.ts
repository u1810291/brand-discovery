import { createSlice } from '@reduxjs/toolkit'

export type UserData = {
  refreshToken: string
  emailVerified: boolean
  expiresIn: number
  createdAt: number
  lastLoginAt: number
  isLoggedIn: boolean
  likes: Array<any>
  uid: string
  likesUpdated: Date
  likesLeft: number
  dailyLikesLeft: number
  dailyLikesGranted: boolean
  modalShown: boolean
  categories?: Array<string>
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
    likesUpdated: Date
    likes: Array<any>
    likesLeft: number
    dailyLikesLeft: number
    dailyLikesGranted: boolean
  }
}

const initialState = {
  user: {
    uid: null,
    likes: null,
    isLoggedIn: null,
    expiresIn: 0,
    createdAt: 0,
    lastLoginAt: 0,
    refreshToken: '',
    emailVerified: null,
    likesUpdated: new Date(),
    likesLeft: 50,
    dailyLikesGranted: null,
    dailyLikesLeft: null,
    modalShown: null,
  },
} satisfies { user: UserData }
// create a slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }: { payload: AuthType }) => {
      const userData: UserData = {
        uid: payload.user.uid,
        likes: payload.user.likes,
        refreshToken: payload._tokenResponse.refreshToken,
        expiresIn: payload._tokenResponse.expiresIn,
        emailVerified: payload.user.emailVerified,
        createdAt: payload.user.createdAt,
        lastLoginAt: payload.user.lastLoginAt,
        likesUpdated: payload.user.likesUpdated,
        likesLeft: payload.user.likesLeft,
        dailyLikesGranted: payload.user.dailyLikesGranted,
        dailyLikesLeft: payload.user.dailyLikesLeft,
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
        likesUpdated: new Date(),
        likesLeft: 50,
        likes: payload.user.likes,
        dailyLikesGranted: false,
        dailyLikesLeft: null,
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
