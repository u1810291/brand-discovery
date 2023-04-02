import { Lock, LockOpen } from '@mui/icons-material'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
  styled,
  Typography,
} from '@mui/material'

import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { useToggle } from '../../hooks'

export function PasswordInput<T extends FieldValues>({
  name,
  control,
  ...props
}: UseControllerProps<T> & OutlinedInputProps) {
  const {
    field,
    fieldState: { error },
  } = useController<T>({
    name,
    control,
  })
  const { isOpen: isShowPassword, toggle } = useToggle()

  return (
    <FormControl margin="dense">
      <InputLabel htmlFor={name}>{props.label}</InputLabel>
      <StyledInput
        {...props}
        {...field}
        id={name}
        type={isShowPassword ? 'text' : 'password'}
        error={!!error}
        margin="dense"
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" edge="end" onClick={toggle}>
              {isShowPassword ? <LockOpen /> : <Lock />}
            </IconButton>
          </InputAdornment>
        }
      />
      {error && (
        <Typography marginTop={0.5} fontSize={12} color="red">
          {error.message}
        </Typography>
      )}
    </FormControl>
  )
}

const StyledInput = styled(OutlinedInput)`
  & .MuiInputAdornment-positionEnd {
    margin-left: 0;
  }
`
