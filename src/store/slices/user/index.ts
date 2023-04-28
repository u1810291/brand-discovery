import { settingsSlice } from './settings.slice'

export const { setLocation } = settingsSlice.actions
export const settingsSelector = (state) => state.settings
export default settingsSlice.reducer
