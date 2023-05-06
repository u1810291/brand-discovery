import * as yup from 'yup'

export type UpdateAccountFormType = {
  email: string
  companyName: string
  firstName: string
  lastName: string
}

export const defaultValues = {
  email: '',
  companyName: '',
  firstName: '',
  lastName: '',
}

export const schema = yup.object({
  email: yup.string().optional().email(),
  companyName: yup.string().optional(),
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
})
