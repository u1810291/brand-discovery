'use client'

import { DialogProps } from '@mui/material/Dialog'
import { FC, Ref } from 'react'
import { CustomDialog } from 'src/UI/CustomDialog'
import { useAppDispatch, useAppSelector } from 'src/store'
import { closeModal } from 'src/store/slices/modal'
import { modalSelector } from 'src/store/slices/modal/modal.slice'

interface ModalPropsI extends DialogProps {
  title: string
  subTitle: string
}

interface ModalProps {
  modalRef: Ref<HTMLDivElement | null>
}

export const Modal: FC<ModalProps> = ({ modalRef }) => {
  const dispatch = useAppDispatch()
  const { open, title, subTitle, children, ...props }: ModalPropsI = useAppSelector(modalSelector)
  const onClose = () => dispatch(closeModal)

  return (
    <CustomDialog open={open} modalRef={modalRef} onClose={onClose} title={title} subtitle={subTitle} {...props}>
      {children}
    </CustomDialog>
  )
}
