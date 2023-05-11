'use client'

import Switch, { SwitchProps } from '@mui/material/Switch'
import React from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

interface SwitchFieldProps {
  handleChange: (item: Record<string, string>) => void
}

export const SwitchField = React.memo(
  <T extends FieldValues>({
    handleChange,
    name,
    control,
    ...props
  }: UseControllerProps<T> & SwitchProps & SwitchFieldProps) => {
    const {
      field: { onChange, ...rest },
    } = control
      ? useController<T>({
          name,
          control,
        })
      : {
          field: null,
        }
    return (
      <Switch
        {...props}
        {...(rest && { ...rest })}
        onChange={(e) => {
          onChange(e.target.checked.toString())
          return handleChange({ name: rest.name, value: rest.value.toString() })
        }}
      />
    )
  },
  (prevProps, nextProps) => prevProps.control._fields.filterByDistance === nextProps.control._fields.filterByDistance,
)
