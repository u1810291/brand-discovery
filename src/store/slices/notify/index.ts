import { notifySlice } from './notify.slice'

export const { notify } = notifySlice.actions
export const notifySelector = (state) => state.notify
export default notifySlice.reducer
