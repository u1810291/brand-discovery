/* eslint-disable prettier/prettier */
'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import { getAuth } from 'firebase/auth'
import { useEffect, useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from 'src/components/InputField'
import { MainLayout } from 'src/layouts/MainLayout'
import firebaseApp from 'src/services/firebase'
import { useGetUser, useUpdateUser } from 'src/services/useUpdateUser'
import { useAppDispatch } from 'src/store'
import { notify } from 'src/store/slices/notify'
import { Type } from 'src/store/slices/notify/notify.slice'
import { AccountNavbar } from './components/AccountNavbar'
import { UpdateAccountFormType, schema } from './helper'
import { formattedMessage } from 'src/utils/formatErrors'

const auth = getAuth(firebaseApp())
export const Account = () => {
  const dispatch = useAppDispatch()
  const { updateUser, loading, success, error } = useUpdateUser(auth)
  const [fetchUser, data] = useGetUser()
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm<UpdateAccountFormType>({
    defaultValues: async () => ({
      email: data?.email,
      companyName: data?.companyName,
      firstName: data?.firstName,
      lastName: data?.lastName,
    }),
    values: {
      email: data?.email,
      companyName: data?.companyName,
      firstName: data?.firstName,
      lastName: data?.lastName,
    },
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

  useLayoutEffect(() => {
    fetchUser(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).uid)
  }, [])

  useEffect(() => {
    if (success || error) {
      dispatch(notify({ type: error ? Type.error : Type.success, message: error ? formattedMessage(error) : 'Updated successfully' }))
    }
  }, [success, error])

  return (
    <MainLayout showBackButton navbar={<AccountNavbar />}>
      <Stack spacing={{ xs: 2, sm: 4 }} component="form" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          name="email"
          placeholder="Enter your E-mail"
          label={data?.email ?? 'E-mail address'}
          autoComplete="email"
          disabled
          control={control}
        />
        <Stack display="flex" gap={2} paddingLeft={0} flexDirection="row">
          <InputField
            name="firstName"
            placeholder="Enter your First name"
            label={data?.firstName ?? 'First name'}
            control={control}
            fullWidth
          />
          <InputField
            name="lastName"
            placeholder="Enter your Last name"
            label={data?.lastName ?? 'Last name'}
            control={control}
            fullWidth
          />
        </Stack>
        <InputField
          name="companyName"
          placeholder="Enter your Company name"
          label={data?.companyName ?? 'Company name'}
          control={control}
        />
        <Button type="submit" variant="contained" disabled={!isDirty || !isValid || isSubmitting}>
          {loading ? <CircularProgress color="success" size={24} /> : 'Save'}
        </Button>
      </Stack>
    </MainLayout>
  )
}
