import TextField, { TextFieldProps } from '@mui/material/TextField'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

export function InputField<T extends FieldValues>({
  name,
  control,
  variant = 'outlined',
  margin = 'dense',
  ...props
}: UseControllerProps<T> & TextFieldProps) {
  const {
    field,
    fieldState: { error },
  } = useController<T>({
    name,
    control,
  })

  return (
    <TextField
      variant={variant}
      label={props.label}
      error={!!error}
      helperText={error?.message}
      margin={margin}
      {...props}
      {...field}
    />
  )
}
