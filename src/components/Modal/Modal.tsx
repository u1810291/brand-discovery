import { FC } from 'react'
import { DialogProps } from '@mui/material/Dialog'
import { CustomDialog } from 'src/UI/CustomDialog'
import { AppDispatch, useDispatch } from 'src/store'
import { useSelector } from 'react-redux'
import { modalSelector } from 'src/store/slices/modal/modal.slice'
import { closeModal } from 'src/store/slices/modal'

interface ModalPropsI extends DialogProps {
  title: string
  subTitle: string
}

export const Modal = () => {
  const dispatch: AppDispatch = useDispatch()
  const { open, title, subTitle, children, ...props }: ModalPropsI = useSelector(modalSelector)
  const onClose = () => dispatch(closeModal)

  return (
    <CustomDialog open={open} onClose={onClose} title={title} subtitle={subTitle} {...props}>
      {children}
    </CustomDialog>
  )
}
