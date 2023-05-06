'use client'

import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { MainLayout } from 'src/layouts/MainLayout'
import { AppDispatch, useDispatch } from 'src/store'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputField } from 'src/components/InputField'
import { AccountNavbar } from './components/AccountNavbar'
import { UpdateAccountFormType, defaultValues, schema } from './helper'
import { useUpdateUser } from 'src/services/useUpdateUser'
import { notify } from 'src/store/slices/notify'
import { Type } from 'src/store/slices/notify/notify.slice'

export const Account = () => {
  const dispatch: AppDispatch = useDispatch()
  const [updateUser, loading, success, error] = useUpdateUser()
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<UpdateAccountFormType>({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: UpdateAccountFormType) => {
    const uid = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).uid
    await updateUser({
      uid,
      firstName: data.firstName,
      lastName: data.lastName,
      companyName: data.companyName,
      email: data.email,
    })
  }

  useEffect(() => {
    if (success || error) {
      dispatch(notify({ type: error ? Type.error : Type.success, message: error ? error : 'Updated successfully' }))
    }
  }, [success, error])

  return (
    <MainLayout showBackButton navbar={<AccountNavbar />}>
      <Stack spacing={{ xs: 2, sm: 4 }} component="form" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="email"
          placeholder="Enter your E-mail"
          label="E-mail address"
          control={control}
          autoComplete="email"
        />
        <Stack display="flex" gap={2} paddingLeft={0} flexDirection="row">
          <InputField
            name="firstName"
            placeholder="Enter your First name"
            label="First name"
            control={control}
            fullWidth
          />
          <InputField
            name="lastName"
            placeholder="Enter your Last name"
            label="Last name"
            control={control}
            fullWidth
          />
        </Stack>
        <InputField name="companyName" placeholder="Enter your Company name" label="Company name" control={control} />
        <Button type="submit" variant="contained" disabled={!isDirty || !isValid || isSubmitting}>
          {loading ? <CircularProgress color="success" /> : 'Save'}
        </Button>
      </Stack>
    </MainLayout>
  )
}
