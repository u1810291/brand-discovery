import * as yup from 'yup'

export type SettingsPageFormType = {
  categories: Array<Record<string, string | number>>
  distance: number
  filterByDistance: boolean
  location: Record<string, any>
}

export const schema = yup.object({
  categories: yup.array().nullable(),
  distance: yup.number().nullable(),
  filterByDistance: yup.bool().nullable(),
  location: yup.object().nullable(),
})
