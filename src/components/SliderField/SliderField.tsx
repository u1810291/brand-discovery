'use client'

import React from 'react'
import Slider, { SliderProps } from '@mui/material/Slider'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
interface SliderFieldProps {
  handleChange: (item: Record<string, string>) => void
}

export const SliderField = React.memo(
  <T extends FieldValues>({
    handleChange,
    name,
    control,
    ...props
  }: UseControllerProps<T> & SliderProps & SliderFieldProps) => {
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
      <Slider
        {...props}
        {...(rest && { ...rest })}
        onChange={(e: Event) => {
          const target = e.target as HTMLInputElement
          onChange(target.value)
          handleChange({ name: target.name, value: target.value })
        }}
      />
    )
  },
  (prevProps, nextProps) => prevProps.control._fields.distance === nextProps.control._fields.distance,
)
