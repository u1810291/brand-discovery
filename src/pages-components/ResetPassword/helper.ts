import * as yup from 'yup'

export type ResetPasswordFormType = {
  email: string
}

export const schema = yup.object({
  email: yup.string().required().email(),
})
