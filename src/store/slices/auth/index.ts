import { authSlice } from './auth.slice'

export const { login, logout, signUp } = authSlice.actions
export const authSelector = (state) => state.auth
export default authSlice.reducer
