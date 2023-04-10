import * as yup from 'yup'

export type SingInFormType = {
  email: string
  password: string
}

export const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required(),
})
