import { RootState } from 'src/store'
import { notifySlice } from './notify.slice'

export const { notify, notifyClose } = notifySlice.actions
export const selectors = {
  notifySelector: (state: RootState) => state.notify,
  isShowNotifySelector: (state: RootState) => state.notify.isShowNotify,
}

export default notifySlice.reducer
