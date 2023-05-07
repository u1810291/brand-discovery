import * as yup from 'yup'

export type SettingsPageFormType = {
  email: string
  companyName: string
  firstName: string
  lastName: string
  password: string
  spaceCount: string
}

export const defaultValues = {
  email: '',
  companyName: '',
  firstName: '',
  lastName: '',
  password: '',
  spaceCount: '',
}

export const schema = yup.object({
  email: yup.string().required().email(),
  companyName: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
  spaceCount: yup.string().notRequired(),
})
