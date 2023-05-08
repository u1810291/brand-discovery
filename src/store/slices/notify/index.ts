import { notifySlice } from './notify.slice'

export const { notify, notifyClose } = notifySlice.actions
export const notifySelector = (state) => state.notify
export default notifySlice.reducer
