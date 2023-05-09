'use client'

import React from 'react'
import Slider, { SliderProps } from '@mui/material/Slider'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

type SliderPropsType = {
  handleChange: (el: number) => void
}

export const SliderField = React.memo(
  <T extends FieldValues>({
    handleChange,
    name,
    control,
    ...props
  }: UseControllerProps<T> & SliderProps & SliderPropsType) => {
    const { field } = control
      ? useController<T>({
          name,
          control,
        })
      : {
          field: null,
        }
    handleChange(field.value)
    return <Slider {...props} {...(field && { ...field })} />
  },
)
