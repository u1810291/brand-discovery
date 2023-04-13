import * as yup from 'yup'

export type NewPasswordFormType = {
  password: string
  confirmPassword: string
}

export const schema = yup.object({
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
})
