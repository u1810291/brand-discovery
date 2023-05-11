import { userSlice } from './user.slice'

export const { setLocation } = userSlice.actions
export const settingsSelector = (state) => state.user
export default userSlice.reducer
