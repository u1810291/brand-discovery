import { authSlice } from './auth.slice'

export const { login, logout } = authSlice.actions
export const modal = (state) => state.modal
export default authSlice.reducer
