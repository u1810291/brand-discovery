import { modalSlice } from './modal.slice'

export const { openModal, closeModal } = modalSlice.actions
export const modal = (state) => state.modal
export default modalSlice.reducer
