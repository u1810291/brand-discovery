import { settingsSlice } from './settings.slice'
export { type SettingsType } from './settings.slice'

export const { setSettings } = settingsSlice.actions
export const settingsSelector = (state) => state.settings
export default settingsSlice.reducer
