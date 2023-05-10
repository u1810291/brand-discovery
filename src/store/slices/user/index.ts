import { userSlice } from './settings.slice'

export const { setLocation } = userSlice.actions
export const settingsSelector = (state) => state.settings
export default userSlice.reducer
