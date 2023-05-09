'use client'

import Switch, { SwitchProps } from '@mui/material/Switch'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

export function SwitchField<T extends FieldValues>({ name, control, ...props }: UseControllerProps<T> & SwitchProps) {
  const { field } = control
    ? useController<T>({
        name,
        control,
      })
    : {
        field: null,
      }

  return <Switch {...props} {...(field && { ...field })} />
}
